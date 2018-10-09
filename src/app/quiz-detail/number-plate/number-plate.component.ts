import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'number-plate',
  templateUrl: './number-plate.component.html',
  styleUrls: ['./number-plate.component.scss']
})
export class NumberPlateComponent implements OnInit {
  @Input('questionsByCategory') questions;
  
  constructor() { }

  ngOnInit() {
    this.questions.subscribe((data) => {
      console.log(data);
      
    })
    
  }
}
