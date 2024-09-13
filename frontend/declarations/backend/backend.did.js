export const idlFactory = ({ IDL }) => {
  const Category = IDL.Record({
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'items' : IDL.Vec(IDL.Text),
  });
  const ShoppingItem = IDL.Record({
    'id' : IDL.Nat,
    'icon' : IDL.Text,
    'text' : IDL.Text,
    'completed' : IDL.Bool,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'addItem' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], []),
    'deleteItem' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
    'getItems' : IDL.Func([], [IDL.Vec(ShoppingItem)], ['query']),
    'toggleItem' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
