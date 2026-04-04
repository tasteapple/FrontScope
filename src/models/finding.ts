export type FindingSeverity = 'info' | 'low' | 'medium' | 'high';

export type FindingCategory =
  | 'headers'
  | 'cookies'
  | 'csp'
  | 'sourcemap'
  | 'javascript'
  | 'third-party'
  | 'storage'
  | 'configuration'
  | 'exposure'
  | 'xss'
  | 'endpoint'
  | 'sqli-risk'
  | 'input-handling'
  | 'dom';

export type FindingConfidence = 'heuristic' | 'matched' | 'validated';

export interface Finding {
  id: string;
  title: string;
  severity: FindingSeverity;
  category: FindingCategory;
  target: string;
  description: string;
  evidence: string[];
  recommendation: string;
  confidence?: FindingConfidence;
  references?: string[];
}
