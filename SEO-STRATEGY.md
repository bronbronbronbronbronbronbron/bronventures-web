# Daniel Bron - Master SEO & Knowledge Panel Strategy

## Current State (What's Done)

### On-Site (bronventures.com) - COMPLETE
- [x] **Schema.org Person JSON-LD** - Full markup with @id, name, alternateName, jobTitle, description, sameAs (8 URLs), alumniOf (2 schools), award (3), worksFor (2), founder (5 orgs), knowsAbout (8 topics), knowsLanguage (en, ru), nationality, address, hasOccupation (2), author (book)
- [x] **Schema.org WebSite JSON-LD** - Site name, URL, description, author linked to Person @id
- [x] **Meta tags** - title, description, author, theme-color, canonical, og:title/description/url/type/image/locale/site_name, twitter:card/title/description, geo.region/placename, robots
- [x] **Favicon** - SVG (scalable) + PNG 32px + Apple Touch Icon 180px + 192px + 512px
- [x] **robots.txt** - Allow all, block /preview/ and upload endpoint. Explicit AI bot allows (GPTBot, ChatGPT-User, Claude-Web, Google-Extended, Anthropic-AI, PerplexityBot)
- [x] **sitemap.xml** - Single page with lastmod, weekly changefreq, priority 1.0
- [x] **llms.txt** - Full LLM-readable markdown: bio, ventures, featured work, connect links, timeline
- [x] **Canonical URL** - https://bronventures.com (ready for DNS)
- [x] **Semantic HTML** - Proper heading hierarchy, section structure, alt text on all images

---

## Knowledge Panel Playbook (What Needs to Happen)

Google Knowledge Panels are generated from the **Knowledge Graph**, which is built from **authoritative, corroborated entity data**. Google needs to:
1. **Understand** who Daniel Bron is (entity recognition)
2. **Verify** the facts from multiple independent sources (corroboration)
3. **Confirm** you are notable enough to warrant a panel (notability threshold)

### TIER 1: Foundation (Do First - Week 1-2)

#### 1. Point DNS for bronventures.com
- Dan points bronventures.com A record to 5.161.250.105
- Add SSL cert for bronventures.com domain
- This activates canonical URL, sitemap, and all SEO meta
- **Without this, nothing else works.** Google indexes the canonical URL.

#### 2. Google Search Console
- Go to https://search.google.com/search-console
- Add property: bronventures.com
- Verify via DNS TXT record or HTML meta tag
- Submit sitemap: https://bronventures.com/sitemap.xml
- Request indexing of main page
- **Get the verification code and add it to the HTML head**

#### 3. Google Knowledge Panel Claim
- Once the site is indexed, search "Daniel Bron" on Google
- If a Knowledge Panel appears, click "Claim this Knowledge Panel"
- If not, go to https://business.google.com/create to create a Google Business Profile (as a person/public figure, not a business)
- Alternatively, wait for corroboration to trigger auto-generation

#### 4. Wikidata Entry (CRITICAL)
- **Daniel Bron has NO Wikidata entry** - this is the single biggest gap
- Wikidata is Google's primary structured data source for Knowledge Panels
- Create entry at https://www.wikidata.org/wiki/Special:NewItem
- Required properties:
  - instance of: human (Q5)
  - given name: Daniel
  - family name: Bron
  - country of citizenship: United States
  - occupation: entrepreneur (Q131524), investor (Q1397016)
  - educated at: University of Miami (Q180536), NSU Shepard Broad College of Law
  - notable work: The 4th Industrial Revolution (need ISBN/Amazon link)
  - official website: bronventures.com
  - LinkedIn ID: dbron
  - Instagram username: broninc
- **Must have reliable sources for each claim** - this is where existing press (Built In article, Amazon book listing) is crucial
- Wikidata entries with sources get ingested into Knowledge Graph within weeks

#### 5. LinkedIn Optimization
- LinkedIn profile should mirror bronventures.com data exactly
- Same description, same job titles, same venture descriptions
- Consistency across sources is how Google confirms entity facts
- Make sure linkedin.com/in/dbron has: "Entrepreneur, Operator, Investor" as headline
- All 5 ventures listed as current/past positions
- Education: UM + NSU
- Featured section: book, Built In article, bronventures.com

### TIER 2: Corroboration (Weeks 2-4)

#### 6. Wikipedia Article (High Value, Hard)
- Wikipedia is the #1 source for Knowledge Panels
- Requires "notability" per Wikipedia standards: significant coverage in independent reliable sources
- Current press: Built In feature (counts), Amazon book (counts as published work)
- **What's missing**: 2-3 more independent press articles about Daniel Bron specifically
- Strategy: Get featured/quoted in 2-3 more publications (Forbes contributor piece, TechCrunch mention, local Miami business press, law review)
- **Do NOT create the Wikipedia article yourself** - it will be flagged as COI. Pay a Wikipedia editor or get someone independent to create it once press coverage exists
- Alternative: Wikipedia's "Articles for Creation" (AfC) process

#### 7. Crunchbase Profile
- Create profile at crunchbase.com for Daniel Bron
- Also create Organization profiles for Superposition Capital and Fulcrum
- Crunchbase is a Google-trusted source for business entities
- Include: bio, photo, ventures, education, social links

