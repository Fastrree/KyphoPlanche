# 🏋️ KyphoPlanche - Fitness Tracking App

Modern, responsive fitness tracking application for planche progression and workout management.

## ✨ Features

- **4-Week Workout Plan**: Structured planche progression program
- **Daily Routines**: Track daily exercises and tasks
- **Progress Tracker**: Log weight, planche lean, and tuck planche duration
- **Multi-language Support**: Turkish and English
- **Dark/Light Theme**: Automatic theme switching
- **Mobile Responsive**: Works on all devices
- **Sound Effects**: Audio feedback for completed tasks
- **Accessibility**: WCAG AA compliant

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js
- **Database**: SQLite (dev) / PostgreSQL (production)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: TanStack Query

## 📦 Installation

```bash
# Install dependencies
npm install

# Setup database
npm run db:push

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL=file:./local.db

# Server
PORT=5000
NODE_ENV=development
SESSION_SECRET=dev-secret-change-in-production
```

## 🏗️ Project Structure

```
├── client/              # Frontend React app
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and context
│   │   └── data/        # Static data
├── server/              # Backend Express server
│   ├── db.ts           # Database connection
│   ├── routes.ts       # API routes
│   └── index.ts        # Server entry point
├── shared/              # Shared types and schemas
│   ├── schema.ts       # SQLite schema
│   └── schema.pg.ts    # PostgreSQL schema
└── script/              # Build scripts
```

## 🎯 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run check        # TypeScript type checking
npm run db:push      # Push database schema
```

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## 📱 Features in Detail

### Plan Page
- 4-week structured workout program
- Auto-opens current day
- Collapsible day sections
- Exercise descriptions and sets

### Daily Page
- Daily routine checklist
- Task completion tracking
- Sound effects on completion
- Midnight auto-refresh

### Tracker Page
- Weight logging
- Planche lean duration tracking
- Tuck planche duration tracking
- Input validation
- Historical data visualization

## 🎨 Design System

- **Colors**: Custom dark/light theme
- **Typography**: Inter font family
- **Spacing**: Tailwind spacing scale
- **Components**: Radix UI primitives
- **Animations**: Smooth transitions

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- 48px minimum touch targets

## 🔒 Security

- Input validation
- SQL injection prevention (parameterized queries)
- XSS protection
- CSRF protection
- Secure session management

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using React + TypeScript + Vite
