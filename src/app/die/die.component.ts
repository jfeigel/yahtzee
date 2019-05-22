import { Component, Input, OnInit } from '@angular/core';

import { Die } from '../shared/die';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.scss']
})
export class DieComponent implements OnInit {
  @Input() data: Die;

  constructor() { }

  ngOnInit() {
  }

}
