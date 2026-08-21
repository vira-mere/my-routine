# My Routine 🎯

A beautiful, modern personal routine organizer web app built with React, Vite, and Tailwind CSS.

## Features ✨

- **Daily Routines**: Create and manage daily routines with time-based tasks
- **Exercise Library**: Build a comprehensive exercise database with sets, reps, and difficulty levels
- **Habit Tracking**: Track habits with streak counters and completion history
- **Interactive Calendar**: View your schedule and tasks in a calendar view
- **Progress Analytics**: Track your progress with visual charts and statistics
- **Multiple Themes**: 7 beautiful themes to choose from (Soft Pink, Lavender, Baby Blue, Sage Green, Cream, Dark Academia, Minimal Dark)
- **Data Export/Import**: Backup and restore your data as JSON
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Local Storage**: All data is saved locally in your browser

## Tech Stack 🛠️

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Styling**: Tailwind CSS 3.3.3
- **Date Library**: date-fns 2.30.0
- **Icons**: lucide-react 0.263.1
- **Hosting**: GitHub Pages

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vira-mere/my-routine.git
cd my-routine
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Development 💻

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.jsx
│   ├── BottomNav.jsx
│   ├── Card.jsx
│   ├── Button.jsx
│   ├── Modal.jsx
│   ├── TaskItem.jsx
│   ├── Tag.jsx
│   └── ProgressBar.jsx
├── context/            # React Context providers
│   ├── ThemeContext.jsx
│   └── DataContext.jsx
├── data/               # Sample data
│   └── sampleData.js
├── hooks/              # Custom React hooks
│   ├── useMediaQuery.js
│   └── useStorage.js
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Routines.jsx
│   ├── Exercise.jsx
│   ├── Calendar.jsx
│   ├── Progress.jsx
│   └── Settings.jsx
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Features in Detail 🎨

### Home Page
- Daily progress tracking
- Quick add buttons for routines, exercises, and reminders
- Today's scheduled tasks
- Statistics overview (habits count, routines count)

### Routines
- Create custom routines with multiple tasks
- Set specific days for each routine
- Time-based task scheduling
- Edit and delete routines
- Expandable routine details

### Exercise Library
- Browse exercises by category (Arms, Abs/Core, Legs, Full Body, Stretching)
- Add custom exercises with:
  - Target muscles
  - Sets and reps
  - Difficulty levels
  - Rest times
- Edit and delete exercises

### Calendar
- Interactive month view
- Select and view specific dates
- Event scheduling capabilities
- Daily task overview

### Progress & Analytics
- Daily, weekly, and monthly progress tracking
- Routine completion percentages
- Habit streaks visualization
- Weekly activity chart
- Statistics: tasks completed, active routines, best streak

### Settings
- User profile management
- Theme selection
- Data export (download as JSON)
- Data import (restore from JSON)
- Daily progress reset
- About section

## Themes 🎭

1. **Soft Pink** - Warm and welcoming
2. **Lavender** - Calm and creative
3. **Baby Blue** - Peaceful and serene
4. **Sage Green** - Natural and balanced
5. **Cream** - Warm and neutral
6. **Dark Academia** - Professional and elegant
7. **Minimal Dark** - Modern and sleek

## Data Storage 💾

All data is stored in your browser's localStorage. This means:
- Your data persists between sessions
- No server or internet required to use the app
- Your data is private and never sent anywhere
- Use Export/Import to backup or transfer data

## Deployment 🌐

### Deploy to GitHub Pages

1. Ensure you have the repository cloned
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Deploy: `npm run deploy`

The app will be available at `https://vira-mere.github.io/my-routine/`

### Deploy to Other Platforms

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Traditional Hosting:**
1. Build: `npm run build`
2. Upload the `dist` folder to your server

## Browser Support 🌍

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance ⚡

- Lightweight (~500KB gzipped)
- Fast load times with Vite
- Smooth animations and transitions
- Optimized for mobile devices

## Customization 🎨

### Add New Themes

Edit `src/context/ThemeContext.jsx` and add to the `themes` object:

```javascript
'your-theme': {
  name: 'Your Theme Name',
  primary: '#YOURCOLOR',
  secondary: '#YOURCOLOR',
  background: 'from-color-50 to-color-50',
  accent: 'bg-color-100',
  text: 'text-color-900',
}
```

### Modify Sample Data

Edit `src/data/sampleData.js` to customize the default routines, exercises, and habits.

## Tips & Best Practices 💡

1. **Organize Your Routines**: Create separate routines for different times of day (morning, midday, evening)
2. **Set Realistic Goals**: Start small and gradually add more habits and routines
3. **Review Progress**: Check the Progress page weekly to stay motivated
4. **Backup Your Data**: Regularly export your data to have a backup
5. **Experiment with Themes**: Find the theme that motivates you most

## Contributing 🤝

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## Future Enhancements 🔮

- [ ] Cloud sync with Firebase
- [ ] Mobile app (React Native)
- [ ] Notifications and reminders
- [ ] Social features (share routines)
- [ ] Advanced analytics
- [ ] Recurring events
- [ ] Notes and journals
- [ ] Workout timer integration

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.

## Support 💬

If you have any questions or need help:
1. Check the issues page
2. Create a new issue with a detailed description
3. Feel free to fork and modify for your needs

## Changelog 📝

### v1.0.0 (Initial Release)
- Initial release with all core features
- 7 beautiful themes
- Full routine and habit tracking
- Exercise library
- Progress analytics
- Data export/import
- Mobile responsive design

---

Made with ❤️ using React + Vite + Tailwind CSS

**Happy organizing! 🚀**
