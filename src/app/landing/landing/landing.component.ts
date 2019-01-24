import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  host: {
    class: 'full-width'
  }
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
