// Customer class
class Customer {
    constructor(x, y, recipe) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.recipe = recipe;
        this.patience = recipe.time * 1000; // Convert to milliseconds
        this.maxPatience = this.patience;
        this.served = false;
        this.leaving = false;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(deltaTime) {
        if (!this.served && !this.leaving) {
            this.patience -= deltaTime;
            if (this.patience <= 0) {
                this.leaving = true;
            }
        }
    }

    draw(ctx) {
        // Draw customer body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y + 20, this.width, this.height - 20);

        // Draw head
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 15, 15, 0, Math.PI * 2);
        ctx.fill();

        // Draw face
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2 - 5, this.y + 12, 2, 0, Math.PI * 2);
        ctx.arc(this.x + this.width / 2 + 5, this.y + 12, 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw mouth (happy or sad based on patience)
        ctx.beginPath();
        if (this.patience > this.maxPatience * 0.5) {
            ctx.arc(this.x + this.width / 2, this.y + 18, 5, 0, Math.PI);
        } else {
            ctx.arc(this.x + this.width / 2, this.y + 23, 5, Math.PI, Math.PI * 2);
        }
        ctx.stroke();

        // Draw order bubble
        this.drawOrderBubble(ctx);

        // Draw patience bar
        this.drawPatienceBar(ctx);
    }

    drawOrderBubble(ctx) {
        const bubbleX = this.x + this.width + 10;
        const bubbleY = this.y;
        const bubbleWidth = 100;
        const bubbleHeight = 40;

        // Bubble background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 5);
        ctx.fill();
        ctx.stroke();

        // Recipe name
        ctx.fillStyle = '#333';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(this.recipe.name, bubbleX + 5, bubbleY + 15);

        // Price
        ctx.fillStyle = '#2ecc71';
        ctx.font = '10px Arial';
        ctx.fillText('$' + this.recipe.price, bubbleX + 5, bubbleY + 30);
    }

    drawPatienceBar(ctx) {
        const barWidth = this.width;
        const barHeight = 5;
        const barX = this.x;
        const barY = this.y - 10;

        // Background
        ctx.fillStyle = '#ccc';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // Patience level
        const patienceRatio = Math.max(0, this.patience / this.maxPatience);
        const color = patienceRatio > 0.5 ? '#2ecc71' : patienceRatio > 0.25 ? '#f39c12' : '#e74c3c';
        ctx.fillStyle = color;
        ctx.fillRect(barX, barY, barWidth * patienceRatio, barHeight);

        // Border
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);
    }

    isPatienceExpired() {
        return this.patience <= 0;
    }
}

class CustomerManager {
    constructor(currentDay = 1) {
        this.customers = [];
        this.spawnTimer = 0;
        this.spawnInterval = 8000; // Spawn every 8 seconds
        this.maxCustomers = 3;
        this.currentDay = currentDay;
        this.customerPositions = [
            { x: 650, y: 100 },
            { x: 650, y: 200 },
            { x: 650, y: 300 }
        ];
    }

    setDay(day) {
        this.currentDay = day;
    }

    update(deltaTime) {
        // Update existing customers
        this.customers.forEach(customer => customer.update(deltaTime));

        // Remove leaving or served customers
        this.customers = this.customers.filter(c => !c.leaving && !c.served);

        // Spawn new customers
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.spawnInterval && this.customers.length < this.maxCustomers) {
            this.spawnCustomer();
            this.spawnTimer = 0;
        }
    }

    spawnCustomer() {
        const availablePos = this.customerPositions.find(pos =>
            !this.customers.some(c => c.x === pos.x && c.y === pos.y)
        );

        if (availablePos) {
            // Filter recipes that are unlocked for current day
            const availableRecipes = Object.values(RECIPES).filter(recipe =>
                recipe.unlockDay <= this.currentDay
            );

            if (availableRecipes.length > 0) {
                const randomRecipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
                const customer = new Customer(availablePos.x, availablePos.y, randomRecipe);
                this.customers.push(customer);
            }
        }
    }

    draw(ctx) {
        this.customers.forEach(customer => customer.draw(ctx));
    }

    getCurrentCustomer() {
        return this.customers[0];
    }

    serveCustomer(food) {
        const customer = this.getCurrentCustomer();
        if (customer && food.matches(customer.recipe)) {
            customer.served = true;
            return {
                success: true,
                price: customer.recipe.price,
                bonus: this.calculateBonus(customer)
            };
        }
        return { success: false, price: 0, bonus: 0 };
    }

    calculateBonus(customer) {
        const patienceRatio = customer.patience / customer.maxPatience;
        if (patienceRatio > 0.75) return 5;
        if (patienceRatio > 0.5) return 3;
        if (patienceRatio > 0.25) return 1;
        return 0;
    }
}
