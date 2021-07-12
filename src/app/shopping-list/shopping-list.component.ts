import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription; 
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients(); 
    
    this.igChangeSub = this.shoppingListService.ingredientChanged
        .subscribe(
          (ingredient: Ingredient[]) => {
            this.ingredients = ingredient;
          });
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe()
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);    
  }
}
