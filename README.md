# FrontScope

FrontScope is a client-side security reconnaissance and reporting tool for web applications. It inspects a target from the browser-facing surface and produces structured reports about security headers, cookies, client assets, sourcemaps, third-party dependencies, and exposure indicators found in HTML and JavaScript.

## Goal

The goal of FrontScope is not to behave like a server-side exploit scanner. Instead, it focuses on what is exposed to the browser:

- response headers and browser security policy
- cookies and client-side session handling signals
- JavaScript, CSS, iframe, and other loaded assets
- sourcemap exposure and debug artifact leakage
- third-party script dependencies
- potentially sensitive indicators embedded in frontend code

The output is designed to be useful for:

- rapid browser-surface assessments
- security review notes
- client-side exposure triage
- repeatable reporting for research or portfolio work

## What FrontScope Does

Given a URL, FrontScope will eventually:

1. normalize the input URL
2. fetch the target and record redirect behavior
3. collect headers, HTML, and linked assets
4. render the page in a headless browser when needed
5. inspect browser-facing security controls
6. extract potential exposure indicators from client-side resources
7. generate reports in JSON, Markdown, and HTML

## Core Analysis Areas

### 1. Security Headers
FrontScope checks for important browser-facing security headers such as:

- Content-Security-Policy
- Strict-Transport-Security
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

It should eventually evaluate not only whether a header exists, but whether it is weak, overly broad, or inconsistent.

### 2. Cookies
FrontScope inspects cookie-related security signals including:

- Secure
- HttpOnly
- SameSite
- scope and behavior hints

### 3. Client Assets
FrontScope extracts and classifies browser-loaded assets such as:

- JavaScript files
- CSS files
- images
- iframes
- manifests
- external third-party resources

### 4. Sourcemaps and Debug Artifacts
FrontScope looks for exposed sourcemaps and related debug traces, such as:

- `sourceMappingURL`
- accessible `.map` files
- source path hints
- development artifact leakage

### 5. Exposure Indicators in Frontend Code
FrontScope scans HTML and JavaScript for indicators such as:

- API endpoint references
- internal or staging hostnames
- localhost references
- token-like strings
- framework configuration objects
- storage key names
- third-party service identifiers

## Planned Architecture

```text
FrontScope/
├─ src/
│  ├─ cli/               # command-line entrypoint
│  ├─ core/              # scan pipeline and orchestration
│  ├─ collectors/        # raw data collection modules
│  ├─ analyzers/         # security analysis rules
│  ├─ extractors/        # URL/token/framework extraction logic
│  ├─ scoring/           # severity and scoring rules
│  ├─ report/            # JSON/Markdown/HTML reporters
│  ├─ models/            # shared data models
│  └─ utils/             # helpers and normalization utilities
├─ docs/                 # design notes and future specs
├─ reports/              # generated reports
├─ examples/             # sample input/output
├─ tests/                # test cases
└─ README.md
```

## How It Works

FrontScope is intended to follow a pipeline-based design.

### Step 1. Input Normalization
- normalize the URL
- resolve protocol issues
- derive target metadata

### Step 2. Static Collection
- fetch the target
- record status code and redirect chain
- collect headers
- download HTML
- extract asset references from markup

### Step 3. Browser Collection
- load the page in a headless browser
- record network requests
- capture dynamically loaded assets
- collect browser-visible cookie and console signals

### Step 4. Analysis
- run header rules
- inspect cookie attributes
- detect sourcemap exposure
- extract exposure indicators from scripts and markup
- classify third-party dependencies

### Step 5. Reporting
- build normalized findings
- assign severity and category
- generate JSON, Markdown, and HTML reports

## Proposed Output Model

Each finding should eventually include:

- unique identifier
- title
- severity
- category
- target location
- description
- evidence
- recommendation
- optional references

This makes the results easier to review, compare, and automate.

## MVP Scope

The first working version should focus on:

- single URL scanning
- header collection and analysis
- HTML parsing and asset extraction
- sourcemap presence detection
- basic exposure keyword scanning
- Markdown and JSON reporting

## Future Expansion

After the MVP, FrontScope can be expanded with:

- full Playwright-based dynamic analysis
- CSP strength analysis
- multi-page crawling
- framework fingerprinting
- storage inspection
- report comparison across scans
- CI/CD integration

## Initial Development Plan

1. initialize the TypeScript CLI project
2. implement URL fetch and redirect capture
3. parse HTML and extract assets
4. add header and cookie analyzers
5. add sourcemap and keyword detection
6. generate JSON and Markdown reports
7. add browser automation and HTML reporting

## Positioning

FrontScope is best described as a **client-side security reconnaissance and reporting tool**.

It is not intended to claim exploitation capability. Its value comes from structured discovery, evidence collection, and browser-surface reporting.
