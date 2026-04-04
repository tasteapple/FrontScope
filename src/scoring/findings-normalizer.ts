import type { Finding } from '../models';

const severityRank: Record<Finding['severity'], number> = {
  info: 0,
  low: 1,
  medium: 2,
  high: 3,
};

const confidenceRank: Record<NonNullable<Finding['confidence']>, number> = {
  heuristic: 0,
  matched: 1,
  validated: 2,
};

function mergeEvidence(existing: string[], incoming: string[]): string[] {
  return [...new Set([...existing, ...incoming])];
}

function chooseBetterSeverity(
  left: Finding['severity'],
  right: Finding['severity'],
): Finding['severity'] {
  return severityRank[left] >= severityRank[right] ? left : right;
}

function chooseBetterConfidence(
  left?: Finding['confidence'],
  right?: Finding['confidence'],
): Finding['confidence'] | undefined {
  if (!left) return right;
  if (!right) return left;
  return confidenceRank[left] >= confidenceRank[right] ? left : right;
}

function normalizeTitle(title: string): string {
  return title.trim().toLowerCase();
}

function buildFindingKey(finding: Finding): string {
  const firstEvidence = finding.evidence[0]?.trim().toLowerCase() ?? 'no-evidence';
  return [finding.category, finding.target, normalizeTitle(finding.title), firstEvidence].join('::');
}

export function normalizeFindings(findings: Finding[]): Finding[] {
  const map = new Map<string, Finding>();

  for (const finding of findings) {
    const key = buildFindingKey(finding);
    const existing = map.get(key);

    if (!existing) {
      map.set(key, finding);
      continue;
    }

    map.set(key, {
      ...existing,
      severity: chooseBetterSeverity(existing.severity, finding.severity),
      confidence: chooseBetterConfidence(existing.confidence, finding.confidence),
      evidence: mergeEvidence(existing.evidence, finding.evidence),
      references: existing.references || finding.references
        ? [...new Set([...(existing.references ?? []), ...(finding.references ?? [])])]
        : undefined,
    });
  }

  return [...map.values()].sort((left, right) => {
    const severityDiff = severityRank[right.severity] - severityRank[left.severity];
    if (severityDiff !== 0) return severityDiff;
    return left.title.localeCompare(right.title);
  });
}
