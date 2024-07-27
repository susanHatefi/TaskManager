import { Component, OnInit } from '@angular/core';
import { MenuItemModel, MenuItems } from './reference';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor() {}

  menuItems: MenuItemModel[] = MenuItems;

  ngOnInit() {}

  title = 'taskmanager.client';
}
