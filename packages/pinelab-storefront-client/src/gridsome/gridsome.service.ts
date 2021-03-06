import {
  Collection,
  CollectionList,
  Product,
  ProductList,
  ProductVariant,
} from '../../../common';
import { GET_COLLECTIONS, GET_PRODUCTS } from './gridsome.queries';
import { CollectionMap, deduplicate, setCalculatedFields } from '../';
import { CalculatedProduct } from '../vendure/calculated-product';
import { BasicCollection, ShopData } from './types/shop-data';

/**
 * Generates Gridsome pages based on given PageMap
 */
export class GridsomeService {
  constructor(private graphqlFn: Function) {}

  async getShopData(): Promise<ShopData> {
    const [collectionList, productList] = await Promise.all([
      this.getAllCollections(),
      this.getAllProducts(),
    ]);
    const products = productList.items.map((p: Product) =>
      setCalculatedFields(p)
    );
    products.map((p) => (p.soldOut = false));

    const productsPerCollection: CollectionMap[] = collectionList.items.map(
      (collection: Collection) => {
        const products = this.getProductsForCollection(collection);
        return {
          collection: { ...collection, productVariants: undefined },
          products,
        };
      }
    );
    const collections: BasicCollection[] = collectionList.items.map(
      (c: Collection) => ({
        ...c,
        productVariants: undefined,
      })
    );
    return {
      products,
      productsPerCollection,
      collections,
    };
  }

  /**
   * Get products of collection based on `collection.variants`
   */
  getProductsForCollection(collection: Collection): CalculatedProduct[] {
    let productsPerCollection: Product[] = collection.productVariants.items.map(
      (variant: ProductVariant) => variant.product
    );
    productsPerCollection = deduplicate(productsPerCollection);
    return productsPerCollection.map((p) => setCalculatedFields(p));
  }

  async getAllCollections(): Promise<CollectionList> {
    const {
      data: {
        Vendure: { collections },
      },
    } = await this.graphqlFn(GET_COLLECTIONS);
    return collections;
  }

  async getAllProducts(): Promise<ProductList> {
    const {
      data: {
        Vendure: { products },
      },
    } = await this.graphqlFn(GET_PRODUCTS);
    return products;
  }
}
