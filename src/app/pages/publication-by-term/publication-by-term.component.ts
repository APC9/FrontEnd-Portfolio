import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { Store } from '@ngrx/store';
import { publicationsState } from '../../admin-pages/store/publications/publications.reducer';
import { loadpublicationByTerm, loadpublications } from '../../admin-pages/store/publications/publications.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-publication-by-term',
  templateUrl: './publication-by-term.component.html',
  styleUrls: ['./publication-by-term.component.css']
})
export class PublicationByTermComponent implements OnInit, OnDestroy{

  public publication?: Publication;
  public publications!: Publication[];
  public term: Subject<string> = new Subject<string>();

  private store = inject(Store<publicationsState>);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private clearSubscription!: Subscription;

  ngOnInit(): void {
    const term = this.activatedRoute.snapshot.params['term']
    this.clearSubscription = this.store.select('publications')
      .pipe(
        filter( resp => resp.publication.length !== 0 )
       )
      .subscribe( (publications) => {
        this.publications = publications.publications;
        this.publication = publications.publication[0]['0'];
      })

    this.store.dispatch( loadpublications() )
    this.store.dispatch( loadpublicationByTerm({term}) )

    this.term.subscribe( (term) => {
      this.router.navigateByUrl(`/apc/publication/${term}`)
      this.store.dispatch( loadpublicationByTerm({term}) )
    })
  }

  ngOnDestroy(): void {
    this.clearSubscription.unsubscribe()
  }


  redirectToPublication(term: string){
    this.term.next( term )
  }

}
