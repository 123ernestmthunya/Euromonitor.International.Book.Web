import { Component, inject } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  private bookService = inject(AuthServiceService);
  private router = inject(Router);
  private fb = inject(FormBuilder)

  constructor( ){

    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.bookService.registerUser(this.registrationForm.value).subscribe(
        (response) => {
          this.router.navigate(['/login']);
        },
        (error) => {
           console.log(error)
        }
      );
    }
  }
}
