import { TaskType, ToDoStatus, UserModel } from '../reference';

export interface TodoTaskModel {
  id: string;
  title: string;
  dueDate: Date;
  createdBy: UserModel;
  createdDate: Date;
  isCompleted: boolean;
  isDeleted: boolean;
  status: ToDoStatus;
  taskType?: TaskType;
  // parent?: TodoTaskModel;
}
