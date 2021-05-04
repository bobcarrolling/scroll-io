import { Component, VERSION, AfterViewInit } from "@angular/core";

@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  name = "Angular " + VERSION.major;
  localStorage = localStorage;
  constructor() {
  }
  ngAfterViewInit(): void {
    // if (!document.getElementById("outlet")) {
    //   this.router.navigate(["/home"]);
    // }
  }
}
