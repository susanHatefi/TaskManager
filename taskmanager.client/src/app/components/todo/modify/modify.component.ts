import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status, TaskType } from '../../../reference';
import moment from 'moment';
import {
  BugRepository,
  FeatureRepository,
  TodoTaskRepository,
} from '../../../core/reference';

@Component({
  selector: 'todo-modify',
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.scss',
})
export class ModifyComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
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

  saveForm(data: any) {
    switch (data.taskType) {
      case TaskType.Feature:
        this.featureRepository
          .create(data.value)
          .subscribe((data) => console.log(data));
        break;
      case TaskType.Bug:
        this.bugRepository
          .create(data.value)
          .subscribe((data) => console.log(data));
        break;

      default:
        this.todoTaskRepository
          .create(data.value)
          .subscribe((data) => console.log(data));
        break;
    }
  }
}
