import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../_services/category.service';

import Swal from'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {
  categories: Category[] = [];
  categoryUpdated: number = 0;
  submitted = false;

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ){}

  ngOnInit(){
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          showConfirmButton: false,
          text: err.error.message,
          background: '#FFF0F7',
          timer: 2000
        });
      }
    );
  }

  enableCategory(id: number){
    this.categoryService.enableCategory(id).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'La región ha sido activada',
          background: '#E1FFE6',
          showConfirmButton: false,
          timer: 2000
        });
        this.getCategories();
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          showConfirmButton: false,
          text: err.error.message,
          background: '#FFF0F7',
          timer: 2000
        });
      }
    );
  }


  disableCategory(id: number){
    this.categoryService.disableCategory(id).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La categoría ha sido desactivada',
          background: '#E1FFE6',
          showConfirmButton: false,
          timer: 2000
        });
        this.getCategories();
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#FFF0F7',
          timer: 2000
        });
      }
    );
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    if(this.categoryUpdated == 0){
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.categoryService.createCategory(this.form.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'La categoría ha sido registrada',
          background: '#E1FFE6',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCategories();
        $("#modalForm").modal("hide");
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          showConfirmButton: false,
          text: err.error.message,
          background: '#FFF0F7',
          timer: 2000
        });
      }
    );
  }

  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value, this.categoryUpdated).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'La categoría ha sido actualizada',
          background: '#E1FFE6',
          showConfirmButton: false,
          timer: 2000
        });
        this.getCategories();
        $("#modalForm").modal("hide");
        this.categoryUpdated = 0;
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          showConfirmButton: false,
          text: err.error.message,
          background: '#FFF0F7',
          timer: 2000
        });
      }
    );
  }

  updateCategory(category: Category){
    this.categoryUpdated = category.category_id;
    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['code'].setValue(category.code);
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}
