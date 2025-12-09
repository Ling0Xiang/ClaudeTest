// Player character
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 50;
        this.speed = 200;
        this.heldItem = null; // Ingredient type or food
        this.heldFood = null; // Food object with multiple ingredients
    }

    update(deltaTime, keys) {
        const moveDistance = this.speed * (deltaTime / 1000);

        // Movement
        if (keys['ArrowUp'] || keys['w']) {
            this.y = Math.max(0, this.y - moveDistance);
        }
        if (keys['ArrowDown'] || keys['s']) {
            this.y = Math.min(600 - this.height, this.y + moveDistance);
        }
        if (keys['ArrowLeft'] || keys['a']) {
            this.x = Math.max(0, this.x - moveDistance);
        }
        if (keys['ArrowRight'] || keys['d']) {
            this.x = Math.min(800 - this.width, this.x + moveDistance);
        }
    }

    draw(ctx) {
        // Draw player body
        ctx.fillStyle = '#3498db';
        ctx.fillRect(this.x, this.y + 15, this.width, this.height - 15);

        // Draw player head
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 12, 12, 0, Math.PI * 2);
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2 - 4, this.y + 10, 2, 0, Math.PI * 2);
        ctx.arc(this.x + this.width / 2 + 4, this.y + 10, 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw held item
        if (this.heldItem) {
            ctx.fillStyle = INGREDIENT_TYPES[this.heldItem].color;
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y - 15, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.stroke();
        } else if (this.heldFood && this.heldFood.ingredients.length > 0) {
            // Draw plate with food
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y - 15, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.stroke();
        }

        // Draw player outline
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y + 15, this.width, this.height - 15);
    }

    pickUpItem(item) {
        if (!this.heldItem && !this.heldFood) {
            this.heldItem = item;
            return true;
        }
        return false;
    }

    pickUpFood(food) {
        if (!this.heldItem && !this.heldFood && food.ingredients.length > 0) {
            this.heldFood = food;
            return true;
        }
        return false;
    }

    dropItem() {
        const item = this.heldItem;
        this.heldItem = null;
        return item;
    }

    dropFood() {
        const food = this.heldFood;
        this.heldFood = null;
        return food;
    }

    hasItem() {
        return this.heldItem !== null || (this.heldFood !== null && this.heldFood.ingredients.length > 0);
    }
}
