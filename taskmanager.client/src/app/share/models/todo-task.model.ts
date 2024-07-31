import { UserModel } from '../reference';

export interface TodoTaskModel {
  id: string;
  title: string;
  dueDate: Date;
  createdBy: UserModel;
  createdDate: Date;
  isCompleted: boolean;
  isDeleted: boolean;
  // parent?: TodoTaskModel;
}
