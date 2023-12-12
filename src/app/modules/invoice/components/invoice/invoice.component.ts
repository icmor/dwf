import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Invoice } from '../../_models/invoice'
import { InvoiceService } from '../../_services/invoice.service'

import Swal from'sweetalert2'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent {
  invoice: Invoice | null = null;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ){}

  ngOnInit (){
    var id = this.route.snapshot.paramMap.get('id');
    if (id != "" && Number.isNaN(Number(id))) {
    this.getInvoice(Number(id));
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      toast: true,
      showConfirmButton: false,
      text: "No se halló una factura válida",
      background: '#F8E8F8',
      timer: 2000
    })
  }
}

getInvoice(id: number) {
  this.invoiceService.getInvoice(id).subscribe(
    res => {
      this.invoice = res;
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
}
