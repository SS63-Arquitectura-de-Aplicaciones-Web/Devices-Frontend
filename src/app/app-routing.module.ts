import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginSegurasilvaComponent } from './components/login-segurasilva/login-segurasilva.component';
import { Reporte01SegurasilvaComponent } from './components/reporte01-segurasilva/reporte01-segurasilva.component';
import { Reporte02SegurasilvaComponent } from './components/reporte02-segurasilva/reporte02-segurasilva.component';
import { authGuard } from './security/auth.guard';
import { loginGuard } from './security/login.guard';
import { reportGuard } from './security/report.guard';

const routes: Routes = [
  {
    path: 'segura/home',
    canActivate: [authGuard],
    component: HomeComponent,
  },
  {
    path: 'segura/login',
    canActivate: [loginGuard],
    component: LoginSegurasilvaComponent,
  },
  {
    path: 'segura/reporte01',
    canActivate: [authGuard, reportGuard],
    component: Reporte01SegurasilvaComponent,
  },
  {
    path: 'segura/reporte02',
    canActivate: [authGuard, reportGuard],
    component: Reporte02SegurasilvaComponent,
  },
  {
    path: '**',
    redirectTo: 'segura/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
