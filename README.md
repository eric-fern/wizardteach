# WizardTeach

AI-powered teaching material generator that creates comprehensive, week-by-week lesson plans through simple teacher inputs.

After a simple onboarding flow, teachers will receive a free lesson plan, which will populate a persistent calendar through our site (They will be required to sign up for free so they can access this calendar whenever they want to prepare for future lessons.)

They will be able to navigate the calendar by week (a scrolling list of weeks with an ai generated title and description as well as 3 tags to describe the week. )

When they click on a week they will go to a page with each day of that week. Each day will have a generated lesson outline, and a menu of buttons to generate classroom materials.

Clicking on a day will bring up a lesson outline meant to be a reference for the teacher while teaching. It will include hyperlinks to all previously generated materials, as well as having a chat bot to make changes on the fly. 

There will be a wizard ai agent in the bottom left corner that a teacher can chat with, you can ask for it to change your week

Basic generation is free (assessments, homework, activities) , advanced generation is in the premium tier (Powerpoints, study guides, flash cards).  

Each day will have a standards check section which explains in depth how that days instruction meets with state or common core standards (would be nice to have an evaluator rubric, but thats complicated and lets not worry about it until later.)

(the two ideas below are far off but possible. Do not worry about them for now)
Another idea is a daily attendance check (can generate a catch up sheet or catch up activities for students who miss days.) 
Another idea is auto grader
## Product Tiers
- **Free:** Basic planning, limited generation, standards tracking
- **Premium ($9.99/mo | $89/yr):** Unlimited generation, custom templates, advanced materials

## System Architecture

### Overall System
```mermaid
graph LR
    UI[Vue Frontend] -->|Axios| AC[API Client]
    AC -->|HTTP/WS| CF[Cloudflare Edge Computing]
    CF -->|Route| AF[Azure Functions]
    AF -->|Generation| SK[Semantic Kernel]
    AF -->|Storage| DB[CosmosDB]
    SK -->|Response| AF
    AF -->|Response| CF
    CF -->|Response| AC
    AC -->|State Update| UI
```

### Frontend Architecture
```mermaid
graph TD
    %% Core Application Structure
    APP[App.vue] --> ROUTER[Vue Router]
    ROUTER --> BASE[BaseTemplate.vue]
    
    %% Template Structure
    BASE --> NAV[Navigation]
    BASE --> HEADER[Header]
    BASE --> MAIN[Main Content]
    BASE --> FOOTER[Footer]
    
    %% State Management
    subgraph LocalStores[Local Stores]
        WIZARD_STATE[Wizard State] -->|Persist| LOCAL_STORAGE[(Local Storage)]
        DRAFT_STATE[Draft Content] -->|Persist| LOCAL_STORAGE
    end
    
    subgraph ServerStores[Server Stores]
        AUTH[Auth Store]
        CONTENT[Content Store]
        SETTINGS[Settings Store]
    end
    
    %% View System
    MAIN --> WIZARDS[Wizard Views]
    MAIN --> DASHBOARD[Dashboard View]
    MAIN --> MATERIALS[Materials View]
    
    %% Wizard System
    subgraph WizardSystem[Wizard System]
        WIZARDS --> ONBOARD[OnboardWizard]
        WIZARDS --> WORKSHEET[WorksheetWizard]
        WIZARDS --> SLIDES[SlidesWizard]
        WIZARDS --> FLASHCARD[FlashcardWizard]
        
        subgraph CommonSteps[Common Wizard Steps]
            COMMON[Common Steps]
            COMMON --> SUBJECT[Subject Selection]
            COMMON --> STANDARDS[Standards Selection]
            COMMON --> PREVIEW[Preview]
        end
        
        ONBOARD --> ONBOARD_STEPS[Steps]
        WORKSHEET --> WORKSHEET_STEPS[Steps]
        SLIDES --> SLIDES_STEPS[Steps]
        FLASHCARD --> FLASHCARD_STEPS[Steps]
        
        ONBOARD_STEPS --> COMMON
        WORKSHEET_STEPS --> COMMON
        SLIDES_STEPS --> COMMON
        FLASHCARD_STEPS --> COMMON
    end
    
    %% Account Gate
    subgraph AccountGate[Account Gate]
        PREVIEW --> SIGNUP{Requires Account?}
        SIGNUP -->|Yes| AUTH_FLOW[Auth Flow]
        SIGNUP -->|No| CONTINUE[Continue]
    end
    
    %% Components
    subgraph UIComponents[UI Components]
        FORMS[Form Controls]
        MODALS[Modal System]
        TOOLTIPS[Tooltips]
        NOTIFY[Notifications]
    end
    
    subgraph SharedComponents[Shared Components]
        CALENDAR[Calendar]
        EDITOR[Rich Editor]
        AI_CHAT[AI Assistant]
    end
    
    %% State Flow
    WIZARD_STATE --> WIZARDS
    AUTH --> DASHBOARD
    CONTENT --> MATERIALS
    
    %% Component Usage
    WIZARDS -.-> FORMS
    WIZARDS -.-> MODALS
    DASHBOARD -.-> FORMS
    DASHBOARD -.-> CALENDAR
    MATERIALS -.-> EDITOR
    MATERIALS -.-> AI_CHAT
    
    %% Network Layer
    subgraph APILayer[API Layer]
        API[API Client]
        WS[WebSocket Client]
    end
    
    ServerStores --> API
    API --> ServerStores
    WS --> SharedComponents
```

