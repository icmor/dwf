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

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false;
  index = 0;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.getCategories();
  }

  getCategories(){
    this.categories.push(
      new Category(1, "0111161", "The Shawshank Redemption", "9.3/10")
    );
    this.categories.push(
      new Category(2, "0068646", "The Godfather", "9.2/10 (1.9M)")
    );
    this.categories.push(
      new Category(3, "0468569", "The Dark Knight", "9.0/10")
    );

    this.index += 3;
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    let category = new Category(this.index++, this.form.controls['code'].value!,
				this.form.controls['category'].value!, "10/10");
    this.categories.push(category);
    $("#modalForm").modal("hide");
    alert("Categoría guardada exitósamente!");
  }

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}