#### 8. Amazon Author Profile
- Set up Amazon Author Central at author.amazon.com
- Claim "The 4th Industrial Revolution"
- Add bio, photo, website URL
- Amazon author profiles are entity-rich and feed Google

#### 9. Cross-Site Entity Consistency
- Every profile across every platform must use identical:
  - Full name: "Daniel Bron"
  - Description: "Entrepreneur, operator, and investor"
  - Location: "Miami, FL"
  - Same headshot photo
  - Link back to bronventures.com
- Platforms to ensure consistency:
  - LinkedIn, Instagram, Crunchbase, Amazon Author
  - superpositioncap.com (team/about page)
  - askfulcrum.com (team/about page)
  - solidity.law (about page)
  - lavr-int.com (about page)
- **Each venture site should have a structured data mention of Daniel Bron as founder with sameAs back to bronventures.com**

### TIER 3: Authority Building (Weeks 4-12)

#### 10. Press & Media Coverage
- Knowledge Panels require INDEPENDENT source corroboration
- Target publications:
  - **Local**: Miami Herald, South Florida Business Journal, Miami New Times
  - **Industry**: TechCrunch, The Information, Built In (already have one), VentureBeat
  - **Legal**: ABA Journal, Above The Law, NSU law review
  - **Investment**: Pitchbook, AngelList, Dealflow
- Angles that get coverage:
  - "24-year-old runs $5M seed fund while in law school" (age + fund + law = unique)
  - "From first venture at 12 to VC fund at 24" (origin story)
  - "AI for regulated industries" (timely topic)
  - Fulcrum case studies (if any are public)

#### 11. Speaking & Event Coverage
- Javits Center and LA Convention Center talks should have recap articles/videos
- Get on more panels - each one that gets written up is a corroborating source
- Conference websites that list speakers = entity corroboration
- Podcast appearances (each creates a new indexed page mentioning "Daniel Bron")

#### 12. Google Scholar / Academic Presence
- The book "The 4th Industrial Revolution" should have a Google Scholar entry
- If there's an ISBN, make sure it's in WorldCat, Google Books, OpenLibrary
- Consider publishing a white paper or research article through Fulcrum

### TIER 4: AI Agent Discoverability (Ongoing)

#### 13. llms.txt (DONE)
- Already at /llms.txt with full structured info
- Update whenever ventures or achievements change

#### 14. Structured Data for AI
- The Person schema with @id creates a machine-readable entity
- sameAs links tell AI agents where to find more info
- knowsAbout tells AI what topics Dan is an authority on

#### 15. Content That AI Indexes
- Blog posts / articles on bronventures.com (future)
- Each article should have Article schema with author linked to Person @id
- Topics should match knowsAbout: AI, regulated industries, legal tech, venture capital
- AI agents surface people who have original content on topics

---

## Technical SEO Checklist

### DNS Setup (Dan's action)
- [ ] Point bronventures.com A record to 5.161.250.105
- [ ] Add SSL cert for bronventures.com (Let's Encrypt via acme.sh)
- [ ] Update Caddy/upload-server to serve on bronventures.com

### Google Search Console (after DNS)
- [ ] Verify bronventures.com
- [ ] Add google-site-verification meta tag to HTML
- [ ] Submit sitemap
- [ ] Request indexing

### Performance
- [ ] Test with Google PageSpeed Insights (static HTML should score 95+)
- [ ] Test with Google Rich Results Test (validate Person schema)
- [ ] Test with Schema.org Validator

### External Profiles to Create/Update
- [ ] Wikidata entry (HIGHEST PRIORITY after DNS)
- [ ] Crunchbase profile (person + organizations)
- [ ] Amazon Author Central
- [ ] Google Business Profile (public figure)
- [ ] Ensure all venture sites link back to bronventures.com with structured data

### Content Gaps
- [ ] Professional headshot for OG image (currently using icon-512.png placeholder)
- [ ] Social card image (1200x630 OG image with name + title)
- [ ] Consider adding a blog/insights section for ongoing content

---

## Priority Order (If Doing One Thing at a Time)

1. **DNS** - everything depends on this
2. **Google Search Console** - get indexed
3. **Wikidata entry** - feeds Knowledge Graph directly
4. **Crunchbase** - trusted business entity source
5. **Amazon Author Central** - claim the book
6. **Cross-site consistency audit** - ensure all venture sites reference Dan
7. **Press coverage** - 2-3 articles to establish notability
8. **Wikipedia** - only after sufficient press exists

---

## Timeline Expectation

- **Week 1-2**: DNS + GSC + Wikidata + Crunchbase = foundation
- **Week 4-6**: Cross-site links + Amazon Author + first press pitch
- **Week 8-12**: Knowledge Panel should start appearing if corroboration is sufficient
- **Month 3-6**: Wikipedia article feasible if press coverage grows
- **Ongoing**: Content creation, speaking, press = compounding authority

Knowledge Panels typically take 4-12 weeks to appear after sufficient entity corroboration. The more independent sources that agree on the same facts, the faster Google creates the panel.
