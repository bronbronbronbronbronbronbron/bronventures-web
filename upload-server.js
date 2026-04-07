const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(__dirname, 'uploads');
const PROD_DIR = path.join(__dirname, 'prod');
const PREVIEW_DIR = path.join(__dirname, 'preview');
const PORT = 3490;
const HTTPS_PORT = 3491;
const CERT_DIR = '/home/openclaw/.acme.sh/spcap.xyz_ecc';

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json',
  '.ico': 'image/x-icon', '.json': 'application/json',
  '.woff2': 'font/woff2', '.woff': 'font/woff'
};

const uploadPage = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Upload - Bron Ventures</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,-apple-system,sans-serif;background:#000;color:#eeeef0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.c{max-width:500px;width:100%;text-align:center}
h1{font-size:24px;font-weight:900;letter-spacing:-.02em;margin-bottom:8px}
p{color:#86868b;font-size:14px;margin-bottom:32px}
.drop{border:2px dashed rgba(37,99,235,.4);border-radius:18px;padding:60px 32px;cursor:pointer;transition:all .3s;position:relative}
.drop:hover,.drop.over{border-color:#2563eb;background:rgba(37,99,235,.05)}
.drop input{position:absolute;inset:0;opacity:0;cursor:pointer}
.drop-text{font-size:16px;font-weight:600;margin-bottom:8px}
.drop-sub{font-size:12px;color:#55555f}
.files{margin-top:24px;text-align:left}
.file{background:#1c1c1e;border-radius:10px;padding:12px 16px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;font-size:13px}
.file .ok{color:#22c55e}
.btn{background:linear-gradient(135deg,#2563eb,#6366f1);color:#fff;border:none;padding:16px 32px;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;width:100%;margin-top:16px;transition:all .3s}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(37,99,235,.3)}
.btn:disabled{opacity:.4;transform:none;box-shadow:none;cursor:not-allowed}
</style></head><body>
<div class="c">
<h1>Upload Files</h1>
<p>Photos, 3D models (.glb), or any assets</p>
<form id="f" enctype="multipart/form-data">
<div class="drop" id="drop">
<div class="drop-text">Drop files here or click to browse</div>
<div class="drop-sub">JPG, PNG, WEBP, GLB, SVG - up to 50MB each</div>
<input type="file" name="photos" multiple id="inp">
</div>
<div class="files" id="files"></div>
<button type="submit" class="btn" id="btn" disabled>Upload All</button>
</form>
</div>
<script>
const drop=document.getElementById('drop'),inp=document.getElementById('inp'),filesDiv=document.getElementById('files'),btn=document.getElementById('btn'),form=document.getElementById('f');
let selectedFiles=[];
drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('over')});
drop.addEventListener('dragleave',()=>drop.classList.remove('over'));
drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('over');inp.files=e.dataTransfer.files;handleFiles(e.dataTransfer.files)});
inp.addEventListener('change',e=>handleFiles(e.target.files));
function handleFiles(files){
  selectedFiles=[...files];
  filesDiv.innerHTML='';
  selectedFiles.forEach(f=>{
    const d=document.createElement('div');d.className='file';
    d.innerHTML=f.name+' <span style="color:#55555f">'+(f.size/1024/1024).toFixed(1)+'MB</span>';
    filesDiv.appendChild(d);
  });
  btn.disabled=selectedFiles.length===0;
}
form.addEventListener('submit',async e=>{
  e.preventDefault();btn.disabled=true;btn.textContent='Uploading...';
  for(const f of selectedFiles){
    const fd=new FormData();fd.append('photo',f);
    try{
      const r=await fetch('/upload',{method:'POST',body:fd});
      const j=await r.json();
      const el=filesDiv.querySelector('.file:not(.done)');
      if(el){el.innerHTML=f.name+' <span class="ok">done - /uploads/'+j.filename+'</span>';el.classList.add('done')}
    }catch(err){console.error(err)}
  }
  btn.textContent='All uploaded';
});
</script></body></html>`;

function serveFile(filePath, res) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream' };
    // Cache static assets in prod
    if (filePath.startsWith(PROD_DIR) && ext !== '.html') {
      headers['Cache-Control'] = 'public, max-age=86400';
    }
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
    return true;
  }
  return false;
}

const handler = (req, res) => {
  const url = req.url.split('?')[0];

  // ─── Upload page ───
  if (req.method === 'GET' && url === '/upload-photos') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(uploadPage);
  }

  // ─── Upload handler ───
  if (req.method === 'POST' && url === '/upload') {
    const boundary = req.headers['content-type'].split('boundary=')[1];
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const buf = Buffer.concat(chunks);
      const str = buf.toString('latin1');
      const parts = str.split('--' + boundary);
      for (const part of parts) {
        const nameMatch = part.match(/name="photo".*filename="(.+?)"/s);
        if (nameMatch) {
          const filename = nameMatch[1].replace(/[^a-zA-Z0-9._-]/g, '_');
          const headerEnd = part.indexOf('\r\n\r\n') + 4;
          const dataEnd = part.lastIndexOf('\r\n');
          const data = Buffer.from(part.substring(headerEnd, dataEnd), 'latin1');
          fs.writeFileSync(path.join(UPLOAD_DIR, filename), data);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ ok: true, filename }));
        }
      }
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'no file' }));
    });
    return;
  }

  // ─── Uploads directory (shared between prod and preview) ───
  if (req.method === 'GET' && url.startsWith('/uploads/')) {
    if (serveFile(path.join(__dirname, url), res)) return;
  }

  // ─── Preview workspace: /preview/* ───
  if (req.method === 'GET' && (url === '/preview' || url === '/preview/')) {
    if (serveFile(path.join(PREVIEW_DIR, 'index.html'), res)) return;
  }
  if (req.method === 'GET' && url.startsWith('/preview/')) {
    const rel = url.slice('/preview'.length);
    if (serveFile(path.join(PREVIEW_DIR, rel), res)) return;
  }

  // ─── Production: everything else ───
  if (req.method === 'GET' || req.method === 'HEAD') {
    let filePath;
    if (url === '/' || url === '') {
      filePath = path.join(PROD_DIR, 'index.html');
    } else {
      filePath = path.join(PROD_DIR, url);
    }
    if (serveFile(filePath, res)) return;

    // SPA fallback: known section slugs serve index.html (browser scrolls via JS)
    const slug = url.replace(/^\//, '').replace(/\/$/, '');
    const knownSlugs = ['about', 'ventures', 'contact', 'research', 'writing'];
    if (knownSlugs.includes(slug)) {
      // Redirect to /#slug so the anchor scroll works natively
      res.writeHead(301, { 'Location': '/#' + slug });
      return res.end();
    }
  }

  res.writeHead(404);
  res.end('Not found');
};

const server = http.createServer(handler);
server.listen(PORT, () => console.log(`Bron Ventures HTTP :${PORT} | prod: / | preview: /preview/`));

try {
  const sslOpts = {
    key: fs.readFileSync(path.join(CERT_DIR, 'spcap.xyz.key')),
    cert: fs.readFileSync(path.join(CERT_DIR, 'fullchain.cer'))
  };
  const httpsServer = https.createServer(sslOpts, handler);
  httpsServer.listen(HTTPS_PORT, () => console.log(`Bron Ventures HTTPS :${HTTPS_PORT} | prod: / | preview: /preview/`));
} catch (e) {
  console.log('No SSL certs, HTTPS disabled:', e.message);
}
