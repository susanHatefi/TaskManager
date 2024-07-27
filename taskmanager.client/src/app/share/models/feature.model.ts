import { TodoTaskModel, UserModel } from '../reference';

export interface FeatureModel extends TodoTaskModel {
  description: string;
  component: string;
  priority: number;
  assignedTo: UserModel;
}
