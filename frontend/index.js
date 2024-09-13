import { backend } from 'declarations/backend';

const shoppingList = document.getElementById('shopping-list');
const addItemForm = document.getElementById('add-item-form');
const newItemInput = document.getElementById('new-item');
const categorySelect = document.getElementById('category-select');
const categoriesContainer = document.getElementById('categories-container');

async function loadItems() {
    const items = await backend.getItems();
    shoppingList.innerHTML = '';
    items.forEach(item => {
        const li = createItemElement(item);
        shoppingList.appendChild(li);
    });
}

function createItemElement(item) {
    const li = document.createElement('li');
    li.className = `shopping-item ${item.completed ? 'completed' : ''}`;
    li.innerHTML = `
        <span class="item-icon">${item.icon}</span>
        <input type="checkbox" ${item.completed ? 'checked' : ''}>
        <span>${item.text}</span>
        <small>(${item.category})</small>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;

    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', async () => {
        await backend.toggleItem(item.id);
        li.classList.toggle('completed');
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', async () => {
        await backend.deleteItem(item.id);
        li.remove();
    });

    return li;
}

async function loadCategories() {
    const categories = await backend.getCategories();
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    categoriesContainer.innerHTML = '';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.innerHTML = `
            <h3><span class="category-icon">${category.icon}</span>${category.name}</h3>
            <ul>
                ${category.items.map(item => `<li><span class="item-icon">${getItemIcon(item)}</span>${item}</li>`).join('')}
            </ul>
        `;
        categoriesContainer.appendChild(categoryDiv);

        categoryDiv.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', () => {
                newItemInput.value = li.textContent.trim();
                categorySelect.value = category.name;
            });
        });
    });
}

function getItemIcon(item) {
    // This function should match the logic in the backend's getItemIcon function
    const iconMap = {
        "Apples": "🍎", "Bananas": "🍌", "Carrots": "🥕", "Lettuce": "🥬",
        "Bread": "🍞", "Muffins": "🧁", "Bagels": "🥯", "Croissants": "🥐",
        "Milk": "🥛", "Cheese": "🧀", "Yogurt": "🍶", "Butter": "🧈",
        "Chicken": "🍗", "Beef": "🥩", "Pork": "🍖", "Fish": "🐟",
        "Rice": "🍚", "Pasta": "🍝", "Canned Tomatoes": "🥫", "Cereal": "🥣"
    };
    return iconMap[item] || "🛒";
}

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = newItemInput.value.trim();
    const category = categorySelect.value;
    if (text && category) {
        const id = await backend.addItem(text, category);
        const item = { id, text, completed: false, category, icon: getItemIcon(text) };
        const li = createItemElement(item);
        shoppingList.appendChild(li);
        newItemInput.value = '';
        categorySelect.value = '';
    }
});

window.addEventListener('load', async () => {
    await loadCategories();
    await loadItems();
});