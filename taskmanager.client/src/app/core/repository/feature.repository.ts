import { Injectable } from '@angular/core';
import {
  FeatureModel,
  HttpParamModel,
  TodoTaskModel,
} from '../../share/reference';
import { FeatureInterface, HttpService, TodoTaskInterface } from '../reference';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FeatureRepository implements FeatureInterface<FeatureModel> {
  baseURL: string =
    environment.host + environment.api + environment.composite.feature.mainUrl;

  constructor(private httpService: HttpService) {}

  getAll(): Observable<FeatureModel[]> | [] {
    return this.httpService.get({ url: '' });
  }
  create(data: FeatureModel | any): Observable<FeatureModel | any> {
    return this.httpService.post({
      url: `${this.baseURL}${environment.composite.feature.create}`,
      data,
    });
  }

  update(data: FeatureModel): Observable<any> {
    return this.httpService.put({
      url: `${this.baseURL}${environment.composite.feature.update}`,
      data,
    });
  }
  delete(id: string): Observable<any> {
    return this.httpService.delete({
      url: `${this.baseURL}${environment.composite.feature.delete}`,
      data: id,
    });
  }
}
