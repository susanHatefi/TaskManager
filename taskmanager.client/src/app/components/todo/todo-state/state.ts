import * as MainState from '../../../reference';
export interface ToDoState {
  showAssignedTo: boolean;
  list: MainState.BoardModel | null;
}

export interface State extends MainState.State {
  todo: ToDoState;
}
