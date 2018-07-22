import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {AppComponent} from './containers/app/app.component';
import {LayoutComponent} from './components/layout/layout.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {NavItemComponent} from './components/nav-item/nav-item.component';
import {NotFoundPageComponent} from './containers/not-found-page/not-found-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    ToolbarComponent,
    NavItemComponent,
    NotFoundPageComponent,
  ],
  exports: [
    AppComponent,
    NotFoundPageComponent,
  ]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
    };
  }
}
