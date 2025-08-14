import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerPageComponent } from './components/scanner-page/scanner-page.component';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { EngineDetailsComponent } from './components/engine-details/engine-details.component';
import { FormsModule } from '@angular/forms';
import { ScannerRoutingModule } from './scanner-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ScannerPageComponent,
    ResultCardComponent,
    EngineDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ScannerRoutingModule,
    FontAwesomeModule
  ]
})
export class ScannerModule { }

