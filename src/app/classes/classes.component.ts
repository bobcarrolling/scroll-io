import * as classList from './classes-data.json';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  selectedClass: any;
  selectedSubclass: any;
  classList: any = (classList as any).default;
  showIntro: boolean = true;
  showProf: boolean = true;
  showTable: boolean = true;

  constructor() {}

  ngOnInit() {
    document.title = 'Scroll-io: Homebrew Class List For D&D 5e';
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        'content',
        'Classes and subclasses for players in Dungeons and Dragons 5th Edition, all custom made by The Cobbler Barrel.'
      );
    for (const c of this.classList) {
      if (c.subclasses) {
        for (const sc of c.subclasses) {
          if (sc.name) {
            this.selectedClass = c;
            this.selectedSubclass = sc;
            return;
          }
        }
      }
    }
  }

  selectClass(clas: any) {
    if (clas.subclasses) {
      if (clas !== this.selectedClass) {
        this.selectedClass = clas;
        this.selectedSubclass = undefined;
      }
    }
  }

  selectSublass(subclass: any) {
    if (subclass.name) {
      if (subclass !== this.selectedSubclass) {
        this.selectedSubclass = subclass;
      }
    }
  }

  scroll() {
    document
      .getElementById('data-table')
      .scrollTo({ top: 0, behavior: 'smooth' });
  }

  skipTo(id: string) {
    document.getElementById(id).scrollIntoView({ block: 'center' });
  }
}
