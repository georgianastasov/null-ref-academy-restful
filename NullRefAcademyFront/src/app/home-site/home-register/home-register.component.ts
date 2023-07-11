import { identifierName } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { last, map, Observable } from 'rxjs';
import { HomeApiService } from '../../services/home-api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home-register',
  templateUrl: './home-register.component.html',
  styleUrls: ['./home-register.component.css']
})
export class HomeRegisterComponent implements OnInit {

  constructor(private service: HomeApiService, private router: Router) { }
  
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: ''
  }

  ngOnInit(): void {
    
  }

  hasErrorEmail: boolean = false;
  hasErrorFirstName: boolean = false;
  hasErrorLastName: boolean = false;
  hasErrorUsername: boolean = false;
  hasErrorPassword: boolean = false;
  hasErrorConfirmPassword: boolean = false;
  hasErrorAccountType: boolean = false;
  
  onSubmit() {
    this.service.registerUser(this.user)
    .subscribe(
      response => {
        this.router.navigate(['/Home/Login']);
      },
      err => {
        console.log(err.error.errors)
        this.hasErrorEmail = false;
        this.hasErrorFirstName = false;
        this.hasErrorLastName = false;
        this.hasErrorUsername = false;
        this.hasErrorPassword = false;
        this.hasErrorConfirmPassword = false;
        this.hasErrorAccountType = false;
        if (err.error.errors != null) {
          if (err.error.errors.Email != null) {
            this.hasErrorEmail = true; 
          }
          if (err.error.errors.FirstName != null) {
            this.hasErrorFirstName = true; 
          }
          if (err.error.errors.LastName != null) {
            this.hasErrorLastName = true; 
          }
          if (err.error.errors.Username != null) {
            this.hasErrorUsername = true; 
          }
          if (err.error.errors.Password != null) {
            this.hasErrorPassword = true; 
          }
          if (err.error.errors.ConfirmPassword != null) {
            this.hasErrorConfirmPassword = true; 
          }
          if (err.error.errors.AccountType != null) {
            this.hasErrorAccountType = true; 
          }
        }
      }
    )
  }
  
}
