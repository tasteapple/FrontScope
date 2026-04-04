import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { collectAsset, collectResponseSnapshot, collectHtmlDocument } from '../collectors';
import { assembleStaticScanResult, buildTargetMetadata } from '../core';
import { extractAssetCandidates } from '../extractors';
import { renderHtmlReport, renderJsonReport, renderMarkdownReport } from '../report';
import type { ScanInput } from '../models';

function buildFixtureScanInput(): ScanInput {
  return {
    targetUrl: 'https://fixture.frontscope.local/sample',
    scanMode: 'static',
    followRedirects: false,
    enableBrowserCollection: false,
    outputFormats: ['json', 'markdown'],
    timeoutMs: 10000,
  };
}

async function main(): Promise<void> {
  const fixturePath = join(process.cwd(), 'examples', 'sample-page.html');
  const html = readFileSync(fixturePath, 'utf8');
  const input = buildFixtureScanInput();
  const metadata = buildTargetMetadata(input);
  const htmlDocument = collectHtmlDocument(html);
  const response = collectResponseSnapshot(
    {
      finalUrl: input.targetUrl,
      statusCode: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
      contentType: 'text/html; charset=utf-8',
      bodyLength: htmlDocument.bodyLength,
    },
    htmlDocument.html,
  );

  const assetCandidates = extractAssetCandidates(htmlDocument.html, input.targetUrl);
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

  const result = await assembleStaticScanResult({
    input,
    metadata,
    redirects: [],
    response,
    assets,
    errors: [],
  });

  const outputDir = join(process.cwd(), 'reports');
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'smoke-report.json'), renderJsonReport(result), 'utf8');
  writeFileSync(join(outputDir, 'smoke-report.md'), renderMarkdownReport(result), 'utf8');
  writeFileSync(join(outputDir, 'smoke-report.html'), renderHtmlReport(result), 'utf8');

  console.log(`FrontScope smoke report generated in ${outputDir}`);
  console.log(`Findings: ${result.summary.totalFindings}, Assets: ${result.assets.length}, Indicators: ${result.indicators.length}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`FrontScope smoke test failed: ${message}`);
  process.exit(1);
});
