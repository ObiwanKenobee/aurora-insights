# Aurora Insights

A real-time multimodal cognitive copilot for complex digital workflows.

## Architecture Overview

Aurora's intelligence is built on a sophisticated multi-layer prompt system:

### Core Identity
Defines Aurora as a real-time cognitive copilot that perceives, infers, plans, and executes actions across live interfaces.

### Runtime Behavior
Governs live streaming behavior with incremental responses and interruption handling.

### Perception
Structures how Aurora interprets visible screen evidence, audio input, and infers task state.

### Action Planning
Prioritizes actions based on user goals, safety, and task context.

### UI Navigation / Tool Use
Converts plans into structured UI actions with verification loops.

### Session Memory / State Management
Maintains compact working memory with relevant session information.

### Domain Specialization
Focuses Aurora's expertise on specific domains like startup pitch deck analysis.

## Key Features

- 🧠 **Cognitive Timeline**: Visualizes Aurora's perception, inference, decision-making, and execution
- 🎯 **Session Context**: Tracks current objective, active apps, open threads, and user preferences
- 📊 **Interactive Annotations**: Highlights areas of interest with ghost cursor previews
- 🎤 **Voice Interaction**: Supports real-time voice commands and interruptions
- 🔄 **Incremental Responses**: Provides fluid, interruptible feedback
- 🛡️ **Risk-Based Execution**: Auto-executes safe actions, requires confirmation for high-risk operations
- 🎨 **Visual Mock Previews**: Shows suggested changes before execution

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Tests

```bash
npm run test
```

## Project Structure

```
src/
├── components/
│   ├── aurora/
│   │   ├── AwarenessIndicator.tsx
│   │   ├── CognitiveTimeline.tsx
│   │   ├── DemoWorkspace.tsx
│   │   ├── GhostCursor.tsx
│   │   ├── IncidentPanel.tsx
│   │   ├── ModeIndicator.tsx
│   │   ├── ScanningOverlay.tsx
│   │   ├── SessionContext.tsx
│   │   ├── StatusBadges.tsx
│   │   ├── VoiceInteraction.tsx
│   │   └── Waveform.tsx
│   ├── ui/
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-otp.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   └── tooltip.tsx
│   └── NavLink.tsx
├── examples/
│   └── aurora-architecture.md
├── hooks/
│   └── use-mobile.tsx
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── lib/
│   ├── aurora-ai.ts
│   └── utils.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── test/
│   ├── example.test.ts
│   └── setup.ts
├── types/
│   └── aurora.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Component library
- **Supabase** - Backend as a service
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Vitest** - Testing framework
- **Google AI** - Language model integration

## License

MIT
