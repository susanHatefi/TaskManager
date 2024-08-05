import { Injectable } from '@angular/core';
import { BugModel } from '../../share/reference';
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
  update(data: BugModel): Observable<any> {
    return this.httpService.put({
      url: `${this.baseURL}${environment.composite.bug.update}`,
      data,
    });
  }
  delete(id:string):Observable<any>{
    return this.httpService.delete({url:`${this.baseURL}${environment.composite.bug.delete}`,data:id})
  }
}
