import type { Finding, LibraryAdvisory, LibraryDetection } from '../models';
import {
  fetchRemoteAdvisories,
  loadCachedRemoteAdvisories,
  loadLocalAdvisories,
  matchesAffectedRange,
} from '../utils';

function findMatchingAdvisories(
  detection: LibraryDetection,
  advisories: LibraryAdvisory[],
): LibraryAdvisory[] {
  if (!detection.version) {
    return [];
  }

  return advisories.filter((advisory) => {
    const exactMatch = advisory.affectedVersions.some((version) => version === detection.version);
    const rangeMatch = (advisory.affectedRanges ?? []).some((range) =>
      matchesAffectedRange(detection.version!, range),
    );

    return exactMatch || rangeMatch;
  });
}

export async function mapLibraryDetectionsToFindings(
  detections: LibraryDetection[],
): Promise<Finding[]> {
  const findings: Finding[] = [];

  for (const detection of detections) {
    const localAdvisories = loadLocalAdvisories(detection.name);
    const cachedRemoteAdvisories = loadCachedRemoteAdvisories(detection.name);
    const localMatches = findMatchingAdvisories(detection, localAdvisories);
    const cachedMatches = findMatchingAdvisories(detection, cachedRemoteAdvisories);

    let effectiveMatches = [...localMatches, ...cachedMatches];
    let sourceLabel = localMatches.length
      ? 'local'
      : cachedMatches.length
        ? 'remote-cache'
        : 'none';

    if (!effectiveMatches.length) {
      const remoteAdvisories = await fetchRemoteAdvisories(detection.name).catch(() => []);
      const remoteMatches = findMatchingAdvisories(detection, remoteAdvisories);
      if (remoteMatches.length) {
        effectiveMatches = remoteMatches;
        sourceLabel = 'remote-live';
      }
    }

    if (effectiveMatches.length) {
      for (const advisory of effectiveMatches) {
        findings.push({
          id: `library-advisory:${detection.name}:${detection.version}:${advisory.advisoryId}`,
          title: `Library advisory match: ${detection.name} ${detection.version}`,
          severity: advisory.severity,
          category: 'javascript',
          target: detection.sourceAsset,
          description: `${advisory.title}. ${advisory.summary}`,
          evidence: [
            ...detection.evidence,
            `Advisory ID: ${advisory.advisoryId}`,
            `Affected versions: ${advisory.affectedVersions.join(', ') || 'none'}`,
            `Affected ranges: ${advisory.affectedRanges?.join(', ') || 'none'}`,
            `Advisory source: ${sourceLabel}`,
            `Confidence: ${detection.confidence}`,
          ],
          recommendation: 'Review the detected library version against current supported releases and upgrade guidance.',
          confidence: sourceLabel === 'remote-live' ? 'validated' : 'matched',
          references: advisory.references,
        });
      }

      continue;
    }

    findings.push({
      id: `library-detected:${detection.name}:${detection.version ?? 'unknown'}:${detection.sourceAsset}`,
      title: `Library detected without advisory mapping: ${detection.name}${detection.version ? ` ${detection.version}` : ''}`,
      severity: 'low',
      category: 'javascript',
      target: detection.sourceAsset,
      description: 'A library was detected in fetched JavaScript, but no advisory mapping matched the detected version in local or remote sources.',
      evidence: [...detection.evidence, `Confidence: ${detection.confidence}`],
      recommendation: 'Expand advisory coverage or add a stronger detector/mapping rule for this library/version.',
      confidence: 'heuristic',
    });
  }

  return findings;
}
