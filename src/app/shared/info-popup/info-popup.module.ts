import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoPopupComponent } from './info-popup.component';
import { MatDialogModule, MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [InfoPopupComponent],
  exports: [InfoPopupComponent]
})
export class InfoPopupModule { }
