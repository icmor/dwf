import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../_models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:8080";
  private route = "/cart";

  constructor(private http: HttpClient) { }

  addToCart(cart: any) {
    return this.http.post(this.url + this.route, cart);
  }

  deleteCart(rfc: string) {
    return this.http.delete(this.url + this.route + "/clear/" + rfc);
  }

  getCart(rfc: string) {
    return this.http.get<Cart[]>(this.url + this.route + "/" + rfc);
  }

  removeFromCart(id: number) {
    return this.http.delete(this.url + this.route + "/" + id);
  }
}
