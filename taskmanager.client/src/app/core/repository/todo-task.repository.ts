import { Injectable } from '@angular/core';
import { HttpParamModel, TodoTaskModel } from '../../share/reference';
import { HttpService, TodoTaskInterface } from '../reference';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoTaskRepository implements TodoTaskInterface<TodoTaskModel> {
  constructor(private httpService: HttpService) {}

  baseURL: string =
    environment.host + environment.api + environment.composite.todoTask.mainUrl;

  search: ((filter: any) => Observable<TodoTaskModel[]>) | undefined;
  getAll(): Observable<any[]>  {
    return this.httpService.get({ url: `${this.baseURL}${environment.composite.todos.getAll}` });
  }
  create(data: TodoTaskModel | any): Observable<TodoTaskModel | any> {
    return this.httpService.post({
      url: `${this.baseURL}${environment.composite.todoTask.create}`,
      data,
    });  }
  update: ((data: TodoTaskModel) => Observable<TodoTaskModel>) | undefined;
  delete: ((data: TodoTaskModel) => Observable<boolean>) | undefined;
}
