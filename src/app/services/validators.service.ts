import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public passwordPattern: string = "/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/";

  isValidField( form: FormGroup, field: string ): boolean | null{
    return form.controls[field].errors && form.controls[field].touched;
  }


  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;

      // Define las expresiones regulares para verificar los requisitos.
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;
      const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

      // Verifica si la contraseña cumple con los requisitos.
      const isUppercaseValid = uppercaseRegex.test(password);
      const isLowercaseValid = lowercaseRegex.test(password);
      const isNumberValid = numberRegex.test(password);
      const isSpecialCharValid = specialCharRegex.test(password);

      // Calcula si la contraseña es válida.
      const isValid =
        isUppercaseValid && isLowercaseValid && isNumberValid && isSpecialCharValid;

      // Devuelve el resultado de la validación.
      return isValid ? null : { passwordRequirements: true };
    };
  }
}
