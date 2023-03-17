import { Component, OnInit } from '@angular/core';
import { GlobalVariableService } from './services/common/global-variable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend_v1.1';

  constructor(private globalVariableService: GlobalVariableService) {
    // this.globalVariableService.setSelectedDefaultTA([1]);
  }
  ngOnInit(): void {

  }
}
