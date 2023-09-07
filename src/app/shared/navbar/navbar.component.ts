import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { authState } from '../../pages/authStore/auth.store';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { unauthenticated } from 'src/app/pages/authStore/auth.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  @Output() clickedInsideMenu = new EventEmitter<boolean>();

  public toogle: boolean = false;
  public isAuthententicated = signal<boolean>(false);
  public token!: boolean;
  public screenWidth!: number;
  public screenHeight!: number;

  private elementRef = inject(ElementRef);
  private router = inject(Router);
  private store = inject(Store<authState>);
  private clearSubscription!: Subscription;
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.isAuthententicated.update(current => current = !!localStorage.getItem('token') );
    this.changeToggle()
  }

  changeToggle(){
    this.toogle = !this.toogle;
  }

  @HostListener('document:click', ['$event'])
  menuClose(event: MouseEvent ){
    const clickedInside = this.elementRef.nativeElement.contains( event.target )
    if( !clickedInside ){
      this.handleClickOutside()
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if( this.screenWidth > 1000 ){
      this.toogle = false
    }else{
      this.toogle = true
    }
  }

  handleClickOutside(){
    if( !this.toogle ) this.toogle = true;
  }

  redirectToLogin(){
    this.router.navigateByUrl('/apc/login')
  }

  logout(){
    this.authService.logout()
    this.isAuthententicated.update(current => current = !!localStorage.getItem('token') );
    this.store.dispatch( unauthenticated() )
  }
}
