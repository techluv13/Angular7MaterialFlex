import { Component, OnInit } from '@angular/core';
import { PlanogramService } from 'src/app/services/planogram.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  host: {
    class: 'full-width'
  }
})
export class ReportComponent implements OnInit {

  constructor(public planoService: PlanogramService) { }

  ngOnInit() {
  }

}
