import type { Finding, ResponseSnapshot } from '../models';

const REQUIRED_HEADERS = [
  'content-security-policy',
  'strict-transport-security',
  'x-frame-options',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
] as const;

export function analyzeSecurityHeaders(response?: ResponseSnapshot): Finding[] {
  if (!response) {
    return [];
  }

  const normalizedHeaders = new Map(
    Object.entries(response.headers).map(([key, value]) => [key.toLowerCase(), value]),
  );

  const findings: Finding[] = [];

  for (const headerName of REQUIRED_HEADERS) {
    if (!normalizedHeaders.has(headerName)) {
      findings.push({
        id: `missing-header:${headerName}`,
        title: `Missing security header: ${headerName}`,
        severity: headerName === 'content-security-policy' ? 'medium' : 'low',
        category: 'headers',
        target: response.finalUrl,
        description: `The response does not include the ${headerName} header.`,
        evidence: [`Missing header: ${headerName}`],
        recommendation: `Add and validate the ${headerName} header for browser-side protection.`,
        confidence: 'validated',
      });
    }
  }

  return findings;
}
