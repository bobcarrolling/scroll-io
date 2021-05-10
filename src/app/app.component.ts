import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, VERSION, AfterViewInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  name = 'Angular ' + VERSION.major;
  window = window;
  localStorage = localStorage;
  /*httpOptions = {
    headers: new HttpHeaders()
      .set("content-type", "application/x-www-form-urlencoded")
      .set("Access-Control-Allow-Origin", "*")
  };*/

  constructor(public router: Router, private http: HttpClient) {
    // this.router.events.subscribe(e => {
    // if (e instanceof NavigationStart) {
    //   if (e.url.indexOf("/home?code=") === 0) {
    //     const code = e.url.substring(
    //       e.url.indexOf("=") + 1,
    //       e.url.lastIndexOf("&")
    //     );
    //     const body =
    //       "code=" +
    //       code +
    //       "&grant_type=authorization_code&client_id=i30yvmws2WeyVWxt7HMzoy6rXDRIrZV4Lf8c3or_ZgnTDM8Adlq9sFFJs5bPy_Hl&client_secret=RvBZYrNVNNw4GsofPoSJKficYFHWq65KBhUfC_Y0wSO-UN23YPHt2Q87qhnG6c9p&redirect_uri=https://scroll-io.stackblitz.io/home";
    //     console.log(body);
    //     /*this.http
    //       .post(
    //         "https://www.patreon.com/api/oauth2/token",
    //         "code=" +
    //           code +
    //           "&grant_type=authorization_code&client_id=i30yvmws2WeyVWxt7HMzoy6rXDRIrZV4Lf8c3or_ZgnTDM8Adlq9sFFJs5bPy_Hl&client_secret=RvBZYrNVNNw4GsofPoSJKficYFHWq65KBhUfC_Y0wSO-UN23YPHt2Q87qhnG6c9p&redirect_uri=https://scroll-io.stackblitz.io/home",
    //         this.httpOptions
    //       )
    //       .subscribe(resp => console.log(resp));*/
    //     from(
    //       fetch(
    //         "https://www.patreon.com/api/oauth2/token", // the url you are trying to access
    //         {
    //           headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //             "Access-Control-Allow-Origin": "*"
    //           },
    //           method: "POST", // GET, POST, PUT, DELETE
    //           mode: "no-cors", // the most important option
    //           body: body
    //         }
    //       )
    //     ).subscribe(resp => console.log(resp));
    //     this.router.navigate(["/home"]);
    //   }
    // }
    // });
  }
  ngAfterViewInit(): void {
    // tick, router is async
    setTimeout(() => {
      if (!document.getElementById('outlet')) {
        this.router.navigate(['/home']);
      }
    });
  }
}
