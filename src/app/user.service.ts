import { Injectable } from '@angular/core';
import { User } from './user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

const httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

@Injectable()
export class UserService {

 private userUrl = 'http://localhost:3000/users';



  constructor(private http: HttpClient) { }

    getUsers (): Observable<User[]> {
 	 return this.http.get<User[]>(this.userUrl);
	};

	findUser (username: string, password: string): Observable<User>{
		const url = `${this.userUrl}?username=${username}&password=${password}`;
		return this.http.get<User>(url);
	}


}
