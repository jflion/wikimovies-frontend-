import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { PrivateRouteGuard } from './guards/private-route.guard';
import { PublicRouteGuard } from './guards/public-route.guard';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'detail/:idMovie',
        component: DetailComponent,
      },
      {
        path: 'edit/:idMovie',
        component: EditComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
    ],
    canActivate: [PrivateRouteGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PublicRouteGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PublicRouteGuard],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
