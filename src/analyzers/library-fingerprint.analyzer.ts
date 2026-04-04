import type { AssetContent, Finding } from '../models';

interface LibrarySignature {
  id: string;
  name: string;
  version: string;
  evidencePatterns: RegExp[];
  severity: 'low' | 'medium';
  notes: string;
  recommendation: string;
}

const LIBRARY_SIGNATURES: LibrarySignature[] = [
  {
    id: 'jquery-1.10.2',
    name: 'jQuery',
    version: '1.10.2',
    evidencePatterns: [
      /jquery-1\.10\.2(\.min)?\.js/i,
      /jQuery v1\.10\.2/i,
      /jquery:\s*"?1\.10\.2"?/i,
    ],
    severity: 'medium',
    notes:
      'jQuery 1.10.2 is very old and should be reviewed against modern maintenance and vulnerability expectations.',
    recommendation:
      'Review usage and upgrade to a modern supported jQuery version where feasible. Check dependent code for compatibility before replacement.',
  },
  {
    id: 'json2-legacy',
    name: 'JSON2',
    version: 'legacy',
    evidencePatterns: [/json2\.js/i, /json2/i],
    severity: 'low',
    notes:
      'A legacy JSON compatibility library was detected. This is often a sign of older frontend compatibility assumptions.',
    recommendation:
      'Review whether legacy compatibility shims are still needed and whether they expand attack surface or maintenance burden.',
  },
];

export function analyzeLibraryFingerprints(assetContents: AssetContent[]): Finding[] {
  const findings: Finding[] = [];

  for (const asset of assetContents) {
    for (const signature of LIBRARY_SIGNATURES) {
      const matched = signature.evidencePatterns.some(
        (pattern) => pattern.test(asset.url) || pattern.test(asset.body),
      );

      if (!matched) {
        continue;
      }

      findings.push({
        id: `library:${signature.id}:${asset.url}`,
        title: `Library fingerprint detected: ${signature.name} ${signature.version}`,
        severity: signature.severity,
        category: 'javascript',
        target: asset.url,
        description: `${signature.name} ${signature.version} was detected in a fetched JavaScript asset. ${signature.notes}`,
        evidence: [
          `Asset URL: ${asset.url}`,
          `Detected library: ${signature.name}`,
          `Detected version: ${signature.version}`,
        ],
        recommendation: signature.recommendation,
      });
    }
  }

  return findings;
}
