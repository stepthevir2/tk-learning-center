import { CategoryId, CategoryMeta, LessonTopic, TopicId } from '../types/learning';

interface CategoryHubProps {
  readonly selectedCategory: CategoryId;
  readonly onSelectCategory: (categoryId: CategoryId) => void;
  readonly onSelectTopic: (topicId: TopicId) => void;
  readonly topics: readonly LessonTopic[];
  readonly categories: readonly CategoryMeta[];
}

export function CategoryHub({
  selectedCategory,
  onSelectCategory,
  onSelectTopic,
  topics,
  categories,
}: CategoryHubProps) {
  const filteredTopics =
    selectedCategory === 'all'
      ? topics
      : topics.filter((t) => t.categoryId === selectedCategory);

  return (
    <section className="hub-container">
      <div className="hub-header">
        <h2 className="hub-heading">หมวดหมู่ความรู้ทั้งหมด</h2>
        <p className="hub-subtitle">
          เลือกหมวดหมู่ที่สนใจเพื่อเริ่มต้นทำความเข้าใจสถาปัตยกรรมเชิงลึกผ่านภาพและโมเดลจำลอง
        </p>
      </div>

      <nav aria-label="หมวดหมู่บทเรียน" className="category-filter-bar">
        {categories.map((cat) => {
          const isActive = cat.id === selectedCategory;
          return (
            <button
              key={cat.id}
              type="button"
              className={`filter-btn ${isActive ? 'filter-btn-active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.labelTh}
            </button>
          );
        })}
      </nav>

      <div className="topic-grid">
        {filteredTopics.map((topic) => {
          const isReady = topic.status === 'ready';
          return (
            <article
              key={topic.id}
              className={`topic-card ${isReady ? 'topic-card-ready' : 'topic-card-upcoming'}`}
            >
              <div className="card-top">
                <span className="category-badge">{topic.categoryLabel}</span>
                <span
                  className={`status-badge ${
                    isReady ? 'status-badge-ready' : 'status-badge-upcoming'
                  }`}
                >
                  {isReady ? 'พร้อมเรียนรู้' : 'เร็ว ๆ นี้'}
                </span>
              </div>

              <h3 className="card-title">{topic.title}</h3>
              <p className="card-summary">{topic.summaryTh}</p>

              <div className="flow-preview-list">
                {topic.flowPreview.map((stepName) => (
                  <span key={stepName} className="flow-step-pill">
                    {stepName}
                  </span>
                ))}
              </div>

              <div className="card-footer">
                {isReady ? (
                  <button
                    type="button"
                    className="lesson-launch-btn"
                    onClick={() => onSelectTopic(topic.id)}
                  >
                    เข้าสู่บทเรียน {topic.title} →
                  </button>
                ) : (
                  <span className="upcoming-label">เตรียมเปิดให้เรียนรู้เร็ว ๆ นี้</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