### Backend Architecture
```mermaid
graph LR
    subgraph Client
        AC[API Client] -->|HTTP/WS| CF
    end
    
    subgraph Edge
        CF[Cloudflare Edge Computing]
        CF -->|"Auth, Route, Cache"| AF
    end
    
    subgraph Backend
        AF[Azure Functions] -->|Generate| SK[Semantic Kernel]
        AF -->|Store| DB[CosmosDB]
        SK -->|Content| AF
        DB -->|Data| AF
    end
    
    AF -->|Response| CF
    CF -->|Response| AC
```

## Implementation Phases

### Current (Phase 1: Local Setup)
- Streamlined teacher input wizard (no account required)
  - Subject and grade level
  - Class size and duration
  - Basic scheduling
  - Standards selection
- Local state persistence
- Limited preview capabilities
- Account creation gate before generation

```typescript
// Local Setup Store (Browser Storage)
interface LocalSetupStore {
  basicInfo: {
    subject: string;
    studentAgeRange: string;
    numberOfStudents: number;
    startDate: string;
    endDate: string;
    lessonDuration: number;
  };
  standards: {
    type: string;
    state?: string;
  };
  // Persist configuration
  persist: {
    storage: Storage;
    key: string;
  };
}

// Generation Gate
interface GenerationFlow {
  hasAccount: boolean;
  canGenerate: boolean;
  requiresSignup: boolean;
}
```

### Near-Term (Phase 2: Server Integration)
- Account creation and authentication
- Transfer local setup to server
- Full calendar view with rich week editing
- AI-powered week assistant
- Per-week customization
  - Pacing preferences
  - Assessment frequency
  - Activity types, group based, presentation, independent research, current events(Needs a news plugin through SK - kind of complicated dont worry about it for now)
  - Material preferences
- Global curriculum settings
- Premium features

```typescript
// Server-Side Calendar Store
interface CalendarStore {
  weeks: Week[];
  activeWeek: number | null;
  
  weekCustomization: {
    preferredPacing: 'relaxed' | 'standard' | 'intensive';
    assessmentFrequency: AssessmentConfig;
    activityPreferences: ActivityType[];
    materialTypes: MaterialType[];
    teachingStyle: TeachingStyle;
    technologyAccess: TechnologyConfig;
    focusAreas: FocusArea[];
  };

  editHistory: EditRecord[];
  chatContext: {
    currentWeek: number | null;
    conversationHistory: ChatMessage[];
  };
}

// Store Manager for Local/Server Transition
interface StoreManager {
  migrateToServer: (localData: LocalSetupStore) => Promise<void>;
  syncWithServer: () => Promise<void>;
  handleConnectionLoss: () => void;
}
```

