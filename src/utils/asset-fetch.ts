import type { AssetContent, CollectedAsset } from '../models';
import { collectAssetContent } from '../collectors';
import { fetchWithMetadata } from './http';

export async function fetchScriptAssetContents(
  assets: CollectedAsset[],
): Promise<AssetContent[]> {
  const scriptAssets = assets.filter((asset) => asset.type === 'script');
  const results: AssetContent[] = [];

  for (const asset of scriptAssets) {
    try {
      const response = await fetchWithMetadata(asset.url);
      results.push(
        collectAssetContent(
          asset.url,
          response.body,
          response.contentType,
        ),
      );
    } catch {
      // Ignore individual asset fetch failures in MVP+ mode.
    }
  }

  return results;
}
