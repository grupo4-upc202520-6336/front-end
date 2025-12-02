import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { User } from "../../models/user.entity";
import { RouterLink } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckbox,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @Output() userLogged = new EventEmitter<User>();

  // 1. Inyección moderna (evita problemas de constructor)
  private fb = inject(FormBuilder);

  hide = true;

  // 2. Declaración e inicialización directa.
  // ALERTA: NO escribas ": FormGroup" aquí. Deja que Angular detecte el tipo automáticamente.
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // 3. Getters tipados explícitamente como FormControl
  // Esto le asegura al HTML que la función .hasError() existe y recibe argumentos.
  //get emailControl(): FormControl {
  //  return this.loginForm.get('email') as FormControl;
  //}

  //get passwordControl(): FormControl {
  //  return this.loginForm.get('password') as FormControl;
  //}

  // --- SOLUCIÓN A PRUEBA DE BALAS ---
  // Esta función verifica los errores directamente en TS
  hasError(field: string, errorType: string): boolean {
    const control = this.loginForm.get(field);
    // Si el control existe y tiene el error, devuelve true
    return control ? control.hasError(errorType) : false;
  }
  // ----------------------------------

  onSubmit() {
    if (this.loginForm.valid) {
      const user: User = this.loginForm.value as User;
      console.log('Login data:', user);
      this.userLogged.emit(user);
    } else {
      console.log('Form is invalid');
    }
  }
}
