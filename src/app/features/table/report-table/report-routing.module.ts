import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportTableComponent } from './report-table.component';

const reportTableRoutes: Routes = [
  { path: '', component: ReportTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(reportTableRoutes)],
  exports: [RouterModule],
})
export class reportTableRoutingModule {}
