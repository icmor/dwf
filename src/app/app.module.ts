import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPhotoEditorModule } from "ngx-photo-editor";
import { QRCodeModule } from 'angularx-qrcode';

import { ProductModule } from './modules/product/product.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { CategoryModule } from './modules/category/category.module';
import { LayoutModule } from './modules/layout/layout.module';
import { CustomerModule } from './modules/customer/customer.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    CategoryModule,
    CustomerModule,
    InvoiceModule,
    LayoutModule,
    NgxPhotoEditorModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
