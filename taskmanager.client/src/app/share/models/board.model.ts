import { BugModel, FeatureModel, TodoTaskModel, UserModel } from '../reference';

export interface BoardModel {
  Todo: (TodoTaskModel | FeatureModel | BugModel)[];
  InProgress: (TodoTaskModel | FeatureModel | BugModel)[];
  InReview: (TodoTaskModel | FeatureModel | BugModel)[];
  Done: (TodoTaskModel | FeatureModel | BugModel)[];
}
