// Main Game Engine
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.keys = {};
        this.lastTime = 0;
        this.running = false;

        // Game state
        this.score = 0;
        this.money = 0;
        this.day = 1;
        this.dayTime = 60; // 60 seconds per day
        this.currentTime = this.dayTime;

        // Game objects
        this.player = new Player(100, 250);
        this.customerManager = new CustomerManager();
        this.ui = new UIManager();

        // Cooking stations
        this.ingredientStations = [
            new CookingStation(50, 50, 80, 60, 'BREAD', '#D2691E'),
            new CookingStation(150, 50, 80, 60, 'MEAT', '#8B4513'),
            new CookingStation(250, 50, 80, 60, 'LETTUCE', '#90EE90'),
            new CookingStation(350, 50, 80, 60, 'TOMATO', '#FF6347'),
            new CookingStation(450, 50, 80, 60, 'CHEESE', '#FFD700'),
            new CookingStation(550, 50, 80, 60, 'SAUCE', '#8B0000')
        ];

        this.grillStation = new CookingStation(50, 450, 100, 80, 'GRILL', '#555');
        this.workStation = new WorkStation(200, 450, 200, 80);
        this.servingStation = new ServingStation(450, 450, 150, 80);

        // Notifications
        this.notifications = [];

        this.setupEventListeners();
        this.init();
    }

    setupEventListeners() {
        // Keyboard input
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            // Handle interactions
            if (e.key === ' ') {
                e.preventDefault();
                this.handleSpacePress();
            } else if (e.key.toLowerCase() === 'e') {
                this.handleInteraction();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // UI buttons
        document.getElementById('next-day').addEventListener('click', () => this.nextDay());
        document.getElementById('restart').addEventListener('click', () => this.restart());
    }

    init() {
        this.running = true;
        this.ui.updateScore(this.score);
        this.ui.updateMoney(this.money);
        this.ui.updateDay(this.day);
        this.ui.hideGameOver();
        this.gameLoop(0);
    }

    gameLoop(currentTime) {
        if (!this.running) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        // Update timer
        this.currentTime -= deltaTime / 1000;
        this.ui.updateTimer(this.currentTime);

        if (this.currentTime <= 0) {
            this.endDay();
            return;
        }

        // Update game objects
        this.player.update(deltaTime, this.keys);
        this.customerManager.update(deltaTime);
        this.grillStation.update(deltaTime);

        // Update UI with current customer order
        const currentCustomer = this.customerManager.getCurrentCustomer();
        this.ui.updateCurrentOrder(currentCustomer);

        // Update notifications
        this.notifications = this.notifications.filter(n => {
            n.life -= deltaTime;
            n.y -= 0.5;
            return n.life > 0;
        });
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw game area sections
        this.drawBackground();

        // Draw stations
        this.ingredientStations.forEach(station => station.draw(this.ctx));
        this.grillStation.draw(this.ctx);
        this.workStation.draw(this.ctx);
        this.servingStation.draw(this.ctx);

        // Draw customers
        this.customerManager.draw(this.ctx);

        // Draw player
        this.player.draw(this.ctx);

        // Draw notifications
        this.notifications.forEach(n => {
            this.ui.showNotification(this.ctx, n.text, n.x, n.y, n.color);
        });

        // Draw interaction hints
        this.drawInteractionHints();
    }

    drawBackground() {
        // Top area (ingredient stations)
        this.ctx.fillStyle = '#e8e8e8';
        this.ctx.fillRect(0, 0, 800, 130);

        // Middle area (walking space)
        this.ctx.fillStyle = '#d0d0d0';
        this.ctx.fillRect(0, 130, 800, 310);

        // Bottom area (work stations)
        this.ctx.fillStyle = '#e8e8e8';
        this.ctx.fillRect(0, 440, 800, 160);

        // Grid lines
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 800; i += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, 600);
            this.ctx.stroke();
        }
        for (let i = 0; i < 600; i += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(800, i);
            this.ctx.stroke();
        }
    }

    drawInteractionHints() {
        this.ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 2;

        // Check which stations player is near
        [...this.ingredientStations, this.grillStation].forEach(station => {
            if (station.isNearby(this.player)) {
                this.ctx.strokeRect(station.x - 2, station.y - 2, station.width + 4, station.height + 4);
            }
        });

        if (this.workStation.isNearby(this.player)) {
            this.ctx.strokeRect(this.workStation.x - 2, this.workStation.y - 2,
                this.workStation.width + 4, this.workStation.height + 4);
        }

        if (this.servingStation.isNearby(this.player)) {
            this.ctx.strokeRect(this.servingStation.x - 2, this.servingStation.y - 2,
                this.servingStation.width + 4, this.servingStation.height + 4);
        }
    }

    handleSpacePress() {
        // Interaction with ingredient stations
        for (let station of this.ingredientStations) {
            if (station.isNearby(this.player) && !this.player.hasItem()) {
                this.player.pickUpItem(station.type);
                this.addNotification('Picked up ' + INGREDIENT_TYPES[station.type].name, '#2ecc71');
                return;
            }
        }

        // Interaction with grill
        if (this.grillStation.isNearby(this.player)) {
            if (this.player.heldItem === 'MEAT' && !this.grillStation.item) {
                // Place meat on grill
                this.grillStation.item = this.player.dropItem();
                this.grillStation.cookingTime = 0;
                this.addNotification('Cooking meat...', '#f39c12');
            } else if (this.grillStation.item && !this.player.hasItem() && this.grillStation.isCookingComplete()) {
                // Pick up cooked meat
                this.player.pickUpItem(this.grillStation.item);
                this.grillStation.item = null;
                this.grillStation.cookingTime = 0;
                this.addNotification('Picked up cooked meat!', '#2ecc71');
            }
            return;
        }

        // Interaction with work station
        if (this.workStation.isNearby(this.player)) {
            if (this.player.heldItem) {
                // Add ingredient to food
                this.workStation.food.addIngredient(this.player.heldItem);
                this.addNotification('Added ' + INGREDIENT_TYPES[this.player.heldItem].name, '#3498db');
                this.player.dropItem();
            } else if (this.workStation.food.ingredients.length > 0 && !this.player.heldFood) {
                // Pick up completed food
                const food = new Food();
                food.ingredients = [...this.workStation.food.ingredients];
                this.player.pickUpFood(food);
                this.workStation.food.clear();
                this.addNotification('Picked up dish!', '#9b59b6');
            }
            return;
        }

        // Interaction with serving station
        if (this.servingStation.isNearby(this.player) && this.player.heldFood) {
            const result = this.customerManager.serveCustomer(this.player.heldFood);
            if (result.success) {
                const totalEarned = result.price + result.bonus;
                this.money += totalEarned;
                this.score += totalEarned;
                this.ui.updateMoney(this.money);
                this.ui.updateScore(this.score);
                this.player.dropFood();
                this.addNotification(`+$${totalEarned}!`, '#2ecc71');
                if (result.bonus > 0) {
                    this.addNotification(`Speed bonus: +$${result.bonus}`, '#FFD700');
                }
            } else {
                this.addNotification('Wrong order!', '#e74c3c');
                this.player.dropFood();
            }
            return;
        }
    }

    handleInteraction() {
        // Clear work station
        if (this.workStation.isNearby(this.player)) {
            if (this.workStation.food.ingredients.length > 0) {
                this.workStation.food.clear();
                this.addNotification('Cleared prep table', '#95a5a6');
            }
        }
    }

    addNotification(text, color) {
        this.notifications.push({
            text: text,
            x: 400,
            y: 300,
            life: 2000,
            color: color
        });
    }

    endDay() {
        this.running = false;
        this.ui.showGameOver(this.score, this.money);
    }

    nextDay() {
        this.day++;
        this.currentTime = this.dayTime;
        this.customerManager = new CustomerManager();
        this.workStation.food.clear();
        this.grillStation.item = null;
        this.player.heldItem = null;
        this.player.heldFood = null;
        this.ui.updateDay(this.day);
        this.ui.hideGameOver();
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }

    restart() {
        this.score = 0;
        this.money = 0;
        this.day = 1;
        this.currentTime = this.dayTime;
        this.customerManager = new CustomerManager();
        this.player = new Player(100, 250);
        this.workStation.food.clear();
        this.grillStation.item = null;
        this.ui.updateScore(this.score);
        this.ui.updateMoney(this.money);
        this.ui.updateDay(this.day);
        this.ui.hideGameOver();
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }
}

// Start the game when page loads
window.addEventListener('load', () => {
    new Game();
});
