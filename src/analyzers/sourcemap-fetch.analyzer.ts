import type { AssetContent, Finding } from '../models';
import { fetchWithMetadata } from '../utils';

function extractSourcemapReference(body: string): string[] {
  const regex = /sourceMappingURL\s*=\s*([^\s*]+)/gi;
  const refs: string[] = [];

  for (const match of body.matchAll(regex)) {
    const ref = match[1]?.trim();
    if (ref) refs.push(ref);
  }

  return refs;
}

export async function analyzeFetchedSourcemaps(
  assetContents: AssetContent[],
): Promise<Finding[]> {
  const findings: Finding[] = [];

  for (const asset of assetContents) {
    const references = extractSourcemapReference(asset.body);

    for (const reference of references) {
      const sourcemapUrl = new URL(reference, asset.url).toString();

      try {
        const response = await fetchWithMetadata(sourcemapUrl);
        findings.push({
          id: `sourcemap-fetch:${sourcemapUrl}`,
          title: 'Reachable sourcemap detected',
          severity: 'medium',
          category: 'sourcemap',
          target: sourcemapUrl,
          description: 'A sourcemap reference was found in fetched JavaScript and the referenced file was reachable.',
          evidence: [
            `Source asset: ${asset.url}`,
            `Sourcemap URL: ${sourcemapUrl}`,
            `HTTP status: ${response.statusCode}`,
          ],
          recommendation: 'Avoid publishing production sourcemaps unless they are intentionally exposed and reviewed.',
        });
      } catch {
        findings.push({
          id: `sourcemap-miss:${sourcemapUrl}`,
          title: 'Sourcemap reference detected but not reachable',
          severity: 'low',
          category: 'sourcemap',
          target: asset.url,
          description: 'A sourcemap reference exists in fetched JavaScript, but the referenced file was not reachable during validation.',
          evidence: [`Source asset: ${asset.url}`, `Sourcemap URL: ${sourcemapUrl}`],
          recommendation: 'If sourcemaps are not intended for production, remove the reference to reduce accidental disclosure risk.',
        });
      }
    }
  }

  return findings;
}
