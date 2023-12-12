import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import {NgxCroppedEvent, NgxPhotoEditorService} from "ngx-photo-editor";

import { Category } from '../../_models/category';
import { Product } from '../../_models/product';
import { ProductImage } from '../../_models/product-image';

import { CategoryService } from '../../_services/category.service';
import { ProductService } from '../../_services/product.service';
import { ProductImagesService } from '../../_services/product-images.service';

import Swal from'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  categories: Category[] = [];
  productImages: ProductImage[] = [];
  product: Product | null = null;

  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: ["", [Validators.required, Validators.pattern('^[0-9]*(.[0-9]*)?$')]],
    stock: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: ["", [Validators.required]],
  });

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productImagesService: ProductImagesService,
    private photoEditorService: NgxPhotoEditorService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    var gtin = this.route.snapshot.paramMap.get('gtin')
    if (gtin) {
      this.getProduct(gtin);
    }
    this.getCategories();
  }

  onSubmit(){
    if (this.form.invalid) return;
    if (this.product) {
      this.productService.updateProduct(this.form.value, this.product.product_id)
	.subscribe(
	  res => {
	    Swal.fire({
	      position: 'top-end',
	      icon: 'success',
	      toast: true,
	      text: 'El producto ha sido actualizado',
	      background: '#E8F8F8',
	      showConfirmButton: false,
	      timer: 2000
	    });
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
    } else {
      this.productService.createProduct(this.form.value).subscribe(
	res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: 'El producto ha sido registrado',
            background: '#E8F8F8',
            showConfirmButton: false,
            timer: 2000
          });
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
      this.router.navigate(['/product', this.form.controls['gtin'].value]).then(
	() => {
	  this.ngOnInit();
	}
      );
    }
  }

  getProduct(gtin: string){
    this.productService.getProduct(gtin).subscribe(
      res => {
	this.product = res;
	this.form.patchValue({product: this.product.product});
	this.form.patchValue({gtin: this.product.gtin});
	this.form.patchValue({description: this.product.description});
	this.form.patchValue({price: this.product.price.toString()});
	this.form.patchValue({stock: this.product.stock.toString()});
	this.form.patchValue({category_id: this.product.category_id.toString()});
	this.getProductImages(this.product.product_id);
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

  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res;
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

  getProductImages(product_id: number){
    this.productImagesService.getProductImages(product_id).subscribe(
      res => {
        this.productImages = res;
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

  uploadProductImage(product_image: ProductImage) {
    this.productImagesService.uploadProductImage(product_image).subscribe(
      res => {
	Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La imagen ha sido registrada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
        $("#modalForm").modal("hide");
	if(this.product) {
	  this.getProductImages(this.product.product_id);
	}
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

  deleteProductImage(image_id: number){
    this.productImagesService.deleteProductImage(image_id).subscribe(
      res => {
	Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La imagen ha sido eliminada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
        $("#modalForm").modal("hide");
	if(this.product) {
	  this.getProductImages(this.product.product_id);
	}
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
    this.photoEditorService.open($event, {
      autoCropArea: 1
    }).subscribe(data => {
      if(this.product) {
	let image = new ProductImage();
	image.product_image_id = this.productImages.length + 1;
	image.product_id = this.product.product_id;
	image.image = data.base64!;
	this.uploadProductImage(image);
      }
    });
  }

  deleteActiveImage() {
    let currentIndex = $('div.active').index();
    this.deleteProductImage(this.productImages[currentIndex].product_image_id);
    }
}
