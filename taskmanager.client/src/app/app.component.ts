import { Component, OnInit } from '@angular/core';
import { MenuItemModel, MenuItems, State } from './reference';
import { Store } from '@ngrx/store';
import * as Selectors from './state/selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showSpinner$ = this.store.select(Selectors.showSpinnerSelector);
  constructor(private store: Store<State>) {}

  menuItems: MenuItemModel[] = MenuItems;

  ngOnInit() {}

  title = 'taskmanager.client';
}
