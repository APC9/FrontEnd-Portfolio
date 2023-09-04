import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {


  private url: string = "http://localhost:4500"
  private http = inject(HttpClient);

  constructor() { }

  uploadFile( file: File){

    const formData = new FormData();
    formData.append('image', file)

    return this.http.post( `${this.url}/cloudinary`, formData, { responseType: 'text'} )
  }
}
