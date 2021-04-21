import * as spellList from "./spells-data.json";
import { Component, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-spells",
  templateUrl: "./spells.component.html",
  styleUrls: ["./spells.component.css"]
})
export class SpellsComponent implements OnInit {
  searchUpdate = new Subject();
  routesub: Subscription;
  landingNav = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.searchUpdate.pipe(debounceTime(175)).subscribe(() => {
      this.filterList();
    });
  }

  ngOnDestroy() {
    this.routesub.unsubscribe();
  }

  ngOnInit() {
    document.title = "Scroll-io: Homebrew Spell List For D&D 5e";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Spells for mages and casters in Dungeons and Dragons 5th Edition, all custom made by The Cobbler Barrel."
      );
    this.filterList();
    this.sortClick(0);
    this.sortClick(0);
    this.routesub = this.route.params.subscribe(params => {
      if (this.selected && this.selected.urlname === params.selected) return;
      // already set with select
      // sets on nav, not on select
      if (params.selected) {
        setTimeout(() => {
          if (
            params.selected &&
            params.selected !== "creatures" &&
            this.spellList
          ) {
            let i = this.spellList.findIndex(
              c => c.urlname === params.selected
            );
            if (i >= 0) {
              //scrollIntoView is broken here
              document.getElementById("data-table").scrollTop =
                document.getElementById(params.selected).getBoundingClientRect()
                  .top -
                document
                  .getElementById("table-interior")
                  .getBoundingClientRect().top;
              this.selected = this.spellList[i];
              if (this.landingNav) {
                // works in app, not in preview
                history.replaceState({}, "", this.selected.urlname);
                document.title = "Scroll-io Spells: " + this.selected.name;
                this.landingNav = false;
              }
            }
          }
        });
      }
    });
  }

  leftBuffer = 0;
  onScroll(event) {
    this.leftBuffer = event.target.scrollLeft;
  }

  spellList: any = (spellList as any).default;

  nameSearch: string;
  levelSearch: string;
  schoolSearch: string;
  concToggle: string;
  ritualToggle: string;
  classSearch: string;

  readonly rightarrow = "&#9655;";
  readonly uparrow = "&#9650;";
  readonly downarrow = "&#9660;";
  icons = [
    this.downarrow,
    this.rightarrow,
    this.rightarrow,
    this.rightarrow,
    this.rightarrow,
    this.rightarrow
  ];

  selected: any;
  lastselected: any;

  selectSpell(spell: any) {
    if (spell === this.selected) {
      this.deselectSpell();
    } else {
      if (this.lastselected && spell && this.lastselected.name === spell.name) {
        //prevents history clogging when opening/closing the same row
        history.back();
      } else {
        this.router
          .navigate(["spells/" + spell.urlname], {
            replaceUrl: !this.selected
          })
          .then(() => {
            document.title = "Scroll-io Spells: " + spell.name;
          });
        this.selected = spell;
      }
      this.lastselected = undefined;
    }
  }

  deselectSpell() {
    this.router.navigate(["spells/"]).then(() => {
      document.title = "Scroll-io: Homebrew Spell List For D&D 5e";
    });
    this.lastselected = { ...this.selected };
    this.selected = undefined;
  }

  filteredCount = 0;
  filterList() {
    this.deselectSpell();
    this.filteredCount = 0;
    let nameSearch;
    if (this.nameSearch) {
      nameSearch = this.nameSearch.toLowerCase();
    }
    let levelSearch;
    if (this.levelSearch) {
      levelSearch = this.levelSearch.toLowerCase();
    }
    let schoolSearch;
    if (this.schoolSearch) {
      schoolSearch = this.schoolSearch.toLowerCase();
    }
    let classSearch;
    if (this.classSearch) {
      classSearch = this.classSearch.toLowerCase();
    }

    for (let spell of this.spellList) {
      spell.filtered = false;
      if (nameSearch && spell.name.toLowerCase().indexOf(nameSearch) < 0) {
        spell.filtered = true;
      }
      if (levelSearch && spell.level.toLowerCase().indexOf(levelSearch) < 0) {
        spell.filtered = true;
      }
      if (
        schoolSearch &&
        spell.school.toLowerCase().indexOf(schoolSearch) < 0
      ) {
        spell.filtered = true;
      }
      if (classSearch && spell.classes.toLowerCase().indexOf(classSearch) < 0 && spell.classes.toLowerCase().trim() !== 'any') {
        spell.filtered = true;
      }
      if (
        (this.concToggle === "yes" && !spell.concentration) ||
        (this.concToggle === "no" && spell.concentration)
      ) {
        spell.filtered = true;
      }
      if (
        (this.ritualToggle === "yes" && !spell.ritual) ||
        (this.ritualToggle === "no" && spell.ritual)
      ) {
        spell.filtered = true;
      }

      if (!spell.filtered) this.filteredCount++;
    }
  }

  sortClick(column: number) {
    this.deselectSpell();
    let asc = true;
    if (this.icons[column] !== this.downarrow) {
      this.icons[column] = this.downarrow;
    } else if (this.icons[column] !== this.uparrow) {
      this.icons[column] = this.uparrow;
      asc = false;
    }
    for (let i = 0; i < this.icons.length; i++) {
      if (i !== column) {
        this.icons[i] = this.rightarrow;
      }
    }
    switch (column) {
      case 0: {
        if (asc) {
          this.sortStringAsc("name");
        } else {
          this.sortStringDesc("name");
        }
        break;
      }
      case 1: {
        if (asc) {
          this.sortStringAsc("levelnum");
        } else {
          this.sortStringDesc("levelnum");
        }
        break;
      }
      case 2: {
        if (asc) {
          this.sortStringAsc("school");
        } else {
          this.sortStringDesc("school");
        }
        break;
      }
      case 3: {
        if (asc) {
          this.sortAsc("concentration");
        } else {
          this.sortDesc("concentration");
        }
        break;
      }
      case 4: {
        if (asc) {
          this.sortAsc("ritual");
        } else {
          this.sortDesc("ritual");
        }
        break;
      }
      case 5: {
        if (asc) {
          this.sortStringAsc("classes");
        } else {
          this.sortStringDesc("classes");
        }
        break;
      }
    }
  }

  sortStringAsc(prop: string) {
    this.spellList.sort(function(a, b) {
      a = a[prop];
      b = b[prop];
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  sortStringDesc(prop: string) {
    this.spellList.sort(function(a, b) {
      a = a[prop];
      b = b[prop];
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }

  sortAsc(prop: string) {
    this.spellList.sort(function(a, b) {
      if (!a[prop] && b[prop]) {
        return -1;
      }
      if (a[prop] && !b[prop]) {
        return 1;
      }
      a = a.name;
      b = b.name;
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  sortDesc(prop: string) {
    this.spellList.sort(function(a, b) {
      if (!a[prop] && b[prop]) {
        return 1;
      }
      if (a[prop] && !b[prop]) {
        return -1;
      }
      a = a.name;
      b = b.name;
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }
}
