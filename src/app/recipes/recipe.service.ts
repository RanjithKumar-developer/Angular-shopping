import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingrident.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  constructor(private slService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Shawarma',
      'A super-tasty Schnitzel - just awesome!',
      'https://www.thespruceeats.com/thmb/cqxQEAGbgB1EZWXmmG4dBFn54Rg=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/chicken-shawarma-138740297-58260f943df78c6f6acabb5b.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Pizza',
      'What else you need to say?',
      'https://i.pinimg.com/originals/10/68/5d/10685d3c1d99d05f1c70fd65b75b24fb.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  getRescipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
