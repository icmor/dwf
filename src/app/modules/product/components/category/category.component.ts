import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories: Category[] = [];
  categoryUpdated: number = 0;

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false;
  index = 1;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.getCategories();
  }

  getCategories(){
    this.categories.push(
      new Category(this.index++, "0111161", "The Shawshank Redemption", 0)
    );
    this.categories.push(
      new Category(this.index++, "0068646", "The Godfather", 1)
    );
    this.categories.push(
      new Category(this.index++, "0468569", "The Dark Knight", 1)
    );

    this.index += 3;
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

    $("#modalForm").modal("hide");
    alert("Categoría guardada exitósamente!");
  }

  onSubmitCreate(){
    let category = new Category(this.index++, this.form.controls['code'].value!,
				this.form.controls['category'].value!, 1);
    this.categories.push(category);
  }

  onSubmitUpdate(){
    let category = this.getCategory(this.categoryUpdated)!;
    category.code = this.form.controls['code'].value!;
    category.category = this.form.controls['category'].value!;
    this.categoryUpdated = 0;
  }

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  enableCategory(category: Category){
    category.status = 1;
  }

  disableCategory(category: Category){
    category.status = 0;
  }

  updateCategory(category: Category){
    this.categoryUpdated = category.category_id;
    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['code'].setValue(category.code);
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  getCategory(category_id: number){
    for (let category of this.categories) {
      if (category.category_id == category_id) {
	return category;
      }
    }
    return null;
  }
}
