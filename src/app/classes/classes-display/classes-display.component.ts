import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes-display',
  templateUrl: './classes-display.component.html',
  styleUrls: ['./classes-display.component.css']
})
export class ClassesDisplayComponent implements OnInit {

  private _C;
  @Input()
  get C(): any {
    return this._C;
  }
  set C(value: any) {
    this._C = value;
  }
  private _SC;
  @Input()
  get SC(): any {
    return this._SC;
  }
  set SC(value: any) {
    this._SC = value;
  }

  constructor() { }

  ngOnInit() {
  }

  stringify(o: any): string {
    return JSON.stringify(o);
  }

}