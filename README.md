# Crepe Master - Point and Click Cooking Game

A delightful point-and-click crepe making game inspired by Shawarma Legend. Run your own crepe stand, serve customers with delicious crepes, and earn money!

## Features

- **Point-and-Click Gameplay**: No movement needed - click to interact with everything
- **Intuitive Cooking System**: Cook crepes and add toppings with simple clicks
- **Customer Orders**: Customers arrive with specific crepe requests and patience levels
- **6 Delicious Recipes**: Unlock new recipes each day as you progress!
- **Progressive Recipe System**: Start simple on Day 1, unlock complex recipes by Day 6
- **Visual Feedback**: Hover effects, cooking animations, and progress bars
- **Time Management**: 90 seconds per day to serve as many customers as possible
- **Scoring System**: Earn money and bonuses for fast, accurate service
- **Progressive Gameplay**: Continue through multiple days building your crepe empire

## How to Play

### Getting Started

1. Open `index.html` in a modern web browser
2. The game starts automatically on Day 1

### Controls

**Simple Point-and-Click!**
- Click on ingredient buttons to select ingredients
- Click on the crepe pan to transfer cooked crepes
- Click SERVE button to serve completed orders
- Click CLEAR button to start over if you make a mistake

### Game Flow

1. **Check the Customer Order** (top right corner)
   - See what crepe the customer wants
   - Note the price and ingredients needed

2. **Click BATTER Button** (top left)
   - This adds batter to the crepe pan
   - Watch the cooking progress bar
   - Wait 3 seconds for it to cook

3. **Transfer to Prep Plate**
   - Once the crepe shows "READY!", click on the pan
   - The cooked crepe moves to the prep plate

4. **Add Toppings**
   - Click ingredient buttons to add toppings
   - Toppings appear on the prep plate
   - Must match the exact order shown in the recipe

5. **Serve the Customer**
   - Click the green SERVE button
   - Correct orders earn money + speed bonuses!
   - Wrong orders waste the food

### Ingredients

- **🥞 Batter**: The base crepe (must cook in pan first)
- **🍓 Strawberry**: Fresh strawberry topping
- **🍌 Banana**: Sliced banana topping
- **🍫 Chocolate**: Rich chocolate sauce
- **🍦 Whipped Cream**: Light and fluffy cream
- **🥜 Nutella**: Hazelnut chocolate spread
- **🫐 Blueberry**: Fresh blueberry topping
- **🍚 Sugar**: Sweet finishing touch

### Crepe Recipes

Recipes unlock as you progress through days!

#### Whipped Cream Crepe ($10) - Day 1
- Batter → Whipped Cream
- Perfect for beginners!

#### Classic Crepe ($8) - Day 2
- Batter → Sugar
- Quick and simple!

#### Strawberry Dream ($12) - Day 3
- Batter → Strawberry → Whipped Cream → Sugar
- A fruity favorite

#### Chocolate Banana ($14) - Day 4
- Batter → Banana → Chocolate → Whipped Cream
- Sweet and satisfying

#### Nutella Delight ($15) - Day 5
- Batter → Nutella → Banana → Strawberry
- Rich and delicious

#### Berry Blast ($16) - Day 6+
- Batter → Strawberry → Blueberry → Whipped Cream → Sugar
- The ultimate berry experience

### Tips for Success

1. **Start Cooking Early**: Click BATTER immediately when you see an order
2. **While Crepe Cooks**: Read the full order and plan your toppings
3. **Exact Order Matters**: Add ingredients in the EXACT order shown
4. **Watch Patience Bars**:
   - Green = Happy customer
   - Yellow = Getting impatient
   - Red = About to leave!
5. **Speed Bonuses**:
   - Super fast (>75% patience left): +$5
   - Fast (>50% patience): +$3
   - Moderate (>25% patience): +$1
6. **Use CLEAR Button**: Made a mistake? Clear and start fresh!
7. **One at a Time**: Focus on one order at a time for best results

### Scoring

- Each correct order earns the recipe's base price
- Speed bonuses add extra money for quick service
- Wrong orders earn $0 and the food is wasted
- Your money accumulates across days

### Day System

- Each day lasts 90 seconds
- Customers spawn automatically every 8 seconds (max 3 at a time)
- **New recipes unlock each day!** Start with simple Whipped Cream Crepes on Day 1
- At day's end, view your stats
- Choose "Next Day" to continue or "Restart" to begin fresh
- As you progress, more complex (and profitable!) recipes become available
- Try to beat your high score!

## Technical Details

### File Structure

```
crepe-master/
├── index.html          # Main HTML file
├── styles.css          # Game styling (pink/crepe theme)
├── game.js            # Main game engine and click handling
├── player.js          # Stationary chef character
├── customer.js        # Customer and order management
├── cookingStation.js  # Crepe pan, prep plate, and buttons
├── ingredients.js     # Crepe ingredients and recipes
└── ui.js             # UI management and notifications
```

### Browser Compatibility

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- No external dependencies - pure vanilla JavaScript
- Responsive mouse hover effects

### Technologies Used

- HTML5 Canvas for rendering
- Vanilla JavaScript for game logic and click detection
- CSS3 for UI styling with crepe-themed colors
- RequestAnimationFrame for smooth animations

## Customization

You can easily customize the game by modifying:

- **Recipes**: Edit `RECIPES` object in `ingredients.js`
  - Add new crepe combinations
  - Adjust prices and time limits

- **Ingredients**: Add new toppings in `INGREDIENT_TYPES` in `ingredients.js`
  - Choose colors for visual representation

- **Day Duration**: Change `dayTime` in `game.js` (default: 90 seconds)

- **Customer Spawn Rate**: Modify `spawnInterval` in `customer.js` (default: 8 seconds)

- **Cooking Speed**: Adjust `cookDuration` in `CrepePan` class (default: 3000ms)

- **Colors**: Edit gradient and theme colors in `styles.css`

## Gameplay Tips

### Efficient Workflow

1. **Parallel Processing**: While one crepe cooks, prepare to add toppings
2. **Read Ahead**: Check upcoming customer orders
3. **Prioritize**: Serve customers with lower patience first
4. **Stay Calm**: Mistakes happen - use CLEAR and try again

### Common Mistakes to Avoid

- ❌ Adding toppings before transferring crepe to plate
- ❌ Clicking BATTER while pan is already cooking
- ❌ Adding ingredients in wrong order
- ❌ Forgetting to click pan to transfer crepe
- ❌ Serving incomplete orders

## Future Enhancements

Potential features to add:
- Multiple difficulty levels (faster customers, more complex orders)
- Upgrades (faster cooking, patience boosters)
- More crepe varieties (savory crepes, ice cream toppings)
- Combo bonuses for consecutive perfect orders
- Sound effects and background music
- Save/load game progress
- Daily challenges and achievements
- Leaderboard system

## Credits

Created as a point-and-click crepe cooking simulation game inspired by Shawarma Legend.

## License

Free to use and modify for personal and educational purposes.

---

**Enjoy making delicious crepes! 🥞👨‍🍳✨**
