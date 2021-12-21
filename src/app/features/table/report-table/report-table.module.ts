import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTableComponent } from './report-table.component';
import { reportTableRoutingModule } from './report-routing.module';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
  PageService,
  SortService,
  SearchService,
  ToolbarService,
  EditService,
  FilterService,
  CommandColumnService,
} from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReportTableComponent],
  imports: [
    CommonModule,
    GridModule,
    reportTableRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    PageService,
    SortService,
    SearchService,
    ToolbarService,
    EditService,
    FilterService,
    CommandColumnService,
  ],
  exports: [ReportTableComponent],
})
export class StatisticTableModule {}
