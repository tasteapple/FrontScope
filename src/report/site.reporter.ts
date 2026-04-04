import type { SiteScanResult } from '../models';

export function renderSiteJsonReport(result: SiteScanResult): string {
  const pageSummaries = result.scannedPages.map((page) => ({
    url: page.metadata.normalizedUrl,
    findings: page.summary.totalFindings,
    severityCounts: page.summary.severityCounts,
    indicators: page.indicators.length,
    assets: page.assets.length,
  }));

  const aggregate = result.scannedPages.reduce(
    (acc, page) => {
      acc.totalFindings += page.summary.totalFindings;
      acc.severityCounts.info += page.summary.severityCounts.info;
      acc.severityCounts.low += page.summary.severityCounts.low;
      acc.severityCounts.medium += page.summary.severityCounts.medium;
      acc.severityCounts.high += page.summary.severityCounts.high;
      for (const finding of page.findings) {
        if (finding.category === 'endpoint') acc.endpointFindings += 1;
        if (finding.category === 'javascript') acc.libraryFindings += 1;
      }
      return acc;
    },
    {
      totalFindings: 0,
      severityCounts: { info: 0, low: 0, medium: 0, high: 0 },
      endpointFindings: 0,
      libraryFindings: 0,
    },
  );

  return JSON.stringify(
    {
      entryUrl: result.entryUrl,
      totalPages: result.totalPages,
      aggregate,
      pageSummaries,
    },
    null,
    2,
  );
}
