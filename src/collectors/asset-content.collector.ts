import type { AssetContent } from '../models';

export function collectAssetContent(url: string, body: string, contentType?: string): AssetContent {
  return {
    url,
    contentType,
    body,
    bodyLength: body.length,
  };
}
