import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { KeyValue, Severity, Status, TaskType } from '../../../../reference';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'todo-modify-presentational',
  templateUrl: './modify-presentational.component.html',
  styleUrl: './modify-presentational.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyPresentationalComponent implements OnInit {
  severity: string[] = Object.keys(Severity);
  taskTypes: string[] = Object.keys(TaskType);
  allStatus: string[] = Object.keys(Status);
  @Input() form: FormGroup = new FormGroup({});
  @Output() saveForm: EventEmitter<KeyValue> = new EventEmitter<KeyValue>();
  @Output() navigateBack: EventEmitter<any> = new EventEmitter<any>();

  RemoveControlsForFeature: string[] = [
    'severity',
    'affectedVersion',
    'images',
  ];
  RemoveControlsForBug: string[] = ['priority', 'component'];
  taskType: TaskType = TaskType.Task;

  constructor() {}
  ngOnInit(): void {}

  rebuildForm(removableControls: string[]) {
    for (let controlName of removableControls) {
      this.form.removeControl(controlName);
    }
  }

  onTaskType(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.taskType = <TaskType>value;
    switch (value) {
      case TaskType.Bug:
        this.rebuildForm(this.RemoveControlsForBug);
        break;
      case TaskType.Feature:
        this.rebuildForm(this.RemoveControlsForFeature);
        break;
      default:
        this.rebuildForm([
          ...this.RemoveControlsForBug,
          ...this.RemoveControlsForFeature,
        ]);
        break;
    }
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
      this.saveForm.emit({ value: this.form.value, taskType: this.taskType });
    }
  }
}
