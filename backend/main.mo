import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor {
  // Define the ShoppingItem type
  type ShoppingItem = {
    id: Nat;
    text: Text;
    completed: Bool;
    category: Text;
  };

  // Define the Category type
  type Category = {
    name: Text;
    items: [Text];
  };

  // Stable variable to store shopping items
  stable var items : [ShoppingItem] = [];
  stable var nextId : Nat = 0;

  // Predefined categories with items
  let categories : [Category] = [
    { name = "Produce"; items = ["Apples", "Bananas", "Carrots", "Lettuce"] },
    { name = "Bakery"; items = ["Bread", "Muffins", "Bagels", "Croissants"] },
    { name = "Dairy"; items = ["Milk", "Cheese", "Yogurt", "Butter"] },
    { name = "Meat"; items = ["Chicken", "Beef", "Pork", "Fish"] },
    { name = "Pantry"; items = ["Rice", "Pasta", "Canned Tomatoes", "Cereal"] }
  ];

  // Add a new item to the shopping list
  public func addItem(text: Text, category: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem : ShoppingItem = {
      id = id;
      text = text;
      completed = false;
      category = category;
    };
    items := Array.append(items, [newItem]);
    id
  };

  // Toggle the completion status of an item
  public func toggleItem(id: Nat) : async Bool {
    items := Array.map<ShoppingItem, ShoppingItem>(items, func (item) {
      if (item.id == id) {
        return {
          id = item.id;
          text = item.text;
          completed = not item.completed;
          category = item.category;
        };
      };
      item
    });
    true
  };

  // Delete an item from the shopping list
  public func deleteItem(id: Nat) : async Bool {
    let newItems = Array.filter<ShoppingItem>(items, func (item) {
      item.id != id
    });
    if (newItems.size() < items.size()) {
      items := newItems;
      true
    } else {
      false
    }
  };

  // Get all items in the shopping list
  public query func getItems() : async [ShoppingItem] {
    items
  };

  // Get all categories with their predefined items
  public query func getCategories() : async [Category] {
    categories
  };
}