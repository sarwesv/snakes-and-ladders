# 🐍 3D Snakes & Ladders - Vintage Edition

A nostalgic, first-person perspective Snakes and Ladders game with stunning 3D visuals, retro 1960s-70s aesthetics, and smooth GSAP animations.

## Features

✨ **First-Person Perspective** - Experience the board from the player piece's viewpoint as it moves

🎲 **Classic Gameplay** - Standard 100-square board with 8 snakes and 8 ladders

🎨 **Vintage Aesthetics** - Authentic 1960s-70s color palette and retro styling

🔊 **Sound Effects** - Synthesized audio for dice rolls, movements, snakes, and ladders with volume control

📊 **2D Board View** - Side-by-side 2D overview showing all player positions and board elements

👥 **Multiplayer** - Support for 2-4 players with customizable names

🎬 **Smooth Animations** - GSAP-powered animations for piece movement, camera following, and special effects

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Three.js** - 3D rendering
- **GSAP 3** - Animation library
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build the production version
2. Deploy to GitHub Pages
3. Be accessible at `https://yourusername.github.io/snakes-and-ladders/`

## Setup Instructions for GitHub Pages

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository: `https://github.com/yourusername/snakes-and-ladders`
2. Click on **Settings** tab
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - Select **Deploy from a branch**
   - Branch: Select `gh-pages`
   - Folder: `/root` (default)
5. Click **Save**

### Step 2: Deploy Your Game

Run the deploy command:

```bash
npm run deploy
```

This command will:
- Build the production version of your game
- Push it to the `gh-pages` branch
- Make it live on GitHub Pages

### Step 3: Access Your Game

Your game will be live at:
```
https://sarwesv.github.io/snakes-and-ladders/
```

Share this link with friends!

## Game Instructions

1. **Setup**: Select 2-4 players and enter their names
2. **Play**: 
   - Click "Roll Dice" button to roll
   - Watch your piece move in first-person perspective
   - Climb ladders or slide down snakes automatically
   - First to reach square 100 wins!
3. **Audio**: Use the volume slider to adjust sound or mute completely

## Game Rules

- Players take turns rolling a dice (1-6)
- Move forward by the number shown on dice
- Landing on a snake's head moves you down to its tail
- Landing on a ladder's base moves you up to its top
- First player to reach exactly square 100 wins
- Must roll exact number to win (no overshooting)

## File Structure

```
snakes-and-ladders/
├── src/
│   ├── components/
│   │   ├── Game/         # Game components (Board, Setup, Splash)
│   │   └── UI/           # UI components (Controls, HUD)
│   ├── game/             # Game logic & Zustand store
│   ├── three/            # Three.js renderers & meshes
│   ├── audio/            # Audio manager & synthesis
│   ├── utils/            # Utilities & constants
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── dist/                 # Build output (production)
├── index.html            # HTML template
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite config
├── tailwind.config.js    # Tailwind CSS config
└── postcss.config.js     # PostCSS config
```

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Performance Notes

- The game uses Three.js for 3D rendering
- GSAP handles all animations
- Optimized for desktop browsers
- Mobile support available but best on larger screens

## Troubleshooting

### Game not loading after deployment?
- Make sure GitHub Pages is enabled in repository settings
- Check that the `gh-pages` branch exists
- Clear your browser cache and try again

### Audio not working?
- Check browser console for any errors
- Some browsers require user interaction before playing audio
- Use the volume control in the game

## License

MIT

Enjoy the game! 🎮🐍
