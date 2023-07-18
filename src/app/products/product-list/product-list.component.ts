import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

/* NgRx */
import { Store } from '@ngrx/store';
import {getShowProductCode, State} from '../state/product.reducer'; // Import State from Feature and not from app so it contains extended interface

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
    private store: Store<State>,
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

    /*
    * There are a few issues with the following block of code that we can improve upon:
    * 1. It subscribes to the entire slice of state [this.store.select('products').subscribe(...)] instead of the relevant
    *    piece of data from the state i.e the showProductCode flag
    * 2. The selector is hardcoded [...select('products')].
    * 3. We explicitly retrieve a property [products.showProductCode] from the store which assumes the stores structure.
    *    So if we made a change to the structure of our feature slice, we have to update every selector that references it.
    * We can resolve these issues by creating custom selectors <refer to reducer>

    this.store.select('products').subscribe((products) => {
      // If condition is no longer needed since our state is predictably defined with an initial state object
      if (products) {
        this.displayCode = products.showProductCode;
      }});

     */

    this.store.select(getShowProductCode).subscribe(showProductCode => this.displayCode = showProductCode);
   }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch({ type: '[Product] Toggle Product Code' });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }
}
