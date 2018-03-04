import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClarityModule } from "@clr/angular";
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { ListComponent } from './list/list.component';
import { NonFoundComponent } from './non-found/non-found.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user.service';
import { ListService } from './list.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    RegistrationComponent,
    ListComponent,
    NonFoundComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ClarityModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UserService, ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
