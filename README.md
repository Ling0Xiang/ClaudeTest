# Cooking Master - 2D Cooking Game

A fun 2D cooking simulation game inspired by Shawarma Legend. Run your own restaurant, serve customers, and earn money!

## Features

- **Dynamic Customer System**: Customers arrive with different orders and patience levels
- **Multiple Recipes**: Create burgers, sandwiches, meat lovers specials, and veggie dishes
- **Cooking Mechanics**: Grill meat, prepare ingredients, and assemble dishes
- **Time Management**: Each day lasts 60 seconds - serve as many customers as possible
- **Scoring System**: Earn money and bonuses for fast service
- **Progressive Gameplay**: Continue through multiple days building your score

## How to Play

### Getting Started

1. Open `index.html` in a modern web browser
2. The game starts automatically on Day 1

### Controls

- **Arrow Keys** or **WASD**: Move your character
- **SPACE**: Pick up ingredients, interact with stations, serve food
- **E**: Clear the prep table if you make a mistake

### Game Flow

1. **Check Customer Orders**: Look at the order bubble next to customers (top right area)
2. **Gather Ingredients**: Walk to ingredient stations at the top and press SPACE to pick them up
3. **Cook Meat** (if needed): Take meat to the GRILL station, wait for it to cook (watch the progress bar)
4. **Assemble Food**: Go to the PREP TABLE and press SPACE to add ingredients in the correct order
5. **Serve**: Pick up the completed dish and take it to the SERVE station
6. **Earn Money**: Correct orders earn money, with bonuses for fast service!

### Ingredient Stations

- **BREAD**: Base for most recipes
- **MEAT**: Needs to be cooked on the grill first
- **LETTUCE**: Fresh vegetable
- **TOMATO**: Fresh vegetable
- **CHEESE**: Dairy product
- **SAUCE**: Flavor enhancer

### Recipes

#### Burger ($15)
- Bread → Meat (cooked) → Lettuce → Tomato → Bread

#### Sandwich ($10)
- Bread → Lettuce → Tomato → Cheese → Bread

#### Meat Lovers ($20)
- Bread → Meat (cooked) → Meat (cooked) → Cheese → Sauce → Bread

#### Veggie Special ($12)
- Bread → Lettuce → Tomato → Lettuce → Cheese → Bread

### Tips for Success

1. **Check Orders First**: Always look at what the customer wants before starting
2. **Cook Meat Early**: Put meat on the grill while gathering other ingredients
3. **Watch Patience Bars**: Green is good, red means the customer is about to leave
4. **Speed Bonuses**: Serve customers quickly for extra money (up to $5 bonus)
5. **Order Matters**: Ingredients must be added in the exact order shown in the recipe
6. **Use E to Clear**: Made a mistake? Press E at the prep table to start over

### Scoring

- Each successful order earns the recipe's base price
- Speed bonuses:
  - Super fast (>75% patience): +$5
  - Fast (>50% patience): +$3
  - Moderate (>25% patience): +$1
- Wrong orders earn nothing and waste the food

### Day System

- Each day lasts 60 seconds
- At the end of the day, view your stats and choose to continue to the next day
- Your money and score accumulate across days
- Try to beat your high score!

## Technical Details

### File Structure

```
cooking-game/
├── index.html          # Main HTML file
├── styles.css          # Game styling
├── game.js            # Main game engine and loop
├── player.js          # Player character logic
├── customer.js        # Customer and order management
├── cookingStation.js  # Cooking stations and work areas
├── ingredients.js     # Ingredient types and recipes
└── ui.js             # UI management and updates
```

### Browser Compatibility

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- No external dependencies - pure vanilla JavaScript

### Technologies Used

- HTML5 Canvas for rendering
- Vanilla JavaScript for game logic
- CSS3 for UI styling
- RequestAnimationFrame for smooth game loop

## Customization

You can easily customize the game by modifying:

- **Recipes**: Edit `RECIPES` object in `ingredients.js`
- **Ingredient Types**: Add new ingredients in `INGREDIENT_TYPES` in `ingredients.js`
- **Day Duration**: Change `dayTime` in `game.js`
- **Customer Spawn Rate**: Modify `spawnInterval` in `customer.js`
- **Player Speed**: Adjust `speed` property in `player.js`

## Future Enhancements

Potential features to add:
- Power-ups and upgrades
- More complex recipes
- Multiple difficulty levels
- Sound effects and music
- Save/load game progress
- Leaderboard system
- Restaurant upgrades

## Credits

Created as a 2D cooking simulation game inspired by Shawarma Legend.

## License

Free to use and modify for personal and educational purposes.

---

**Enjoy cooking and serving customers! 🍔👨‍🍳**
