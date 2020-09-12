import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsOverviewComponent} from './product/products-overview.component';
import {ProductDetailComponent} from './product/product-detail.component';
import {CartComponent} from './cart/cart.component';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';
import {ShippingComponent} from './shipping/shipping.component';

const routes: Routes = [
  { path: '', component: ProductsOverviewComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: 'shipping', component: ShippingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
