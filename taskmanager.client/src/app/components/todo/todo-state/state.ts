import * as MainState from '../../../reference';
export interface ToDoState {
  showAssignedTo: boolean;
  list: MainState.BoardModel | null;
  selectedTask: { id: string; status: MainState.ToDoStatus }|null;
}

export interface State extends MainState.State {
  todo: ToDoState;
}
