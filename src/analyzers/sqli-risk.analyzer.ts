import type { ExposureIndicator, Finding, ResponseSnapshot } from '../models';

const SQL_ERROR_PATTERNS: Array<{ name: string; regex: RegExp }> = [
  { name: 'SQL syntax error', regex: /sql syntax|syntax error.*sql/gi },
  { name: 'SQLException', regex: /sqlexception/gi },
  { name: 'JDBC', regex: /\bjdbc\b/gi },
  { name: 'ORA-', regex: /ora-\d+/gi },
  { name: 'MySQL', regex: /mysql/gi },
  { name: 'PostgreSQL', regex: /postgres(?:ql)?/gi },
  { name: 'SQL Server', regex: /sql server|odbc sql server driver/gi },
];

const RISKY_PARAM_NAMES = [
  'id',
  'user',
  'uid',
  'no',
  'boardno',
  'articleno',
  'attachno',
  'search',
  'query',
  'keyword',
  'page',
  'sort',
  'loginid',
  'userid',
  'menu',
];

function extractQueryParamNames(urlValue: string): string[] {
  try {
    const parsed = new URL(urlValue.replace(/&amp;/g, '&'));
    return [...parsed.searchParams.keys()].map((key) => key.toLowerCase());
  } catch {
    return [];
  }
}

function classifyEndpointForSqli(urlValue: string): string[] {
  const lower = urlValue.toLowerCase();
  const tags: string[] = [];

  if (lower.includes('login')) tags.push('login');
  if (lower.includes('search')) tags.push('search');
  if (lower.includes('list')) tags.push('list');
  if (lower.includes('view')) tags.push('view');
  if (lower.includes('download') || lower.includes('attach') || lower.includes('viewer')) tags.push('download');
  if (lower.includes('api')) tags.push('api');

  return tags;
}

export function analyzeSqliRisk(
  response: ResponseSnapshot | undefined,
  indicators: ExposureIndicator[],
): Finding[] {
  const findings: Finding[] = [];
  const html = response?.html ?? '';

  for (const signature of SQL_ERROR_PATTERNS) {
    if (signature.regex.test(html)) {
      findings.push({
        id: `sqli-error-signature:${signature.name}`,
        title: `Database or SQL error signature detected: ${signature.name}`,
        severity: 'medium',
        category: 'sqli-risk',
        target: response?.finalUrl ?? 'unknown-target',
        description: `The response contains a database-related error signature (${signature.name}).`,
        evidence: [`Detected signature: ${signature.name}`],
        recommendation: 'Review error handling to avoid exposing backend query or database details to clients.',
        confidence: 'matched',
      });
    }
  }

  for (const indicator of indicators) {
    if (indicator.kind !== 'api-endpoint') {
      continue;
    }

    const paramNames = extractQueryParamNames(indicator.value);
    const riskyParams = paramNames.filter((param) => RISKY_PARAM_NAMES.includes(param));
    const endpointTags = classifyEndpointForSqli(indicator.value);

    if (!riskyParams.length && !endpointTags.includes('search') && !endpointTags.includes('view') && !endpointTags.includes('download')) {
      continue;
    }

    findings.push({
      id: `sqli-risk:${indicator.value}`,
      title: 'Potential server-side input risk surfaced in client content',
      severity: riskyParams.length ? 'medium' : 'low',
      category: 'sqli-risk',
      target: indicator.location,
      description: `A client-exposed endpoint appears to include parameters or behavior patterns that warrant server-side input validation review for SQLi or related injection risks.`,
      evidence: [
        `Endpoint: ${indicator.value}`,
        `Endpoint tags: ${endpointTags.join(', ') || 'none'}`,
        `Risky params: ${riskyParams.join(', ') || 'none'}`,
      ],
      recommendation: 'Review server-side parameter handling, query construction, and authorization checks for this endpoint.',
      confidence: riskyParams.length ? 'matched' : 'heuristic',
    });
  }

  return findings;
}
