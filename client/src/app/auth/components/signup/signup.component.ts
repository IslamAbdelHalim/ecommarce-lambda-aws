import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl('', {
        validators: [
          Validators.min(6),
          Validators.max(12),
          Validators.required,
        ],
      }),
      profilePic: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, email, password, profilePic } = this.signupForm.value;
      // extract profile pic and extension
      const pic = profilePic.split(/[/\\]/).pop();
      const [fileName, ext] = pic.split('.');
      const allowedExt = ['jpg', 'png', 'jpeg'];
      if (!ext || !allowedExt.includes(ext)) {
        this.errorMessage = 'please provide a valid image';
        return;
      }

      this.authService
        .signup(name, email, password, fileName, ext, profilePic)
        .subscribe({
          next: () => this.router.navigate(['/home']),
          error: (err) => {
            this.errorMessage = err.error.message || 'signup failed';
          },
        });
      // this.authService.signup({ name, email, password }).subscribe({
      //   next: () => {
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error: (error) => {
      //     this.errorMessage =
      //       error.error.message || 'Signup failed. Please try again.';
      //   },
      // });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
