import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DeliveryService } from '../../../services/delivery.service';
import { PackageService } from '../../../services/package.service';

@Component({
  selector: 'ngx-delivery-edit',
  templateUrl: './delivery-edit.component.html',
  styleUrls: ['./delivery-edit.component.scss']
})
export class DeliveryEditComponent implements OnInit {
  backendUrl: string = environment.backendUrl;
  form: FormGroup;
  loadingPackages = true;
  packagesLoaded = false;
  loading = false;
  submitted = false;
  returnUrl: string = 'pages/admin/';
  error = '';
  statuses : string[] = [
    'OPEN',
    'PICKED-UP', 
    'IN-TRANSIT',
    'DELIVERED',
    'FAILED',
  ];
  packages: string[];

  packageControl = new FormControl('');
  // statuses: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    let filterValue = '';
    if(Array.isArray(value)) {
      filterValue = value[0].toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }
    // let filterArray = [];
    // if(this.packagesLoaded) {
    //   filterArray = t;
    // }
    return this.packages.filter(option => option[0].toLowerCase().includes(filterValue));
  }  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private deliveryService: DeliveryService,
    private packageService: PackageService,
  ) { }

  ngOnInit(): void {
    // 
    this.packageControl.disable;

    this.packageService.getAll()
      .pipe(map(result => {
          const data = result.data;
          return data.map(x => {
            return [
              x?._id
            ]
          });
        })  
      ) 
      .subscribe(  
        (result: any) => {
          // console.log(result);
          this.packages = result;
          // Do the necessary

          // set loading packages to false
          // this.loadingPackages = false;
          this.packagesLoaded = true;
          this.packageControl.enable;
          
          this.filteredOptions = this.packageControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
        },
      );


    this.form = this.formBuilder.group({
      package_id: ['', Validators.required],
      pickup_time: [''],
      start_time: [''],
      end_time: [''],
      location_lat: ['', Validators.required],
      location_long: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log('onSubmit');
    this.submitted = true;
    // stop here if form is invalid
    // set package Id value

    this.form.patchValue({
      package_id: this.packageControl.value[0]
    });
    
    const formValue = this.form.value;
    console.log(formValue);   

    if(this.form.invalid) {
      console.log('Invalid form');
      this.error="Invalid form";
      return;
    }


    this.loading = true;
    this.deliveryService.add(formValue)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.router.navigate([this.returnUrl], {queryParams: {message : data.message}});
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

}
