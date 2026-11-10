# Architecture and Implementation Plan for TK Learning Center

## 1. Domain Model and Synthesis Decision

We evaluated two candidate architectures for TK Learning Center:

1. **Candidate A (Registry-Driven Discriminated Union):** One typed registry of topics (`LessonTopic[]`) discriminated by `status: 'ready' | 'upcoming'`. Ready topics carry a non-empty `LessonContent` payload with interactive layers, workflow steps, context-tier metrics, and permission simulator profiles. Adding a new lesson requires adding one typed entry to the registry.
2. **Candidate B (Per-Topic Custom Route Components):** Each lesson is a separate React component file with custom layout markup and state hooks.

**Synthesis decision:** We choose Candidate A. It encodes the domain in a single discriminated union (`LessonTopic`) and non-empty tuples (`NonEmptyArray<T>`), so an upcoming topic cannot be opened as an empty lesson view and every ready lesson renders through a consistent visual renderer without repeating state machines across files.

## 2. Module Map and File Ownership

- `src/types/learning.ts` owns branded identifiers (`TopicId`), category discriminants (`CategoryId`), the `LessonTopic` discriminated union (`ReadyTopic | UpcomingTopic`), and `LessonContent` sub-structures (`ArchitectureLayer`, `WorkflowStep`, `ContextTier`, `PermissionProfile`).
- `src/data/topics.ts` owns the category definitions (`CATEGORIES`) and the authoritative `TOPICS` registry, including the full Thai visual lesson for `hermes-agent` and three upcoming topics (`mcp-protocol`, `docker-sandbox`, `react-visual-patterns`).
- `src/components/CategoryHub.tsx` renders the category filter bar and the topic cards on the main page, allowing the user to filter by category and open any `status === 'ready'` topic.
- `src/components/LessonViewer.tsx` renders the visual Thai lesson page for any `ReadyTopic`:
  - Overview summary and 3 pillar cards.
  - Interactive 4-layer architecture map (`Layer 01` through `Layer 04`) with a live detail panel showing the selected layer's Thai explanation, source files, and bullet points.
  - Interactive 5-step execution loop stepper (`ขั้นที่ 1` through `ขั้นที่ 5`) with direct step buttons plus previous/next navigation.
  - Context and memory tier visual bar chart (`Stable Tier`, `Context Tier`, `Volatile Tier`, `SQLite FTS5`).
  - Interactive permission mode selector (`Smart`, `Manual`, `Off`) showing how Hermes Agent gates read actions, shell commands, and blocked commands.
- `src/App.tsx` owns top-level navigation state (`activeTopicId: TopicId | null` and `selectedCategory: CategoryId`) and switches between `CategoryHub` and `LessonViewer`.
- `src/__tests__/app.test.tsx` tests user-observable behaviors across the hub, category filtering, topic navigation, interactive architecture layers, workflow stepper controls, context tier chart, and permission mode switcher.

## 3. Behavioral Contract Verified by Tests

1. **Main Category Hub:** Renders the site title `TK Learning Center`, category filter buttons (`ทั้งหมด`, `AI Agents & LLM`, `System Architecture`, `Frontend & React`), the `Hermes Agent (Nous Research)` ready card, and upcoming topic cards.
2. **Category Filtering:** Clicking a category button filters visible topic cards to that category; clicking `ทั้งหมด` restores all topics.
3. **Opening a Ready Topic:** Clicking the `Hermes Agent (Nous Research)` card transitions to the Thai visual lesson view and displays the overview, 4 architecture layers, 5 workflow steps, context tier chart, and permission mode selector.
4. **Interactive Architecture Map:** Clicking each architecture layer button (`Layer 01` to `Layer 04`) updates the detail inspector with that layer's Thai explanation and source file references (such as `hermes_cli/main.py`, `run_agent.py`, `tools/delegate_tool.py`, `hermes_state.py`).
5. **Interactive 5-Step Loop Stepper:** Clicking step buttons or the `ถัดไป` / `ก่อนหน้า` controls updates the active step explanation in Thai from step 1 (`SOUL.md` hydration) through step 5 (`Procedural Skill` creation).
6. **Permission Mode Simulator:** Switching between `Smart`, `Manual`, and `Off` updates the displayed security policy in Thai.
7. **Returning to Main Hub:** Clicking `กลับหน้าหมวดหมู่` returns to the category hub view.
