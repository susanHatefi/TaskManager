import { Injectable } from '@angular/core';
import {
  BugModel
} from '../../share/reference';
import { BugInterface, FeatureInterface, HttpService } from '../reference';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BugRepository implements BugInterface<BugModel> {
  baseURL: string =
    environment.host + environment.api + environment.composite.bug.mainUrl;

  constructor(private httpService: HttpService) {}

  getAll(): Observable<BugModel[]> | [] {
    return this.httpService.get({ url: '' });
  }
  create(data: BugModel | any): Observable<BugModel | any> {
    return this.httpService.post({
      url: `${this.baseURL}${environment.composite.bug.create}`,
      data,
    });
  }
  update: ((data: BugModel) => Observable<BugModel>) | undefined;
  delete: ((data: BugModel) => Observable<boolean>) | undefined;
}
