import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoTaskRepository } from '../../../core/reference';
import * as ApiActions from './action.api';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';

// @Injectable()
// export class TodoFeatureEffects {
//   constructor(
//     private actions$: Actions,
//     private todoRepository: TodoTaskRepository
//   ) {}

//   // loadingTodo$ = createEffect(() =>
//   //   this.action$?.pipe(
//   //     ofType(ApiActions.loadingTodoBoardAction),
//   //     exhaustMap((action) =>
//   //       this.todoRepository.getAll().pipe(
//   //         map(
//   //           (data) =>
//   //             ApiActions.SuccessToloadTodoBoardAction({ todoList: data }),
//   //           catchError((error) =>
//   //             of(ApiActions.FaildToloadTodoBoardAction({ error }))
//   //           )
//   //         )
//   //       )
//   //     )
//   //   )
//   // );
// }
