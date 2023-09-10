import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import Swal from 'sweetalert2'
import { Subscription, filter } from 'rxjs';

import { ValidatorsService } from 'src/app/services/validators.service';
import { ProjectsService } from '../../services/projects.service';
import { FileuploadService } from '../../services/fileupload.service';

import { Project } from '../../models/project.model';
import { projectsState } from '../store/project/projects.reducer';
import { loadProject, updateProject } from '../store/project/projects.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit, OnDestroy {

  public projectsForm!: FormGroup;
  public selectedTechnologies: string[] = [];
  public projectType: string[] = [ 'Front-End', 'Back-End' ];
  public ProjectTechnologies: string[] = [ 'Angular', 'React', 'Nestjs', 'Nextjs', 'JS-Vanilla', 'Docker', 'HTML5', 'CSS3', 'SASS' ];
  public project!: Project;
  public uploadImage!: File;
  public previewImage!: string | null;
  public ImageUrlUpload: string = '';
  public id!: string;
  public loading: boolean = false;

  private fb = inject(FormBuilder)
  private validatorsService = inject(ValidatorsService);
  private projectsService = inject(ProjectsService);
  private fileuploadService = inject(FileuploadService);
  private route = inject(ActivatedRoute);
  private store = inject(Store<projectsState>);
  private clearSubcription!: Subscription;


  ngOnInit(): void {

      this.id = this.route.snapshot.params['id']

      this.projectsForm = this.fb.group({
        type: [ '', [Validators.required ] ],
        name: [ '', [Validators.required, Validators.minLength(4) ] ],
        url: [ '', [Validators.required, Validators.minLength(4) ] ],
        technologies: [ '', [Validators.required ]],
        description: ['', [Validators.required ] ]
      });

      this.clearSubcription = this.store.select('projects')
        .pipe(
          filter( resp => resp.project.length !== 0 )
        )
        .subscribe( (projects)=>{

          this.loadProject( this.id, projects.project[0])
        })

      if( this.id !== 'new' ){
        this.store.dispatch( loadProject({id: this.id}) )
      };

  }

  ngOnDestroy(): void {
    this.clearSubcription.unsubscribe()
  }


  loadProject(id:string, project: Project){
    if ( id === 'new') return;
    this.project = project;
    const { name, type, url, description, technologies, img } = project;
    this.ImageUrlUpload = img;
    this.selectedTechnologies = technologies;
    this.projectsForm.setValue({ name, type, url, description, technologies })
  }



  onTechnologiesChange(event:Event){
    const selectedOptions = (event.target as HTMLSelectElement ).selectedOptions;
    let selectedValues = Array.from(selectedOptions).map(option => option.value);
    this.selectedTechnologies.push(...selectedValues)
    this.projectsForm.get('technologies')?.setValue(this.selectedTechnologies)
  }

  submit(){
    if( this.id === 'new'){
      this.createProject()
      return;
    }
    this.updateProject(this.project)
  }

  createProject(){
    if( this.projectsForm.invalid ) return;
    if( !this.uploadImage || this.ImageUrlUpload.length === 0) return;

    this.projectsService.createProject(this.projectsForm.value, this.ImageUrlUpload)
      .subscribe( {
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: `${data.name} creada correctamente`
          })
        },
        error: (err) => console.log(err)
      })
    this.projectsForm.reset()
  }

  updateProject(project: Project){

   if( this.projectsForm.invalid ) return;
    if( !this.uploadImage && this.ImageUrlUpload.length === 0) return;

    try {
      this.store.dispatch( updateProject({id:project._id, project: this.projectsForm.value}) )
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: `${project.name} creada correctamente`
      })

      this.store.dispatch( loadProject({id: this.id}) )

    } catch (error) {
      console.log(error)
    }
  }


  isValidField( field: string ){
    return this.validatorsService.isValidField(this.projectsForm, field)
  }

  changeImage(file: File){
    if(!file) return;
    this.uploadImage = file;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.previewImage = reader.result as string;
    }
  }

  sendImage(){
    if(!this.uploadImage) return;
    this.loading = true;
    this.fileuploadService.uploadFile(this.uploadImage)
      .subscribe({
        next: (resp ) => {
          this.loading = false;
          this.ImageUrlUpload = resp
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Imagen Cargada'
          })
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Upps',
            text: `${err.error.message}`
          })
        }
      })
  }


}
