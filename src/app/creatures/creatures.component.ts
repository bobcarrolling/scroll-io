import * as creatureList from "./creature-data.json";
import { Component, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-creatures",
  templateUrl: "./creatures.component.html",
  styleUrls: ["./creatures.component.css"]
})
export class CreaturesComponent implements OnInit {
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
    document.title = "Scroll-io: Homebrew Creature List For D&D 5e";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Monsters and statblocks for enemies in Dungeons and Dragons 5th Edition, all custom made by The Cobbler Barrel."
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
            this.creatureList
          ) {
            let i = this.creatureList.findIndex(
              c => c.urlname === params.selected
            );
            if (i >= 0) {
              document.getElementById("data-table").scrollTop =
                document.getElementById(params.selected).getBoundingClientRect()
                  .top -
                document
                  .getElementById("table-interior")
                  .getBoundingClientRect().top;
              this.selected = this.creatureList[i];
              if (this.landingNav) {
                // works in app, not in preview
                history.replaceState({}, "", this.selected.urlname);
                document.title = "Scroll-io Creatures: " + this.selected.name;
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

  creatureList: any = (creatureList as any).default;

  nameSearch: string;
  crSearch: string;
  typeSearch: string;
  alignSearch: string;
  sizeSearch: string;
  abiSearch: string;

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

  selectCreature(creature: any) {
    creature.showinfo = false;
    if (creature === this.selected) {
      this.deselectCreature();
    } else {
      if (
        this.lastselected &&
        creature &&
        this.lastselected.name === creature.name
      ) {
        //prevents history clogging when opening/closing the same row
        history.back();
      } else {
        this.router
          .navigate(["creatures/" + creature.urlname], {
            replaceUrl: !this.selected
          })
          .then(() => {
            document.title = "Scroll-io Creatures: " + creature.name;
          });
        this.selected = creature;
        setTimeout(() => {
          document.getElementById("data-table").scrollTop =
                document.getElementById(this.selected.urlname).getBoundingClientRect()
                  .top -
                document
                  .getElementById("table-interior")
                  .getBoundingClientRect().top;
        });
      }
      this.lastselected = undefined;
    }
  }

  deselectCreature() {
    this.router.navigate(["creatures/"]).then(() => {
      document.title = "Scroll-io: Homebrew Creature List For D&D 5e";
    });
    this.lastselected = { ...this.selected };
    this.selected = undefined;
  }

  filteredCount = 0;
  filterList() {
    this.deselectCreature();
    this.filteredCount = 0;
    let nameSearch;
    if (this.nameSearch) {
      nameSearch = this.nameSearch.toLowerCase();
    }
    let crSearch;
    if (this.crSearch) {
      crSearch = this.crSearch.toLowerCase();
    }
    let typeSearch;
    if (this.typeSearch) {
      typeSearch = this.typeSearch.toLowerCase();
    }
    let alignSearch;
    if (this.alignSearch) {
      alignSearch = this.alignSearch.toLowerCase();
    }
    let sizeSearch;
    if (this.sizeSearch) {
      sizeSearch = this.sizeSearch.toLowerCase();
    }
    let abiSearch;
    if (this.abiSearch) {
      abiSearch = this.abiSearch.toLowerCase();
    }

    for (let creature of this.creatureList) {
      creature.filtered = false;
      if (nameSearch && creature.name.toLowerCase().indexOf(nameSearch) < 0) {
        creature.filtered = true;
      }
      if (crSearch && creature.cr.text.toLowerCase() !== crSearch) {
        creature.filtered = true;
      }
      if (typeSearch && creature.type.toLowerCase().indexOf(typeSearch) < 0) {
        creature.filtered = true;
      }
      if (
        alignSearch &&
        creature.alignment.toLowerCase().indexOf(alignSearch) < 0
      ) {
        creature.filtered = true;
      }
      if (
        sizeSearch &&
        creature.size.text.toLowerCase().indexOf(sizeSearch) < 0
      ) {
        creature.filtered = true;
      }
      if (
        abiSearch &&
        creature.abilities[creature.abilities.highest].val
          .toLowerCase()
          .indexOf(abiSearch) < 0 &&
        creature.abilities.highest.toLowerCase().indexOf(abiSearch) < 0
      ) {
        creature.filtered = true;
      }

      if (!creature.filtered) this.filteredCount++;
    }
  }

  sortClick(column: number) {
    this.deselectCreature();
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
          this.sortSubNumAsc("cr", "value");
        } else {
          this.sortSubNumDesc("cr", "value");
        }
        break;
      }
      case 2: {
        if (asc) {
          this.sortStringAsc("type");
        } else {
          this.sortStringDesc("type");
        }
        break;
      }
      case 3: {
        if (asc) {
          this.sortStringAsc("alignment");
        } else {
          this.sortStringDesc("alignment");
        }
        break;
      }
      case 4: {
        if (asc) {
          this.sortSubNumAsc("size", "value");
        } else {
          this.sortSubNumDesc("size", "value");
        }
        break;
      }
      case 5: {
        if (asc) {
          this.sortAbiAsc();
        } else {
          this.sortAbiDesc();
        }
        break;
      }
    }
  }

  sortStringAsc(prop: string) {
    this.creatureList.sort(function(a, b) {
      a = a[prop];
      b = b[prop];
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  sortStringDesc(prop: string) {
    this.creatureList.sort(function(a, b) {
      a = a[prop];
      b = b[prop];
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }

  sortSubNumAsc(prop1: string, prop2: string) {
    this.creatureList.sort(
      (a, b) => parseFloat(a[prop1][prop2]) - parseFloat(b[prop1][prop2])
    );
  }

  sortSubNumDesc(prop1: string, prop2: string) {
    this.creatureList.sort(
      (a, b) => parseFloat(b[prop1][prop2]) - parseFloat(a[prop1][prop2])
    );
  }

  sortAbiAsc() {
    this.creatureList.sort(function(a, b) {
      a = a.abilities[a.abilities.highest].val;
      b = b.abilities[b.abilities.highest].val;
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  sortAbiDesc() {
    this.creatureList.sort(function(a, b) {
      a = a.abilities[a.abilities.highest].val;
      b = b.abilities[b.abilities.highest].val;
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }
}
