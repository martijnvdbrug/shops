import {GraphQLClient} from 'graphql-request';
import {
  activeOrderQuery,
  addItemToOrderMutation,
  adjustOrderLineMutation, eligibleShippingMethodsQuery,
  productQuery,
  productsQuery,
  setCustomerForOrderMutation, setOrderShippingAddressMutation, setOrderShippingMethodMutation
} from './graphql.queries';
import {environment} from '../../environments/environment';
import {Globals} from '../constants';
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {CreateAddressInput, CreateCustomerInput, Order, Product, ShippingMethodQuote} from '../../generated/graphql';
import {ExtendedProduct} from './types/extended-product';

@Injectable({
  providedIn: 'root',
})
export class VendureService extends GraphQLClient {

  activeOrder$ = new ReplaySubject<Order>(1);

  constructor() {
    super(environment.vendureEndpoint, {headers: {'vendure-token': Globals.channelId}, credentials: 'include'});
    this.getOrder().then(order => this.activeOrder$.next(order));
  }

  async getProducts(): Promise<ExtendedProduct[]> {
    const {products} = await this.request(productsQuery);
    return products?.items.map((p) => this.setLowestPrice(p));
  }

  async getProduct(id: string): Promise<ExtendedProduct> {
    const {product} = await this.request(productQuery, {id});
    return this.setLowestPrice(product);
  }

  async addProduct(productVariantId: string, quantity: number): Promise<Order> {
    const {addItemToOrder} = await this.request(addItemToOrderMutation, {productVariantId, quantity});
    this.activeOrder$.next(addItemToOrder);
    return addItemToOrder;
  }

  /**
   * Gets minimal activeOrder
   */
  async getOrder(): Promise<Order> {
    const {activeOrder} = await this.request(activeOrderQuery);
    this.activeOrder$.next(activeOrder);
    return activeOrder;
  }

  async adjustOrderLine(orderLineId: string, quantity: number): Promise<Order> {
    const {adjustOrderLine} = await this.request(adjustOrderLineMutation, {orderLineId, quantity});
    this.activeOrder$.next(adjustOrderLine);
    return adjustOrderLine;
  }

  async setCustomerForOrder(input: CreateCustomerInput): Promise<Order> {
    const {setCustomerForOrder} = await this.request(setCustomerForOrderMutation, {input});
    this.activeOrder$.next(setCustomerForOrder);
    return setCustomerForOrder;
  }

  async setOrderShippingAddress(input: CreateAddressInput): Promise<Order> {
    const {setOrderShippingAddress} = await this.request(setOrderShippingAddressMutation, {input});
    this.activeOrder$.next(setOrderShippingAddress);
    return setOrderShippingAddress;
  }

  async getEligibleShippingMethods(): Promise<ShippingMethodQuote[]> {
    const {eligibleShippingMethods} = await this.request(eligibleShippingMethodsQuery);
    return eligibleShippingMethods;
  }

  async setOrderShippingMethod(shippingMethodId: string): Promise<Order> {
    const {setOrderShippingMethod} = await this.request(setOrderShippingMethodMutation, shippingMethodId);
    this.activeOrder$.next(setOrderShippingMethod);
    return setOrderShippingMethod;
  }

  async setDefaultShipping(): Promise<Order> {
    const methods = await this.getEligibleShippingMethods();
    const defaultMethod = methods.find(m => m.description?.indexOf('Normal') > -2);
    return this.setOrderShippingMethod(defaultMethod.id);
  }

  /**
   * Set lowest price based on lowest price of variants
   */
  private setLowestPrice(product: Product): ExtendedProduct {
    const defaultPrice = Math.min(...product.variants.map(v => v.priceWithTax));
    return {
      ...product,
      defaultPrice
    };
  }

}
