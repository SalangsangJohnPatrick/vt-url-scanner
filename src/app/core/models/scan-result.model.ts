import { EngineResult } from './engine-result.model'

export interface ScanStats {
  harmless: number;
  undetected: number;
  suspicious: number;
  malicious: number;
}

export interface ScanResult {
  data: {
    attributes: {
      stats: ScanStats;
      results: Record<string, EngineResult>;
      date: number;
    }
  },
  meta: {
    url_info: {
      url: string;
    }
  }
}