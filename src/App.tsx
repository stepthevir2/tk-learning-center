import { useState } from 'react';
import { CategoryHub } from './components/CategoryHub';
import { LessonViewer } from './components/LessonViewer';
import { CATEGORIES, TOPICS } from './data/topics';
import { CategoryId, TopicId } from './types/learning';
import './styles.css';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [activeTopicId, setActiveTopicId] = useState<TopicId | null>(null);

  const activeTopic = activeTopicId
    ? TOPICS.find((t) => t.id === activeTopicId)
    : null;

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-content">
          <div className="brand-group">
            <h1 className="app-title">TK Learning Center</h1>
            <p className="app-tagline">
              ศูนย์การเรียนรู้เชิงลึกด้าน AI Agents, System Architecture และ Frontend
            </p>
          </div>
          <nav className="header-nav">
            <button
              type="button"
              className="nav-home-btn"
              onClick={() => setActiveTopicId(null)}
            >
              หน้าหลัก
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {activeTopic && activeTopic.status === 'ready' ? (
          <LessonViewer
            topic={activeTopic}
            onBack={() => setActiveTopicId(null)}
          />
        ) : (
          <CategoryHub
            categories={CATEGORIES}
            topics={TOPICS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectTopic={(id) => setActiveTopicId(id)}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 TK Learning Center • ระบบเรียนรู้แบบโต้ตอบสำหรับนักพัฒนายุค AI</p>
      </footer>
    </div>
  );
}

export default App;
