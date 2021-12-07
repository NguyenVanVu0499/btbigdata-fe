import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
// import { LayoutRoutingModule } from './layout-routing.module';
import { OutsideDirective } from './outside.directive';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [LayoutComponent, OutsideDirective],
  imports: [CommonModule, LayoutRoutingModule],
  providers: [],
})
export class LayoutModule {}
