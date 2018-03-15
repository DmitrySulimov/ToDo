import { Injectable } from '@angular/core';
import { toDo } from './toDo';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';


const token = localStorage.getItem('token');
const httpOptions = {
	  headers: new HttpHeaders({
	   'Content-Type': 'application/json',
	   'authorization': token
	    })
	};

@Injectable()
export class ListService {

 private toDoUrl = `http://localhost:3000/auth/tasks`;

  constructor(private http: HttpClient) {

  }

    gettoDo (id): Observable<toDo[]> {
  		  const body = {id: id};
 		 return this.http.post<toDo[]>(this.toDoUrl, body, httpOptions);
	};

	addItem(toDo : toDo): Observable<toDo>{
		const toDoUrl = `http://localhost:3000/auth/addTask`;
		return this.http.post<toDo>(toDoUrl, toDo, httpOptions);
	}

	deleteItem (toDo: toDo | number): Observable<toDo> {
	  const id = typeof toDo === 'number' ? toDo : toDo.id;
	  const toDoUrl = `http://localhost:3000/auth/delTask/${id}`;
	  return this.http.delete<toDo>(toDoUrl, httpOptions);
  };

  	updateItem (toDo : toDo): Observable<any> {
  		const toDoUrl = `http://localhost:3000/auth/changeTask`;
   		return this.http.put(toDoUrl, toDo, httpOptions);
  }

}
