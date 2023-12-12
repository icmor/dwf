import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DtoCustomerList } from '../../_dtos/dto-customer-list';
import { Region } from '../../_models/region';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../_services/customer.service';
import { RegionService } from '../../_services/region.service';

import Swal from'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent {
  customers: DtoCustomerList[] = [];
  regions: Region[] = [];
  submitted = false;

  form = this.formBuilder.group({
    name: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    surname: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    rfc: ["", [Validators.required, Validators.pattern("^[ñA-Z]{3,4}[0-9]{6}[0-9A-Z]{3}$")]],
    mail: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    region_id: ["", [Validators.required]],
    address: ["", [Validators.required]],
  });

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private router: Router,
  ){}

  ngOnInit(){
    this.getCustomers();
  }

  disableCustomer(id: number){
    this.customerService.disableCustomer(id).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El cliente ha sido desactivado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
        this.getCustomers();
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  enableCustomer(id: number){
    this.customerService.enableCustomer(id).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El cliente ha sido activado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
        this.getCustomers();
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(
      res => {
        this.customers = res;
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;
    this.customerService.createCustomer(this.form.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El cliente ha sido registrado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
        this.getCustomers();
        $("#modalForm").modal("hide");
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  showCustomer(rfc: string){
    this.router.navigate(['customer/' + rfc]);
  }

  getRegions(){
    this.regionService.getRegions().subscribe(
      res => {
        this.regions = res;
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    this.getRegions();
    $("#modalForm").modal("show");
  }
}
