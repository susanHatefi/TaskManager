import { Injectable } from '@angular/core';
import {
  BoardModel,
  HttpParamModel,
  TodoTaskModel,
} from '../../share/reference';
import { HttpService, TodoTaskInterface } from '../reference';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoTaskRepository implements TodoTaskInterface<TodoTaskModel> {
  constructor(private httpService: HttpService) {}

  baseTodoUrl: string =
    environment.host + environment.api + environment.composite.todos.mainUrl;
  baseURL: string =
    environment.host + environment.api + environment.composite.todoTask.mainUrl;

  search: ((filter: any) => Observable<TodoTaskModel[]>) | undefined;
  getAll(): Observable<TodoTaskModel[]> {
    return this.httpService.get({
      url: `${this.baseTodoUrl}`,
    });
  }
  getBoardData(): Observable<BoardModel> {
    return this.httpService.get({
      url: `${this.baseTodoUrl}${environment.composite.todos.getAll}`,
    });
  }

  create(data: TodoTaskModel | any): Observable<TodoTaskModel | any> {
    return this.httpService.post({
      url: `${this.baseURL}${environment.composite.todoTask.create}`,
      data,
    });
  }

  update(data: TodoTaskModel): Observable<any> {
    return this.httpService.put({
      url: `${this.baseURL}${environment.composite.todoTask.update}`,
      data,
    });
  }
  delete(id: string): Observable<any> {
    return this.httpService.delete({
      url: `${this.baseURL}${environment.composite.todoTask.delete}`,
      data: id,
    });
  }
}
