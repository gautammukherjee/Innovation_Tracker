import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private usersService: UsersService) {
    this.usersService.logout();

    // sessionStorage.removeItem('currentUser');
    // this.router.navigate(['index']);
  }

  ngOnInit(): void {
  }

}
