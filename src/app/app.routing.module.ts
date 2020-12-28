import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CreaturesComponent } from "./creatures/creatures.component";
import { ItemsComponent } from "./items/items.component";
import { HomeComponent } from "./home/home.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "creatures", component: CreaturesComponent },
      { path: "items", component: ItemsComponent },
      { path: "**", redirectTo: "home" }
    ])
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
