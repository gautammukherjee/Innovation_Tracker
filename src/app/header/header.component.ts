import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  result: any;
  constructor(private router: Router, private _activatedRoute: ActivatedRoute) {
    this.result = JSON.parse(sessionStorage.getItem('currentUser'));

    console.log("currentUser: ", this.result);
  }

  ngOnInit(): void {
    var sessVal = sessionStorage.getItem('currentUser');
    if (sessVal == null) {
      this.router.navigate(['login']);
    }
  }

}
