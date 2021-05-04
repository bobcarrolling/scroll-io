import { HttpClient } from "@angular/common/http";
import { Component, VERSION, AfterViewInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";


@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  name = "Angular " + VERSION.major;
  localStorage = localStorage;

  constructor(private router: Router, private http: HttpClient) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        console.log(e);
        if (e.url.indexOf("/home?code=") === 0){
          this.router.navigate(["/home"]);
        }
      }
    });
  }
  ngAfterViewInit(): void {
    // if (!document.getElementById("outlet")) {
    //   this.router.navigate(["/home"]);
    // }
  }
}
