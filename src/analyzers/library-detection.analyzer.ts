import type { AssetContent, LibraryDetection } from '../models';

function detectJquery(asset: AssetContent): LibraryDetection[] {
  const findings: LibraryDetection[] = [];
  const urlMatch = asset.url.match(/jquery[-.]((\d+\.)+\d+)(?:\.min)?\.js/i);
  const bodyMatch = asset.body.match(/jQuery v((\d+\.)+\d+)/i);
  const version = urlMatch?.[1] ?? bodyMatch?.[1];

  if (version) {
    findings.push({
      name: 'jquery',
      version,
      sourceAsset: asset.url,
      evidence: [`Asset URL: ${asset.url}`, `Detected version: ${version}`],
      confidence: urlMatch ? 'high' : 'medium',
    });
  }

  return findings;
}

function detectJson2(asset: AssetContent): LibraryDetection[] {
  if (!/json2\.js/i.test(asset.url) && !/json2/i.test(asset.body)) {
    return [];
  }

  return [
    {
      name: 'json2',
      version: 'legacy',
      sourceAsset: asset.url,
      evidence: [`Asset URL: ${asset.url}`, 'Matched legacy JSON2 signature'],
      confidence: 'medium',
    },
  ];
}

export function detectLibraries(assetContents: AssetContent[]): LibraryDetection[] {
  const detections: LibraryDetection[] = [];

  for (const asset of assetContents) {
    detections.push(...detectJquery(asset));
    detections.push(...detectJson2(asset));
  }

  return detections;
}
