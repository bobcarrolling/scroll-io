import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import * as itemList from "./items-data.json";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"]
})
export class ItemsComponent implements OnInit {
  searchUpdate = new Subject();
  constructor(private http: HttpClient) {
    this.searchUpdate.pipe(debounceTime(175)).subscribe(() => {
      this.filterList();
    });
  }
  ngOnInit() {
    this.filterList();
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

  selectItem(item: any) {
    if (item === this.selected) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }

  filteredCount = 0;
  filterList() {
    this.selected = undefined;
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
      if (rareSearch && item.rarity.text.indexOf(rareSearch) < 0) {
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
    this.selected = undefined;
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
