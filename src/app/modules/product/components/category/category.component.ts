import { Component } from '@angular/core';
import { category } from '../../_models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
    categories: category[] = [];

    getCategories(){
	this.categories.push(
	    new category(1, "0111161", "The Shawshank Redemption", "9.3/10")
	);
	this.categories.push(
	    new category(2, "0068646", "The Godfather", "9.2/10 (1.9M)")
	);
	this.categories.push(
	    new category(3, "0468569", "The Dark Knight", "9.0/10")
	);
    }

    ngOnInit(){
	this.getCategories();
    }
}
