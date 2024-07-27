import { Observable } from 'rxjs';

export abstract class RepoInterface<T> {
  // get?:((id: string) => Observable<T> | null);
  getAll: (() => Observable<T[]> | []) | undefined;
  create: ((data: T | any) => Observable<T | any>) | undefined;
  update: ((data: T) => Observable<T>) | undefined;
  delete: ((data: T) => Observable<boolean>) | undefined;
}
