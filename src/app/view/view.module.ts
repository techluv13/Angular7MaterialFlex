import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { DynamicHostComponent } from './dynamic-host/dynamic-host.component';
import { ViewReferenceDirective } from './view-reference.directive';
import { ChildOneComponent } from './child-one/child-one.component';
import { ChildTwoComponent } from './child-two/child-two.component';

@NgModule({
  declarations: [ViewComponent, LayoutComponent, DynamicHostComponent, ViewReferenceDirective, ChildOneComponent, ChildTwoComponent],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule
  ],
  entryComponents: [
    ChildOneComponent,
    ChildTwoComponent
  ]
})
export class ViewModule { }
