// 2
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { StoreModule } from '@ngrx/store'
import { productsReducer} from './state/product.reducer'

const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    /* 
    1. Each feature that defines/uses state must have a StoreModule.forFeature() imported into its module.
    2. Syntax .forFeature( <name of state slice>, <reducer [or set of reducers] for that slice of state> )
    3. Syntax for multiple reducers .forFeature('products', {
      productList: listReducer,
      productData: dataReducer    
    })
     */
    StoreModule.forFeature('products', productsReducer)

  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
