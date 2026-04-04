import type { AssetType } from '../models';

export interface ExtractedAssetCandidate {
  url: string;
  type: AssetType;
  source: string;
  integrity?: string;
  attributes?: Record<string, string>;
}

function parseAttributes(rawTag: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const attributeRegex = /(\w[\w:-]*)\s*=\s*(["'])(.*?)\2/g;

  for (const match of rawTag.matchAll(attributeRegex)) {
    const [, key, , value] = match;
    attributes[key] = value;
  }

  return attributes;
}

function resolveUrl(value: string, baseUrl: string): string {
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return value;
  }
}

export function extractAssetCandidates(
  html: string,
  baseUrl: string,
): ExtractedAssetCandidate[] {
  const candidates: ExtractedAssetCandidate[] = [];

  const patterns: Array<{
    type: AssetType;
    source: string;
    regex: RegExp;
    attribute: string;
  }> = [
    {
      type: 'script',
      source: 'script[src]',
      regex: /<script\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1[^>]*>/gi,
      attribute: 'src',
    },
    {
      type: 'stylesheet',
      source: 'link[rel=stylesheet]',
      regex: /<link\b[^>]*\brel\s*=\s*(["'])stylesheet\1[^>]*\bhref\s*=\s*(["'])(.*?)\2[^>]*>/gi,
      attribute: 'href',
    },
    {
      type: 'manifest',
      source: 'link[rel=manifest]',
      regex: /<link\b[^>]*\brel\s*=\s*(["'])manifest\1[^>]*\bhref\s*=\s*(["'])(.*?)\2[^>]*>/gi,
      attribute: 'href',
    },
    {
      type: 'image',
      source: 'img[src]',
      regex: /<img\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1[^>]*>/gi,
      attribute: 'src',
    },
    {
      type: 'iframe',
      source: 'iframe[src]',
      regex: /<iframe\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1[^>]*>/gi,
      attribute: 'src',
    },
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern.regex)) {
      const rawTag = match[0];
      const attributes = parseAttributes(rawTag);
      const rawUrl =
        pattern.attribute === 'href'
          ? (match[3] ?? attributes.href)
          : (match[2] ?? attributes.src);

      if (!rawUrl) {
        continue;
      }

      candidates.push({
        url: resolveUrl(rawUrl, baseUrl),
        type: pattern.type,
        source: pattern.source,
        integrity: attributes.integrity,
        attributes,
      });
    }
  }

  return candidates;
}
