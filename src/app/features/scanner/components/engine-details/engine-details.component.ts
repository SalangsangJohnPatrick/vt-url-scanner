import { Component, Input } from '@angular/core';
import { EngineResult } from '../../../../core/models/engine-result.model';

@Component({
  selector: 'app-engine-details',
  templateUrl: './engine-details.component.html',
  styleUrls: ['./engine-details.component.css']
})
export class EngineDetailsComponent {
  @Input() engines!: Record<string, EngineResult>;

  isCollapsed = true;
}

