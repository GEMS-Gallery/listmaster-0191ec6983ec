export const idlFactory = ({ IDL }) => {
  const ShoppingItem = IDL.Record({
    'id' : IDL.Nat,
    'icon' : IDL.Text,
    'text' : IDL.Text,
    'completed' : IDL.Bool,
    'category' : IDL.Text,
  });
  const Category = IDL.Record({
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'items' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'addItemToCart' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Nat],
        ['query'],
      ),
    'clearCart' : IDL.Func([], [IDL.Bool], ['query']),
    'deleteCartItem' : IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
    'getCartItems' : IDL.Func([], [IDL.Vec(ShoppingItem)], ['query']),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
    'getItemIcon' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'saveCart' : IDL.Func([], [IDL.Bool], []),
    'toggleCartItem' : IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
    'validateItem' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
