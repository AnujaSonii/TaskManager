import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerData = { name: '', email: '', password: '', confirmPassword: '',mobileNumber: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
   }

  restrictToNumbers(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Allow only digits and restrict input
    const numericValue = value.replace(/[^0-9]/g, '');
    if (value !== numericValue) {
      input.value = numericValue; // Update the input value to only numeric
    }
    
    // Optionally, you can also limit the length to 10
    if (numericValue.length > 10) {
      input.value = numericValue.slice(0, 10); // Limit to 10 digits
    }

    // Update the model
    this.registerData.mobileNumber = input.value;
  }

  onSubmit() {
    // Implement your registration logic here
    if (this.registerData.password === this.registerData.confirmPassword) {
      // Call the registration method from AuthService (you need to implement this)
      // For demonstration, we assume registration is successful
      console.log('Registration successful:', this.registerData);
      this.userService.registerUser(this.registerData).subscribe((response)=>{
        this.router.navigate(['/login']); // Redirect to login page after successful registration
      },error=>{
        if (error.status === 409) {
        } else {
        }
      })
    } else {
      // Handle password mismatch
      console.error('Passwords do not match');
    }
  }

}
