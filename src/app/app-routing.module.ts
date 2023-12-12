import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './modules/product/components/product/product.component';
import { ProductListComponent } from './modules/product/components/product-list/product-list.component';
import { CategoryComponent } from './modules/category/components/category/category.component';
import { CustomerComponent } from './modules/customer/components/customer/customer.component';
import { CustomerImageComponent } from './modules/customer/components/customer-image/customer-image.component';
import { RegionComponent } from './modules/customer/components/region/region.component';
import { InvoiceComponent } from './modules/invoice/components/invoice/invoice.component';
import { InvoiceListComponent } from './modules/invoice/components/invoice-list/invoice-list.component';
import { CartComponent } from './modules/invoice/components/cart/cart.component';

const routes: Routes = [
  { path: "products", component: ProductListComponent },
  { path: "categories", component: CategoryComponent },
  {path: 'product', redirectTo: 'product/', pathMatch: 'full'},
  { path: "product/:gtin", component: ProductComponent },
  { path: "customer/:rfc", component: CustomerImageComponent },
  { path: "customers", component: CustomerComponent },
  { path: "regions", component: RegionComponent },
  { path: "invoices", component: InvoiceListComponent},
  { path: "invoice/:id", component: InvoiceComponent},
  { path: "cart/:gtin", component: CartComponent },
  { path: "cart", component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
