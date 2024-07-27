import * as MainState from '../../../reference';
export interface ToDoState {
  showAssignedTo: boolean;
}

export interface State extends MainState.State {
  todo: ToDoState;
}
