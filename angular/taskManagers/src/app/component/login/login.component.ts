import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData = { email: '', password: '' };

  constructor(
    private router: Router,
    private userService: UserService) {}
  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.loginData.email, this.loginData.password).subscribe((ele)=>{
      localStorage.setItem('userInfo',JSON.stringify(ele))
      if(ele){
        this.router.navigate(['/task']); // Set to true on successful login
      }else{
        console.error('Login failed');
      }
    })
  }
}

