import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DeliveryEditComponent } from './delivery-edit/delivery-edit.component';
import { DriverComponent } from './driver/driver.component';
import { HomeComponent } from './home/home.component';
import { PackageEditComponent } from './package-edit/package-edit.component';
import { TrackerComponent } from './tracker/tracker.component';

const routes: Routes = [
  {
    path: '',
      // component: AdminComponent,
      children: [
        {
          path: '',
          component: HomeComponent,
        },
        {
          path: 'package',
          component: PackageEditComponent,
        },
        {
          path: 'delivery',
          component: DeliveryEditComponent,
        },
        {
          path: 'driver',
          component: DriverComponent,
        },
        {
          path: 'tracker',
          component: TrackerComponent,
        },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
