import { Component, Input } from '@angular/core';
import { ScanResult } from '../../../../core/models/scan-result.model';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent {
  @Input() result!: ScanResult;

  formatDate(date: number): string {
    return new Date(date * 1000).toLocaleString();
  }

  get totalEngines(): number {
    return Object.values(this.result.data.attributes.stats).reduce((a, b) => a + b, 0);
  }
}

