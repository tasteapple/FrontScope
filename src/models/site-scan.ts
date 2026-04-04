import type { ScanResult } from './result';

export interface SiteScanResult {
  entryUrl: string;
  scannedPages: ScanResult[];
  totalPages: number;
}
