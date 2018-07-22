import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AuthGuardService} from './auth/services/auth-guard.service';
import {NotFoundPageComponent} from './core/containers/not-found-page/not-found-page.component';
import {LoginPageComponent} from './auth/containers/login-page/login-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
