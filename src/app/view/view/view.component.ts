import { Component, OnInit } from '@angular/core';
import { PlanogramService } from 'src/app/services/planogram.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  host: {
    class: 'full-size',
  }
})
export class ViewComponent implements OnInit {

  viewLinks = [
    {link: '/landing', name: 'Home'},
    {link: './layout', name: 'Layout'},
  ];
  activeLink = './layout';
  constructor(public planoService: PlanogramService,
    private router: Router) { }

  ngOnInit() {
    this.router.navigate(['view', this.activeLink.slice(2)]);
  }

}
