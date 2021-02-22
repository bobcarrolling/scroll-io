import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CreaturesComponent } from "./creatures/creatures.component";
import { HomeComponent } from "./home/home.component";
import { CreaturesDisplayComponent } from "./creatures/creatures-display/creatures-display.component";
import { RollviewComponent } from "./rollview/rollview.component";
import { ItemsComponent } from "./items/items.component";
import { ItemsDisplayComponent } from "./items/items-display/items-display.component";
import { APP_BASE_HREF } from "@angular/common";
import { SpellsComponent } from './spells/spells.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  declarations: [
    AppComponent,
    NavbarComponent,
    CreaturesComponent,
    HomeComponent,
    CreaturesDisplayComponent,
    RollviewComponent,
    ItemsComponent,
    ItemsDisplayComponent,
    SpellsComponent
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: "" }]
})
export class AppModule {}
