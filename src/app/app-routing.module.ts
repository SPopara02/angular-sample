import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { UsersComponent } from './page/users/users.component';

const routes: Routes = [{ path: "", component: LoginComponent }, { path: "login", component: LoginComponent }, { path: "home", component: HomeComponent }, { path: "users", component: UsersComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
