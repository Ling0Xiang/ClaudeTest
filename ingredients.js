// Ingredient types and recipes for crepes
class Ingredient {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.cooked = false;
    }
}

const INGREDIENT_TYPES = {
    BATTER: { name: 'Batter', color: '#F5DEB3' },
    STRAWBERRY: { name: 'Strawberry', color: '#FF6B9D' },
    BANANA: { name: 'Banana', color: '#FFE135' },
    CHOCOLATE: { name: 'Chocolate', color: '#3B2414' },
    WHIPPED_CREAM: { name: 'Whipped Cream', color: '#FFFACD' },
    NUTELLA: { name: 'Nutella', color: '#4A2511' },
    BLUEBERRY: { name: 'Blueberry', color: '#4169E1' },
    SUGAR: { name: 'Sugar', color: '#FFFFFF' }
};

const RECIPES = {
    CLASSIC: {
        name: 'Classic Crepe',
        ingredients: ['BATTER', 'SUGAR'],
        needsCooking: true,
        price: 8,
        time: 15
    },
    STRAWBERRY_DREAM: {
        name: 'Strawberry Dream',
        ingredients: ['BATTER', 'STRAWBERRY', 'WHIPPED_CREAM', 'SUGAR'],
        needsCooking: true,
        price: 12,
        time: 20
    },
    CHOCOLATE_BANANA: {
        name: 'Chocolate Banana',
        ingredients: ['BATTER', 'BANANA', 'CHOCOLATE', 'WHIPPED_CREAM'],
        needsCooking: true,
        price: 14,
        time: 22
    },
    NUTELLA_DELIGHT: {
        name: 'Nutella Delight',
        ingredients: ['BATTER', 'NUTELLA', 'BANANA', 'STRAWBERRY'],
        needsCooking: true,
        price: 15,
        time: 25
    },
    BERRY_BLAST: {
        name: 'Berry Blast',
        ingredients: ['BATTER', 'STRAWBERRY', 'BLUEBERRY', 'WHIPPED_CREAM', 'SUGAR'],
        needsCooking: true,
        price: 16,
        time: 28
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
