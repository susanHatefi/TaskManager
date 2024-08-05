import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  BugModel,
  FeatureModel,
  GenericValidator,
  Severity,
  Status,
  TaskType,
  TodoFormValue,
  TodoTaskModel,
} from '../../../../reference';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import { debounce, debounceTime, map, switchMap } from 'rxjs';

@Component({
  selector: 'todo-modify-presentational',
  templateUrl: './modify-presentational.component.html',
  styleUrl: './modify-presentational.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyPresentationalComponent implements OnInit {
  selected: Date | null = null;
  startDate: Date = new Date();
  severity: string[] = Object.keys(Severity);
  taskTypes: string[] = Object.keys(TaskType);
  allStatus: string[] = Object.keys(Status);
  messages: string[] = [];
  @Input() form: FormGroup = new FormGroup({});
  @Input() data: BugModel | FeatureModel | TodoTaskModel | null = null;
  @Output() saveForm: EventEmitter<TodoFormValue> =
    new EventEmitter<TodoFormValue>();
  @Output() navigateBack: EventEmitter<any> = new EventEmitter<any>();

  RemoveControlsForFeature: string[] = [
    'severity',
    'affectedVersion',
    'images',
  ];
  RemoveControlsForBug: string[] = ['priority', 'component'];
  taskType: TaskType = TaskType.Task;

  constructor() {}
  ngOnInit(): void {
    if (this.data) {
      this.rebuildForm(this.data.taskType ?? this.taskType);
      this.form.patchValue(this.data);
      this.form.get('id')?.enable();
      this.form.get('isCompleted')?.enable();
      this.form.get('status')?.enable();
      this.selected = this.form.get('dueDate')?.value;
      this.startDate = this.form.get('createdDate')?.value ?? null;
    }
    this.form.valueChanges
      .pipe(
        debounceTime(100),
        map((data) => {
          const messages = new GenericValidator().getValidationsMessages(
            this.form
          );
          return Object.keys(messages);
        })
      )
      .subscribe((data) => (this.messages = data));
  }

  rebuildForm(value: TaskType) {
    let removableControls = [];
    this.taskType = value;
    switch (value) {
      case TaskType.Bug:
        removableControls = this.RemoveControlsForBug;
        break;
      case TaskType.Feature:
        removableControls = this.RemoveControlsForFeature;
        break;
      default:
        removableControls = [
          ...this.RemoveControlsForBug,
          ...this.RemoveControlsForFeature,
        ];
        break;
    }
    for (let controlName of removableControls) {
      this.form.removeControl(controlName);
    }
  }

  onTaskType(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.rebuildForm(<TaskType>value);
  }

  onAssinedToCahnge(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const SelectedOption = selectElement.options[
      selectElement.selectedIndex
    ] as HTMLOptionElement;

    this.form.get('assignedTo.fullName')?.setValue(SelectedOption.text);
  }

  onNavigateBack() {
    this.navigateBack.emit();
  }

  onSubmitForm() {
    if (this.form.valid) {
      this.saveForm.emit({
        value: this.form.value,
        taskType: this.taskType,
        isEdit: !!this.data,
      });
    }
  }

  changeDate(value: any) {
    if (value) {
      const date = new Date(value).toISOString();
      this.form.get('dueDate')?.patchValue(date);
    }
  }
}
