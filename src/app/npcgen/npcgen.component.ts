import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-npcgen',
  templateUrl: './npcgen.component.html',
  styleUrls: ['./npcgen.component.css']
})
export class NpcgenComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    document.title = 'Scroll-io: NPC Generator';
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        'content',
        'Character attribute generator for writing or any role playing game, all custom made by The Cobbler Barrel.'
      );
  }
}
