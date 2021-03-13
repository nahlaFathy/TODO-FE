import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  postUser(user){
    return this.http.post(environment.api+'/users/register',user);
  }
}
