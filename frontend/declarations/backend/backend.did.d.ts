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
  'addItem' : ActorMethod<[string, string], bigint>,
  'deleteItem' : ActorMethod<[bigint], boolean>,
  'getCategories' : ActorMethod<[], Array<Category>>,
  'getItemIcon' : ActorMethod<[string], string>,
  'getItems' : ActorMethod<[], Array<ShoppingItem>>,
  'toggleItem' : ActorMethod<[bigint], boolean>,
  'validateItem' : ActorMethod<[string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
