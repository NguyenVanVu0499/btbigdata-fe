import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@shared/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './interceptor/auth.guard';

const routes: Routes = [ 
  {
    path:'login', component:LoginComponent,
    loadChildren: () =>
    import('./pages/login/login.module').then(
      (m) => m.LoginModule
    )
  },
  {
  path: '',
  canActivate: [AuthGuard],
  loadChildren: () =>
    import('./shared/layout/layout.module').then((m) => m.LayoutModule),
},
{path:'**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
