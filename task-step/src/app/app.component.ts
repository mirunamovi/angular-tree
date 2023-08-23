import { Component, Input } from '@angular/core';
import { ButtonService } from './button.service';

interface Step {
  name: string;
  owner: string;
  children?: Step[];
}

interface Task {
  name: string;
  children?: Step[];
} 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-step';

  activeButtonGroup?: 'task' | 'step'; 
  isTaskNodeClicked: boolean = false;
  isStepNodeClicked: boolean = false;

  constructor(private buttonService: ButtonService) {}

  getButtonsData(): { text: string; color: string; action: string }[] {
    if (this.activeButtonGroup === 'task') {
      return this.buttonService.getButtonsDataTasks();
    } else if (this.activeButtonGroup === 'step') {
      return this.buttonService.getButtonsDataSteps();
    }
    return []; 
  }


  nodeDoubleClicked(eventData: { event: Event, node: any }): void {
    const node = eventData.node;
    if (this.isStepNode(node)) {
      this.activeButtonGroup = 'step';
      this.isStepNodeClicked = true;
      this.isTaskNodeClicked = false;

    } else if (this.isTaskNode(node)) {
      this.activeButtonGroup = 'task';
      this.isTaskNodeClicked = true;
      this.isStepNodeClicked = false;
    }
    
  }

  isStepNode(node: Step | Task): node is Step {

    return (node as Step).owner !== undefined;
  }

  isTaskNode(node: Step | Task): node is Step {

    return (node as Step).owner == undefined;
  }

  buttonsDataTask(): { text: string; color: string; action: string }[] {
    return this.buttonService.getButtonsDataTasks();
  }

  buttonsDataStep(): { text: string; color: string; action: string }[] {
    return this.buttonService.getButtonsDataSteps();
  }






}
