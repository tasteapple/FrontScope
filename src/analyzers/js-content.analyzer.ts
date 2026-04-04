import type { AssetContent, ExposureIndicator, Finding } from '../models';

const JS_SOURCE_PATTERNS: Array<{ name: string; regex: RegExp }> = [
  { name: 'location.search', regex: /location\.search/g },
  { name: 'location.hash', regex: /location\.hash/g },
  { name: 'document.cookie', regex: /document\.cookie/g },
  { name: 'document.referrer', regex: /document\.referrer/g },
];

const JS_SINK_PATTERNS: Array<{ name: string; regex: RegExp; severity: 'low' | 'medium' }> = [
  { name: 'innerHTML', regex: /innerHTML/g, severity: 'low' },
  { name: 'document.write', regex: /document\.write/g, severity: 'low' },
  { name: 'eval', regex: /\beval\s*\(/g, severity: 'medium' },
  { name: 'new Function', regex: /new\s+Function\s*\(/g, severity: 'medium' },
];

const SECRET_PATTERNS: Array<{ kind: ExposureIndicator['kind']; regex: RegExp }> = [
  { kind: 'token-like-string', regex: /\b(?:api[_-]?key|token|secret|bearer|jwt)\b/gi },
  { kind: 'third-party-service-id', regex: /\b(?:sentry|firebase|stripe)\b/gi },
  { kind: 'localhost-reference', regex: /\blocalhost(?::\d+)?\b/gi },
  { kind: 'internal-hostname', regex: /\b[a-z0-9-]+\.(internal|corp|local)\b/gi },
  { kind: 'api-endpoint', regex: /https?:\/\/[^\s"'`]+/gi },
];

export function analyzeJavaScriptContents(assetContents: AssetContent[]): Finding[] {
  const findings: Finding[] = [];

  for (const asset of assetContents) {
    for (const source of JS_SOURCE_PATTERNS) {
      if (source.regex.test(asset.body)) {
        findings.push({
          id: `js-source:${asset.url}:${source.name}`,
          title: `Potential JS source detected in script: ${source.name}`,
          severity: 'low',
          category: 'xss',
          target: asset.url,
          description: `A DOM-controlled source (${source.name}) was found in fetched JavaScript.`,
          evidence: [`Script: ${asset.url}`, `Source: ${source.name}`],
          recommendation: 'Review whether this source reaches dangerous sinks without sanitization.',
        });
      }
    }

    for (const sink of JS_SINK_PATTERNS) {
      if (sink.regex.test(asset.body)) {
        findings.push({
          id: `js-sink:${asset.url}:${sink.name}`,
          title: `Potential JS sink detected in script: ${sink.name}`,
          severity: sink.severity,
          category: 'xss',
          target: asset.url,
          description: `A potentially dangerous sink (${sink.name}) was found in fetched JavaScript.`,
          evidence: [`Script: ${asset.url}`, `Sink: ${sink.name}`],
          recommendation: 'Review whether attacker-controlled input can flow into this sink.',
        });
      }
    }

    if (/jquery-1\.10\.2(\.min)?\.js/i.test(asset.url)) {
      findings.push({
        id: `js-library:jquery-1.10.2:${asset.url}`,
        title: 'Outdated jQuery version detected',
        severity: 'medium',
        category: 'javascript',
        target: asset.url,
        description: 'The fetched JavaScript asset appears to use jQuery 1.10.2, which is an old version and should be reviewed for known issues and upgrade planning.',
        evidence: [`Asset URL: ${asset.url}`],
        recommendation: 'Review jQuery usage and migrate to a modern supported version if feasible.',
      });
    }
  }

  return findings;
}

export function extractJavaScriptIndicators(assetContents: AssetContent[]): ExposureIndicator[] {
  const indicators: ExposureIndicator[] = [];

  for (const asset of assetContents) {
    for (const rule of SECRET_PATTERNS) {
      const matches = asset.body.match(rule.regex) ?? [];
      for (const match of matches.slice(0, 20)) {
        indicators.push({
          kind: rule.kind,
          value: match,
          location: asset.url,
          sourceAsset: asset.url,
          confidence: 0.5,
          notes: 'Detected from fetched JavaScript asset.',
        });
      }
    }
  }

  return indicators;
}
