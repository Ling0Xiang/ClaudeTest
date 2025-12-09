// Main Game Engine - Point and Click Crepe Game
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.keys = {};
        this.lastTime = 0;
        this.running = false;
        this.mouseX = 0;
        this.mouseY = 0;

        // Game state
        this.score = 0;
        this.money = 0;
        this.day = 1;
        this.dayTime = 90; // 90 seconds per day for crepe making
        this.currentTime = this.dayTime;

        // Game objects
        this.player = new Player(50, 420); // Stationary position
        this.customerManager = new CustomerManager();
        this.ui = new UIManager();

        // Crepe making stations
        this.crepePan = new CrepePan(200, 300, 80);
        this.prepPlate = new PrepPlate(450, 300, 70);

        // Ingredient buttons (top area)
        const btnWidth = 90;
        const btnHeight = 65;
        const startX = 50;
        const startY = 30;
        const spacing = 95;

        this.ingredientButtons = [
            new IngredientButton(startX, startY, btnWidth, btnHeight, 'BATTER'),
            new IngredientButton(startX + spacing, startY, btnWidth, btnHeight, 'STRAWBERRY'),
            new IngredientButton(startX + spacing * 2, startY, btnWidth, btnHeight, 'BANANA'),
            new IngredientButton(startX + spacing * 3, startY, btnWidth, btnHeight, 'CHOCOLATE'),
            new IngredientButton(startX, startY + 70, btnWidth, btnHeight, 'WHIPPED_CREAM'),
            new IngredientButton(startX + spacing, startY + 70, btnWidth, btnHeight, 'NUTELLA'),
            new IngredientButton(startX + spacing * 2, startY + 70, btnWidth, btnHeight, 'BLUEBERRY'),
            new IngredientButton(startX + spacing * 3, startY + 70, btnWidth, btnHeight, 'SUGAR')
        ];

        // Control buttons
        this.serveButton = new ServeButton(600, 450, 150, 50);
        this.clearButton = new ClearButton(600, 510, 150, 40);

        // Notifications
        this.notifications = [];

        this.setupEventListeners();
        this.init();
    }

    setupEventListeners() {
        // Mouse movement for hover effects
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            this.updateHoverStates();
        });

        // Mouse click for interactions
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.handleClick(x, y);
        });

        // UI buttons
        document.getElementById('next-day').addEventListener('click', () => this.nextDay());
        document.getElementById('restart').addEventListener('click', () => this.restart());
    }

    updateHoverStates() {
        // Update ingredient button hovers
        this.ingredientButtons.forEach(btn => {
            btn.setHovered(btn.contains(this.mouseX, this.mouseY));
        });

        // Update control button hovers
        this.serveButton.setHovered(this.serveButton.contains(this.mouseX, this.mouseY));
        this.clearButton.setHovered(this.clearButton.contains(this.mouseX, this.mouseY));

        // Update canvas cursor
        const isHoveringButton = this.ingredientButtons.some(btn => btn.hovered) ||
                                this.serveButton.hovered ||
                                this.clearButton.hovered ||
                                this.crepePan.contains(this.mouseX, this.mouseY) ||
                                this.prepPlate.contains(this.mouseX, this.mouseY);

        this.canvas.style.cursor = isHoveringButton ? 'pointer' : 'default';
    }

    handleClick(x, y) {
        // Check ingredient button clicks
        for (let btn of this.ingredientButtons) {
            if (btn.contains(x, y)) {
                this.handleIngredientClick(btn.ingredientType);
                return;
            }
        }

        // Check crepe pan click (to add batter)
        if (this.crepePan.contains(x, y)) {
            // Try to transfer cooked crepe to prep plate
            if (this.crepePan.isCooked && !this.prepPlate.hasCrepe) {
                this.crepePan.removeCrepe();
                this.prepPlate.addCrepe();
                this.addNotification('Crepe ready for toppings!', '#2ecc71');
            }
            return;
        }

        // Check clear button
        if (this.clearButton.contains(x, y)) {
            if (this.prepPlate.hasCrepe) {
                this.prepPlate.clear();
                this.addNotification('Plate cleared', '#e74c3c');
            }
            return;
        }

        // Check serve button
        if (this.serveButton.contains(x, y) && this.serveButton.enabled) {
            this.handleServe();
            return;
        }
    }

    handleIngredientClick(ingredientType) {
        if (ingredientType === 'BATTER') {
            // Add batter to pan
            if (this.crepePan.addBatter()) {
                this.addNotification('Cooking crepe...', '#f39c12');
            } else {
                this.addNotification('Pan is busy!', '#e74c3c');
            }
        } else {
            // Add topping to prep plate
            if (this.prepPlate.addTopping(ingredientType)) {
                this.addNotification('Added ' + INGREDIENT_TYPES[ingredientType].name, '#3498db');
            } else {
                this.addNotification('Need a crepe first!', '#e74c3c');
            }
        }
    }

    handleServe() {
        const result = this.customerManager.serveCustomer(this.prepPlate.food);
        if (result.success) {
            const totalEarned = result.price + result.bonus;
            this.money += totalEarned;
            this.score += totalEarned;
            this.ui.updateMoney(this.money);
            this.ui.updateScore(this.score);
            this.prepPlate.clear();
            this.addNotification(`+$${totalEarned}!`, '#2ecc71');
            if (result.bonus > 0) {
                this.addNotification(`Speed bonus: +$${result.bonus}`, '#FFD700');
            }
        } else {
            this.addNotification('Wrong order!', '#e74c3c');
            this.prepPlate.clear();
        }
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
        this.customerManager.update(deltaTime);
        this.crepePan.update(deltaTime);

        // Update UI with current customer order
        const currentCustomer = this.customerManager.getCurrentCustomer();
        this.ui.updateCurrentOrder(currentCustomer);

        // Enable/disable serve button
        const hasFood = this.prepPlate.hasCrepe && this.prepPlate.food.ingredients.length > 0;
        this.serveButton.setEnabled(hasFood && currentCustomer !== null);

        // Update notifications
        this.notifications = this.notifications.filter(n => {
            n.life -= deltaTime;
            n.y -= 0.5;
            return n.life > 0;
        });
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#F9E4D4';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background sections
        this.drawBackground();

        // Draw ingredient buttons
        this.ingredientButtons.forEach(btn => btn.draw(this.ctx));

        // Draw cooking stations
        this.crepePan.draw(this.ctx);
        this.prepPlate.draw(this.ctx);

        // Draw control buttons
        this.serveButton.draw(this.ctx);
        this.clearButton.draw(this.ctx);

        // Draw customers
        this.customerManager.draw(this.ctx);

        // Draw player (stationary chef)
        this.player.draw(this.ctx);

        // Draw notifications
        this.notifications.forEach(n => {
            this.ui.showNotification(this.ctx, n.text, n.x, n.y, n.color);
        });

        // Draw instructions
        this.drawInstructions();
    }

    drawBackground() {
        // Top ingredient area
        this.ctx.fillStyle = '#E8DACC';
        this.ctx.fillRect(0, 0, 800, 180);
        this.ctx.strokeStyle = '#D4C4B0';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(0, 0, 800, 180);

        // Middle cooking area
        this.ctx.fillStyle = '#F5E6D3';
        this.ctx.fillRect(0, 180, 800, 250);

        // Bottom area (player)
        this.ctx.fillStyle = '#E0D0C0';
        this.ctx.fillRect(0, 430, 800, 170);

        // Decorative lines
        this.ctx.strokeStyle = '#D4C4B0';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 180);
        this.ctx.lineTo(800, 180);
        this.ctx.moveTo(0, 430);
        this.ctx.lineTo(800, 430);
        this.ctx.stroke();

        // Title
        this.ctx.fillStyle = '#8B4513';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('INGREDIENTS', 10, 20);
    }

    drawInstructions() {
        // Show hint when pan is clicked
        if (this.crepePan.isCooked && !this.prepPlate.hasCrepe) {
            this.ctx.fillStyle = 'rgba(46, 204, 113, 0.8)';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Click pan to move crepe →', this.crepePan.x, this.crepePan.y - 100);
        }
    }

    addNotification(text, color) {
        this.notifications.push({
            text: text,
            x: 400,
            y: 250,
            life: 1500,
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
        this.crepePan.reset();
        this.prepPlate.clear();
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
        this.player = new Player(50, 420);
        this.crepePan.reset();
        this.prepPlate.clear();
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
