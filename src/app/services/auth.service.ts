import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.URL_API;

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
