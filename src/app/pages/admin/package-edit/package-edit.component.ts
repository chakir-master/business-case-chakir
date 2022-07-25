import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { threadId } from 'worker_threads';
import { PackageService } from '../../../services/package.service';

@Component({
  selector: 'ngx-package-edit',
  templateUrl: './package-edit.component.html',
  styleUrls: ['./package-edit.component.scss']
})
export class PackageEditComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = 'pages/admin/';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private packageService: PackageService,
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      weight: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      depth: ['', Validators.required],
      from_name: ['', Validators.required],
      from_address: ['', Validators.required],
      from_location_long: ['', Validators.required],
      from_location_lat: ['', Validators.required],
      to_name: ['', Validators.required],
      to_address: ['', Validators.required],
      to_location_long: ['', Validators.required],
      to_location_lat: ['', Validators.required],
    });

  }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log('onSubmit');
    this.submitted = true;
    // stop here if form is invalid
    const formValue = this.form.value;
    console.log(formValue);  
     
    if(this.form.invalid) {
      console.log('Invalid form');
      this.error="Invalid form";
      return;
    }



    this.loading = true;
    this.packageService.add(formValue)
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
