import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { SmartTableData } from '../../../../@core/data/smart-table';
import { DeliveryService } from '../../../../services/delivery.service';
import { PackageService } from '../../../../services/package.service';

@Component({
  selector: 'ngx-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {
  backendUrl: string = environment.backendUrl;
  resources: any;
  message: string;
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
      active_delivery_id: {
        title: 'Active Delivery ID',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      dimension: {
        title: 'Dimension',
        type: 'string',
      },
      source_address: {
        title: 'Source Address',
        type: 'string',
      },
      destination_address: {
        title: 'Destination Address',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private packageService: PackageService,
    private route: ActivatedRoute,
  ) { }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
    this.packageService.getAll()
      .pipe(map(result => {
          const data = result.data;
          return data.map(x => {
            // console.log(x);
            return {
              id: x?._id,
              active_delivery_id: x?.active_delivery_id,
              description: x?.description,
              dimension: 'Weight: ' + x?.weight+ ' || ' + 'Width: ' + x?.width + ' || Height: ' + x?.height + ' || ' + 'Depth: ' + x?.depth,
              source_address: 'Name: ' + x?.from_name + ' || Address: ' + x?.from_address + ' || Location: (' + x?.from_location.long + ',' + x?.from_location.lat + ')',
              destination_address: 'Name: ' + x?.to_name + ' || Address: ' + x?.to_address + ' || Location: (' + x?.to_location.long + ',' + x?.to_location.lat + ')',
            }
          });
        })  
      ) 
      .subscribe(  
        (result: any) => {
          this.message = this.route.snapshot.queryParams['message'] || ''; 
          this.source.load(result);
          // console.log(this.message);
        },
      );

  }

}
