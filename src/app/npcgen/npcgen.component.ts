import { Component, OnInit } from '@angular/core';
import * as list from './npcgen-data.json';

@Component({
  selector: 'app-npcgen',
  templateUrl: './npcgen.component.html',
  styleUrls: ['./npcgen.component.css']
})
export class NpcgenComponent implements OnInit {
  list: any = (list as any).default;
  pick: any;
  gender: string;
  genderNoun: string;
  beardBoolean: boolean = false;

  constructor() {}

  ngOnInit() {
    document.title = 'Scroll-io: NPC Generator';
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        'content',
        'Character attribute generator for writing or any role playing game, all custom made by The Cobbler Barrel.'
      );
    this.setSelected();
  }

  setGender() {
    const r = Math.floor(Math.random() * this.list.gender.length);
    this.gender = this.list.gender[r];
    this.genderNoun = this.list.genderNoun[r];
  }

  setSelected() {
    this.setGender();
    if (Math.random() < 0.7) {
      this.beardBoolean = true;
    } else {
      this.beardBoolean = false;
    }
    this.pick = {
      name: {
        first: this.randL(this.list.name.first[this.gender]),
        last: this.randL(this.list.name.last)
      },
      species: ['a', 'b'],
      appearance: {
        bodyshape: this.randL(this.list.appearance.bodyshape),
        age: this.randL(this.list.appearance.age),
        complexion: this.randL(this.list.appearance.complexion),
        hairlength: this.randWeightedM(this.list.appearance.hairlength),
        beardstyle: this.randL(this.list.appearance.beardstyle),
        hairstyle: this.randL(this.list.appearance.hairstyle),
        haircolor: this.randL(this.list.appearance.haircolor),
        eyecolor: this.randL(this.list.appearance.eyecolor),
        expression: this.randL(this.list.appearance.expression),
        quirk: this.randL(this.list.appearance.quirk),
        clothing: this.randL(this.list.appearance.clothing[this.gender])
      },
      backstory: {
        cause: this.randL(this.list.backstory.cause),
        effect: this.randL(this.list.backstory.effect)
      }
    };
  }

  randL(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  randWeighted(arr: string[]): string {
    const table: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = arr.length - i; j > 0; j--) {
        table.push(i);
      }
    }
    return arr[table[Math.floor(Math.random() * table.length)]];
  }

  vowel(s: string): boolean {
    return (
      s[0] === 'a' ||
      s[0] === 'e' ||
      s[0] === 'i' ||
      s[0] === 'o' ||
      s[0] === 'u' ||
      s[0] === 'h'
    );
  }

  randWeightedM(arr: string[]): string {
    if (this.gender === 'male') {
      return this.randWeighted(arr);
    }
    return this.randL(arr);
  }

  findVal(obj: any, path: string, separator = '.'): string[] {
    var properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
  }

  setVal(obj: any, path: string, value: string, separator = '.') {
    path
      .split(separator)
      .reduce(
        (o, p, i) =>
          (o[p] = path.split(separator).length === ++i ? value : o[p] || {}),
        obj
      );
  }

  reroll(path: string) {
    if (path === 'name.first') {
      this.pick.name.first = this.randL(this.list.name.first[this.gender]);
    } else if (path === 'appearance.clothing') {
      this.pick.appearance.clothing = this.randL(
        this.list.appearance.clothing[this.gender]
      );
    } else if (path === 'gender') {
      this.setGender();
    } else {
      this.setVal(this.pick, path, this.randL(this.findVal(this.list, path)));
    }
  }
}
