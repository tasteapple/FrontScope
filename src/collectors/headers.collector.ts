import type { ResponseSnapshot } from '../models';

export interface HeaderCollectorInput {
  finalUrl: string;
  statusCode: number;
  headers: Record<string, string | string[]>;
  contentType?: string;
  bodyLength?: number;
}

export function collectResponseSnapshot(
  input: HeaderCollectorInput,
  html?: string,
): ResponseSnapshot {
  return {
    finalUrl: input.finalUrl,
    statusCode: input.statusCode,
    headers: input.headers,
    contentType: input.contentType,
    bodyLength: input.bodyLength,
    html,
  };
}
