import type { CollectedAsset, ExposureIndicator } from './asset';
import type { AssetContent } from './asset-content';
import type { BrowserObservation } from './browser';
import type { Finding } from './finding';
import type {
  RedirectEntry,
  ResponseSnapshot,
  ScanSummary,
  TargetMetadata,
} from './scan';

export interface ScanResult {
  metadata: TargetMetadata;
  redirects: RedirectEntry[];
  response?: ResponseSnapshot;
  assets: CollectedAsset[];
  assetContents?: AssetContent[];
  browser?: BrowserObservation | null;
  indicators: ExposureIndicator[];
  findings: Finding[];
  summary: ScanSummary;
  errors: string[];
}
