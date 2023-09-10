import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { publicationsState } from '../store/publications/publications.reducer';
import * as actionpublications from '../store/publications/publications.actions';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent {

  public publications: Publication[] = [];
  private store = inject( Store<publicationsState>);
  private clearSubscriptions!: Subscription;
  private router = inject( Router );

  ngOnInit(): void {
    this.clearSubscriptions = this.store.select('publications').subscribe(({publications})=>{
      this.publications = publications;
    })

    this.store.dispatch( actionpublications.loadpublications() )
  }

  ngOnDestroy(): void {
      this.clearSubscriptions.unsubscribe()
  }

  deletepublication( publication: Publication ){

    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta accion eliminara el publicationo: ${ publication.name } `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f98a5b',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch( actionpublications.deletepublication({ id: publication._id }) )
        Swal.fire(
          'Accion Exitosa!',
          `publicationo: ${publication.name} elimando correctamente `,
          'success'
        )
      }
    })
  }

  redirectToEdit(name: string){
    this.router.navigateByUrl(`dashboard/create-publication/${name}`)
  }
}
