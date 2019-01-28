import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appViewReference]'
})
export class ViewReferenceDirective {

  constructor(public viewContainerReference: ViewContainerRef) { }

}
