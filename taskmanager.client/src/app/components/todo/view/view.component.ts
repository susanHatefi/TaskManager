import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../todo-state/state';
import * as PageActions from '../todo-state/action.page';
import * as ApiActions from '../todo-state/action.api';
import * as Selectors from '../todo-state/selector';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent implements OnInit {
  list$: Observable<any[]> = of([]);

  constructor(private router: Router, private store: Store<State>) {
    // this.list$ = this.store.select(Selectors.getToDoList);
  }

  ngOnInit(): void {
    this.store.dispatch(ApiActions.loadingTodoBoardAction());
  }

  createTask() {
    this.router.navigateByUrl('board/create');
  }
  filterData(value: string) {}
}
