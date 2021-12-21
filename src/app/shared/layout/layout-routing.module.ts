import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
// import { AuthGuard } from 'src/app/interceptor/auth.guard';
import { LayoutComponent } from './layout.component';

const layoutRoutes: Routes = [
  {path:'',component:LayoutComponent },
  {
    path: 'nguoi-dung',
    component: LayoutComponent,
    loadChildren: () =>
      import('@features/table/config-user-table/config-user-table.module').then(
        (m) => m.ConfigUserTableModule
      ),
  },
  {
    path: 'thong-ke',
    component: LayoutComponent,
    loadChildren: () =>
      import('@features/table/statistic-table/statistic-table.module').then(
        (m) => m.StatisticTableModule
      ),
  },
  {
    path: 'bao-cao',
    component: LayoutComponent,
    loadChildren: () =>
      import('@features/table/report-table/report-routing.module').then(
        (m) => m.reportTableRoutingModule
      ),
  },
  {
    path: '**',
    redirectTo: 'nguoi-dung',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(layoutRoutes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
