import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements AfterViewInit {
  localStorage = localStorage;
  document = document;

  constructor(public router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const link = document.getElementById('content');
      link.click();
    });
  }
}
