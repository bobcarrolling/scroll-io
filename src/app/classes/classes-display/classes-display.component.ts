import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes-display',
  templateUrl: './classes-display.component.html',
  styleUrls: ['./classes-display.component.css'],
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
    this.splitClassName = ('The ' + this.C.name + ' Class').split(' ');
    this.splitSubclassName = ('Subclass: ' + this.SC.name).split(' ');
  }

  splitClassName: string[];
  splitSubclassName: string[];
  fullfeatures;

  private _showIntro: boolean;
  @Input()
  get showIntro(): boolean {
    return this._showIntro;
  }
  set showIntro(value: boolean) {
    this._showIntro = value;
  }
  private _showProf: boolean;
  @Input()
  get showProf(): boolean {
    return this._showProf;
  }
  set showProf(value: boolean) {
    this._showProf = value;
  }
  private _showTable: boolean;
  @Input()
  get showTable(): boolean {
    return this._showTable;
  }
  set showTable(value: boolean) {
    this._showTable = value;
  }

  constructor() {}

  ngOnInit() {}

  getTextAlign(str: string): string {
    const a = str.indexOf(':');
    const b = str.lastIndexOf(':');
    if (a === 0) {
      if (a === b) {
        return 'left';
      }
      return 'center';
    }
    return 'right';
  }

  stringify(o: any): string {
    return JSON.stringify(o);
  }

  isWord(word: string) {
    word = word.toLowerCase();
    if (word === 'of' || word === 'the') {
      return false;
    }
    return true;
  }

  returnKeys(obj: Object): string[] {
    return Object.keys(obj);
  }

  replaceAll(os: string, s1: string, s2: string): string {
    return os.replace(new RegExp(s1, 'g'), s2);
  }
}
