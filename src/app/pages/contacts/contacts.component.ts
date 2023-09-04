import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { SendEmailService } from '../../services/send-email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public emailForm!: FormGroup;
  public isLoading = false;
  public msgError: string = '';

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private sendEmailService = inject(SendEmailService);



  ngOnInit(): void {
    this.emailForm = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(5)] ], //verificar el minlength del backend
      lastName: [ '', [Validators.required, Validators.minLength(4)]], //verificar el minl del backen
      email: ['', [Validators.required, Validators.pattern( this.validatorsService.emailPattern)]],
      text: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  sendEmail(){
    if( this.emailForm.invalid ){
      this.msgError = 'Email, name o lastName invalid'
      return
    };

    this.isLoading= true;
    this.sendEmailService.SendEmail(this.emailForm.value)
      .subscribe({
        next: (resp:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Sent',
            text: `${resp['message']}`,
          })
          this.isLoading= false;
          this.msgError = ''
        },
        error: err => console.log(err)
      })
    this.emailForm.reset()
  }
}
