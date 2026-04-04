import { analyzeExposureIndicators, analyzeSecurityHeaders, analyzeSourcemapExposure } from '../analyzers';
import type {
  CollectedAsset,
  RedirectEntry,
  ResponseSnapshot,
  ScanInput,
  ScanResult,
  ScanSummary,
  TargetMetadata,
} from '../models';

export interface StaticScanAssemblyInput {
  input: ScanInput;
  metadata: TargetMetadata;
  redirects?: RedirectEntry[];
  response?: ResponseSnapshot;
  assets?: CollectedAsset[];
  errors?: string[];
}

function createEmptySummary(
  redirects: RedirectEntry[],
  assets: CollectedAsset[],
): ScanSummary {
  const assetCounts = assets.reduce<Record<string, number>>((acc, asset) => {
    acc[asset.type] = (acc[asset.type] ?? 0) + 1;
    return acc;
  }, {});

  const thirdPartyDomainCount = new Set(
    assets.filter((asset) => asset.isThirdParty).map((asset) => {
      try {
        return new URL(asset.url).hostname;
      } catch {
        return asset.url;
      }
    }),
  ).size;

  return {
    totalFindings: 0,
    severityCounts: {
      info: 0,
      low: 0,
      medium: 0,
      high: 0,
    },
    assetCounts,
    thirdPartyDomainCount,
    redirectCount: redirects.length,
  };
}

export function assembleStaticScanResult(
  assembly: StaticScanAssemblyInput,
): ScanResult {
  const redirects = assembly.redirects ?? [];
  const assets = assembly.assets ?? [];
  const errors = assembly.errors ?? [];
  const headerFindings = analyzeSecurityHeaders(assembly.response);
  const sourcemapFindings = analyzeSourcemapExposure(assembly.response);
  const indicators = analyzeExposureIndicators(assembly.response);
  const findings = [...headerFindings, ...sourcemapFindings];

  return {
    metadata: assembly.metadata,
    redirects,
    response: assembly.response,
    assets,
    browser: null,
    indicators,
    findings,
    summary: {
      ...createEmptySummary(redirects, assets),
      totalFindings: findings.length,
      severityCounts: findings.reduce(
        (acc, finding) => {
          acc[finding.severity] += 1;
          return acc;
        },
        {
          info: 0,
          low: 0,
          medium: 0,
          high: 0,
        },
      ),
    },
    errors,
  };
}
