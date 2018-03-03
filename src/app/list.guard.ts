import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService} from './user.service';
import  {User} from './user';



@Injectable()
export class ListGuard implements CanActivate{


wantReg: User = {
		id: 0,
    username: "testUser1",
    password: "Password"
};

constructor( private router: Router, private userService: UserService,  private route: ActivatedRoute,
	) {}

  canActivate() {
  	console.log(this.wantReg);
    return this.userService.getUsers().map(users => {
      console.log(this.wantReg);
            return users.some((user) => user.username === this.wantReg.username
             && user.password === this.wantReg.password);  
        });
  }
}
