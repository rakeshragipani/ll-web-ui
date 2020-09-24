import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {LlHeaderPageComponent} from './ll-header-page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [LlHeaderPageComponent],
  exports: [LlHeaderPageComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatGridListModule,
    RouterModule,
  ]
})

export class LlHeaderPageModule {
}
