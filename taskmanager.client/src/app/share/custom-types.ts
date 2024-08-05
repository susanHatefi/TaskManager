import { TaskType } from './enums';

export type TodoFormValue = {
  value: any;
  taskType: TaskType;
  isEdit: boolean;
};
