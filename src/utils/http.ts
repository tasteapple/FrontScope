export interface HttpFetchResult {
  originalUrl: string;
  finalUrl: string;
  statusCode: number;
  headers: Record<string, string | string[]>;
  body: string;
  contentType?: string;
  redirectChain: Array<{
    fromUrl: string;
    toUrl: string;
    statusCode: number;
    locationHeader?: string;
  }>;
}

function headersToObject(headers: Headers): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {};

  headers.forEach((value, key) => {
    if (key in result) {
      const current = result[key];
      result[key] = Array.isArray(current) ? [...current, value] : [current, value];
    } else {
      result[key] = value;
    }
  });

  return result;
}

export async function fetchWithMetadata(url: string): Promise<HttpFetchResult> {
  const redirectChain: HttpFetchResult['redirectChain'] = [];
  let currentUrl = url;
  let redirectCount = 0;

  while (redirectCount < 10) {
    const response = await fetch(currentUrl, {
      method: 'GET',
      redirect: 'manual',
    });

    const locationHeader = response.headers.get('location') ?? undefined;

    if (
      response.status >= 300 &&
      response.status < 400 &&
      locationHeader
    ) {
      const nextUrl = new URL(locationHeader, currentUrl).toString();
      redirectChain.push({
        fromUrl: currentUrl,
        toUrl: nextUrl,
        statusCode: response.status,
        locationHeader,
      });
      currentUrl = nextUrl;
      redirectCount += 1;
      continue;
    }

    const body = await response.text();

    return {
      originalUrl: url,
      finalUrl: currentUrl,
      statusCode: response.status,
      headers: headersToObject(response.headers),
      body,
      contentType: response.headers.get('content-type') ?? undefined,
      redirectChain,
    };
  }

  throw new Error('Too many redirects encountered during static fetch.');
}
