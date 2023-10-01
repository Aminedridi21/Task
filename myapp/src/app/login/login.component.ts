import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
 constructor(private http:HttpClient,private routes:Router){}
   
    LoginForm = new FormGroup({
      Username: new FormControl(''),
      Password: new FormControl(''),
    })


LogIn(profileForm:FormGroup) {
  //console.log(this.profileForm.value);
  this.http.get<any>("http://127.0.0.1:5000/")
   .subscribe(res=>{
      console.log(res);
      const user =res['data'].find((a:any)=>{
      return a.name===this.LoginForm.value.Username && a.password === this.LoginForm.value.Password
      });
      if(user){
        this.LoginForm.reset();
        console.log('success')
        this.routes.navigate(['/acceuil']);

      }
      else{
        window.alert('Incorrect login credentials')
        this.LoginForm.reset();
      }
   
    });
}    

}
