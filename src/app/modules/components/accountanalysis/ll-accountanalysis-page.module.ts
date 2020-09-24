import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { llAccountAnalysisPage } from './accountanalysis-page.component';
import { LlAccountAnalysisRoutingModule } from './accountanalysis-routing.module'

@NgModule({
    declarations: [llAccountAnalysisPage],
    imports: [
        LlAccountAnalysisRoutingModule,
        RouterModule
    ]
})
export class LlAccountAnalysisModule {

}