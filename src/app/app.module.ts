import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ErrorComponent } from './Components/error/error.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule ,NgbModal} from '@ng-bootstrap/ng-bootstrap';



const routes:Routes = [
  {path:'',component:RegisterComponent},
  {path:'todo',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'**',component:ErrorComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    
    NgbModule
   

  ],
  providers: [NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
