import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Cart } from '../../_models/cart'
import { Product } from '../../../product/_models/product'
import { ProductImage } from '../../../product/_models/product-image'

import { CartService } from '../../_services/cart.service';
import { InvoiceService } from '../../_services/invoice.service';
import { ProductService } from '../../../product/_services/product.service';
import { ProductImagesService } from '../../../product/_services/product-images.service';

import Swal from'sweetalert2'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  carts: Cart[] = [];
  rfc: string =	"LOOA531113FI5";

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private imagesService: ProductImagesService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.getCart();
    var gtin = this.route.snapshot.paramMap.get('gtin');
    if (gtin) {
      this.addObjectToCart(gtin);
    }
  }

  getCart(){
    this.cartService.getCart(this.rfc).subscribe(
      res => {
        this.carts = res;
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

  addObjectToCart(gtin: string) {
    this.productService.getProduct(gtin).pipe(
      switchMap((product: Product) => {
	return this.imagesService.getProductImages(product.product_id).pipe(
          map((images) => ({ product, images }))
	);
      }),
      switchMap(({ product, images }) => {
	let cart = new Cart();
	cart.rfc = this.rfc;
	cart.gtin = gtin;
	cart.quantity = 1;
	cart.product = product;
	cart.image = images && images.length > 0 ? images[0].image : "";
	console.log(cart);
	return this.cartService.addToCart(cart);
      })
    ).subscribe(() => {
      this.getCart();
    });
  }

  checkout() {
    forkJoin(
      {
	cartResponse: this.cartService.deleteCart(this.rfc),
	invoiceResponse: this.invoiceService.generateInvoice(this.rfc)
      }
    ).subscribe(
      res => {
	Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          showConfirmButton: false,
          text: "Checkout realizado exitósamente",
          background: '#F8E8F8',
          timer: 2000
	})
	this.getCart();
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
    )
  }
}
