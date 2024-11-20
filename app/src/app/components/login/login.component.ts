import { Component, inject } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { RouterModule, Router} from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor( private fb: FormBuilder){

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    if (this.loginForm.valid) {
      this.AuthService.loginUser(this.loginForm.value).subscribe(
        (response) => {
           console.log(response)
           this.AuthService.login();
           this.AuthService.setUser(response.user);
           this.router.navigate(['']);
        },
        (error) => {
           console.log(error)
        }
      );
    }
  }
}
