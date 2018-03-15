import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService} from './user.service';
import  {User} from './user';



@Injectable()
export class ListGuard implements CanActivate{


constructor(private router: Router) {}

  canActivate() {
    let token = localStorage.getItem('token');
    let isValid = false
    if (typeof token !== 'undefined' && token !== null) {
      isValid = true;
    }
    else{
      this.router.navigate(['/']);
    }
    return isValid;
  }
}
