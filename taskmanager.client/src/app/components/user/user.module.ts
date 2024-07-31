import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyComponent, PresentationalComponent, UserRoutingModule, ViewComponent } from './user-reference';
import { UserComponent } from './user.component';



@NgModule({
  declarations: [
    UserComponent,
    ViewComponent,
    ModifyComponent,
    PresentationalComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
