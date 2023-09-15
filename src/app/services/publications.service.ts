import { Injectable, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Publication } from '../models/publication.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  private url: string = environment.URL_API
  private http = inject(HttpClient);

  constructor() { }

  createPublication( publication : Publication, img: string){
    return this.http.post<Publication>( `${this.url}/publications`, { ...publication, img } )
  }

  getPublications(){
    return this.http.get<Publication[]>( `${this.url}/publications` )
  }

  getPublicationsById(id:string){
    return this.http.get<Publication>( `${this.url}/publications/by-id/${id}` )
  }

  getPublicationsByTerm(term:string){
    const newterm = term.replaceAll(" ", "%20")
    return this.http.get<Publication>( `${this.url}/publications/by-term/${newterm}` )
  }

  updatePublications( id: string, publication: Publication){
    const { name, content } = publication;
    const body = { name,  content}
    return this.http.patch<Publication>( `${this.url}/publications/${id}`, body )
  }

  deletePublication(id:string){
    return this.http.delete<Publication>( `${this.url}/publications/${id}` )
  }

}
