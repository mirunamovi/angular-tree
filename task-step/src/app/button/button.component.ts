import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { ButtonService } from '../button.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit{
  @Input() text: string = ''; 
  @Input() color: string = '';
  @Input() action: string = '';

  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {

  }

  onClick() {
    this.btnClick.emit();
  }

}
