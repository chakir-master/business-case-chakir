import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PackageService } from '../../../../services/package.service';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() tracking = false;
  @Input() driving = false;

  constructor(
  ) { }

ngOnInit(): void {    
    console.log('this.driving from detail');
    console.log(this.driving);
    console.log('this.tracking from detail');
    console.log(this.tracking);
    
  }

}
