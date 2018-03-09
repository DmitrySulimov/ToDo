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

	addUser (user: User): Observable<User> {
	  return this.http.post<User>(this.userUrl, user, httpOptions);
	};


	 verifyUser (username: string, password: string): Observable<string> {
	 	const verifyUrl = 'http://localhost:3000/auth/login'
	 	var body = 'username=' + username + '&password=' + username;
	  return this.http.post<string>(verifyUrl, body, httpOptions);
	};

	findUser (username: string, password: string): Observable<User>{
	 	const findUrl = 'localhost:3000/users/id';
	 	var body = 'username=' + username + '&password=' + username;
	  return this.http.post<User>(findUrl, body, httpOptions);
	};


}
