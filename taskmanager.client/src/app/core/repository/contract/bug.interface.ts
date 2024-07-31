import { Observable } from 'rxjs';
import { RepoInterface } from './repo.interface';

export abstract class BugInterface<T> extends RepoInterface<T> {
}
