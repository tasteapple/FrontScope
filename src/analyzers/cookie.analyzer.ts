import type { Finding, ResponseSnapshot } from '../models';

function normalizeSetCookieHeader(value?: string | string[]): string[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

export function analyzeCookies(response?: ResponseSnapshot): Finding[] {
  if (!response) {
    return [];
  }

  const setCookieValues = normalizeSetCookieHeader(response.headers['set-cookie']);
  const findings: Finding[] = [];

  for (const cookie of setCookieValues) {
    const lowerCookie = cookie.toLowerCase();
    const cookieName = cookie.split('=')[0]?.trim() || 'unknown-cookie';

    if (!lowerCookie.includes('secure')) {
      findings.push({
        id: `cookie-missing-secure:${cookieName}`,
        title: `Cookie missing Secure flag: ${cookieName}`,
        severity: 'low',
        category: 'cookies',
        target: response.finalUrl,
        description: `The cookie ${cookieName} is set without the Secure attribute.`,
        evidence: [cookie],
        recommendation: 'Set the Secure attribute for cookies that should only travel over HTTPS.',
        confidence: 'validated',
      });
    }

    if (!lowerCookie.includes('samesite=')) {
      findings.push({
        id: `cookie-missing-samesite:${cookieName}`,
        title: `Cookie missing SameSite attribute: ${cookieName}`,
        severity: 'low',
        category: 'cookies',
        target: response.finalUrl,
        description: `The cookie ${cookieName} is set without an explicit SameSite attribute.`,
        evidence: [cookie],
        recommendation: 'Set SameSite=Lax, Strict, or None explicitly based on the application flow.',
        confidence: 'validated',
      });
    }
  }

  return findings;
}
