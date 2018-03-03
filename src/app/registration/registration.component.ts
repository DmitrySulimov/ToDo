import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import 'rxjs/Rx';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

users : User[];
regUser: User = {
	id: 0,
    username: "",
    password: ""
  };

    constructor( private router: Router, private userService: UserService) { 
    
    }

      ngOnInit() {
        this.getUsers(); 
        }

      getUsers() : void{
        this.userService.getUsers()
        .subscribe((users)=>{
          this.users = users;
        });
      }


    addUser(regUser) : void{

      this.router.navigate(['/']);
      //check is user already exist
      //add modal "user added"
  	}

}