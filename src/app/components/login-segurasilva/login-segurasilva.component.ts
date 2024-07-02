import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-segurasilva',
  templateUrl: './login-segurasilva.component.html',
  styleUrl: './login-segurasilva.component.scss',
})
export class LoginSegurasilvaComponent {
  authForm: FormGroup;
  revealPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.authForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }

  OnSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      Toastify({
        text: 'Campos inválidos',
        duration: 3000,
        close: true,
        offset: {
          x: 10,
          y: '6rem',
        },
        stopOnFocus: true,
        style: {
          background: "#e91e63",
        }
      }).showToast();
    } else {
      this.authService.logIn(this.authForm.value).subscribe({
        error: () => {
          Toastify({
            text: 'Credenciales inválidas',
            duration: 3000,
            close: true,
            offset: {
              x: 10,
              y: '6rem',
            },
            stopOnFocus: true,
            style: {
              background: "#e91e63",
            }
          }).showToast();
        }
      })
    }
  }
}
