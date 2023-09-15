import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {


  private url: string = environment.URL_API
  private http = inject(HttpClient);

  constructor() { }

  uploadFile( file: File, path?: string){

    const formData = new FormData();
    formData.append('image', file)

    if( path ){
      return this.http.post( `${this.url}/cloudinary/${path}`, formData, { responseType: 'text'} )
    }

    return this.http.post( `${this.url}/cloudinary`, formData, { responseType: 'text'} )
  }
}
