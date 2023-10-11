import { Component } from '@angular/core';
import { Category } from '../../_models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

    ngOnInit(){
	this.getCategories();
    }
  categories: Category[] = [];

      new Category(1, "0111161", "The Shawshank Redemption", "9.3/10")
    );
    this.categories.push(
      new Category(2, "0068646", "The Godfather", "9.2/10 (1.9M)")
    );
    this.categories.push(
      new Category(3, "0468569", "The Dark Knight", "9.0/10")
    );
}
