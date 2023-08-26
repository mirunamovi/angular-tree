import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  constructor() { }

  
  private buttonsDataTasks = [
    { text: 'Edit ', color: 'magenta', action: 'edit' },
    { text: 'Delete ', color: 'red', action: 'delete' },
    { text: 'Add Step in ', color: 'purple', action: 'add' }
  ];

  private buttonsDataSteps = [
    { text: 'Edit ', color: 'magenta', action: 'edit' },
    { text: 'Delete ', color: 'red', action: 'delete' },
    { text: 'Add Step in ', color: 'purple', action: 'add' }

  ];

  getButtonsDataTasks(): { text: string; color: string; action: string }[] {
    return this.buttonsDataTasks;
  }

  getButtonsDataSteps(): { text: string; color: string; action: string }[] {
    return this.buttonsDataSteps;
  }

}
