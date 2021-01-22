import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-rollview",
  templateUrl: "./rollview.component.html",
  styleUrls: ["./rollview.component.css"]
})
export class RollviewComponent implements OnInit {
  constructor() {}

  _diceRoll: string;
  get diceRoll(): string {
    return this._diceRoll;
  }
  @Input() set diceRoll(value: string) {
    this._diceRoll = value;
    if (value) {
      this.doRoll();
    }
    this.diceRollChange.emit(this.diceRoll);
  }
  @Output() diceRollChange = new EventEmitter();

  _scale: number;
  get scale(): number {
    return this._scale;
  }
  @Input() set scale(value: number) {
    if (value === 1) {
      value = this.scale1;
    }
    if (value === 2) {
      value = this.scale2;
    }
    if (value === 3) {
      value = this.scale3;
    }
    this._scale = value;
  }

  readonly scale1 = 1.5;
  readonly scale2 = 1.8;
  readonly scale3 = 2.1;

  diceResult: number;

  d = [];
  otherDice = [];

  ngOnInit() {
    this.doRoll();
  }

  doRoll() {
    this.diceResult = undefined;
    this.d = [...Array(21)].map(x => []);
    this.otherDice = [];
    if (this.diceRoll && this.diceRoll.length > 0) {
      let num = 1;
      let die = 20;
      let bonus = 0;
      if (this.diceRoll[0] === "+" || this.diceRoll[0] === "-") {
        bonus = parseFloat(this.diceRoll.substring(1));
        if (this.diceRoll[0] === "-") {
          bonus = -bonus;
        }
      } else if (this.diceRoll[0] === "d") {
        die = parseFloat(this.diceRoll.substring(1));
      } else {
        const x = this.diceRoll.indexOf("d");
        let y = this.diceRoll.indexOf("+");
        let negative = false;
        if (y < 0) {
          y = this.diceRoll.indexOf("-");
          if (y >= 0) {
            negative = true;
          }
        }
        num = parseFloat(this.diceRoll.substring(0, x));
        if (y < 0) {
          die = parseFloat(this.diceRoll.substring(x + 1));
        } else {
          die = parseFloat(this.diceRoll.substring(x + 1, y - 1));
        }
        if (y >= 0) {
          bonus = parseFloat(this.diceRoll.substring(y + 1));
          if (negative) {
            bonus = -bonus;
          }
        }
      }
      this.roll(num, die, bonus);
      if (
        die !== 4 &&
        die !== 6 &&
        die !== 8 &&
        die !== 10 &&
        die !== 12 &&
        die !== 20
      ) {
        this.otherDice = this.d[die];
      }
    }
  }

  roll(num: number, die: number, bonus: number) {
    for (let n = 0; n < num; n++) {
      this.d[die].push(this.random(die));
      for (let t = 70; t < 1000; t = t * 1.25) {
        setTimeout(() => {
          this.d[die][n] = this.random(die);
        }, t);
        if (num >= 15) {
          if (this.scale === 1.66) {
            this.scale = 3;
          }
          break;
        }
      }
    }
    setTimeout(() => {
      let sum = 0;
      for (let n = 0; n < num; n++) {
        sum += this.d[die][n];
      }
      this.diceResult = sum + bonus;
      this.d[die].sort(function(a, b) {
        return a - b;
      });
    }, 1000);
  }

  random(die: number): number {
    return Math.floor(Math.random() * die + 1);
  }
}
