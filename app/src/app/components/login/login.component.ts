import { Component, inject } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { RouterModule, Router} from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { LoginResponse } from '../../models/Books';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  private AuthService = inject(AuthServiceService);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private fb = inject(FormBuilder)

  constructor(){

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    if (this.loginForm.valid) {
      this.AuthService.loginUser(this.loginForm.value).subscribe(
        (response : LoginResponse) => {
          console.log(response)
           if(response.success)
           {
            
            this.AuthService.login();
            this.AuthService.setUser(response.user);
            localStorage.setItem("token", response.user.token);
            this.router.navigate(['']);
            this.toastrService.success('Success', 'Login successful');
           }
           else{
            this.toastrService.warning(response.message);
           }
           
        },
        (error) => {
           console.log(error)
           this.toastrService.error('Error', 'Oops try again...');
        }
      );
    }
  }
}
