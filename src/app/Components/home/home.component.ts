import { Component, OnInit, ViewChild } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient ,private modalService: NgbModal) { }
   Todos=[]
   checkValue:string
   
   mytoken =JSON.parse(localStorage.getItem("Token")).token
   closeResult = '';
  ngOnInit(): void {
    this.getUserTodos();
  }
  myForm = new FormGroup({
    title:new FormControl('',[Validators.required,Validators.minLength(5)]),
    body:new FormControl('',[Validators.required,Validators.minLength(10)])
  })

  public editForm = new FormGroup({
    title:new FormControl('',[Validators.required,Validators.minLength(5)]),
    body:new FormControl('',[Validators.required,Validators.minLength(10)]),
    status:new FormControl('',[Validators.minLength(1)])
  })
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  public getUserTodos(){
   
   
    this.http.get<any>(process.env.API+'/api/todos'||"http://localhost:3000/api"+'/todos'||environment.API, {
      headers: new HttpHeaders()
        .set('x-user-token',this.mytoken)
       , observe: 'response'
    })
    .subscribe(async res=>{
     await res.body.forEach(element => this.Todos.push(element));
      console.log(res)
      console.log(this.Todos)
    }
    ,
    err=>{
    
      console.log(err)

    })
  }
 
public AddTodo(){
  if(this.myForm.valid){
     
    this.http.post(process.env.API+'/api/todos'||"http://localhost:3000/api"||environment.API+'/todos',this.myForm.value,{
      responseType:"text",
      headers: new HttpHeaders()
        .set('x-user-token',this.mytoken)
       , observe: 'response'
    })
.subscribe(async res=>{
  
  await  this.Todos.push(JSON.parse(res.body).todo);
 
  console.log(JSON.parse(res.body).todo)
  console.log(res)
  this.myForm.reset();

},
err=>{

  alert(err.error)

});
  }
}
public DeleteTodo(todo){
  console.log(todo)
  this.http.delete(process.env.API+`/api/todos/${todo._id}`||"http://localhost:3000/api"+`/todos/${todo._id}`,{
    headers: new HttpHeaders()
      .set('x-user-token',this.mytoken)
     , observe: 'response'
  }).subscribe(async res=>{
  
    console.log(res)
    const index: number = this.Todos.indexOf(todo);
    if (index !== -1) {
        this.Todos.splice(index, 1);
    }  
   
  },
  err=>{
  
    alert(err.error)
  
  })
}


 onCheck(event){
  if(event.target.checked){
    console.log(event.target.value)
    this.editForm.value.status=event.target.value;
    console.log(this.editForm.value.status)
    
  }
 }
 onSubmit(todo) {
  
  if(this.editForm.valid){
    this.http.patch(process.env.API+`/api/todos/${todo._id}`||"http://localhost:3000/api"+`/todos/${todo._id}`,
    this.editForm.value,{
      headers: new HttpHeaders()
        .set('x-user-token',this.mytoken)
       , observe: 'response'
    }).subscribe( res=>{
     
      console.log(res)
      console.log(this.editForm.value.status)
      const index: number = this.Todos.indexOf(todo);
      if (index !== -1) {
        this.Todos[index].title=this.editForm.value.title;
        this.Todos[index].body=this.editForm.value.body;
        this.Todos[index].status=this.editForm.value.status;
        this.Todos[index].updatedAt=new Date(Date.now()).toISOString();;
        console.log(Date.now())
      } 
      this.editForm.reset();
      this.modalService.dismissAll();
    },
    err=>{
    
      alert(err.error)
    
    })
    console.log("res:", this.editForm.value,);
   }
  }

 }
