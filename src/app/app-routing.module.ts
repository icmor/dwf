import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './modules/product/components/product/product.component';
import { ProductListComponent } from './modules/product/components/product-list/product-list.component';
import { CategoryComponent } from './modules/category/components/category/category.component';

const routes: Routes = [
  { path: "products", component: ProductListComponent },
  { path: "categories", component: CategoryComponent },
  {path: 'product', redirectTo: 'product/', pathMatch: 'full'},
  { path: "product/:gtin", component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
