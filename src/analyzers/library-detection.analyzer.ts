import type { AssetContent, LibraryDetection } from '../models';

function createDetection(
  name: string,
  version: string | undefined,
  asset: AssetContent,
  evidence: string[],
  confidence: LibraryDetection['confidence'],
): LibraryDetection[] {
  if (!version) {
    return [];
  }

  return [
    {
      name,
      version,
      sourceAsset: asset.url,
      evidence,
      confidence,
    },
  ];
}

function detectJquery(asset: AssetContent): LibraryDetection[] {
  const urlMatch = asset.url.match(/jquery[-.]((\d+\.)+\d+)(?:\.min)?\.js/i);
  const bodyMatch = asset.body.match(/jQuery v((\d+\.)+\d+)/i);
  const version = urlMatch?.[1] ?? bodyMatch?.[1];

  return createDetection(
    'jquery',
    version,
    asset,
    [`Asset URL: ${asset.url}`, `Detected version: ${version}`],
    urlMatch ? 'high' : 'medium',
  );
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

function detectAxios(asset: AssetContent): LibraryDetection[] {
  const urlMatch = asset.url.match(/axios(?:[-.]((\d+\.)+\d+))?(?:\.min)?\.js/i);
  const bodyMatch = asset.body.match(/axios(?:\.version|\s*=\s*|@)((\d+\.)+\d+)/i);
  const version = urlMatch?.[1] ?? bodyMatch?.[1];

  return createDetection(
    'axios',
    version,
    asset,
    [`Asset URL: ${asset.url}`, `Detected version: ${version}`],
    urlMatch ? 'high' : 'medium',
  );
}

function detectLodash(asset: AssetContent): LibraryDetection[] {
  const urlMatch = asset.url.match(/lodash(?:\.min)?[-.]((\d+\.)+\d+)\.js/i);
  const bodyMatch = asset.body.match(/lodash(?:\.VERSION|\s*=\s*|@)((\d+\.)+\d+)/i);
  const version = urlMatch?.[1] ?? bodyMatch?.[1];

  return createDetection(
    'lodash',
    version,
    asset,
    [`Asset URL: ${asset.url}`, `Detected version: ${version}`],
    urlMatch ? 'high' : 'medium',
  );
}

function detectBootstrap(asset: AssetContent): LibraryDetection[] {
  const urlMatch = asset.url.match(/bootstrap(?:\.bundle)?(?:\.min)?[-.]((\d+\.)+\d+)\.js/i);
  const bodyMatch = asset.body.match(/Bootstrap(?:\s+v|\s*=\s*|@)((\d+\.)+\d+)/i);
  const version = urlMatch?.[1] ?? bodyMatch?.[1];

  return createDetection(
    'bootstrap',
    version,
    asset,
    [`Asset URL: ${asset.url}`, `Detected version: ${version}`],
    urlMatch ? 'high' : 'medium',
  );
}

function detectMoment(asset: AssetContent): LibraryDetection[] {
  const urlMatch = asset.url.match(/moment(?:\.min)?[-.]((\d+\.)+\d+)\.js/i);
  const bodyMatch = asset.body.match(/moment(?:\.version|\s*=\s*|@)((\d+\.)+\d+)/i);
  const version = urlMatch?.[1] ?? bodyMatch?.[1];

  return createDetection(
    'moment',
    version,
    asset,
    [`Asset URL: ${asset.url}`, `Detected version: ${version}`],
    urlMatch ? 'high' : 'medium',
  );
}

function detectVue(asset: AssetContent): LibraryDetection[] {
  const bodyMatch = asset.body.match(/Vue(?:\.version|\s*=\s*|@)((\d+\.)+\d+)/i);
  return createDetection(
    'vue',
    bodyMatch?.[1],
    asset,
    [`Asset URL: ${asset.url}`, `Detected version: ${bodyMatch?.[1]}`],
    'medium',
  );
}

function detectReact(asset: AssetContent): LibraryDetection[] {
  const bodyMatch = asset.body.match(/React(?:\.version|\s*=\s*|@)((\d+\.)+\d+)/i);
  return createDetection(
    'react',
    bodyMatch?.[1],
    asset,
    [`Asset URL: ${asset.url}`, `Detected version: ${bodyMatch?.[1]}`],
    'medium',
  );
}

function detectAngular(asset: AssetContent): LibraryDetection[] {
  const bodyMatch = asset.body.match(/Angular(?:\s+v|\.version|\s*=\s*|@)((\d+\.)+\d+)/i);
  return createDetection(
    'angular',
    bodyMatch?.[1],
    asset,
    [`Asset URL: ${asset.url}`, `Detected version: ${bodyMatch?.[1]}`],
    'medium',
  );
}

export function detectLibraries(assetContents: AssetContent[]): LibraryDetection[] {
  const detections: LibraryDetection[] = [];

  for (const asset of assetContents) {
    detections.push(...detectJquery(asset));
    detections.push(...detectJson2(asset));
    detections.push(...detectAxios(asset));
    detections.push(...detectLodash(asset));
    detections.push(...detectBootstrap(asset));
    detections.push(...detectMoment(asset));
    detections.push(...detectVue(asset));
    detections.push(...detectReact(asset));
    detections.push(...detectAngular(asset));
  }

  return detections;
}
