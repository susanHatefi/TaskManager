import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { State } from '../../reference';
import * as Actions from '../../state/action.page';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private store: Store<State>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    setTimeout(() => {
      this.store.dispatch(Actions.toggleSpinner());
    }, 0)
    const reqClone = req.clone();
    return next.handle(reqClone).pipe(
      catchError((error) => {
        console.log(error);
        return of(error);
      }),
      finalize(() =>
        setTimeout(() => {
          this.store.dispatch(Actions.toggleSpinner());
        }, 300)
      )
    );
  }
}
