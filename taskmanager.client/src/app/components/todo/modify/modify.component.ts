import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidator, TaskType, TodoFormValue } from '../../../reference';
import moment from 'moment';
import {
  BugRepository,
  FeatureRepository,
  TodoTaskRepository,
} from '../../../core/reference';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { combineLatest, Subject, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../todo-state/state';
import * as Selectors from '../todo-state/selector';

@Component({
  selector: 'todo-modify',
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.scss',
})
export class ModifyComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  createSubject: Subject<TodoFormValue> = new Subject();
  create$ = combineLatest([this.createSubject.asObservable()]).pipe(
    switchMap(([data]) => {
      switch (data.taskType) {
        case TaskType.Feature:
          return data.isEdit
            ? this.featureRepository.update(data.value)
            : this.featureRepository.create(data.value);
          break;
        case TaskType.Bug:
          return data.isEdit
            ? this.bugRepository.update(data.value)
            : this.bugRepository.create(data.value);
          break;

        default:
          return data.isEdit
            ? this.todoTaskRepository.update(data.value)
            : this.todoTaskRepository.create(data.value);
          break;
      }
    }),
    tap((data) => this.router.navigateByUrl('/board'))
  );
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private featureRepository: FeatureRepository,
    private bugRepository: BugRepository,
    private todoTaskRepository: TodoTaskRepository,
    private store: Store<State>
  ) {}
  selectedTask$ = this.store.select(Selectors.getSelectedTask);
  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.fb.control({ value: '', disabled: true }),
      title: this.fb.control({ value: '', disabled: false }, [
        Validators.required,
      ]),
      description: this.fb.control({ value: '', disabled: false }),
      dueDate: this.fb.control({ value: '', disabled: false }, [
        Validators.required,
      ]),
      assignedTo: this.fb.group({
        id: this.fb.control({ value: '', disabled: false }),
        fullName: this.fb.control({ value: '', disabled: false }),
      }),
      isCompleted: this.fb.control({ value: false, disabled: true }),
      isDeleted: this.fb.control({ value: false, disabled: true }),
      status: this.fb.control({
        value: 'Todo',
        disabled: true,
      }),

      priority: this.fb.control({ value: '', disabled: false }, [
        Validators.required,
        new GenericValidator().rangeValidation(1, 4),
      ]),
      component: this.fb.control({ value: '', disabled: false }, [
        Validators.required,
      ]),

      severity: this.fb.control({ value: '', disabled: false }, [
        Validators.required,
      ]),
      affectedVersion: this.fb.control({ value: '', disabled: false }, [
        Validators.required,
      ]),
      images: this.fb.array([]),
    });
  }

  saveForm(data: TodoFormValue) {
    if (!data.value.assignedTo.id) {
      delete data?.value.assignedTo;
    }
    this.createSubject.next(data);
  }
  navigateBack() {
    this.router.navigateByUrl('/board');
  }
}
