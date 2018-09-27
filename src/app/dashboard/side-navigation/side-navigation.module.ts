import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationComponent } from './side-navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule, MatButtonModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [SideNavigationComponent],
  exports: [SideNavigationComponent]
})
export class SideNavigationModule { }
