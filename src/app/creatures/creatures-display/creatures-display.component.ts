import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-creatures-display",
  templateUrl: "./creatures-display.component.html",
  styleUrls: ["./creatures-display.component.css"],
  host: {
    "(window:resize)": "onResize($event.target.innerWidth)",
    "(document:keypress)": "keyEvent($event)"
  }
})
export class CreaturesDisplayComponent implements OnInit {
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
  private _creature;
  @Input()
  get creature(): any {
    return this._creature;
  }
  set creature(value: any) {
    if (!value) {
      this.showpage = false;
      this.timeout = setTimeout(() => {
        this._creature = undefined;
      }, 400);
    } else {
      clearTimeout(this.timeout);
      this._creature = value;
      this.splitName = this.creature.name.split(" ");
      this.showpage = true;
    }
  }

  constructor() {}

  splitName: string[];

  ngOnInit() {
    this.onResize(window.innerWidth);
  }

  traitsRight(creature: any) {
    if (this.actionsLeft(creature)){
      return false;
    }
    const LIMIT = 400 + this.addSpacing(creature);
    console.log(LIMIT);
    if (!creature.reactions && !creature.legendary && !creature.mythic && (creature.actions && creature.traitsize < LIMIT && creature.actionsize + creature.traitsize < LIMIT || !creature.actions || creature.actions && creature.actionsize < LIMIT)) {
      return true;
    }
    return false;
  }

  actionsLeft(creature: any) {
    if (creature.legendary || creature.mythic || !this.mobile) {
      return false;
    }
    if ((!creature.actions && creature.reactions && creature.reactionsize < 400)
    ||(creature.actions && !creature.reactions && creature.actionsize < 400)) {
      return true;
    }
    return false;
  }

  addSpacing(creature: any): number {
    let sum = 0;
    if (creature.saves) {
      sum += 60;
    }
    if (creature.skills) {
      sum += 60;
    }
    if (creature.vuln) {
      sum += 60;
    }
    if (creature.resist) {
      sum += 60;
    }
    if (creature.immune) {
      sum += 60;
    }
    if (creature.immunity) {
      sum += 60;
    }
    return sum;
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
    this.creature = undefined;
  }

  proficiencyTitle(value: string): string {
    if (this.creature.saves && this.creature.saves[value]) {
      return "Proficiency in Saving Throw";
    }
    return undefined;
  }

  isWord(word: string) {
    word = word.toLowerCase();
    if (word === "of" || word === "the") {
      return false;
    }
    return true;
  }

  quickScroll(rightwards: boolean) {
    let container = document.getElementById("container");
    if (rightwards) {
      container.scrollLeft = 1000;
    }
    else {
      container.scrollLeft = 0;
    }
  }
}
