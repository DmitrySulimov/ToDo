import { Injectable } from '@angular/core';
import { toDo } from './toDo';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

const httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

@Injectable()
export class ListService {

 private toDoUrl = 'http://localhost:3000/toDo';

  constructor(private http: HttpClient) { }

    gettoDo (): Observable<toDo[]> {
 	 return this.http.get<toDo[]>(this.toDoUrl);
	};

	addItem(toDo : toDo): Observable<toDo>{
		return this.http.post<toDo>(this.toDoUrl, toDo, httpOptions);
	}

	  deleteItem (toDo: toDo | number): Observable<toDo> {
	  const id = typeof toDo === 'number' ? toDo : toDo.id;
	  const url = `${this.toDoUrl}/${id}`;
	  return this.http.delete<toDo>(url, httpOptions);
  };

  	updateItem (toDo : toDo): Observable<any> {
    return this.http.put(this.toDoUrl + '/' + toDo.id, toDo, httpOptions);
  }

}
