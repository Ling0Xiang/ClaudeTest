// Player character - Stationary crepe maker
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 100;
        this.heldItem = null; // Not used in point-and-click
        this.heldFood = null; // Not used in point-and-click
    }

    update(deltaTime, keys) {
        // No movement in point-and-click version
    }

    draw(ctx) {
        // Draw chef body
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(this.x, this.y + 30, this.width, this.height - 30);

        // Draw chef head
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 20, 18, 0, Math.PI * 2);
        ctx.fill();

        // Draw chef hat
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(this.x + 5, this.y, this.width - 10, 15);
        ctx.fillRect(this.x + 10, this.y - 15, this.width - 20, 15);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x + 5, this.y, this.width - 10, 15);
        ctx.strokeRect(this.x + 10, this.y - 15, this.width - 20, 15);

        // Draw eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2 - 6, this.y + 18, 2, 0, Math.PI * 2);
        ctx.arc(this.x + this.width / 2 + 6, this.y + 18, 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw smile
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 24, 6, 0, Math.PI);
        ctx.stroke();

        // Draw body outline
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y + 30, this.width, this.height - 30);
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
