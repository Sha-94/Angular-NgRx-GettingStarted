// 1

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShellComponent } from './home/shell.component';
import { MenuComponent } from './home/menu.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

/* Feature Modules */
import { UserModule } from './user/user.module';

import { StoreModule} from '@ngrx/store'

/* 
Installing Redux Devtools 
1. Install browser Redux Devtools extenstion
2. Install @ngrx/store-devtools
3. Initialize @ngrx/store-devtools module like this: 
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App Devtools, <---- If running multiple apps, this allows filtering 
      maxAge: 25 <--- Default is 50, redux will start deleting history once limit is hit
      logOnly: environment.production <---- Disables all extention features except logging if true
    })
*/ 

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    UserModule,
    AppRoutingModule,
    /*
    1. Syntax forRoot( reducer Object, config object ) 
    */
    StoreModule.forRoot({},{})
    
  ],
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
