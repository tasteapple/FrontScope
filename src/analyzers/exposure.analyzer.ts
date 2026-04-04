import type { ExposureIndicator, ResponseSnapshot } from '../models';

const KEYWORD_PATTERNS: Array<{ kind: ExposureIndicator['kind']; pattern: RegExp }> = [
  { kind: 'api-endpoint', pattern: /https?:\/\/[^\s"'<>]+/gi },
  { kind: 'internal-hostname', pattern: /\b[a-z0-9-]+\.(internal|corp|local)\b/gi },
  { kind: 'localhost-reference', pattern: /\blocalhost(?::\d+)?\b/gi },
  { kind: 'token-like-string', pattern: /\b(?:api[_-]?key|token|secret|bearer|jwt)\b/gi },
  { kind: 'third-party-service-id', pattern: /\b(?:sentry|firebase|stripe)\b/gi },
];

export function analyzeExposureIndicators(
  response?: ResponseSnapshot,
): ExposureIndicator[] {
  const html = response?.html;
  if (!response || !html) {
    return [];
  }

  const indicators: ExposureIndicator[] = [];

  for (const rule of KEYWORD_PATTERNS) {
    const matches = html.match(rule.pattern) ?? [];

    for (const match of matches) {
      indicators.push({
        kind: rule.kind,
        value: match,
        location: response.finalUrl,
        confidence: 0.4,
        notes: 'Detected from static HTML pattern scan.',
      });
    }
  }

  return indicators;
}
