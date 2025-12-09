// Ingredient types and recipes
class Ingredient {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.cooked = false;
    }
}

const INGREDIENT_TYPES = {
    BREAD: { name: 'Bread', color: '#D2691E' },
    MEAT: { name: 'Meat', color: '#8B4513' },
    LETTUCE: { name: 'Lettuce', color: '#90EE90' },
    TOMATO: { name: 'Tomato', color: '#FF6347' },
    CHEESE: { name: 'Cheese', color: '#FFD700' },
    SAUCE: { name: 'Sauce', color: '#8B0000' }
};

const RECIPES = {
    BURGER: {
        name: 'Burger',
        ingredients: ['BREAD', 'MEAT', 'LETTUCE', 'TOMATO', 'BREAD'],
        cookMeat: true,
        price: 15,
        time: 20
    },
    SANDWICH: {
        name: 'Sandwich',
        ingredients: ['BREAD', 'LETTUCE', 'TOMATO', 'CHEESE', 'BREAD'],
        cookMeat: false,
        price: 10,
        time: 15
    },
    MEATLOVERS: {
        name: 'Meat Lovers',
        ingredients: ['BREAD', 'MEAT', 'MEAT', 'CHEESE', 'SAUCE', 'BREAD'],
        cookMeat: true,
        price: 20,
        time: 25
    },
    VEGGIE: {
        name: 'Veggie Special',
        ingredients: ['BREAD', 'LETTUCE', 'TOMATO', 'LETTUCE', 'CHEESE', 'BREAD'],
        cookMeat: false,
        price: 12,
        time: 18
    }
};

// Food item being prepared
class Food {
    constructor() {
        this.ingredients = [];
    }

    addIngredient(ingredientType) {
        this.ingredients.push(ingredientType);
    }

    matches(recipe) {
        if (this.ingredients.length !== recipe.ingredients.length) {
            return false;
        }
        for (let i = 0; i < this.ingredients.length; i++) {
            if (this.ingredients[i] !== recipe.ingredients[i]) {
                return false;
            }
        }
        return true;
    }

    clear() {
        this.ingredients = [];
    }
}
