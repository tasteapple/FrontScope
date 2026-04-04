import type { ScanInput, TargetMetadata } from '../models';

export function buildTargetMetadata(input: ScanInput): TargetMetadata {
  const parsedUrl = new URL(input.targetUrl);

  return {
    originalUrl: input.targetUrl,
    normalizedUrl: parsedUrl.toString(),
    scheme: parsedUrl.protocol.replace(':', ''),
    hostname: parsedUrl.hostname,
    port: parsedUrl.port ? Number(parsedUrl.port) : undefined,
    origin: parsedUrl.origin,
    scanStartedAt: new Date().toISOString(),
  };
}
