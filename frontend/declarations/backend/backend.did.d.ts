import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Category {
  'icon' : string,
  'name' : string,
  'items' : Array<string>,
}
export interface ShoppingItem {
  'id' : bigint,
  'icon' : string,
  'text' : string,
  'completed' : boolean,
  'category' : string,
}
export interface _SERVICE {
  'addItemToCart' : ActorMethod<[string, string, string], bigint>,
  'clearCart' : ActorMethod<[], boolean>,
  'deleteCartItem' : ActorMethod<[bigint], boolean>,
  'getCartItems' : ActorMethod<[], Array<ShoppingItem>>,
  'getCategories' : ActorMethod<[], Array<Category>>,
  'getItemIcon' : ActorMethod<[string], string>,
  'saveCart' : ActorMethod<[], boolean>,
  'toggleCartItem' : ActorMethod<[bigint], boolean>,
  'validateItem' : ActorMethod<[string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
