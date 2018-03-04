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
          this.userService.getUsers()
          .subscribe((users)=>{
            this.users = users;
          });
        };


    addUser(regUser) : void{
      this.regUser.id = this.users[this.users.length-1].id + 1;
      //check is user existed
       this.userService.findUser(this.regUser.username, this.regUser.password)
      .subscribe(user=>{
        if(Object.keys(user).length == 0){  
         this.userService.addUser(this.regUser as User)
          .subscribe(a_user => {
           this.users.push(a_user);
           this.router.navigate(['/']);
          });
         }
         else{
           console.log("user already exist");
         };
  	});
  }
}