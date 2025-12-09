// Crepe Pan - where the crepe is cooked
class CrepePan {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.cooking = false;
        this.cookingTime = 0;
        this.cookDuration = 3000; // 3 seconds to cook
        this.hasBatter = false;
        this.isCooked = false;
    }

    draw(ctx) {
        // Draw pan
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1A252F';
        ctx.lineWidth = 8;
        ctx.stroke();

        // Draw pan handle
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x + this.radius - 10, this.y - 10, 60, 20);
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x + this.radius - 10, this.y - 10, 60, 20);

        // Draw batter/crepe if present
        if (this.hasBatter) {
            const crepeColor = this.isCooked ? '#F4E4C1' : '#F5DEB3';
            ctx.fillStyle = crepeColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius - 15, 0, Math.PI * 2);
            ctx.fill();

            // Cooking effect
            if (this.cooking && !this.isCooked) {
                ctx.strokeStyle = 'rgba(255, 165, 0, 0.7)';
                ctx.lineWidth = 4;
                ctx.stroke();
            }
        }

        // Draw cooking progress bar
        if (this.cooking && !this.isCooked) {
            const progress = this.cookingTime / this.cookDuration;
            const barWidth = 120;
            const barHeight = 12;
            const barX = this.x - barWidth / 2;
            const barY = this.y + this.radius + 20;

            // Background
            ctx.fillStyle = '#ccc';
            ctx.fillRect(barX, barY, barWidth, barHeight);

            // Progress
            ctx.fillStyle = '#f39c12';
            ctx.fillRect(barX, barY, barWidth * progress, barHeight);

            // Border
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.strokeRect(barX, barY, barWidth, barHeight);

            // Text
            ctx.fillStyle = '#333';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('COOKING...', this.x, barY + barHeight + 15);
        }

        // Draw "READY" text if cooked
        if (this.isCooked) {
            ctx.fillStyle = '#2ecc71';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('READY!', this.x, this.y + this.radius + 30);
        }
    }

    update(deltaTime) {
        if (this.cooking && !this.isCooked) {
            this.cookingTime += deltaTime;
            if (this.cookingTime >= this.cookDuration) {
                this.isCooked = true;
                this.cooking = false;
            }
        }
    }

    addBatter() {
        if (!this.hasBatter) {
            this.hasBatter = true;
            this.cooking = true;
            this.cookingTime = 0;
            this.isCooked = false;
            return true;
        }
        return false;
    }

    removeCrepe() {
        if (this.isCooked) {
            this.hasBatter = false;
            this.isCooked = false;
            this.cooking = false;
            this.cookingTime = 0;
            return true;
        }
        return false;
    }

    reset() {
        this.hasBatter = false;
        this.isCooked = false;
        this.cooking = false;
        this.cookingTime = 0;
    }

    contains(x, y) {
        const distance = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        return distance <= this.radius;
    }
}

// Ingredient Button - clickable ingredient selector
class IngredientButton {
    constructor(x, y, width, height, ingredientType) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ingredientType = ingredientType;
        this.ingredientInfo = INGREDIENT_TYPES[ingredientType];
        this.hovered = false;
    }

    draw(ctx) {
        // Draw button background
        ctx.fillStyle = this.hovered ? '#ECF0F1' : '#BDC3C7';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw ingredient color
        ctx.fillStyle = this.ingredientInfo.color;
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 25, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.ingredientInfo.name, this.x + this.width / 2, this.y + this.height - 8);

        // Draw border
        ctx.strokeStyle = this.hovered ? '#3498db' : '#7F8C8D';
        ctx.lineWidth = this.hovered ? 3 : 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    contains(x, y) {
        return x >= this.x && x <= this.x + this.width &&
               y >= this.y && y <= this.y + this.height;
    }

    setHovered(hovered) {
        this.hovered = hovered;
    }
}

// Preparation Plate - where toppings are added
class PrepPlate {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.food = new Food();
        this.hasCrepe = false;
    }

    draw(ctx) {
        // Draw plate
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#BDC3C7';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw inner circle
        ctx.strokeStyle = '#ECF0F1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius - 10, 0, Math.PI * 2);
        ctx.stroke();

        // Draw crepe if present
        if (this.hasCrepe) {
            ctx.fillStyle = '#F4E4C1';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius - 20, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw toppings
        if (this.food.ingredients.length > 1) { // More than just batter
            const toppings = this.food.ingredients.slice(1); // Skip batter
            toppings.forEach((ingredient, index) => {
                const angle = (index / toppings.length) * Math.PI * 2;
                const offsetX = Math.cos(angle) * 25;
                const offsetY = Math.sin(angle) * 25;

                ctx.fillStyle = INGREDIENT_TYPES[ingredient].color;
                ctx.beginPath();
                ctx.arc(this.x + offsetX, this.y + offsetY, 12, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 1;
                ctx.stroke();
            });
        }

        // Draw label
        ctx.fillStyle = '#7F8C8D';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PREP PLATE', this.x, this.y + this.radius + 20);
    }

    addCrepe() {
        if (!this.hasCrepe) {
            this.hasCrepe = true;
            this.food.addIngredient('BATTER');
            return true;
        }
        return false;
    }

    addTopping(ingredientType) {
        if (this.hasCrepe) {
            this.food.addIngredient(ingredientType);
            return true;
        }
        return false;
    }

    clear() {
        this.hasCrepe = false;
        this.food.clear();
    }

    contains(x, y) {
        const distance = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        return distance <= this.radius;
    }
}

// Serve Button - to serve the completed crepe
class ServeButton {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hovered = false;
        this.enabled = false;
    }

    draw(ctx) {
        // Draw button
        const color = this.enabled ? (this.hovered ? '#27AE60' : '#2ECC71') : '#95A5A6';
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SERVE', this.x + this.width / 2, this.y + this.height / 2 + 8);

        // Draw border
        ctx.strokeStyle = this.enabled && this.hovered ? '#1E8449' : '#7F8C8D';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    contains(x, y) {
        return x >= this.x && x <= this.x + this.width &&
               y >= this.y && y <= this.y + this.height;
    }

    setHovered(hovered) {
        this.hovered = hovered;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }
}

// Clear Button - to clear the prep plate
class ClearButton {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hovered = false;
    }

    draw(ctx) {
        // Draw button
        const color = this.hovered ? '#C0392B' : '#E74C3C';
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CLEAR', this.x + this.width / 2, this.y + this.height / 2 + 6);

        // Draw border
        ctx.strokeStyle = this.hovered ? '#A93226' : '#C0392B';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    contains(x, y) {
        return x >= this.x && x <= this.x + this.width &&
               y >= this.y && y <= this.y + this.height;
    }

    setHovered(hovered) {
        this.hovered = hovered;
    }
}
