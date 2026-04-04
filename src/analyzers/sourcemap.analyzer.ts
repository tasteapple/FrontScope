import type { Finding, ResponseSnapshot } from '../models';

const SOURCEMAP_REGEX = /sourceMappingURL\s*=\s*([^\s*]+)/gi;

export function analyzeSourcemapExposure(response?: ResponseSnapshot): Finding[] {
  const html = response?.html;
  if (!response || !html) {
    return [];
  }

  const findings: Finding[] = [];
  const matches = Array.from(html.matchAll(SOURCEMAP_REGEX));

  for (const match of matches) {
    const reference = match[1]?.trim();
    if (!reference) {
      continue;
    }

    findings.push({
      id: `sourcemap-reference:${reference}`,
      title: 'Potential sourcemap reference detected',
      severity: 'low',
      category: 'sourcemap',
      target: response.finalUrl,
      description:
        'A sourceMappingURL-style reference was detected in the collected HTML response.',
      evidence: [`Detected reference: ${reference}`],
      recommendation:
        'Review whether sourcemap or debug artifacts are unintentionally exposed in production.',
    });
  }

  return findings;
}
