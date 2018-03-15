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

username:string =  "";
password:string =  "";
exsited: boolean = false;

    constructor( private router: Router, private userService: UserService) { 
    
    }

      ngOnInit() { 
          
        };


    addUser(regUser){
      this.userService.findUser(this.username, this.password)
          .subscribe(
            result =>{
              this.exsited = true;
             console.log('user existed');
             this.router.navigate(['/']);
          },
            error => {
             this.userService.addUser(this.username, this.password)
              .subscribe(a_user => {
               this.router.navigate(['/']);
              });
            }
  )}
}