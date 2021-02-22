import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  pages = this.array("Home", "Creatures", "Items", "Spells");

  array<T extends any[]>(...v: T) {
    return v;
  }

  navigate(page: string) {
    page = page.toLowerCase();
    this.router.navigate(["/" + page]);
  }

  checkCurrent(page: string) {
    if (this.router.url.indexOf("/" + page.toLowerCase()) === 0) {
      return true;
    }
    return false;
  }

  ngOnInit() {}
}
