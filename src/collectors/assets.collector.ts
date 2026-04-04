import type { AssetType, CollectedAsset } from '../models';

export interface AssetCollectorInput {
  url: string;
  type: AssetType;
  source: string;
  pageOrigin: string;
  integrity?: string;
  attributes?: Record<string, string>;
}

function isThirdPartyAsset(assetUrl: string, pageOrigin: string): boolean {
  try {
    return new URL(assetUrl).origin !== new URL(pageOrigin).origin;
  } catch {
    return false;
  }
}

export function collectAsset(input: AssetCollectorInput): CollectedAsset {
  return {
    url: input.url,
    type: input.type,
    source: input.source,
    isThirdParty: isThirdPartyAsset(input.url, input.pageOrigin),
    integrity: input.integrity,
    attributes: input.attributes,
  };
}

export function collectAssets(inputs: AssetCollectorInput[]): CollectedAsset[] {
  return inputs.map(collectAsset);
}
