import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService} from './user.service';
import  {User} from './user';



@Injectable()
export class ListGuard implements CanActivate{

    username: string = "";
    password: string = "";
    id: number = 0;

    
    

constructor( private router: Router, private userService: UserService,  private route: ActivatedRoute,
	) {
  this.id = route.snapshot.params['id'];
}

  canActivate() {
    this.username = sessionStorage.getItem('username');
    this.password = sessionStorage.getItem('password');
    let isValid = false;
    this.userService.findUser(this.username, this.password).subscribe(user => {
        console.log(typeof user);
          if(Object.keys(user).length == 0){
           isValid = false;
           sessionStorage.clear();
           this.router.navigate(['/']);
          }
          else if(user[0].id == this.id){
            isValid = true;
          }
    });
    return isValid;
  }
}
