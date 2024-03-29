import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreaturesComponent } from './creatures/creatures.component';
import { ItemsComponent } from './items/items.component';
import { SpellsComponent } from './spells/spells.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { RedirectComponent } from './redirect/redirect.component';
import { NpcgenComponent } from './npcgen/npcgen.component';
import { ClassesComponent } from './classes/classes.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'creatures',
        redirectTo: 'creatures/',
        pathMatch: 'full',
      },
      {
        path: 'creatures/:selected',
        component: CreaturesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'items',
        redirectTo: 'items/',
        pathMatch: 'full',
      },
      {
        path: 'items/:selected',
        component: ItemsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'spells',
        redirectTo: 'spells/',
        pathMatch: 'full',
      },
      {
        path: 'spells/:selected',
        component: SpellsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'npcgen',
        redirectTo: 'npcgen/',
        pathMatch: 'full',
      },
      {
        path: 'npcgen/:selected',
        component: NpcgenComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'classes',
        redirectTo: 'classes/',
        pathMatch: 'full',
      },
      {
        path: 'classes/:selected',
        component: ClassesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'redirect',
        component: RedirectComponent
      },
      {
        path: '6966796f75726572656164696e6774686973796f756b6e6f777468697369736166616b6575726c',
        redirectTo: '/redirect'
      },
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: '/home' },
      { path: null, redirectTo: '/home' }
      // { path: "**", component: HomeComponent }
    ])
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
