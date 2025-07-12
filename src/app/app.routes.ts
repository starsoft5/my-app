// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Selection } from './selection/selection';
import { Jobportal } from './jobportal/jobportal';
import { Report } from './report/report';
import { Register } from './register/register';
import { Login } from './login/login';
import { OrderFormComponent } from './order-form/order-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'selection', component: Selection },
  { path: 'order-form', component: OrderFormComponent },
  { path: 'report', component: Report },
  { path: 'register', component: Register },
  { path: 'login', component: Login }
];
