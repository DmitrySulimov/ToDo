import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService} from './user.service';
import  {User} from './user';



@Injectable()
export class ListGuard implements CanActivate{

    username: string = "";
    password: string = "";
    id: string = "";
    isValid: boolean = false;
    authUser: User = {
    id: 0,
      username: "",
      password: ""
  };

constructor( private router: Router, private userService: UserService,  private route: ActivatedRoute,
	) {}

  canActivate() {
    this.id = sessionStorage.getItem('id');
    this.username = sessionStorage.getItem('username');
    this.password = sessionStorage.getItem('password');
    this.userService.findUser(this.username, this.password).subscribe(user => {
        this.authUser = user[0];});

          if(Object.keys(this.authUser).length == 0){
           this.isValid = false;
           sessionStorage.clear();
           this.router.navigate(['/']);
          }
          else if(this.authUser.id == parseInt(this.id)){
            this.isValid = true;
          };
    return this.isValid;
  }
}
