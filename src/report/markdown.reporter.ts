import type { ExposureIndicator, Finding, ScanResult } from '../models';

function renderFindings(findings: Finding[]): string {
  if (!findings.length) {
    return '- No findings detected.\n';
  }

  return findings
    .map(
      (finding, index) => `### ${index + 1}. ${finding.title}\n
- Severity: ${finding.severity}\n- Category: ${finding.category}\n- Target: ${finding.target}\n- Description: ${finding.description}\n- Evidence:\n${finding.evidence.map((item) => `  - ${item}`).join('\n')}\n- Recommendation: ${finding.recommendation}\n`,
    )
    .join('\n');
}

function renderIndicators(indicators: ExposureIndicator[]): string {
  if (!indicators.length) {
    return '- No exposure indicators detected.\n';
  }

  return indicators
    .map(
      (indicator, index) => `### ${index + 1}. ${indicator.kind}\n
- Value: ${indicator.value}\n- Location: ${indicator.location}\n- Confidence: ${indicator.confidence ?? 'n/a'}\n- Notes: ${indicator.notes ?? 'n/a'}\n`,
    )
    .join('\n');
}

export function renderMarkdownReport(result: ScanResult): string {
  return `# FrontScope Report / FrontScope 리포트

## Target / 대상

- Original URL: ${result.metadata.originalUrl}
- Normalized URL: ${result.metadata.normalizedUrl}
- Hostname: ${result.metadata.hostname}
- Scan Started At: ${result.metadata.scanStartedAt}

## Summary / 요약

- Total Findings: ${result.summary.totalFindings}
- Severity Counts: info=${result.summary.severityCounts.info}, low=${result.summary.severityCounts.low}, medium=${result.summary.severityCounts.medium}, high=${result.summary.severityCounts.high}
- Redirect Count: ${result.summary.redirectCount}
- Third-Party Domain Count: ${result.summary.thirdPartyDomainCount}

## Findings / 진단 결과

${renderFindings(result.findings)}
## Exposure Indicators / 노출 시그널

${renderIndicators(result.indicators)}
## Errors / 오류

${result.errors.length ? result.errors.map((error) => `- ${error}`).join('\n') : '- No errors.'}
`;
}
