export type DetectionConfidence = 'low' | 'medium' | 'high';

export interface LibraryDetection {
  name: string;
  version?: string;
  sourceAsset: string;
  evidence: string[];
  confidence: DetectionConfidence;
}

export interface LibraryAdvisory {
  library: string;
  advisoryId: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  affectedVersions: string[];
  affectedRanges?: string[];
  summary: string;
  references?: string[];
}
