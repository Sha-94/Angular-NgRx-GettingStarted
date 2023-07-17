//1

/*
Example of our State  
{
  app: { 
    hideWelcomePage: true
  },
  users: {
    maskUserName: false,
    currentUser: {...}
  },
  customers: { 
    customerFilter: 'Harkness',
    currentCustomer: {...}
    customers: [...]
  }
  products: { 
    showProductCode: true,
    currentProduct: {...}
    products: [...],
    productTypes: [...]
  }
  ...
}

We can strongly type our State object above by creating interfaces for each feature state: 
export interface AppState {
  hideWelcomePage: boolean;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User; 
}
... 

Then we can create a global State interface which is a composition of our feature states <refer to ./app/state/app.state.ts for impl> (this can cause issues if feature is lazy loaded): 
export interface State {
  app: AppState;
  users: UserState;
  customers: CustomerState;
  products: ProductState;
  ...
}

This could prevent us from making silly typos when referencing our state object in the reducer or client. It also helps in the IDE give relevant suggestions during development

Since reducers represent our feature state, it makes sense to define our feature state interface in the reducer file. 

*/

import { createReducer, on, createAction } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export const productReducer = createReducer<ProductState>(
  { showProductCode: true } as ProductState,
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);
