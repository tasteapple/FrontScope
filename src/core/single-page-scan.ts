import {
  collectAsset,
  collectRedirects,
  collectResponseSnapshot,
  collectHtmlDocument,
} from '../collectors';
import { extractAssetCandidates } from '../extractors';
import type { ScanInput, ScanResult } from '../models';
import { fetchScriptAssetContents, fetchWithMetadata } from '../utils';
import { assembleStaticScanResult, buildTargetMetadata } from './index';

export async function runSinglePageScan(input: ScanInput): Promise<ScanResult> {
  const metadata = buildTargetMetadata(input);
  const fetchResult = await fetchWithMetadata(input.targetUrl);
  const htmlDocument = collectHtmlDocument(fetchResult.body);
  const redirects = collectRedirects({
    originalUrl: fetchResult.originalUrl,
    finalUrl: fetchResult.finalUrl,
    redirectChain: fetchResult.redirectChain,
  });
  const response = collectResponseSnapshot(
    {
      finalUrl: fetchResult.finalUrl,
      statusCode: fetchResult.statusCode,
      headers: fetchResult.headers,
      contentType: fetchResult.contentType,
      bodyLength: htmlDocument.bodyLength,
    },
    htmlDocument.html,
  );
  const assetCandidates = extractAssetCandidates(htmlDocument.html, fetchResult.finalUrl);
  const assets = assetCandidates.map((candidate) =>
    collectAsset({
      url: candidate.url,
      type: candidate.type,
      source: candidate.source,
      pageOrigin: metadata.origin,
      integrity: candidate.integrity,
      attributes: candidate.attributes,
    }),
  );
  const assetContents = await fetchScriptAssetContents(assets);

  return assembleStaticScanResult({
    input,
    metadata,
    redirects,
    response,
    assets,
    assetContents,
    errors: [],
  });
}
