import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { UserService } from '../user.service';



@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  userId: number = 0;
  username: string = "";
  password: string = "";

  constructor( private router: Router, private userService: UserService) { }

  ngOnInit() {
    }

  loggining(){
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('password', this.password);
      this.userService.findUser(this.username, this.password)
      .subscribe((user)=>{
      this.userId = user[0].id;
    this.router.navigate(['list', this.userId]);
    });
  }

}
