
// Note : All the globally used Directives, services, pipes, components should be included here.

//All the shared services are placed here and all are individually provided in root in their respective files

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LlHttpModule } from './http/ll-http.module';
import { CommonModule } from '@angular/common';


import {LlPageNotFoundPageComponent} from './ll-page-not-found/ll-page-not-found-page.component';

@NgModule({
  declarations: [LlPageNotFoundPageComponent],
  imports: [RouterModule, LlHttpModule, CommonModule],
  exports: [LlPageNotFoundPageComponent, CommonModule, LlHttpModule],
  entryComponents: [],
})
export class SharedModule {}
