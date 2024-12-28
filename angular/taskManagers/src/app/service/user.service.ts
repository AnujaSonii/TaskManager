import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/api/user'; // URL of the backend

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  login(email, password) {
    let obj={
      email:email,
      password:password
    }
    return this.http.post<any>(this.apiUrl+'/login',obj);
  }
}
