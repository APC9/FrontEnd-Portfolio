import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ValidatorsService } from '../../services/validators.service';
import { AuthService } from '../../services/auth.service';
import { authState } from '../authStore/auth.store';
import { authenticated, unauthenticated } from '../authStore/auth.action';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  private store = inject(Store<authState>);

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: [ 'test@mail.com', [Validators.required, Validators.pattern( this.validatorsService.emailPattern )]],
        password: [ 'Pe$a1096', [Validators.required, this.validatorsService.passwordValidator() ]]
      });
  }

  loginSubmit(){
    if( this.loginForm.invalid ) return;
    this.authService.login(this.loginForm)
      .subscribe({
        next: () =>{
          this.store.dispatch( authenticated() )
          Swal.fire({
            title: 'Login Success',
            text: 'Login Success',
            icon: 'success'
          })
        this.router.navigateByUrl('/dashboard/projects')
        },
        error: err => {
          this.store.dispatch( unauthenticated() )
          this.router.navigateByUrl('/apc/inicio')
        }
      })
  }


}
