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
  | 'exposure';

export interface Finding {
  id: string;
  title: string;
  severity: FindingSeverity;
  category: FindingCategory;
  target: string;
  description: string;
  evidence: string[];
  recommendation: string;
  references?: string[];
}
