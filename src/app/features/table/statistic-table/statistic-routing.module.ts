import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticTableComponent } from './statistic-table.component';

const statisticTableRoutes: Routes = [
  { path: '', component: StatisticTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(statisticTableRoutes)],
  exports: [RouterModule],
})
export class statisticTableRoutingModule {}
