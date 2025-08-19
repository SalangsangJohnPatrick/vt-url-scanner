import { Component, OnInit } from '@angular/core';
import { VirusTotalService } from '../../../../core/services/virus-total.service';
import { Observable } from 'rxjs';
import { ScanResult } from '../../../../core/models/scan-result.model';

@Component({
  selector: 'app-scanner-page',
  templateUrl: './scanner-page.component.html',
  styleUrls: ['./scanner-page.component.css']
})
export class ScannerPageComponent implements OnInit {
  url = '';
  loading = false;
  error: string | null = null;

  scanResult$: Observable<ScanResult | null> | undefined;

  constructor(private vtService: VirusTotalService) { }

  ngOnInit(): void {
    this.scanResult$ = this.vtService.scanResult$;
  }

  validateUrl(url: string): boolean {
    const pattern = /^https?:\/\/.+/;
    return pattern.test(url.trim());
  }

  onScan() {
    this.error = null;
    this.vtService.clearScanResult();

    if (!this.validateUrl(this.url)) {
      this.error = 'Please enter a valid URL starting with http:// or https://';
      return;
    }

    this.loading = true;
    this.vtService.scanUrl(this.url).subscribe({
      next: () => this.loading = false,
      error: err => {
        this.loading = false;
        if (err.status === 0) {
          this.error = `${err.name}: Please check your connection and try again.`;
        } else if (err.status === 400) {
          this.error = `${err.error.code}: Check the URL and try again.`;
        } else if (err.status === 403) {
          this.error = `${err.error.code}: ${err.error.message}. Please try another URL.`;
        } else {
          this.error = `${err.name}`;
        }
      }
    });
  }
}
