import { CalculatedProduct } from '../../vendure/calculated-product';
import { Collection } from '../../../../common';

export interface ShopData {
  /**
   * All products from store
   */
  products: CalculatedProduct[];
  /**
   * Products with variants per collection
   */
  productsPerCollection: CollectionMap[];
  /**
   * All collections from the store
   * DOES NOT INCLUDE VARIANTS. Just basic collection info
   */
  collections: BasicCollection[];
}

export interface CollectionMap {
  collection: BasicCollection;
  products: CalculatedProduct[];
}

export type BasicCollection = Omit<Collection, 'productVariants'>;
