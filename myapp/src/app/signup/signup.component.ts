import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private http:HttpClient,private routes:Router){}
    SignupForm = new FormGroup({
      name : new FormControl(''),
      surname : new FormControl(''),
      email : new FormControl(''),
      password : new FormControl('')
    })
  
  

  SignUp(SignupForm:FormGroup){
     this.http.post<any>("http://127.0.0.1:5000/",this.SignupForm.value)
     .subscribe(res=>{
      this.routes.navigate([' ']);
     })
  }
}
