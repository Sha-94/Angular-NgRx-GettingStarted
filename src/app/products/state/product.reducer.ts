// 3

/*
Our Store is just a plain javascript object with slices for each feature: 
{
  app: { <----- feature/slice of state
    hideWelcomePage: true
  },
  users: { <----- feature slice
    maskUserName: false,
    currentUser: {...}
  },
  customers: { <------ feature slice
    customerFilter: 'Harkness',
    currentCustomer: {...}
    customers: [...]
  }
  products: { <----- feature/slice of state
    showProductCode: true,
    currentProduct: {...}
    products: [...],
    productTypes: [...]
  }

  **********Example of sub-slicing**************
  products: { <----- feature/slice of state
    productList: { <----- feaute sub-slice (these typically have their own reducers)
      showProductCode: true,
      currentProduct: {...}
    },
    productData: { <---- feature sub-slice
      products: [...],
      productTypes: [...]
    }
  }
  **********************************************,
  ...
}
*/

/* 
1. The store's state tree should be immutable, meaning its structure and values should never be changed once it's been created. 
2. We typically create a reducer for each feature slice of state so it makes sense to name the reducer after the slice of state it represents. (i.e productsReducer <-- referenced in our feature module where we initialize the Store) 
3. We use the @ngrx library to create reducers and actions. The purpose of the reducer function is to listen for actions, and for each action, handle the transition from the current state to new state in an immutable way. 
4. The first arg in the reducer is the initial state for our slice. This is what the  feature's state will be on app load.
5. The second arg is used to identify actions and their handlers using one or more "on" functions. The "on" function takes in the action name, and a handler function to handle that action. That handler function takes in the current state, processes it as required, and returns new state. "on" functions are comma seperated when we want to handle multiple actions i.e productReducer = createReducer(initialState, on(...), on(...), on(...))
6. A reducer should always be a pure function and synchronous 
7. Now that the reducer is built and referenced in our featureModule, we need to dispatch actions from our feature component and subscribe to state changes <refer to products-list component> 

*/

import { createReducer, createAction, on } from '@ngrx/store';

export const productsReducer = createReducer(
  { showProductCode: false },
  on(createAction('[Products] Toggle Product Code'), (state) => {
    console.log('original state: ', JSON.stringify(state));
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);

/* 
Flow

1. We registered our product's reducer in the product feature module when we initialized the store [ StoreModule.forFeature(...)] , so our product's reducer represents the product's slice of state. 
2. Our product's slice of state includes the data for the currently selected product and the list of products for display in the product list <refer to pojo above>. 
3. The user clicks on the Display Product Code check box and the toggleProductCode action is dispatched. 
4. The reducer takes in that action and the reducer's associated slice of state, which, in this example, is our entire product slice. 
5. The reducer then creates new state by copying the existing state and applying changes to that copy based on the defined action, in this example, by adding showProductCode with a value of true. 
6. The reducer then replaces the product slice portion of the state tree with this new state, thereby creating new state. 
*/