### Future (Phase 3)
- Collaborative editing
- Real-time sync
- Mobile apps
- Advanced AI features

```typescript
interface CollaborationState {
  activeEditors: Editor[];
  pendingChanges: Change[];
  syncStatus: SyncState;
}
```

## Technical Stack
- Vue 3 + Composition API
- Pinia for state management
  - Separate stores for setup and customization
  - Rich editing history support
- AI-powered week assistant
- Real-time collaboration (future)

## Development Process

### Current Focus
1. Complete local setup wizard
2. Implement draft state persistence
3. Build account creation gate
4. Design server data migration
5. Establish wizard template structure

### Next Steps
1. Implement server-side storage
2. Add rich customization features
3. Develop additional wizard types
   - Worksheet generator
   - PowerPoint generator
   - Flashcard generator
4. Enable premium features

## User Experience Flow
1. **Phase 1: Local Setup**
   - No account required to start
   - Quick, focused wizard
   - Local data persistence
   - Limited preview capabilities
   - Account creation at generation

2. **Phase 2: Server Features**
   - Full calendar access
   - Rich customization tools
   - AI-assisted refinements
   - Premium feature access

## Security

### Current
- Cloudflare Workers API Gateway
- Edge authentication & authorization
- Rate limiting at edge
- DDoS protection

### Future
- WebSocket security
- Real-time validation
- Enhanced rate limiting
- Collaboration security 

## View Structure

### Base Template
```typescript
// src/js/views/BaseTemplate.vue
interface BaseTemplate {
  header: HeaderComponent;
  navigation: NavigationComponent;
  content: RouterView;
  footer: FooterComponent;
}
```

### Wizard Types
Each wizard type lives in its own directory and follows a consistent pattern:
```
src/js/views/
├── onboardwizard/           # Initial setup wizard
│   ├── CourseDetails.vue    # Basic course information
│   ├── StandardsSelect.vue  # Educational standards
│   └── ReviewGenerate.vue   # Review and generation
│
├── worksheetgenwizard/      # Worksheet generation wizard
│   ├── ContentType.vue      # Worksheet type selection
│   ├── QuestionFormat.vue   # Question structure
│   └── StylePreview.vue     # Visual style selection
│
├── powerpointgenwizard/     # Presentation generation wizard
│   ├── SlideStructure.vue   # Slide organization
│   ├── VisualStyle.vue      # Theme and graphics
│   └── TransitionType.vue   # Animation preferences
│
└── flashcardgenwizard/      # Flashcard generation wizard
    ├── CardFormat.vue       # Card layout selection
    ├── ContentType.vue      # Study material format
    └── ReviewStyle.vue      # Review method selection
```

### Common Components
Shared steps and components across wizards:
```typescript
// Common wizard steps that can be reused
interface CommonWizardSteps {
  SubjectSelection: Component;
  StandardsAlignment: Component;
  MaterialPreview: Component;
  GenerationOptions: Component;
}

// Base wizard step with shared functionality
interface BaseWizardStep {
  isValid: boolean;
  canProceed: boolean;
  validation: ValidationRules;
  navigate: WizardNavigation;
}
```

### Wizard State Management
Each wizard type maintains its own local state until account creation:
```typescript
interface WizardStateManager {
  localState: {
    onboarding: OnboardingState;
    worksheet: WorksheetState;
    powerpoint: PowerPointState;
    flashcard: FlashcardState;
  };
  
  // Common functionality
  persistState(): void;
  restoreState(): void;
  clearState(): void;
  
  // Generation gates
  requiresAccount(): boolean;
  canGenerate(): boolean;
}
``` 