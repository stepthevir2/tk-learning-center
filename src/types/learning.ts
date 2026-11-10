export type NonEmptyArray<T> = readonly [T, ...T[]];

export type TopicId = string & { readonly __brand: 'TopicId' };

export function createTopicId(id: string): TopicId {
  if (id.trim().length === 0) {
    throw new Error('TopicId must not be empty');
  }
  return id as TopicId;
}

export type CategoryId = 'all' | 'ai-agents' | 'system-arch' | 'frontend-ui';
export type TopicCategoryId = Exclude<CategoryId, 'all'>;

export interface CategoryMeta {
  readonly id: CategoryId;
  readonly labelTh: string;
  readonly descriptionTh: string;
}

export type ArchitectureLayerId =
  | 'entry-routing'
  | 'core-loop'
  | 'tools-sandboxes'
  | 'memory-skills';

export interface ArchitectureLayer {
  readonly id: ArchitectureLayerId;
  readonly codeLabel: string;
  readonly titleTh: string;
  readonly subtitleTh: string;
  readonly files: NonEmptyArray<string>;
  readonly highlightsTh: NonEmptyArray<string>;
}

export interface WorkflowStep {
  readonly stepNumber: number;
  readonly buttonLabelTh: string;
  readonly titleTh: string;
  readonly descriptionTh: string;
  readonly keyArtifacts: NonEmptyArray<string>;
}

export interface ContextTier {
  readonly id: string;
  readonly name: string;
  readonly subtitleTh: string;
  readonly usagePercent: number;
  readonly badgeText: string;
  readonly retentionTh: string;
}

export type PermissionModeId = 'Smart' | 'Manual' | 'Off';

export interface PermissionProfile {
  readonly mode: PermissionModeId;
  readonly summaryTh: string;
  readonly readActionPolicyTh: string;
  readonly writeCommandPolicyTh: string;
  readonly blocklistPolicyTh: string;
}

export interface OverviewPillar {
  readonly titleTh: string;
  readonly descriptionTh: string;
}

export interface LessonContent {
  readonly headlineTh: string;
  readonly introTh: string;
  readonly pillars: readonly [OverviewPillar, OverviewPillar, OverviewPillar];
  readonly layers: NonEmptyArray<ArchitectureLayer>;
  readonly workflowSteps: NonEmptyArray<WorkflowStep>;
  readonly contextTiers: NonEmptyArray<ContextTier>;
  readonly permissionProfiles: NonEmptyArray<PermissionProfile>;
}

export interface ReadyTopic {
  readonly status: 'ready';
  readonly id: TopicId;
  readonly categoryId: TopicCategoryId;
  readonly categoryLabel: string;
  readonly title: string;
  readonly summaryTh: string;
  readonly flowPreview: readonly [string, string, string];
  readonly content: LessonContent;
}

export interface UpcomingTopic {
  readonly status: 'upcoming';
  readonly id: TopicId;
  readonly categoryId: TopicCategoryId;
  readonly categoryLabel: string;
  readonly title: string;
  readonly summaryTh: string;
  readonly flowPreview: NonEmptyArray<string>;
}

export type LessonTopic = ReadyTopic | UpcomingTopic;
