import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ListComponent } from './list/list.component';
import { NonFoundComponent } from './non-found/non-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { ListGuard } from './list.guard';


const routes : Routes = [
	{ path: '', component: AuthorizationComponent },
	{ path: 'list/:id', component: ListComponent, canActivate: [ListGuard] },
	{ path: 'non-found', component: NonFoundComponent },
	{ path: 'registration', component: RegistrationComponent },
	{ path: '**', redirectTo: '/non-found', pathMatch: 'full' }
	];
 
@NgModule({
  exports: [
    RouterModule
  ],
  providers: [ListGuard],
  imports: [ RouterModule.forRoot(routes) ]

})

export class AppRoutingModule {}
