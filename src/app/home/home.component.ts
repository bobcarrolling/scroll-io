import { Component, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  ogl = "Show";
  localStorage = localStorage;

  readonly rightarrow = "&#9655;";
  readonly downarrow = "&#9661;";
  arrow = this.rightarrow;

  constructor(private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        console.log(e);
      }
    });
  }

  ngOnInit() {
    document.title = "Scroll-io: A Catalog Of D&D 5e Homebrew";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Sortable and searchable tables of Dungeons and Dragons 5th Edition content, all custom made by The Cobbler Barrel."
      );
    
  }

  oglToggle() {
    if (this.ogl === "Show") {
      this.ogl = "Hide";
      this.arrow = this.downarrow;
    } else {
      this.ogl = "Show";
      this.arrow = this.rightarrow;
    }
  }
}
