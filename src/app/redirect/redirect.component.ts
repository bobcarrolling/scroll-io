import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  sessionStorage = sessionStorage;

  constructor(public router: Router) { }

  ngOnInit() {
    console.log(document.referrer);
  }

}