import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerImageComponent } from './components/customer-image/customer-image.component';
import { RegionComponent } from './components/region/region.component';

import {NgxPhotoEditorModule} from "ngx-photo-editor";

@NgModule({
  declarations: [
    RegionComponent,
    CustomerComponent,
    CustomerImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPhotoEditorModule,
  ],
  exports: [
    RegionComponent,
    CustomerComponent
  ]
})
export class CustomerModule { }
