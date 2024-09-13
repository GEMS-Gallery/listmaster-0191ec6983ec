import Bool "mo:base/Bool";
import Func "mo:base/Func";

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
    icon: Text;
  };

  // Define the Category type
  type Category = {
    name: Text;
    items: [Text];
    icon: Text;
  };

  // Stable variable to store shopping items
  stable var items : [ShoppingItem] = [];
  stable var nextId : Nat = 0;

  // Predefined categories with items and icons
  let categories : [Category] = [
    { name = "Produce"; items = ["Apples", "Bananas", "Carrots", "Lettuce"]; icon = "🥬" },
    { name = "Bakery"; items = ["Bread", "Muffins", "Bagels", "Croissants"]; icon = "🍞" },
    { name = "Dairy"; items = ["Milk", "Cheese", "Yogurt", "Butter"]; icon = "🥛" },
    { name = "Meat"; items = ["Chicken", "Beef", "Pork", "Fish"]; icon = "🍗" },
    { name = "Pantry"; items = ["Rice", "Pasta", "Canned Tomatoes", "Cereal"]; icon = "🥫" }
  ];

  // Function to get icon for an item
  func getItemIcon(item: Text) : Text {
    switch (item) {
      case "Apples" "🍎";
      case "Bananas" "🍌";
      case "Carrots" "🥕";
      case "Lettuce" "🥬";
      case "Bread" "🍞";
      case "Muffins" "🧁";
      case "Bagels" "🥯";
      case "Croissants" "🥐";
      case "Milk" "🥛";
      case "Cheese" "🧀";
      case "Yogurt" "🍶";
      case "Butter" "🧈";
      case "Chicken" "🍗";
      case "Beef" "🥩";
      case "Pork" "🍖";
      case "Fish" "🐟";
      case "Rice" "🍚";
      case "Pasta" "🍝";
      case "Canned Tomatoes" "🥫";
      case "Cereal" "🥣";
      case _ "🛒";
    }
  };

  // Add a new item to the shopping list
  public func addItem(text: Text, category: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem : ShoppingItem = {
      id = id;
      text = text;
      completed = false;
      category = category;
      icon = getItemIcon(text);
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
          icon = item.icon;
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