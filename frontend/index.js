import { backend } from 'declarations/backend';

const shoppingList = document.getElementById('shopping-list');
const addItemForm = document.getElementById('add-item-form');
const newItemInput = document.getElementById('new-item');
const categorySelect = document.getElementById('category-select');
const categoriesContainer = document.getElementById('categories-container');
const saveCartBtn = document.getElementById('save-cart-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

async function loadCartItems() {
    const items = await backend.getCartItems();
    shoppingList.innerHTML = '';
    for (const item of items) {
        const li = await createItemElement(item);
        shoppingList.appendChild(li);
    }
}

async function createItemElement(item) {
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
        await backend.toggleCartItem(item.id);
        li.classList.toggle('completed');
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', async () => {
        await backend.deleteCartItem(item.id);
        li.remove();
    });

    return li;
}

async function loadCategories() {
    const categories = await backend.getCategories();
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    categoriesContainer.innerHTML = '';

    for (const category of categories) {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.innerHTML = `
            <h3><span class="category-icon">${category.icon}</span>${category.name}</h3>
            <ul>
                ${await Promise.all(category.items.map(async (item) => {
                    const icon = await backend.getItemIcon(item);
                    return `<li><span class="item-icon">${icon}</span>${item}</li>`;
                })).then(items => items.join(''))}
            </ul>
        `;
        categoriesContainer.appendChild(categoryDiv);

        categoryDiv.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', () => {
                newItemInput.value = li.textContent.trim();
                categorySelect.value = category.name;
            });
        });
    }
}

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = newItemInput.value.trim();
    const category = categorySelect.value;
    
    if (await backend.validateItem(text, category)) {
        const icon = await backend.getItemIcon(text);
        const id = await backend.addItemToCart(text, category, icon);
        const item = { id, text, completed: false, category, icon };
        const li = await createItemElement(item);
        shoppingList.appendChild(li);
        newItemInput.value = '';
        categorySelect.value = '';
    } else {
        alert('Invalid item or category. Please try again.');
    }
});

saveCartBtn.addEventListener('click', async () => {
    const saved = await backend.saveCart();
    if (saved) {
        alert('Cart saved successfully!');
    } else {
        alert('Failed to save cart. Please try again.');
    }
});

clearCartBtn.addEventListener('click', async () => {
    const cleared = await backend.clearCart();
    if (cleared) {
        shoppingList.innerHTML = '';
        alert('Cart cleared successfully!');
    } else {
        alert('Failed to clear cart. Please try again.');
    }
});

window.addEventListener('load', async () => {
    await loadCategories();
    await loadCartItems();
});