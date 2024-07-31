import { Observable } from 'rxjs';
import { RepoInterface } from './repo.interface';

export abstract class FeatureInterface<T> extends RepoInterface<T> {
  // get?:((id: string) => Observable<T> | null);
}
