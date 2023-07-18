// 1

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

import {createReducer, on, createAction, createFeatureSelector, createSelector} from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';


/******* Strongly Typing State with Interfaces ***********/

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number; // Added for composing selectors example
  currentProduct: Product;
  products: Product[];
}

/******* Instantiating initial state  ***********/
const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null, // Added for composing selectors example
  currentProduct: null,
  products: []
};

/******** Building a Selector ****************/
/* Benefits of building selectors:
* 1. They provide a strongly typed API for the components to use so we don't have to refer to slices of state with hard‑coded strings.
* 2. They decouple the store from the components, so the components don't need to know about the structure of the store.
* 3. Selectors can encapsulate complex data transformations, making it easier for the components to obtain complex data
* 4. They are reusable, so any component can access the same bit of state, the same way
* 5. They are memoized/cached, and won't be reevaluated unless the state changes. This can improve performance.
*
*  A Selector is just a function that drills into the store and returns a specific bit of state*/

/* First we create a selector that retrieves the desired feature slice of state we want.
 1. We dont export this const so that it is only used in this file
* */
const getProductFeatureState = createFeatureSelector<ProductState>('products');

/* Next we create a selector for the property we are interested in.
* 1. We want this general selector available anywhere in the application so we export the const
* 2. The first arg is the selector for the feature we want, the second ard is the projector fn which gets the results of
*    the selector functions and manipulates that slice of state to return the desired property value*/
export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct);
export const getProductList = createSelector(getProductFeatureState, state => state.products);

/* Composing Selectors
*  Each selector we create with createSelector is composed from the createFeatureSelector. But we aren't limited to one.
*  We can compose multiple selectors to build a single selector. Say that instead of storing the currentProduct in the store,
*  we retain the ID of the current product. The selector for this property would look like this, but our component still
*  wants the current product, not just the ID. To do that, we further compose our current product selector. Here we pass
* in both the getProductFeatureState selector and the getCurrentProductId selector. The result of each selector is provided
* to the projector function in the order they are defined. So the first argument here is the state returned from the getProductFeature
* selector. The second argument is the current product ID returned from the get product ID selector. Our projector function
* can then use both arguments to return the appropriate product. This code uses the array find method to find the desired
* product in the array using the current product ID provided from the store. */
export const getCurrentProductId = createSelector(getProductFeatureState, state => state.currentProductId);
export const getCurrentProductUsingId = createSelector(getProductFeatureState, getCurrentProductId,
  (state, currentProductId) => state.products.find(p => p.id === currentProductId));

/********Strongly Typing Reducer***************/
export const productReducer = createReducer<ProductState>(
  initialState,
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);
