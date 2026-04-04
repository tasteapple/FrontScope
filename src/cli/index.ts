import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  collectAsset,
  collectRedirects,
  collectResponseSnapshot,
  collectHtmlDocument,
} from '../collectors';
import { assembleStaticScanResult, buildTargetMetadata } from '../core';
import { extractAssetCandidates } from '../extractors';
import { renderJsonReport, renderMarkdownReport } from '../report';
import type { ScanInput } from '../models';
import { fetchWithMetadata } from '../utils';

function buildDefaultScanInput(targetUrl: string): ScanInput {
  return {
    targetUrl,
    scanMode: 'static',
    followRedirects: true,
    enableBrowserCollection: false,
    outputFormats: ['json', 'markdown'],
    timeoutMs: 10000,
  };
}

async function main(): Promise<void> {
  const targetUrl = process.argv[2];

  if (!targetUrl) {
    console.error('Usage: frontscope <url>');
    process.exit(1);
  }

  const input = buildDefaultScanInput(targetUrl);
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
  const assetCandidates = extractAssetCandidates(
    htmlDocument.html,
    fetchResult.finalUrl,
  );
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

  const result = assembleStaticScanResult({
    input,
    metadata,
    redirects,
    response,
    assets,
    errors: [],
  });

  const outputDir = join(process.cwd(), 'reports');
  mkdirSync(outputDir, { recursive: true });

  writeFileSync(join(outputDir, 'report.json'), renderJsonReport(result), 'utf8');
  writeFileSync(join(outputDir, 'report.md'), renderMarkdownReport(result), 'utf8');

  console.log(`FrontScope report generated in ${outputDir}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`FrontScope scan failed: ${message}`);
  process.exit(1);
});
