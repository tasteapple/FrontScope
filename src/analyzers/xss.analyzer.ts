import type { Finding, ResponseSnapshot } from '../models';

const SOURCE_PATTERNS: Array<{ name: string; regex: RegExp }> = [
  { name: 'location.search', regex: /location\.search/g },
  { name: 'location.hash', regex: /location\.hash/g },
  { name: 'location.href', regex: /location\.href/g },
  { name: 'document.referrer', regex: /document\.referrer/g },
  { name: 'window.name', regex: /window\.name/g },
  { name: 'postMessage', regex: /postMessage/g },
];

const SINK_PATTERNS: Array<{ name: string; regex: RegExp }> = [
  { name: 'innerHTML', regex: /innerHTML/g },
  { name: 'outerHTML', regex: /outerHTML/g },
  { name: 'document.write', regex: /document\.write/g },
  { name: 'insertAdjacentHTML', regex: /insertAdjacentHTML/g },
  { name: 'eval', regex: /\beval\s*\(/g },
  { name: 'new Function', regex: /new\s+Function\s*\(/g },
  { name: 'setTimeout(string)', regex: /setTimeout\s*\(\s*["'`]/g },
  { name: 'setInterval(string)', regex: /setInterval\s*\(\s*["'`]/g },
];

export function analyzeXssSignals(response?: ResponseSnapshot): Finding[] {
  const html = response?.html;
  if (!response || !html) {
    return [];
  }

  const findings: Finding[] = [];

  for (const source of SOURCE_PATTERNS) {
    if (source.regex.test(html)) {
      findings.push({
        id: `xss-source:${source.name}`,
        title: `Potential DOM XSS source detected: ${source.name}`,
        severity: 'low',
        category: 'xss',
        target: response.finalUrl,
        description: `A DOM-controlled input source (${source.name}) was found in client-side code.`,
        evidence: [`Detected source: ${source.name}`],
        recommendation: 'Trace whether this source is later passed into an unsafe DOM sink without proper sanitization or encoding.',
        confidence: 'heuristic',
      });
    }
  }

  for (const sink of SINK_PATTERNS) {
    if (sink.regex.test(html)) {
      findings.push({
        id: `xss-sink:${sink.name}`,
        title: `Potential DOM XSS sink detected: ${sink.name}`,
        severity: sink.name === 'eval' || sink.name === 'new Function' ? 'medium' : 'low',
        category: 'xss',
        target: response.finalUrl,
        description: `A potentially dangerous DOM/code execution sink (${sink.name}) was found in client-side code.`,
        evidence: [`Detected sink: ${sink.name}`],
        recommendation: 'Review whether attacker-controlled data can reach this sink and replace it with safer patterns where possible.',
        confidence: 'heuristic',
      });
    }
  }

  if (/on(?:click|error|load|mouseover|submit)\s*=\s*["']/gi.test(html)) {
    findings.push({
      id: 'xss-inline-handler',
      title: 'Inline event handler detected',
      severity: 'low',
      category: 'xss',
      target: response.finalUrl,
      description: 'Inline event handler attributes were found in the HTML response.',
      evidence: ['Detected inline handler pattern such as onclick= or onerror=.'],
      recommendation: 'Prefer event listeners and avoid inline handlers where possible to reduce injection surface.',
      confidence: 'heuristic',
    });
  }

  return findings;
}
