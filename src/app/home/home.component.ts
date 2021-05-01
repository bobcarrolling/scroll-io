import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

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

  constructor(public router: Router, public route: ActivatedRoute) {}

  ngOnInit() {
    document.title = "Scroll-io: A Catalog Of D&D 5e Homebrew";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Sortable and searchable tables of Dungeons and Dragons 5th Edition content, all custom made by The Cobbler Barrel."
      );
    this.route.queryParams.subscribe(params => {
      console.log(params); 
    });
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
