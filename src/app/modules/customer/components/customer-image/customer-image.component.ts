import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxPhotoEditorService } from 'ngx-photo-editor';

import { Customer } from '../../_models/customer';
import { CustomerService } from '../../_services/customer.service';
import { Region } from '../../_models/region';
import { RegionService } from '../../_services/region.service';
import { CustomerImageService } from '../../_services/customer-image.service';
import { CustomerImage } from '../../_models/customer-image';

import Swal from'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-customer-image',
  templateUrl: './customer-image.component.html',
  styleUrls: ['./customer-image.component.css']
})

export class CustomerImageComponent {
  customer: any | Customer = new Customer();
  rfc: any | string = "";
  regions: Region[] = [];
  region: any | Region = new Region();
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
    private customerImageService: CustomerImageService,
    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private route: ActivatedRoute,
    private router: Router,
    private service: NgxPhotoEditorService
  ){}

  ngOnInit(){
    this.rfc = this.route.snapshot.paramMap.get('rfc');
    if(this.rfc){
      this.getCustomer();
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        toast: true,
        showConfirmButton: false,
        text: 'RFC de cliente inválido',
        background: '#F8E8F8',
        timer: 2000
      });
    }
  }

  getCustomer(){
    this.customerService.getCustomer(this.rfc).subscribe(
      res => {
        this.customer = res;
        this.getRegion(this.customer.region_id);
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
    this.customerService.updateCustomer(this.form.value, this.customer.customer_id).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El cliente ha sido actualizado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        if(this.form.controls['rfc'].value != this.rfc){
          this.rfc = this.form.controls['rfc'].value!;
          let currentUrl = this.router.url.split("/");
          currentUrl.pop();
          currentUrl.push(this.rfc);
          this.redirect(currentUrl);
        }

        this.getCustomer();
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

  updateCustomer(){
    this.form.reset();
    this.submitted = false;
    this.getRegions();
    this.form.controls['name'].setValue(this.customer.name);
    this.form.controls['surname'].setValue(this.customer.surname);
    this.form.controls['rfc'].setValue(this.customer.rfc);
    this.form.controls['mail'].setValue(this.customer.mail);
    this.form.controls['region_id'].setValue(this.customer.region_id);
    this.form.controls['address'].setValue(this.customer.address);
    $("#modalForm").modal("show");
  }

  updateCustomerImage(image: string){
    let customerImage: CustomerImage = new CustomerImage();
    customerImage.customer_image_id = this.customer.image.customer_image_id;
    customerImage.image = image;
    this.customerImageService.updateCustomerImage(customerImage).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La imagen ha sido actualizada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCustomer();
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

  getRegion(id: number){
    this.regionService.getRegion(id).subscribe(
      res => {
        this.region = res;
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

  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      console.log(data);
      this.updateCustomerImage(data.base64!);
    });
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }
}
