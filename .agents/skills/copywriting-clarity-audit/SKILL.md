---
name: copywriting-clarity-audit
description: Audits landing page copy, headline clarity, benefit vs feature balance, scannability, jargon detection, and messaging credibility.
version: 1.0.0
category: content
triggers:
  - run copy audit
  - audit copywriting
  - check copy clarity
---

# Purpose
Perform an objective content and copywriting audit of the agency landing page to ensure value messaging is customer-centric, benefit-driven, jargon-free, highly readable, and credible.

# Writing & Messaging Principles
1. **Clear Over Clever:** Headlines must immediately convey concrete business benefits rather than vague abstract marketing slogans.
2. **Benefit > Feature:** Focus on what the client gains ("Scale through custom web apps & automation") rather than purely listing raw tech specs.
3. **Zero Unsupported Hype:** Avoid hollow buzzwords ("world-class", "revolutionary", "best-in-class", "cutting-edge") unless backed by verifiable proof.
4. **Scannability:** Use bold keyphrases, short paragraphs (2-3 sentences), bullet points, and high-contrast section lead-ins.

# Procedure
1. **Headline & Subheadline Inspection:** Review H1, H2, and sub-paragraphs across all sections (`Hero`, `About`, `WhyGraphionic`, `FinalCta`).
2. **Unsupported Buzzword Audit:** Flag generic fluff words lacking empirical backing.
3. **Readability & Sentence Length:** Verify sentences remain concise (average 15-20 words).
4. **Factual Integrity Check:** Ensure all numbers, dates, addresses, and ratings strictly match verified data in `src/data/site.js`.

# Validation
- Zero invented metrics, ratings, or client statistics.
- 100% alignment with verified facts in `src/data/site.js` (`COMPANY`, `GOOGLE`, `WHY`, `FAQS`).
- Zero generic unsupported buzzwords ("world-class", "revolutionary").

# Output Format
Content clarity report listing Section Name, Current Copy, Issue Flagged, Recommended Copy Improvement, and Benefit Rationale.

# Failure Conditions
- Inventing unverified client logos, fake revenue stats, or unconfirmed awards.
- Replacing clear technical descriptions with confusing marketing buzzwords.

# Safety Rules
- NEVER invent facts, metrics, or client quotes.
- Respect established client copy approved in `src/data/site.js`.

# Project-Specific Rules
- Company address ("312, Times Corner, VIP Rd, Vesu, Surat, Gujarat 395007, India") and phone ("6351903380") MUST remain exact.
- Verified Google Rating MUST remain `4.9/5` based on `100+ clients` / `17 reviews`.

# Provenance
- **Origin:** Project-Specific & Adapted
- **Source:** Direct-Response Copywriting Frameworks & Graphionic Brand Identity Standards.
---
