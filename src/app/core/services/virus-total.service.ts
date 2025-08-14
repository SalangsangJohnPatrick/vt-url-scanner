import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ScanResult } from '../models/scan-result.model';

@Injectable({ providedIn: 'root' })
export class VirusTotalService {
  private readonly BASE_URL = 'https://58bc553f-a464-476a-a4d3-82fa9e71f054-00-3n85zw916lk96.sisko.replit.dev';
  private scanResultSubject = new BehaviorSubject<ScanResult | null>(null);

  scanResult$: Observable<ScanResult | null> = this.scanResultSubject.asObservable();

  constructor(private http: HttpClient) { }

  scanUrl(url: string): Observable<ScanResult> {
    return this.http.post<{ data: { id: string } }>(`${this.BASE_URL}/scan-url`, { url })
      .pipe(
        switchMap(res => {
          const analysisId = res.data.id;
          console.log(`Scan initiated with ID: ${analysisId}`)
          return this.fetchScanAnalysisById(analysisId);
        }),
        catchError(err => throwError(() => err))
      );
  }

  private fetchScanAnalysisById(analysisId: string): Observable<ScanResult> {
    return this.http.get<ScanResult>(`${this.BASE_URL}/url-analysis/${analysisId}`)
      .pipe(
        tap(result => this.scanResultSubject.next(result)),
        catchError(err => throwError(() => err))
      );
  }

}

