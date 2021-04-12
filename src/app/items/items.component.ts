import * as itemList from "./items-data.json";
import { Component, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"]
})
export class ItemsComponent implements OnInit {
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
    document.title = "Scroll-io: Homebrew Magic Item List For D&D 5e";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Items and weapons for players in Dungeons and Dragons 5th Edition, all custom made by The Cobbler Barrel."
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
            this.itemList
          ) {
            let i = this.itemList.findIndex(c => c.urlname === params.selected);
            if (i >= 0) {
              //scrollIntoView is broken here
              document.getElementById("data-table").scrollTop =
                document.getElementById(params.selected).getBoundingClientRect()
                  .top -
                document
                  .getElementById("table-interior")
                  .getBoundingClientRect().top;
              this.selected = this.itemList[i];
              if (this.landingNav) {
                // works in app, not in preview
                history.replaceState({}, "", this.selected.urlname);
                document.title = "Scroll-io Items: " + this.selected.name;
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

  itemList: any = (itemList as any).default;

  nameSearch: string;
  typeSearch: string;
  rareSearch: string;
  attnSearch: string;
  attnToggle: string;

  readonly rightarrow = "&#9655;";
  readonly uparrow = "&#9650;";
  readonly downarrow = "&#9660;";
  icons = [
    this.downarrow,
    this.rightarrow,
    this.rightarrow,
    this.rightarrow,
    this.rightarrow
  ];

  selected: any;
  lastselected: any;

  selectItem(item: any) {
    if (item === this.selected) {
      this.deselectItem();
    } else {
      if (this.lastselected && item && this.lastselected.name === item.name) {
        //prevents history clogging when opening/closing the same row
        history.back();
      } else {
        this.router
          .navigate(["items/" + item.urlname], {
            replaceUrl: !this.selected
          })
          .then(() => {
            document.title = "Scroll-io Items: " + item.name;
          });
        this.selected = item;
      }
      this.lastselected = undefined;
    }
  }

  deselectItem() {
    this.router.navigate(["items/"]).then(() => {
      document.title = "Scroll-io: Homebrew Magic Item List For D&D 5e";
    });
    this.lastselected = { ...this.selected };
    this.selected = undefined;
  }

  filteredCount = 0;
  filterList() {
    this.deselectItem();
    this.filteredCount = 0;
    let nameSearch;
    if (this.nameSearch) {
      nameSearch = this.nameSearch.toLowerCase();
    }
    let typeSearch;
    if (this.typeSearch) {
      typeSearch = this.typeSearch.toLowerCase();
    }
    let rareSearch;
    if (this.rareSearch) {
      rareSearch = this.rareSearch.toLowerCase();
    }
    let attnSearch;
    if (this.attnSearch) {
      attnSearch = this.attnSearch.toLowerCase();
    }

    for (let item of this.itemList) {
      item.filtered = false;
      if (nameSearch && item.name.toLowerCase().indexOf(nameSearch) < 0) {
        item.filtered = true;
      }
      if (typeSearch && item.type.toLowerCase().indexOf(typeSearch) < 0) {
        item.filtered = true;
      }
      if (rareSearch && item.rarity.text.toLowerCase() !== rareSearch) {
        item.filtered = true;
      }
      if (
        attnSearch &&
        (!item.attune ||
          !item.attune.by ||
          item.attune.by.toLowerCase().indexOf(attnSearch) < 0)
      ) {
        item.filtered = true;
      }
      if (this.attnToggle === "yes" && !item.attune) {
        item.filtered = true;
      }
      if (this.attnToggle === "no" && item.attune) {
        item.filtered = true;
      }

      if (!item.filtered) this.filteredCount++;
    }
  }

  sortClick(column: number) {
    this.deselectItem();
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
          this.sortStringAsc("type");
        } else {
          this.sortStringDesc("type");
        }
        break;
      }
      case 2: {
        if (asc) {
          this.sortSubNumAsc("rarity", "rating");
        } else {
          this.sortSubNumDesc("rarity", "rating");
        }
        break;
      }
      case 3: {
        if (asc) {
          this.sortAttnAsc();
        } else {
          this.sortAttnDesc();
        }
        break;
      }
      case 4: {
        if (asc) {
          this.sortSubStringAsc("attune", "text");
        } else {
          this.sortSubStringDesc("attune", "text");
        }
        break;
      }
    }
  }

  sortStringAsc(prop: string) {
    this.itemList.sort(function(a, b) {
      a = a[prop];
      b = b[prop];
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  sortStringDesc(prop: string) {
    this.itemList.sort(function(a, b) {
      a = a[prop];
      b = b[prop];
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }

  sortSubStringAsc(prop1: string, prop2: string) {
    this.itemList.sort(function(a, b) {
      if (!a[prop1] && b[prop1]) {
        return 1;
      }
      if (a[prop1] && !b[prop1]) {
        return -1;
      }
      if (!a[prop1] && !b[prop1]) {
        a = a.name;
        b = b.name;
        return a < b ? -1 : a > b ? 1 : 0;
      }
      a = a[prop1][prop2];
      b = b[prop1][prop2];
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  sortSubStringDesc(prop1: string, prop2: string) {
    this.itemList.sort(function(a, b) {
      if (!a[prop1] && b[prop1]) {
        return -1;
      }
      if (a[prop1] && !b[prop1]) {
        return 1;
      }
      if (!a[prop1] && !b[prop1]) {
        a = a.name;
        b = b.name;
        return a < b ? -1 : a > b ? 1 : 0;
      }
      a = a[prop1][prop2];
      b = b[prop1][prop2];
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }

  sortSubNumAsc(prop1: string, prop2: string) {
    this.itemList.sort(
      (a, b) => parseFloat(a[prop1][prop2]) - parseFloat(b[prop1][prop2])
    );
  }

  sortSubNumDesc(prop1: string, prop2: string) {
    this.itemList.sort(
      (a, b) => parseFloat(b[prop1][prop2]) - parseFloat(a[prop1][prop2])
    );
  }

  sortAttnAsc() {
    this.itemList.sort(function(a, b) {
      if (!a.attune && b.attune) {
        return -1;
      }
      if (a.attune && !b.attune) {
        return 1;
      }
      a = a.name;
      b = b.name;
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  sortAttnDesc() {
    this.itemList.sort(function(a, b) {
      if (!a.attune && b.attune) {
        return 1;
      }
      if (a.attune && !b.attune) {
        return -1;
      }
      a = a.name;
      b = b.name;
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }
}
