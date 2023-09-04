import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Email } from '../models/email.model';


@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private url: string = 'http://localhost:4500'
  private http = inject(HttpClient);

  constructor() { }

  SendEmail( email:Email){
    const body = { ...email };
    return this.http.post<string>(`${this.url}/email`, body);
  }
}
