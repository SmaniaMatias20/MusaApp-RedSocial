import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
//import { AuthService } from '../../../../services/auth/auth.service';
import { NgIf } from '@angular/common';


// Validador para que password y confirmPassword coincidan
function passwordMatchValidator(form: AbstractControl) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

// Validador para fecha de nacimiento (mínimo 18 años)
function birthDateValidator(control: AbstractControl) {
  if (!control.value) return null;
  const birthDate = new Date(control.value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    // No cumplió años este año
    return age - 1 >= 18 ? null : { underage: true };
  }
  return age >= 18 ? null : { underage: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isPasswordVisible: boolean = false;




  /**
  * Constructor que inyecta el servicio de autenticación y el formulario.
  * @param authService Servicio para la gestión de autenticación.
  * @param fb Servicio para construir formularios reactivos.
  */
  constructor(
    // private authService: AuthService, 
    private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/)
      ]],
      confirmPassword: ['', Validators.required],
      birthDate: ['', [Validators.required, birthDateValidator]],
      description: ['', [Validators.maxLength(250)]],
      profileImage: [null]  // para el input file
    }, { validators: passwordMatchValidator });
    // this.registerForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.minLength(8),
    //       Validators.maxLength(15),
    //       Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/)
    //     ]
    //   ],
    //   confirmPassword: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.minLength(8),
    //       Validators.maxLength(15),
    //       Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/)
    //     ]
    //   ],
    //   firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    //   lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    //   age: ['', [Validators.required, Validators.max(99), Validators.min(18)]]
    // });

  }


  /**
   * Método que cambia la visibilidad de la contraseña.
   * 
   * @returns {void} - No retorna ningún valor, solo cambia el estado de visibilidad de la contraseña.
   */
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**
   * Método que maneja el registro del usuario. Si el formulario es válido, intenta registrar al usuario con el servicio de autenticación.
   * Si el formulario es inválido o el registro falla, muestra un mensaje de error.
   * 
   * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se completa el proceso de registro.
   */
  async register(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';

    //   try {

    //     const { email, password, confirmPassword, firstName, lastName, age } = this.registerForm.value;
    //     const response = await this.authService.register(email, password, {
    //       firstName: firstName,
    //       lastName: lastName,
    //       age: age
    //     });

    //     if (response.success) {
    //       this.successMessage = "Usuario registrado correctamente";
    //     } else {
    //       this.errorMessage = "El usuario ya se encuentra registrado";
    //     }

    //   } catch (error: any) {
    //     console.error(error);
    //     this.errorMessage = "Hubo otro error al registrarse";
    //   }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ profileImage: file });
      this.registerForm.get('profileImage')?.updateValueAndValidity();
    }
  }
}