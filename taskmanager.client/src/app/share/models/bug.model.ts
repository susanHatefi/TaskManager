import { Severity, TodoTaskModel, UserModel } from '../reference';

export interface BugModel extends TodoTaskModel {
  description: string;
  severity: Severity;
  affectedVersion: string;
  assignedTo: UserModel;
  images: FormData;
}
