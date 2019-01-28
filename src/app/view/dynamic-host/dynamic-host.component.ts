import { Component, OnInit, ViewChild, AfterViewInit, ComponentFactoryResolver, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ViewReferenceDirective } from '../view-reference.directive';

@Component({
  selector: 'app-dynamic-host',
  templateUrl: './dynamic-host.component.html',
  styleUrls: ['./dynamic-host.component.scss']
})
export class DynamicHostComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(ViewReferenceDirective) dynamicComponentHost: ViewReferenceDirective;
  @Input() dynamicComponent: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('Reference is: ', this.dynamicComponentHost);
    this.insertDynamicComponent(this.dynamicComponent);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if ('dynamicComponent' in simpleChanges) {
      this.insertDynamicComponent(this.dynamicComponent);
    }
  }

  insertDynamicComponent(dynamicComponent: any) {
    if (dynamicComponent && this.dynamicComponentHost) {
      const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent);
      const viewContainerRef = this.dynamicComponentHost.viewContainerReference;
      viewContainerRef.clear();
      viewContainerRef.createComponent(dynamicComponentFactory);
    }
  }

}
