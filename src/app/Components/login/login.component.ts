import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {  Router } from '@angular/router'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router) { }
  myForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })
  ngOnInit(): void {
  }
    onlogin(postData){
      this.http.post(environment.api+'/users/login',postData,{responseType:"text"})
      .subscribe(res=>{
        console.log(res)
        localStorage.setItem("Token",res);
        console.log(localStorage.getItem("Token"))
        this.router.navigateByUrl('/todo')
      },
      err=>{      
        alert(err.error)
       
      });
    }
  login(){
    if(this.myForm.valid){
      try{
         this.onlogin(this.myForm.value)
  
        this.myForm.reset()   } 
    
     catch(err){
       console.log(err.error);
     } 

    }
}}
