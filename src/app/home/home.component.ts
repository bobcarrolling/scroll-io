import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  ogl = "Show";

  readonly rightarrow = "&#9654;";
  readonly downarrow = "&#9660;";
  arrow = this.rightarrow;

  constructor() {}

  ngOnInit() {}

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
