import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements AfterViewInit {
  sessionStorage = sessionStorage;
  document = document;
  @ViewChild('content') content: ElementRef<HTMLElement>;

  constructor(public router: Router) {}

  ngAfterViewInit(): void {
    const el: HTMLElement = this.content.nativeElement;
    el.click();
  }
}
