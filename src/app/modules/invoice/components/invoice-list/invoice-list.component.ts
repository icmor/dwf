import { Component } from '@angular/core';

import { Invoice } from '../../_models/invoice';
import { InvoiceService } from '../../_services/invoice.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})

export class InvoiceListComponent {
  invoices: Invoice[] = [];
  rfc: string =	"LOOA531113FI5";

  constructor(
    private invoiceService: InvoiceService
  ){}

  ngOnInit(){
    this.getInvoices();
  }

  getInvoices(){
    this.invoiceService.getInvoices(this.rfc).subscribe(
      res => {
	this.invoices = res;
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
