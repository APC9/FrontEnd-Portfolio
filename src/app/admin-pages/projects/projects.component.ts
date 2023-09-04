import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { projectsState } from '../store/project/projects.reducer';
import * as actionProjects from '../store/project/projects.actions';
import { Project } from '../../models/project.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-projects-list',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  public projects: Project[] = [];
  private store = inject( Store<projectsState>);
  private clearSubscriptions!: Subscription;

  ngOnInit(): void {
    this.clearSubscriptions = this.store.select('projects').subscribe(({projects})=>{
      this.projects = projects;
    })

    this.store.dispatch( actionProjects.loadProjects() )
  }

  ngOnDestroy(): void {
      this.clearSubscriptions.unsubscribe()
  }

  deleteProject( project: Project ){

    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta accion eliminara el projecto: ${ project.name } `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f98a5b',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch( actionProjects.deleteProject({ id: project._id }) )
        Swal.fire(
          'Accion Exitosa!',
          `projecto: ${project.name} elimando correctamente `,
          'success'
        )
      }
    })
  }
}
