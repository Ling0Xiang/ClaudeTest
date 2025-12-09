// UI Manager
class UIManager {
    constructor() {
        this.scoreElement = document.getElementById('score');
        this.moneyElement = document.getElementById('money');
        this.dayElement = document.getElementById('day');
        this.timerElement = document.getElementById('timer');
        this.orderDisplay = document.getElementById('order-display');
        this.gameOverPanel = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
        this.finalMoneyElement = document.getElementById('final-money');
    }

    updateScore(score) {
        this.scoreElement.textContent = score;
    }

    updateMoney(money) {
        this.moneyElement.textContent = money;
    }

    updateDay(day) {
        this.dayElement.textContent = day;
    }

    updateTimer(time) {
        this.timerElement.textContent = Math.ceil(time);
    }

    updateCurrentOrder(customer) {
        if (customer) {
            const recipe = customer.recipe;
            const ingredientsList = recipe.ingredients
                .map(ing => INGREDIENT_TYPES[ing].name)
                .join(' + ');
            this.orderDisplay.innerHTML = `
                <strong>${recipe.name}</strong><br>
                <small>${ingredientsList}</small><br>
                <span style="color: #2ecc71;">$${recipe.price}</span>
            `;
        } else {
            this.orderDisplay.textContent = 'No customers';
        }
    }

    showGameOver(score, money) {
        this.finalScoreElement.textContent = score;
        this.finalMoneyElement.textContent = money;
        this.gameOverPanel.classList.remove('hidden');
    }

    hideGameOver() {
        this.gameOverPanel.classList.add('hidden');
    }

    showNotification(ctx, message, x, y, color = '#2ecc71') {
        ctx.save();
        ctx.fillStyle = color;
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.strokeText(message, x, y);
        ctx.fillText(message, x, y);
        ctx.restore();
    }
}
