import { Component } from '@angular/core';

import { Product } from '../../_models/product';
import { Category } from '../../_models/category';

import { ProductService } from '../../_services/product.service';
import { CategoryService } from '../../_services/category.service';

import Swal from'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ){}

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      res => {
        this.products = res;
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          showConfirmButton: false,
          text: err.error.message,
          background: '#FFF0F7',
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

  enableProduct(id: number){
    this.productService.enableProduct(id).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'La región ha sido activada',
          background: '#E1FFE6',
          showConfirmButton: false,
          timer: 2000
        });
        this.getProducts();
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          showConfirmButton: false,
          text: err.error.message,
          background: '#FFF0F7',
          timer: 2000
        });
      }
    );
  }

  disableProduct(id: number){
    this.productService.disableProduct(id).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La categoría ha sido desactivada',
          background: '#E1FFE6',
          showConfirmButton: false,
          timer: 2000
        });

        this.getProducts();
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#FFF0F7',
          timer: 2000
        });
      }
    );
  }
}
