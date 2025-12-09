// Cooking stations where player interacts
class CookingStation {
    constructor(x, y, width, height, type, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.color = color;
        this.item = null;
        this.cookingTime = 0;
        this.cookDuration = 3000; // 3 seconds to cook
    }

    draw(ctx) {
        // Draw station
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draw label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.type, this.x + this.width / 2, this.y + 20);

        // Draw item if present
        if (this.item) {
            ctx.fillStyle = INGREDIENT_TYPES[this.item].color;
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2 + 10, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.stroke();

            // Show cooking progress for grill
            if (this.type === 'GRILL' && this.cookingTime > 0) {
                const progress = this.cookingTime / this.cookDuration;
                ctx.fillStyle = 'rgba(255, 165, 0, 0.7)';
                ctx.fillRect(this.x, this.y + this.height - 5, this.width * progress, 5);
            }
        }
    }

    update(deltaTime) {
        if (this.type === 'GRILL' && this.item === 'MEAT' && this.cookingTime < this.cookDuration) {
            this.cookingTime += deltaTime;
        }
    }

    isNearby(player) {
        const distance = Math.sqrt(
            Math.pow(player.x - (this.x + this.width / 2), 2) +
            Math.pow(player.y - (this.y + this.height / 2), 2)
        );
        return distance < 80;
    }

    isCookingComplete() {
        return this.cookingTime >= this.cookDuration;
    }
}

class WorkStation {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.food = new Food();
    }

    draw(ctx) {
        // Draw counter
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draw label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PREP TABLE', this.x + this.width / 2, this.y + 20);

        // Draw ingredients on plate
        if (this.food.ingredients.length > 0) {
            const startX = this.x + 20;
            const y = this.y + this.height / 2 + 10;

            this.food.ingredients.forEach((ing, i) => {
                ctx.fillStyle = INGREDIENT_TYPES[ing].color;
                const xPos = startX + (i * 15);
                ctx.fillRect(xPos, y - 10, 12, 20);
                ctx.strokeStyle = '#333';
                ctx.strokeRect(xPos, y - 10, 12, 20);
            });
        }
    }

    isNearby(player) {
        const distance = Math.sqrt(
            Math.pow(player.x - (this.x + this.width / 2), 2) +
            Math.pow(player.y - (this.y + this.height / 2), 2)
        );
        return distance < 80;
    }
}

class ServingStation {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.food = null;
    }

    draw(ctx) {
        ctx.fillStyle = '#CD853F';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SERVE', this.x + this.width / 2, this.y + 20);

        if (this.food && this.food.ingredients.length > 0) {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2 + 10, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.stroke();
        }
    }

    isNearby(player) {
        const distance = Math.sqrt(
            Math.pow(player.x - (this.x + this.width / 2), 2) +
            Math.pow(player.y - (this.y + this.height / 2), 2)
        );
        return distance < 80;
    }
}
