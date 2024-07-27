import { Injectable } from '@angular/core';
import { HttpParamModel, TodoTaskModel } from '../../share/reference';
import { HttpService, TodoTaskInterface } from '../reference';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoTaskRepository implements TodoTaskInterface<TodoTaskModel> {
  constructor(private httpService: HttpService) {}
  search: ((filter: any) => Observable<TodoTaskModel[]>) | undefined;
  getAll(): Observable<TodoTaskModel[]> | [] {
    return this.httpService.get({ url: '' });
  }
  create(data: TodoTaskModel | any): Observable<TodoTaskModel | any> {
    return this.create({ url: '', data });
  }
  update: ((data: TodoTaskModel) => Observable<TodoTaskModel>) | undefined;
  delete: ((data: TodoTaskModel) => Observable<boolean>) | undefined;
}
