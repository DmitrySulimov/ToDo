import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {
  CanActivate, Router,
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

  users : User[];
  username: string = "";
  password: string = "";

  constructor( private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getUsers(); 
    }

  getUsers() : void{
    this.userService.getUsers()
    .subscribe((users)=>{
      this.users = users;
    });
  }


  loggining(){
    this.router.navigate(['list']);
  }

}
