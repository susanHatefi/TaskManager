import * as MainState from '../../../reference';
export interface ToDoState {
  showAssignedTo: boolean;
  list:any[];
}

export interface State extends MainState.State {
  todo: ToDoState;
}
