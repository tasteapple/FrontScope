export interface ScanInput {
  targetUrl: string;
  scanMode: 'static' | 'hybrid';
  followRedirects: boolean;
  enableBrowserCollection: boolean;
  outputFormats: Array<'json' | 'markdown' | 'html'>;
  timeoutMs: number;
}

export interface TargetMetadata {
  originalUrl: string;
  normalizedUrl: string;
  scheme: string;
  hostname: string;
  port?: number;
  origin: string;
  scanStartedAt: string;
}

export interface RedirectEntry {
  fromUrl: string;
  toUrl: string;
  statusCode: number;
  locationHeader?: string;
}

export interface ResponseSnapshot {
  finalUrl: string;
  statusCode: number;
  headers: Record<string, string | string[]>;
  contentType?: string;
  bodyLength?: number;
  html?: string;
}

export interface ScanSummary {
  totalFindings: number;
  severityCounts: Record<'info' | 'low' | 'medium' | 'high', number>;
  assetCounts: Record<string, number>;
  thirdPartyDomainCount: number;
  redirectCount: number;
  score?: number;
}
