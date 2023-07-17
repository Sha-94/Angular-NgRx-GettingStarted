import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

import { Store } from '@ngrx/store';

/* 
1. import store using dependency injection. 
2. dispatch actions wherever they are needed. this.store.dispatch(action)
3. subscribe to state changes of your feature slice with this.store.select(sliceName). The NgRx select method and select operator both return a slice of state as an observable. If we want our component to be notified of changes to the state, we subscribe to this observable. Note that we are subscribing to this entire slice of state, so any changes to any bit of state in the products slice generates a notification and provides the entire slice of state.
*/

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private store: Store<any>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (currentProduct) => (this.selectedProduct = currentProduct)
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });
    // Whenever the state changes, we will receive the entire products slice
    // When the application is first executed, its slice of state is defined by the initial state we set in the reducer, but the products slice of state may not yet be defined. So here we wait to read the flag from our slice of state until that state exists.
    this.store.select('products').subscribe({
      next: (products) => {
        if (products) {
          this.displayCode = products.showProductCode;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    //this.displayCode = !this.displayCode; this LoC doesnt persist state after component is destroyed so we replace it with ngrx

    //Action is an object {type: string} where the type matches the corresponding action name set in the reducer
    this.store.dispatch({ type: '[Products] Toggle Product Code' });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }
}
