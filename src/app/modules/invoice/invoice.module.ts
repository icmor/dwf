import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';

import { CartComponent } from './components/cart/cart.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';

@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceListComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    QRCodeModule
  ],
  exports: [
    CartComponent,
    InvoiceComponent,
    InvoiceListComponent
  ]
})
export class InvoiceModule { }
