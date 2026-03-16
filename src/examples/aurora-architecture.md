# Aurora Architecture Overview

## Multi-Layer Prompt System

Aurora's intelligence is built on a sophisticated multi-layer prompt system that creates a coherent, real-time cognitive copilot experience.

### 1. Core Identity Prompt
Defines Aurora's fundamental nature as a real-time multimodal cognitive copilot.

### 2. Runtime Behavior Prompt
Governs how Aurora behaves in live streaming environments, emphasizing incremental responses and interruption handling.

### 3. Perception Prompt
Structures how Aurora interprets visible screen evidence, audio input, and infers task state.

### 4. Action Planning Prompt
Prioritizes actions based on user goals, safety, and task context.

### 5. UI Navigation / Tool Prompt
Converts plans into structured UI actions with verification loops.

### 6. Session Memory / State Prompt
Maintains compact working memory with relevant session information.

### 7. Domain Specialization Prompt
Focuses Aurora's expertise on specific domains like startup pitch deck analysis.

## Key Features

### Structured Response Format
```typescript
interface AuroraResponse {
  spokenResponse: string;
  timeline: {
    perceived: string[];
    inferred: string[];
    decided: string[];
    executed: string[];
  };
  uiAnnotations: UIAnnotation[];
  proposedActions: ProposedAction[];
  sessionStateUpdate: Partial<SessionContext>;
}
```

### UI Annotation Types
- **Highlight**: Marks areas of interest on slides
- **Ghost Cursor**: Previews planned cursor movements
- **Mock Preview**: Shows visual mockups of suggested changes
- **Annotation**: Text annotations explaining analysis

### Action System
- **Low-risk actions** (auto-executable): Selecting text, opening panels, highlighting content
- **High-risk actions** (require confirmation): Sending messages, deleting files, publishing content

### Session State Management
Tracks:
- Current objective and subtask
- Active apps and open threads
- User preferences and recent corrections
- Active plan and last successful action
- Unresolved blockers

## Example Usage

```typescript
import { getAuroraResponse } from "@/lib/aurora-ai";

// Sample slide data
const slides = [
  { num: 1, title: "Our Vision", content: "Transforming the world through AI" },
  { num: 2, title: "Market Opportunity", content: "Huge market with lots of potential" },
  { num: 3, title: "Product Features", content: "Many features that solve problems" }
];

// Get Aurora's analysis
const response = await getAuroraResponse(slides, "Make this deck more investor-focused");

console.log("Spoken Response:", response.spokenResponse);
console.log("Timeline Events:", response.timeline);
console.log("UI Annotations:", response.uiAnnotations);
console.log("Proposed Actions:", response.proposedActions);
console.log("Session Update:", response.sessionStateUpdate);
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Input Layer                            │
├─────────────────────────────────────────────────────────────────┤
│ - Voice input (transcript)                                      │
│ - Screen content analysis                                       │
│ - User interactions (clicks, scrolls)                           │
└──────────────┬──────────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────────┐
│                     Perception Layer                            │
├─────────────────────────────────────────────────────────────────┤
│ - Visible evidence extraction                                  │
│ - Audio input interpretation                                    │
│ - Task state inference                                          │
└──────────────┬──────────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────────┐
│                     Reasoning Layer                             │
├─────────────────────────────────────────────────────────────────┤
│ - Objective alignment                                           │
│ - Action planning and prioritization                            │
│ - Risk assessment                                               │
│ - Session memory management                                     │
└──────────────┬──────────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────────┐
│                     Execution Layer                             │
├─────────────────────────────────────────────────────────────────┤
│ - UI navigation tools                                           │
│ - Action verification loops                                     │
│ - Error recovery strategies                                     │
└──────────────┬──────────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────────┐
│                     Output Layer                                │
├─────────────────────────────────────────────────────────────────┤
│ - Spoken responses                                              │
│ - UI annotations (highlights, previews)                         │
│ - Timeline visualization                                        │
│ - Session state display                                        │
└─────────────────────────────────────────────────────────────────┘
```

This architecture ensures that Aurora remains grounded, transparent, and adaptable to the user's needs while providing a coherent cognitive experience.
