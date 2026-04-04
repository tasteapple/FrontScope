export type AssetType =
  | 'script'
  | 'stylesheet'
  | 'image'
  | 'iframe'
  | 'manifest'
  | 'font'
  | 'xhr'
  | 'fetch'
  | 'websocket'
  | 'other';

export interface CollectedAsset {
  url: string;
  type: AssetType;
  source: string;
  isThirdParty: boolean;
  integrity?: string;
  attributes?: Record<string, string>;
}

export type ExposureIndicatorKind =
  | 'api-endpoint'
  | 'token-like-string'
  | 'internal-hostname'
  | 'localhost-reference'
  | 'framework-config'
  | 'storage-key'
  | 'sourcemap-reference'
  | 'third-party-service-id';

export interface ExposureIndicator {
  kind: ExposureIndicatorKind;
  value: string;
  location: string;
  sourceAsset?: string;
  confidence?: number;
  notes?: string;
}
