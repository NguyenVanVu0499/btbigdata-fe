import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from 'src/app/interceptor/auth.guard';
import { LayoutComponent } from './layout.component';
const layoutRoutes: Routes = [
{path:'',component:LayoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(layoutRoutes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
