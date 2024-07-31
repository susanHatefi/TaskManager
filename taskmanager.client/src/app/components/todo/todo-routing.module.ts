import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModifyComponent, ViewComponent } from './todo-reference';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewComponent,
      },
      {
        path: 'create',
        component: ModifyComponent,
      },
      {
        path: ':id/edit',
        component: ModifyComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
