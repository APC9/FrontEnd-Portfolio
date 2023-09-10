import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { publicationsState } from 'src/app/admin-pages/store/publications/publications.reducer';
import { loadpublications } from '../../admin-pages/store/publications/publications.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit, OnDestroy{

  public publications!: Publication[];

  private router = inject(Router);
  private store = inject(Store<publicationsState>);
  private clearSubscription!: Subscription;

  ngOnInit(): void {
    this.clearSubscription = this.store.select('publications')
      .subscribe( ({ publications } ) =>{
        this.publications = publications
      })
      this.store.dispatch(loadpublications() )
  }

  ngOnDestroy(): void {
    this.clearSubscription.unsubscribe()
  }

  redirectToPublication(term: string){
    this.router.navigateByUrl(`/apc/publication/${term}`)
  }
}
