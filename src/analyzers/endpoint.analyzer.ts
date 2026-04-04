import type { ExposureIndicator, Finding } from '../models';

function classifyEndpoint(value: string): string[] {
  const lower = value.toLowerCase();
  const tags: string[] = [];

  if (lower.includes('login')) tags.push('login');
  if (lower.includes('verify')) tags.push('verify');
  if (lower.includes('auth')) tags.push('auth');
  if (lower.includes('find')) tags.push('recovery');
  if (lower.includes('download') || lower.includes('attach') || lower.includes('viewer')) tags.push('download');
  if (lower.includes('board') || lower.includes('article')) tags.push('content');
  if (lower.includes('?')) tags.push('parameterized');

  return tags;
}

export function analyzeEndpointRisks(indicators: ExposureIndicator[]): Finding[] {
  const findings: Finding[] = [];

  for (const indicator of indicators) {
    if (indicator.kind !== 'api-endpoint') {
      continue;
    }

    const tags = classifyEndpoint(indicator.value);

    if (!tags.length) {
      continue;
    }

    const severity = tags.includes('auth') || tags.includes('login') || tags.includes('verify')
      ? 'medium'
      : 'low';

    findings.push({
      id: `endpoint-risk:${indicator.value}`,
      title: `Interesting endpoint exposed in client-side content`,
      severity,
      category: 'endpoint',
      target: indicator.location,
      description: `The client-side response exposes an endpoint with potentially security-relevant behavior (${tags.join(', ')}).`,
      evidence: [indicator.value, `Tags: ${tags.join(', ')}`],
      recommendation: 'Review whether the endpoint needs additional authorization, anti-automation protection, or reduced client-side exposure.',
    });
  }

  return findings;
}
