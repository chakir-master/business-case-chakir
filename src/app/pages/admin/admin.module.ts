import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { PackageEditComponent } from './package-edit/package-edit.component';
import { DeliveryEditComponent } from './delivery-edit/delivery-edit.component';
import { DeliveryListComponent } from './home/delivery-list/delivery-list.component';
import { PackageListComponent } from './home/package-list/package-list.component';
import { NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonsComponent } from '../forms/buttons/buttons.component';
import { FormsComponent } from '../forms/forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../extra-components/alert/alert.component';
import { SpinnerComponent } from '../extra-components/spinner/spinner.component';
import { SpinnerColorComponent } from '../extra-components/spinner/spinner-color/spinner-color.component';
import { SpinnerSizesComponent } from '../extra-components/spinner/spinner-sizes/spinner-sizes.component';
import { SpinnerInButtonsComponent } from '../extra-components/spinner/spinner-in-buttons/spinner-in-buttons.component';
import { SpinnerInTabsComponent } from '../extra-components/spinner/spinner-in-tabs/spinner-in-tabs.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { DriverComponent } from './driver/driver.component';
import { MapComponent } from './driver/map/map.component';
import { DetailsComponent } from './driver/details/details.component'; 
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapsRoutingModule, routedComponents } from '../maps/maps-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { PackageComponent } from './driver/details/package/package.component';
import { DeliveryComponent } from './driver/details/delivery/delivery.component';
import { TrackerComponent } from './tracker/tracker.component';
// import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    HomeComponent,
    PackageEditComponent,
    DeliveryEditComponent,
    PackageListComponent,
    DeliveryListComponent,
    ButtonsComponent,
    FormsComponent,
    AlertComponent,
    SpinnerComponent,
    SpinnerColorComponent,
    SpinnerSizesComponent,
    SpinnerInButtonsComponent,
    SpinnerInTabsComponent,
    DriverComponent,
    MapComponent,
    DetailsComponent,
    ...routedComponents,
    PackageComponent,
    DeliveryComponent,
    TrackerComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbIconModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbSpinnerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    GoogleMapsModule,
    LeafletModule.forRoot(),
    MapsRoutingModule,
    NgxEchartsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCDE5O-5CSh0lgx7FluGlf4KI2vm9NHbAQ'
    // }),
  ]
})
export class AdminModule { }
