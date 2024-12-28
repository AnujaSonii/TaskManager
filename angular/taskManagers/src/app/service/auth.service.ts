import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }

  private isAuthenticated = false;

  login(email: string, password: string): boolean {
    // Implement your login logic here
    this.userService.login(email, password).subscribe((ele)=>{
      localStorage.setItem('userInfo',JSON.stringify(ele))
      if(ele){
        this.isAuthenticated = true; // Set to true on successful login
      }else{
        this.isAuthenticated = false;
      }
    })
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
