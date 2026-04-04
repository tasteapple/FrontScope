import type { ScanResult } from '../models';

export function renderJsonReport(result: ScanResult): string {
  return JSON.stringify(result, null, 2);
}
