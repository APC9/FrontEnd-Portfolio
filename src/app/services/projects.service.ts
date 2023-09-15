import { Injectable, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Project } from '../models/project.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private url: string = environment.URL_API
  private http = inject(HttpClient);

  constructor() { }

  createProject( project : Project, img: string){
    return this.http.post<Project>( `${this.url}/projects`, { ...project, img } )
  }

  getProjects(){
    return this.http.get<Project[]>( `${this.url}/projects` )
  }

  getProjectsById(id:string){
    return this.http.get<Project>( `${this.url}/projects/${id}` )
  }

  updateProjects( id: string, project: Project){
    const { name, type, url, description, technologies} = project;
    const body = { name, type, url, description, technologies}
    return this.http.patch<Project>( `${this.url}/projects/${id}`, body )
  }

  deleteProject(id:string){
    return this.http.delete<Project>( `${this.url}/projects/${id}` )
  }

}
