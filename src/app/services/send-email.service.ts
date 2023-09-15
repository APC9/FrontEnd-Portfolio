import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Email } from '../models/email.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private url: string = environment.URL_API
  private http = inject(HttpClient);

  constructor() { }

  SendEmail( email:Email){
    const body = { ...email };
    return this.http.post<string>(`${this.url}/email`, body);
  }
}
