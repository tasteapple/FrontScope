import type { Finding, ScanInput, ScanResult } from '../models';
import { fetchWithMetadata } from '../utils';

async function checkSecurityTxt(targetUrl: string): Promise<Finding[]> {
  try {
    const securityTxtUrl = new URL('/.well-known/security.txt', targetUrl).toString();
    const response = await fetchWithMetadata(securityTxtUrl);

    return [
      {
        id: `active-low-risk:security-txt:${securityTxtUrl}`,
        title: 'security.txt reachable',
        severity: 'info',
        category: 'configuration',
        target: securityTxtUrl,
        description: 'The target exposes a reachable security.txt endpoint.',
        evidence: [`HTTP status: ${response.statusCode}`, `URL: ${securityTxtUrl}`],
        recommendation: 'Review whether the published security.txt information is current and intended.',
        confidence: 'validated',
      },
    ];
  } catch {
    return [];
  }
}

async function checkRobotsAndManifest(targetUrl: string): Promise<Finding[]> {
  const checks = [
    { path: '/robots.txt', title: 'robots.txt reachable' },
    { path: '/manifest.json', title: 'manifest.json reachable' },
    { path: '/service-worker.js', title: 'service-worker.js reachable' },
  ];

  const findings: Finding[] = [];

  for (const check of checks) {
    try {
      const url = new URL(check.path, targetUrl).toString();
      const response = await fetchWithMetadata(url);
      findings.push({
        id: `active-low-risk:${check.path}:${url}`,
        title: check.title,
        severity: 'info',
        category: 'configuration',
        target: url,
        description: `A low-risk probe confirmed that ${check.path} is reachable.`,
        evidence: [`HTTP status: ${response.statusCode}`, `URL: ${url}`],
        recommendation: 'Review whether this exposed resource is expected and appropriately configured.',
        confidence: 'validated',
      });
    } catch {
      // ignore unreachable optional resources
    }
  }

  return findings;
}

export async function runActiveLowRiskChecks(
  input: ScanInput,
  result: ScanResult,
): Promise<Finding[]> {
  if (!input.enableActiveLowRisk) {
    return [];
  }

  const findings: Finding[] = [];
  findings.push(...(await checkSecurityTxt(input.targetUrl)));
  findings.push(...(await checkRobotsAndManifest(input.targetUrl)));

  if (result.indicators.some((indicator) => indicator.kind === 'api-endpoint')) {
    findings.push({
      id: `active-low-risk:indicator-presence:${input.targetUrl}`,
      title: 'Active low-risk mode observed exposed endpoints for manual follow-up',
      severity: 'info',
      category: 'endpoint',
      target: input.targetUrl,
      description: 'The scan ran in active-low-risk mode and confirmed that client-exposed endpoints are present for deeper manual review.',
      evidence: [`Endpoint indicator count: ${result.indicators.filter((indicator) => indicator.kind === 'api-endpoint').length}`],
      recommendation: 'Use active-low-risk findings to prioritize which endpoints deserve deeper manual validation.',
      confidence: 'validated',
    });
  }

  return findings;
}
