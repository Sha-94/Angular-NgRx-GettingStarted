// 2
export interface State {
  // products: ProductState; <--- This breaks our lazy loading paradigm due to ProductState being bundled in our lazy loaded Product Module wheres this file would get loaded outside of that module. <reference product.reducer for work around>
  users: any;
}
