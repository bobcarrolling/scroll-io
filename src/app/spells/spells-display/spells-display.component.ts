import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spells-display',
  templateUrl: './spells-display.component.html',
  styleUrls: ['./spells-display.component.css']
})
export class SpellsDisplayComponent implements OnInit {

  mobile = 0;
  currentWidth = 0;
  onResize(innerWidth) {
    this.currentWidth = innerWidth;
    if (
      this.currentWidth <
      40 * parseFloat(getComputedStyle(document.documentElement).fontSize)
    ) {
      this.mobile = 1;
    } else {
      this.mobile = 0;
    }
  }

  keyEvent(event: KeyboardEvent) {
    switch (event.code) {
      case "BracketLeft":
        break;
      case "BracketRight":
        break;
      case "Backslash":
        break;
    }
  }

  timeout: number;
  showpage = false;

  private _spell;
  @Input()
  get spell(): any {
    return this._spell;
  }
  set spell(value: any) {
    if (!value) {
      this.showpage = false;
      this.timeout = setTimeout(() => {
        this._spell = undefined;
      }, 400);
    } else {
      clearTimeout(this.timeout);
      this._spell = value;
      this.splitName = this.spell.name.split(" ");
      this.showpage = true;
    }
  }

  constructor() {}

  splitName: string[];

  ngOnInit() {
    this.onResize(window.innerWidth);
  }

  diceRoll: string;
  checkRoll(val: any) {
    if (val.dice) {
      this.diceRoll = val.text;
    }
  }
  toRoll(text: string) {
    this.diceRoll = text;
  }

  deselect() {
    this.spell = undefined;
  }

  isWord(word: string) {
    word = word.toLowerCase();
    if (word === "of" || word === "the") {
      return false;
    }
    return true;
  }

}