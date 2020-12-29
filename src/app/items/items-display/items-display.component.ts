import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-items-display",
  templateUrl: "./items-display.component.html",
  styleUrls: ["./items-display.component.css"],
  host: {
    "(window:resize)": "onResize($event.target.innerWidth)",
    "(document:keypress)": "keyEvent($event)"
  }
})
export class ItemsDisplayComponent implements OnInit {
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
  column1: any[] = [];
  column2: any[] = [];

  private _item;
  @Input()
  get item(): any {
    return this._item;
  }
  set item(value: any) {
    if (!value) {
      this.showpage = false;
      this.timeout = setTimeout(() => {
        this._item = undefined;
      }, 400);
    } else {
      clearTimeout(this.timeout);
      this._item = value;
      this.splitName = this.item.name.split(" ");
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
    if (val.dice || val.bonus) {
      this.diceRoll = val.text;
    }
  }
  toRoll(text: string) {
    this.diceRoll = text;
  }

  deselect() {
    this.item = undefined;
  }

  isWord(word: string) {
    word = word.toLowerCase();
    if (word === "of" || word === "the") {
      return false;
    }
    return true;
  }
}
