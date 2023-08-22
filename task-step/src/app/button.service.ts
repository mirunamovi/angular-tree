import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  constructor() { }

  private buttonsDataTasks = [
    { text: 'Add Task', color: 'purple', action: 'add' },
    { text: 'Edit Task', color: 'magenta', action: 'edit' },
    { text: 'Delete Task', color: 'red', action: 'delete' }
  ];

  private buttonsDataSteps = [
    { text: 'Add Step', color: 'purple', action: 'add' },
    { text: 'Edit Step', color: 'magenta', action: 'edit' },
    { text: 'Delete Step', color: 'red', action: 'delete' }
  ];

  getButtonsDataTasks(): { text: string; color: string; action: string }[] {
    return this.buttonsDataTasks;
  }

  getButtonsDataSteps(): { text: string; color: string; action: string }[] {
    return this.buttonsDataSteps;
  }
}
