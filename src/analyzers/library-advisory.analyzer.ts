import type { Finding, LibraryAdvisory, LibraryDetection } from '../models';
import { loadLocalAdvisories } from '../utils';

function findMatchingAdvisories(
  detection: LibraryDetection,
  advisories: LibraryAdvisory[],
): LibraryAdvisory[] {
  if (!detection.version) {
    return [];
  }

  return advisories.filter((advisory) =>
    advisory.affectedVersions.some((version) => version === detection.version),
  );
}

export function mapLibraryDetectionsToFindings(
  detections: LibraryDetection[],
): Finding[] {
  const findings: Finding[] = [];

  for (const detection of detections) {
    const advisories = loadLocalAdvisories(detection.name);
    const matches = findMatchingAdvisories(detection, advisories);

    if (matches.length) {
      for (const advisory of matches) {
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
            `Confidence: ${detection.confidence}`,
          ],
          recommendation: 'Review the detected library version against current supported releases and upgrade guidance.',
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
      description: 'A library was detected in fetched JavaScript, but no local advisory mapping matched the detected version.',
      evidence: [...detection.evidence, `Confidence: ${detection.confidence}`],
      recommendation: 'Add or fetch advisory metadata for this library/version to improve version-aware security assessment.',
    });
  }

  return findings;
}
