import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private router = inject(Router);

  navigateToContacts(){
    this.router.navigateByUrl('/apc/contactos')
  }
}
