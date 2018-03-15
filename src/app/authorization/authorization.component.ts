import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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


  username: string = "";
  password: string = "";
  webtok: string = "";

  constructor( private router: Router, private userService: UserService) { }

  ngOnInit() {
    }

  loggining(){

    this.userService.verifyUser(this.username, this.password)
      .subscribe((token)=>{
          localStorage.setItem('token', token);
          this.userService.findUser(this.username, this.password)
          .subscribe((user)=>
          {
          this.router.navigate(['/list/', user.id]);
        })
    });
  }

}
