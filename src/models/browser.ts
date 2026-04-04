import type { CollectedAsset } from './asset';

export interface BrowserRequest {
  url: string;
  method: string;
  resourceType?: string;
  statusCode?: number;
}

export interface BrowserCookie {
  name: string;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export interface BrowserConsoleMessage {
  type: string;
  text: string;
}

export interface BrowserObservation {
  networkRequests: BrowserRequest[];
  consoleMessages: BrowserConsoleMessage[];
  cookies: BrowserCookie[];
  storageKeys: string[];
  loadedAssets: CollectedAsset[];
}
