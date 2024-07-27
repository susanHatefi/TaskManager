import { Observable } from 'rxjs';
import { RepoInterface } from './repo.interface';

export abstract class TodoTaskInterface<T> extends RepoInterface<T> {
  // get?:((id: string) => Observable<T> | null);

  search: ((filter: any) => Observable<T[]>) | undefined;
}
