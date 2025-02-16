# Lesson Plan Generator Architecture

## Overview
The Lesson Plan Generator is a microservice-based system that leverages Azure's cloud infrastructure to generate detailed lesson plans using AI. The system uses Azure API Management for frontend security, Azure Functions for serverless compute, and Semantic Kernel for AI interaction.

## System Components

### Architecture Diagram

```mermaid
graph LR
    UI[Client UI] -->|HTTP Request\nw/correlation ID| APIM[Azure API Management]
    APIM -->|Authenticated Request| AF[Azure Function\nLessonPlanCatcher]
    AF -->|Plugin Call| LP[LessonPlanCreator]
    LP -->|Semantic Kernel| AI[AI Model]
    AI -->|Response| LP
    LP -->|Lesson Plan| AF
    AF -->|Response| APIM
    APIM -->|Final Response| UI

    subgraph Security Layer
    APIM
    end

    subgraph Compute Layer
    AF
    LP
    end

    subgraph AI Layer
    AI
    end
```

## Component Details

### 1. Client/UI Layer
- Generates unique correlation IDs for request tracking
- Specifies request type for backend handling
- Bundles lesson plan parameters into structured requests
- Makes authenticated calls to APIM endpoint

### 2. Azure API Management (Security Layer)
**Responsibilities:**
- Authentication and authorization
- Rate limiting
- Request validation
- Request/response logging
- API versioning
- Correlation ID tracking
- Traffic management

### 3. Azure Function - LessonPlanCatcher (Compute Layer)
**Responsibilities:**
- Receives pre-validated requests from APIM
- Processes request type
- Instantiates and calls LessonPlanCreator plugin
- Handles error management
- Returns structured responses

### 4. LessonPlanCreator Plugin (AI Layer)
**Responsibilities:**
- Manages Semantic Kernel instance
- Processes lesson plan parameters
- Generates AI prompts
- Returns formatted lesson plans

## Request Flow
1. UI generates request with correlation ID and parameters
2. Request hits APIM
   - Authentication check
   - Rate limiting check
   - Request validation
3. APIM forwards to Azure Function
4. Function processes request and calls plugin
5. Plugin generates lesson plan via Semantic Kernel
6. Response flows back through the same path

## Data Structures

### Request Format
```json
{
    "correlationId": "string",
    "requestType": "string",
    "parameters": {
        "subject": "string",
        "studentAgeRange": "string",
        "numberOfStudents": "integer",
        "specialConsiderations": "string",
        "classDuration": "integer",
        "classDays": "string",
        "standardsType": "string",
        "collaborativeLearning": "boolean",
        "presentationSkills": "boolean",
        "classDiscussions": "boolean",
        "researchSkills": "boolean",
        "testPrep": "string",
        "funFridays": "boolean"
    }
}
```

## Error Handling
- APIM handles authentication and rate limiting errors
- Azure Function handles business logic errors
- All errors maintain correlation ID for tracing
- Structured error responses include:
  - Error code
  - Error message
  - Correlation ID
  - Timestamp

## Monitoring and Logging
- APIM provides request/response logging
- Azure Function logs via Application Insights
- Correlation IDs enable cross-component tracing
- Metrics available for:
  - Request rates
  - Error rates
  - Response times
  - Rate limiting events

## Security Considerations
- All requests must be authenticated via APIM
- Rate limiting prevents abuse
- Correlation IDs for audit trails
- Secure communication between components
- No direct access to Azure Function endpoint

## Future Considerations
- Caching layer for frequent requests
- Multiple AI model support
- Enhanced error handling
- Request/response validation
- API versioning strategy

# WizardTeach Architecture

## System Overview
- Vue 3 frontend with AI-powered teaching material generation
- Azure Functions backend with Semantic Kernel for AI
- Cloudflare for edge security and WebSocket (future)
- CosmosDB for data persistence

## Current Architecture
```mermaid
graph LR
    UI[Vue Client] -->|HTTP + Auth| CF[Cloudflare]
    CF -->|Validated Request| AF[Azure Functions]
    AF -->|AI Generation| SK[Semantic Kernel]
    AF -->|Storage| DB[CosmosDB]
```

## Components

### Frontend
- Vue 3 + Composition API
- Pinia state management
- Tailwind CSS + Element Plus
```
src/
├── js/
│   ├── components/
│   │   ├── shared/       # Common components
│   │   ├── wizard/      # Setup wizard
│   │   └── modules/     # Content modules
│   ├── stores/         # Pinia stores
│   └── router/         # Vue routing
```

### Backend
- Azure Functions (serverless)
- Semantic Kernel for AI
- CosmosDB for storage
- Cloudflare for edge

## Data Models

### Core Types
```typescript
interface Module {
  id: string;
  weekNumber: number;
  title: string;
  description: string;
  tags: string[];
  materials: DailyMaterials;
}

interface Material {
  id: string;
  title: string;
  type: MaterialType;
  link: string;
  isPremium: boolean;
}

interface GenerationRequest {
  subject: string;
  studentAge: string;
  classSize: number;
  duration: number;
  schedule: Schedule;
  preferences: TeachingPreferences;
}
```

## State Management

### Stores
1. Setup Store: Wizard state, validation
2. Module Store: Content organization
3. User Store: Authentication, preferences

## Security
- Cloudflare edge authentication
- Azure Functions authorization
- Rate limiting and DDoS protection
- Secure WebSocket (future)

## Future Extensions

### Real-time Sync
```typescript
interface SyncState {
  userId: string;
  timestamp: number;
  status: 'synced' | 'pending';
  changes: Change[];
}
```

### WebSocket Integration
- Direct through Cloudflare
- Azure Functions backend
- CosmosDB change feed
- Optimistic updates

## Implementation Priorities
1. Core generation flow
2. Email collection
3. Module organization
4. Premium features
5. Real-time sync (future)