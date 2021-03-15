import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {  Router } from '@angular/router'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(private http:HttpClient,private router: Router ){}
  showSucessMessage: boolean;
  serverErrorMessages: string;
   headers= new HttpHeaders()
  .set('content-type', 'application/json');
  
  myForm = new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(5)]),
    email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })
  /*public onCreateuser(postData){
    
    this.http.post(`${this.baseURL}register`,postData)
    .subscribe(res=>{
     
      console.log(res)
     
    },
    err=>{
    
      alert(err.error)
     
    });
  }
  getUsers(){
    this.http.get<any>(this.baseURL)
    .subscribe(res=>{
      console.log(res)
    })
  }*/
  register(){
   
    if(this.myForm.valid){
     
        this.http.post(process.env.API||"http://localhost:3000/api"+'/users/register'||environment.API,this.myForm.value)
    .subscribe(res=>{
     
      console.log(res)
      this.router.navigateByUrl("/login")

    },
    err=>{
    
      alert(err.error)
  
      this.myForm.reset();
    });
      }
  
  }
}
