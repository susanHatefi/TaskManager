import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BoardModel, Status, TodoTaskModel } from '../../../../reference';
import { BugModel } from '../../../../share/models/bug.model';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'todo-view-presentational',
  templateUrl: './presentational.component.html',
  styleUrl: './presentational.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationalComponent {
  statusKeys: string[] = Object.keys(Status);
  status: string[] = Object.values(Status);
  @Input() cards: BoardModel | null = null;

  @Output() onCreateTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchTask: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  addNewTask() {
    this.onCreateTask.emit();
  }
  searchInTasks(value: string) {
    this.onSearchTask.emit(value);
  }
  getCards(cards: BoardModel, index: number): any[] {
    const key = this.statusKeys[index] as keyof BoardModel;
    return cards[key];
  }
}
