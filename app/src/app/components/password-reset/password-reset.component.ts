import { Component, inject } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { RouterModule, Router} from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  passwordResetForm!: FormGroup;
  private AuthService = inject(AuthServiceService);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private fb = inject(FormBuilder)

  constructor(){

    this.passwordResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.passwordResetForm.valid) {
      this.AuthService.passwordReset(this.passwordResetForm.value).subscribe(
        (response) => {
           this.router.navigate(['/login']);
           this.toastrService.success('Success', 'Password reset successful');
        },
        (error) => {
           console.log(error)
           this.toastrService.error('Error', 'Oops try again...');
        }
      );
    }
  }
}
