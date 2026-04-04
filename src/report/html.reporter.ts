import type { Finding, ScanResult } from '../models';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderFindingCard(finding: Finding): string {
  const evidenceHtml = finding.evidence
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('');

  return `
    <section class="finding-card severity-${finding.severity}">
      <div class="finding-head">
        <h3>${escapeHtml(finding.title)}</h3>
        <div class="badges">
          <span class="badge severity">${escapeHtml(finding.severity)}</span>
          <span class="badge category">${escapeHtml(finding.category)}</span>
          <span class="badge confidence">${escapeHtml(finding.confidence ?? 'n/a')}</span>
        </div>
      </div>
      <p><strong>Target:</strong> ${escapeHtml(finding.target)}</p>
      <p>${escapeHtml(finding.description)}</p>
      <div>
        <strong>Evidence</strong>
        <ul>${evidenceHtml}</ul>
      </div>
      <p><strong>Recommendation:</strong> ${escapeHtml(finding.recommendation)}</p>
    </section>
  `;
}

export function renderHtmlReport(result: ScanResult): string {
  const findingsHtml = result.findings.map(renderFindingCard).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FrontScope HTML Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; background: #0b1020; color: #e5e7eb; }
    .container { max-width: 1200px; margin: 0 auto; padding: 24px; }
    .hero { margin-bottom: 24px; }
    .hero h1 { margin: 0 0 8px; }
    .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin: 20px 0; }
    .card { background: #121a2f; border: 1px solid #25304d; border-radius: 12px; padding: 16px; }
    .finding-card { background: #121a2f; border: 1px solid #25304d; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
    .finding-head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
    .badges { display: flex; gap: 8px; flex-wrap: wrap; }
    .badge { font-size: 12px; padding: 4px 8px; border-radius: 999px; background: #1f2937; }
    .severity-high { border-color: #ef4444; }
    .severity-medium { border-color: #f59e0b; }
    .severity-low { border-color: #3b82f6; }
    .severity-info { border-color: #10b981; }
    ul { margin-top: 8px; }
    a { color: #93c5fd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="hero">
      <h1>FrontScope Report</h1>
      <p>Target: <strong>${escapeHtml(result.metadata.normalizedUrl)}</strong></p>
      <p>Generated: ${escapeHtml(result.metadata.scanStartedAt)}</p>
    </div>

    <div class="summary-grid">
      <div class="card"><strong>Total Findings</strong><br />${result.summary.totalFindings}</div>
      <div class="card"><strong>High</strong><br />${result.summary.severityCounts.high}</div>
      <div class="card"><strong>Medium</strong><br />${result.summary.severityCounts.medium}</div>
      <div class="card"><strong>Low</strong><br />${result.summary.severityCounts.low}</div>
      <div class="card"><strong>Info</strong><br />${result.summary.severityCounts.info}</div>
      <div class="card"><strong>Third-Party Domains</strong><br />${result.summary.thirdPartyDomainCount}</div>
    </div>

    <div class="card" style="margin-bottom: 20px;">
      <h2>Findings</h2>
      ${findingsHtml || '<p>No findings.</p>'}
    </div>
  </div>
</body>
</html>`;
}
