import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:4500'
  private http = inject(HttpClient);
  private router = inject(Router);

  login( form: FormGroup){
    const body = form.value
    return this.http.post(`${this.url}/auth/login`, body)
      .pipe(
        tap( (resp: any )=> localStorage.setItem( 'token', resp['token'])),
      )
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/apc/inicio')
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${ this.url }/auth/check-token`)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }

}
