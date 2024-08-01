import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeyValue, Status, TaskType } from '../../../reference';
import moment from 'moment';
import {
  BugRepository,
  FeatureRepository,
  TodoTaskRepository,
} from '../../../core/reference';
import { Router } from '@angular/router';
import {
  combineLatest,
  concat,
  map,
  mergeMap,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'todo-modify',
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.scss',
})
export class ModifyComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  createSubject: Subject<KeyValue> = new Subject();
  create$ = combineLatest([this.createSubject.asObservable()]).pipe(
    switchMap(([data]) => {
      switch (data.taskType) {
        case TaskType.Feature:
          return this.featureRepository.create(data.value);
          break;
        case TaskType.Bug:
          return this.bugRepository.create(data.value);
          break;

        default:
          return this.todoTaskRepository.create(data.value);
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
    private todoTaskRepository: TodoTaskRepository
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.fb.control({ value: '', disabled: true }),
      title: this.fb.control({ value: '', disabled: false }, [
        Validators.required,
      ]),
      description: this.fb.control({ value: '', disabled: false }),
      dueDate: this.fb.control({ value: '', disabled: false }),
      assignedTo: this.fb.group({
        id: this.fb.control({ value: '', disabled: false }, [
          Validators.required,
        ]),
        fullName: this.fb.control({ value: '', disabled: false }),
      }),
      isCompleted: this.fb.control({ value: false, disabled: false }),
      isDeleted: this.fb.control({ value: false, disabled: false }),
      status: this.fb.control({
        value: 'Todo',
        disabled: false,
      }),

      priority: this.fb.control({ value: '', disabled: false }, [
        Validators.required,
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

  saveForm(data: KeyValue) {
    this.createSubject.next(data);
  }
  navigateBack() {
    this.router.navigateByUrl('/board');
  }
}
