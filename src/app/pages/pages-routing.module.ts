import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { TrackerComponent } from './tracker/tracker.component';
import { DriverComponent } from './driver/driver.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'admin',
      component: AdminComponent,
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    },
    {
      path: 'tracker',
      component: TrackerComponent,
    },
    {
      path: 'driver',
      component: DriverComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
