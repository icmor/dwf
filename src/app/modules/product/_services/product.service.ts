import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080";
  private route = "/product";

  constructor(private http: HttpClient) { }

  createProduct(product: any) {
    return this.http.post(this.url + this.route, product);
  }

  enableProduct(id: number) {
    return this.http.put(this.url + this.route + "/" + id + "/activate", null);
  }

  disableProduct(id: number) {
    return this.http.delete(this.url + this.route + "/" + id);
  }

  getProduct(gtin: string) {
    return this.http.get<Product>(this.url + this.route + "/" + gtin);
  }

  getProducts() {
    return this.http.get<Product[]>(this.url + this.route);
  }

  updateProduct(product: any, id: number) {
    return this.http.put(this.url + this.route + "/" + id, product);
  }
}
