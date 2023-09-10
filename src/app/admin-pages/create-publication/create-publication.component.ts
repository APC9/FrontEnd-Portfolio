import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { FileuploadService } from '../../services/fileupload.service';
import Swal from 'sweetalert2';
import { PublicationsService } from '../../services/publications.service';
import { Publication } from '../../models/publication.model';
import { publicationsState } from '../store/publications/publications.reducer';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadpublication, updatepublication } from '../store/publications/publications.actions';



@Component({
  selector: 'create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.css']
})
export class CreatePublicationComponent implements OnInit, OnDestroy{

  public publicationForm!: FormGroup;
  public uploadImage!: File;
  public ImageUrlUpload: string = '';
  public publication!: Publication;
  public previewImage!: string | null;
  public id!: string;
  public loading: boolean = false;

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private publicationsService = inject(PublicationsService);
  private fileuploadService = inject(FileuploadService);
  private store = inject(Store<publicationsState>);
  private clearSubcription!: Subscription;
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.publicationForm = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(4) ] ],
      content: [ '', [Validators.required, Validators.minLength(4) ] ],
    })

    this.clearSubcription = this.store.select('publications')
      .pipe(
        filter( resp => resp.publication.length !== 0 )
      )
      .subscribe( (publications ) => {
        this.loadPublicationNow( this.id, publications.publication[0] )
      })

      if( this.id !== 'new' ){
        this.store.dispatch( loadpublication({id: this.id}) )
      };
  }

  ngOnDestroy(): void {
      this.clearSubcription.unsubscribe()
  }

  submit(){
    if( this.id === 'new'){
      this.createPublication()
      return;
    }
    this.updatePublication(this.publication)
  }

  isValidField( field: string ){
    return this.validatorsService.isValidField(this.publicationForm, field)
  }

  createPublication(){
    if( this.publicationForm.invalid ) return;
    if( !this.uploadImage || this.ImageUrlUpload.length === 0) return;

    this.publicationsService.createPublication(this.publicationForm.value, this.ImageUrlUpload)
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
    this.publicationForm.reset()
  }

  updatePublication(publication: Publication){

    if( this.publicationForm.invalid ) return;
     if( !this.uploadImage && this.ImageUrlUpload.length === 0) return;

     try {
       this.store.dispatch( updatepublication({id:publication._id, publication: this.publicationForm.value}) )
       Swal.fire({
         icon: 'success',
         title: 'Exito',
         text: `${publication.name} creada correctamente`
       })

       this.store.dispatch( loadpublication({id: this.id}) )

     } catch (error) {
       console.log(error)
     }
   }

  loadPublicationNow(id:string, publication: Publication){
    if ( id === 'new') return;
    this.publication = publication;
    const { name, content, img } = publication;
    this.ImageUrlUpload = img;
    this.publicationForm.setValue({ name, content })
  }

  sendImage(){
    if(!this.uploadImage) return;
    this.loading = true
    this.fileuploadService.uploadFile(this.uploadImage, 'publication')
      .subscribe({
        next: (resp ) => {
          this.loading = false,
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

  changeImage(file: File){
    if(!file) return;
    this.uploadImage = file;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.previewImage = reader.result as string;
    }
  }

}
