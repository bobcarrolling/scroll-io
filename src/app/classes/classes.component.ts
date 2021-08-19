import * as classList from './classes-data.json';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  selected: any;
  classList: any = (classList as any).default;

  constructor() {}

  ngOnInit() {
    document.title = 'Scroll-io: Homebrew Class List For D&D 5e';
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        'content',
        'Classes and subclasses for players in Dungeons and Dragons 5th Edition, all custom made by The Cobbler Barrel.'
      );
  }

  selectClass(clas: any) {
    if (clas === this.selected) {
      this.deselectItem();
    } else {
      this.selected = clas;
    }
  }

  deselectClass() {
    this.selected = undefined;
  }
}
