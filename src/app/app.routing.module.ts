import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreaturesComponent } from './creatures/creatures.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'creatures', component: CreaturesComponent },
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}


