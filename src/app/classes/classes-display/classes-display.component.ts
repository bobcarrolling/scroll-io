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
    this.compileFeatures();
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

  compileFeatures() {
    // SET FULLFEATURE ARRAY LIST ACCORDING TO CLASS TABLE
    // this.fullfeatures = [];
    // let c = 0;
    // let sc = 0;
    // for (const row of this.C.classtable.slice(2)) {
    //   if (row[2] === '—') {
    //     break;
    //   }
    //   let f = row[2].split(', ');
    //   for (const str of f) {
    //     if (
    //       str.indexOf(this.C.name) >= 0 &&
    //       str.indexOf('feature') > this.C.name.length
    //     ) {
    //       this.fullfeatures.push(this.SC.features[sc]);
    //       sc++;
    //     } else {
    //       this.fullfeatures.push(this.C.features[c]);
    //       c++;
    //     }
    //     let vc = false;
    //     let vsc = false;
    //     while (!vc && !vsc) {
    //       if (!this.C.features[c] || this.C.features[c].name.indexOf('#') < 0) {
    //         vc = true;
    //       } else {
    //         c++;
    //       }
    //       if (
    //         !this.SC.features[sc] ||
    //         this.SC.features[sc].name.indexOf('#') < 0
    //       ) {
    //         vsc = true;
    //       } else {
    //         sc++;
    //       }
    //     }
    //   }
    // }
    // console.log(this.fullfeatures);
  }

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
}
