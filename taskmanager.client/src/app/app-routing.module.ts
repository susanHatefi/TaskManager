import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'board',
    loadChildren: () =>
      import('./components/todo/todo.module').then(
        (module) => module.TodoModule
      ),
  },
  {
    path: 'developer',
    loadChildren: () =>
      import('./components/user/user.module').then(
        (module) => module.UserModule
      ),
  },
  {
    path: 'home',
    component: AppComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
