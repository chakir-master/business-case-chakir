import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { SmartTableData } from '../../../../@core/data/smart-table';
import { DeliveryService } from '../../../../services/delivery.service';
import { PackageService } from '../../../../services/package.service';

@Component({
  selector: 'ngx-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {
  resources: any;
  backendUrl: string = environment.backendUrl;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: false, 
    },
    pager: {
      display: true,
      perPage: 20,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
      },
      package_id: {
        title: 'Package ID',
        type: 'string',
      },
      pickup_time: {
        title: 'Pickup time',
        type: 'string',
      },
      start_time: {
        title: 'Start time',
        type: 'string',
      },
      end_time: {
        title: 'End time',
        type: 'string',
      },
      location: {
        title: 'Location',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService,
  ) { }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
    this.deliveryService.getAll()
      .pipe(map(result => {
          const data = result.data;
        // console.log(data);
          return data.map(x => {
            return {
              id: x?._id,
              end_time: new Date(x?.end_time).toTimeString(),
              location: x?.location.long + ', ' + x?.location.lat,
              package_id: x?.package_id,
              pickup_time: new Date(x?.pickup_time).toTimeString(),
              start_time: new Date(x?.start_time).toTimeString(),
              status: x?.status,
            }
          });
        })
      )
      .subscribe(
        (result: any) => {
          // this.resources = result?.data;
          this.source.load(result);
        },
      );
  }


}
