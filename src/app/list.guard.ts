import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService} from './user.service';
import  {User} from './user';



@Injectable()
export class ListGuard implements CanActivate{

    username: string = "";
    password: string = "";
    

constructor( private router: Router, private userService: UserService,  private route: ActivatedRoute,
	) {
}

  canActivate() {
    this.username = sessionStorage.getItem('username');
    this.password = sessionStorage.getItem('password');
    return this.userService.getUsers().map(users => {
            return users.some((user) => user.username === this.username
             && user.password === this.password);  
        });
  }
}
