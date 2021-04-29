import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CreaturesComponent } from "./creatures/creatures.component";
import { ItemsComponent } from "./items/items.component";
import { SpellsComponent } from "./spells/spells.component";
import { HomeComponent } from "./home/home.component";
import { StorageServiceModule} from 'angular-webstorage-service';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "creatures",
        redirectTo: "creatures/",
        pathMatch: "full"
      },
      {
        path: "creatures/:selected",
        component: CreaturesComponent,
      },
      {
        path: "items",
        redirectTo: "items/",
        pathMatch: "full"
      },
      {
        path: "items/:selected",
        component: ItemsComponent,
      },
      {
        path: "spells",
        redirectTo: "spells/",
        pathMatch: "full"
      },
      {
        path: "spells/:selected",
        component: SpellsComponent,
      },
      { path: "home", component: HomeComponent },
      { path: "**", redirectTo: "home" },
      { path: null, redirectTo: "home" }
    ])
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
