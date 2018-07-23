import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './auth/services/auth-guard.service';
import {NotFoundPageComponent} from './core/containers/not-found-page/not-found-page.component';
import {LoginPageComponent} from './auth/containers/login-page/login-page.component';
import {NumbersComponent} from './numbers/containers/numbers/numbers.component';

const routes: Routes = [
  {path: '', redirectTo: '/numbers', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'numbers', component: NumbersComponent, canActivate: [AuthGuardService]},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
