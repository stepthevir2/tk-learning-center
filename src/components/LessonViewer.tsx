import { useState } from 'react';
import type {
  ArchitectureLayerId,
  PermissionModeId,
  ReadyTopic,
} from '../types/learning';

interface LessonViewerProps {
  readonly topic: ReadyTopic;
  readonly onBack: () => void;
}

export type LessonSectionId =
  | 'overview'
  | 'layers'
  | 'workflow'
  | 'tiers'
  | 'permissions'
  | 'commands';

export interface SectionNavItem {
  readonly id: LessonSectionId;
  readonly labelTh: string;
  readonly icon: string;
}

export function LessonViewer({ topic, onBack }: LessonViewerProps) {
  const { content } = topic;
  const isReact = topic.id === 'react-visual-patterns';

  const [activeSection, setActiveSection] =
    useState<LessonSectionId>('overview');
  const [selectedLayerId, setSelectedLayerId] = useState<ArchitectureLayerId>(
    content.layers[0].id,
  );
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [selectedPermissionMode, setSelectedPermissionMode] =
    useState<PermissionModeId>('Smart');

  const activeLayer =
    content.layers.find((layer) => layer.id === selectedLayerId) ??
    content.layers[0];

  const steps = content.workflowSteps;
  const activeStep = steps[activeStepIndex] ?? steps[0];

  const activeProfile =
    content.permissionProfiles.find(
      (profile) => profile.mode === selectedPermissionMode,
    ) ?? content.permissionProfiles[0];

  const navItems: readonly SectionNavItem[] = [
    {
      id: 'overview',
      labelTh: isReact ? 'ภาพรวม 3 เสาหลัก React' : 'ภาพรวม 3 เสาหลัก',
      icon: '🏛️',
    },
    {
      id: 'layers',
      labelTh: isReact
        ? '4 โครงสร้างหลัก (Components & State)'
        : 'สถาปัตยกรรม 4 เลเยอร์',
      icon: '🧩',
    },
    {
      id: 'workflow',
      labelTh: isReact
        ? 'วงจรการทำงาน (Lifecycle Flow)'
        : 'วงจรการทำงาน 5 ขั้น',
      icon: '⚡',
    },
    {
      id: 'tiers',
      labelTh: isReact
        ? 'การจัดเก็บและส่งต่อข้อมูล (Data Flow)'
        : 'แผนภูมิบริบท & ความจำ',
      icon: '📊',
    },
    {
      id: 'permissions',
      labelTh: isReact
        ? 'จำลองสถานะเรนเดอร์ (Simulator)'
        : 'แบบจำลองสิทธิ์ความปลอดภัย',
      icon: '🛡️',
    },
    ...(content.commandGroups && content.commandGroups.length > 0
      ? [
          {
            id: 'commands' as const,
            labelTh: isReact
              ? 'คลัง React Hooks & Syntax'
              : 'คลังคำสั่ง & คีย์ลัด',
            icon: '⌨️',
          },
        ]
      : []),
  ];

  const currentNavIndex = navItems.findIndex(
    (item) => item.id === activeSection,
  );
  const prevNav = currentNavIndex > 0 ? navItems[currentNavIndex - 1] : null;
  const nextNav =
    currentNavIndex >= 0 && currentNavIndex < navItems.length - 1
      ? navItems[currentNavIndex + 1]
      : null;

  return (
    <article className="lesson-viewer">
      <div className="lesson-nav-bar">
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
          aria-label="กลับหน้าหมวดหมู่"
        >
          ← กลับหน้าหมวดหมู่
        </button>
        <span className="lesson-category-tag">{topic.categoryLabel}</span>
      </div>

      <header className="lesson-header">
        <h2 className="lesson-headline">{content.headlineTh}</h2>
        <p className="lesson-intro">{content.introTh}</p>
      </header>

      <div className="lesson-layout-split">
        <aside className="lesson-sidebar" aria-label="สารบัญบทเรียน">
          <div className="sidebar-header">
            <span className="sidebar-title">เมนูนำทาง (Navigator)</span>
            <span className="sidebar-sub">คลิกเพื่อเลือกดูเนื้อหาแต่ละส่วน</span>
          </div>

          <nav className="sidebar-nav" aria-label="หัวข้อบทเรียนย่อย">
            {navItems.map((item) => {
              const isActive = item.id === activeSection;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`sidebar-nav-btn ${
                    isActive ? 'sidebar-nav-btn-active' : ''
                  }`}
                  onClick={() => setActiveSection(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.labelTh}</span>
                  {isActive && <span className="sidebar-indicator">●</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="lesson-main-content">
          {activeSection === 'overview' && (
            <section
              aria-labelledby="pillars-heading"
              className="lesson-section"
            >
              <h3 id="pillars-heading" className="section-title">
                {isReact
                  ? '3 เสาหลัก React (React Core Pillars)'
                  : '3 เสาหลักทางสถาปัตยกรรม (Core Architectural Pillars)'}
              </h3>
              <div className="pillar-grid">
                {content.pillars.map((pillar) => (
                  <div key={pillar.titleTh} className="pillar-card">
                    <h4 className="pillar-title">{pillar.titleTh}</h4>
                    <p className="pillar-desc">{pillar.descriptionTh}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === 'layers' && (
            <section
              aria-labelledby="architecture-heading"
              className="lesson-section"
            >
              <h3 id="architecture-heading" className="section-title">
                {isReact
                  ? '4 โครงสร้างสำคัญของ React (Component, State, Hooks, VDOM)'
                  : 'แผนผัง 4 เลเยอร์ของระบบ (4-Layer Interactive Architecture)'}
              </h3>
              <div className="layer-selector-bar">
                {content.layers.map((layer) => {
                  const isActive = layer.id === activeLayer.id;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      className={`layer-btn ${
                        isActive ? 'layer-btn-active' : ''
                      }`}
                      onClick={() => setSelectedLayerId(layer.id)}
                    >
                      <span className="layer-code">{layer.codeLabel}</span>
                      <span className="layer-name">{layer.titleTh}</span>
                    </button>
                  );
                })}
              </div>

              <div data-testid="layer-inspector" className="layer-inspector">
                <div className="inspector-head">
                  <span className="inspector-badge">
                    {activeLayer.codeLabel}
                  </span>
                  <h4 className="inspector-title">{activeLayer.titleTh}</h4>
                  <span className="inspector-sub">
                    {activeLayer.subtitleTh}
                  </span>
                </div>

                <div className="inspector-body">
                  <div className="inspector-files">
                    <h5>
                      {isReact
                        ? 'ไฟล์ตัวอย่าง / ฟังก์ชันที่เกี่ยวข้อง'
                        : 'ไฟล์และโมดูลสำคัญในเลเยอร์นี้'}
                    </h5>
                    <ul>
                      {activeLayer.files.map((filePath) => (
                        <li key={filePath}>
                          <code>{filePath}</code>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="inspector-highlights">
                    <h5>
                      {isReact
                        ? 'แนวคิดหลักที่ต้องเข้าใจ'
                        : 'จุดเด่นเชิงสถาปัตยกรรม'}
                    </h5>
                    <ul>
                      {activeLayer.highlightsTh.map((highlight) => (
                        <li
                          key={highlight}
                          dangerouslySetInnerHTML={{ __html: highlight }}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'workflow' && (
            <section
              aria-labelledby="workflow-heading"
              className="lesson-section"
            >
              <h3 id="workflow-heading" className="section-title">
                {isReact
                  ? 'วงจรการสร้างและเรนเดอร์ UI ใน React (Lifecycle & Render Flow)'
                  : 'วงจรการประมวลผล 5 ขั้นตอน (5-Step Execution Loop)'}
              </h3>
              <div className="stepper-button-bar">
                {steps.map((step, idx) => {
                  const isActive = idx === activeStepIndex;
                  return (
                    <button
                      key={step.stepNumber}
                      type="button"
                      className={`step-btn ${
                        isActive ? 'step-btn-active' : ''
                      }`}
                      onClick={() => setActiveStepIndex(idx)}
                    >
                      {step.buttonLabelTh}
                    </button>
                  );
                })}
              </div>

              <div className="step-nav-controls">
                <button
                  type="button"
                  className="step-ctrl-btn"
                  disabled={activeStepIndex === 0}
                  onClick={() =>
                    setActiveStepIndex((prev) => Math.max(0, prev - 1))
                  }
                >
                  ← ขั้นตอนก่อนหน้า
                </button>
                <span className="step-counter">
                  ขั้นตอนที่ {activeStepIndex + 1} จาก {steps.length}
                </span>
                <button
                  type="button"
                  className="step-ctrl-btn"
                  disabled={activeStepIndex === steps.length - 1}
                  onClick={() =>
                    setActiveStepIndex((prev) =>
                      Math.min(steps.length - 1, prev + 1),
                    )
                  }
                >
                  ขั้นตอนถัดไป →
                </button>
              </div>

              <div
                data-testid="workflow-step-detail"
                className="workflow-step-detail"
              >
                <div className="step-detail-header">
                  <span className="step-number-tag">
                    Step {activeStep.stepNumber}
                  </span>
                  <h4 className="step-detail-title">{activeStep.titleTh}</h4>
                </div>
                <p className="step-detail-desc">{activeStep.descriptionTh}</p>
                <div className="step-artifacts">
                  <h5>
                    {isReact
                      ? 'ตัวอย่างโค้ด / ชิ้นส่วนที่เกี่ยวข้อง:'
                      : 'อาร์ติแฟกต์และโมดูลที่เกี่ยวข้อง:'}
                  </h5>
                  <div className="artifact-tags">
                    {activeStep.keyArtifacts.map((artifact) => (
                      <span key={artifact} className="artifact-tag">
                        {artifact}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'tiers' && (
            <section aria-labelledby="context-heading" className="lesson-section">
              <h3 id="context-heading" className="section-title">
                {isReact
                  ? 'ระดับการส่งผ่านและขอบเขตข้อมูลใน React (State & Props Scope Tiers)'
                  : 'โครงสร้างบริบทและความจำ (Context & Memory Tiers)'}
              </h3>
              <div className="context-tier-chart">
                {content.contextTiers.map((tier) => (
                  <div key={tier.id} className="tier-row">
                    <div className="tier-meta">
                      <div className="tier-names">
                        <strong className="tier-title">{tier.name}</strong>
                        <span className="tier-sub">{tier.subtitleTh}</span>
                      </div>
                      <span className="tier-badge">{tier.badgeText}</span>
                    </div>
                    <div className="tier-bar-track">
                      <div
                        className="tier-bar-fill"
                        style={{ width: `${tier.usagePercent}%` }}
                      />
                    </div>
                    <div className="tier-retention">
                      <small>{tier.retentionTh}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === 'permissions' && (
            <section
              aria-labelledby="permission-heading"
              className="lesson-section"
            >
              <h3 id="permission-heading" className="section-title">
                {isReact
                  ? 'แบบจำลองการจัดการ Side Effects และ Performance (Simulator)'
                  : 'แบบจำลองการควบคุมสิทธิ์ความปลอดภัย (Permission Simulator)'}
              </h3>
              <div className="permission-mode-bar">
                {content.permissionProfiles.map((profile) => {
                  const isActive = profile.mode === selectedPermissionMode;
                  return (
                    <button
                      key={profile.mode}
                      type="button"
                      className={`perm-mode-btn ${
                        isActive ? 'perm-mode-btn-active' : ''
                      }`}
                      onClick={() => setSelectedPermissionMode(profile.mode)}
                    >
                      {`โหมด: ${profile.mode}`}
                    </button>
                  );
                })}
              </div>

              <div data-testid="permission-panel" className="permission-panel">
                <div className="perm-summary-box">
                  <span className="perm-mode-tag">
                    โหมดที่เลือก: {activeProfile.mode}
                  </span>
                  <p className="perm-summary-text">{activeProfile.summaryTh}</p>
                </div>

                <div className="perm-policies-grid">
                  <div className="perm-policy-card perm-policy-read">
                    <h5>
                      {isReact
                        ? 'การอ่านค่า & Props (Read Action)'
                        : 'การอ่านไฟล์ (Read Action)'}
                    </h5>
                    <p>{activeProfile.readActionPolicyTh}</p>
                  </div>
                  <div className="perm-policy-card perm-policy-write">
                    <h5>
                      {isReact
                        ? 'การเปลี่ยน State & Re-render (Write Action)'
                        : 'คำสั่งแก้ไข / เชลล์ (Write Action)'}
                    </h5>
                    <p>{activeProfile.writeCommandPolicyTh}</p>
                  </div>
                  <div className="perm-policy-card perm-policy-block">
                    <h5>
                      {isReact
                        ? 'ข้อห้าม & Bad Practices (Anti-Patterns)'
                        : 'การป้องกันอันตราย (Blocklist Policy)'}
                    </h5>
                    <p>{activeProfile.blocklistPolicyTh}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'commands' &&
            content.commandGroups &&
            content.commandGroups.length > 0 && (
              <section
                aria-labelledby="commands-heading"
                className="lesson-section"
              >
                <h3 id="commands-heading" className="section-title">
                  {isReact
                    ? 'คลังคำสั่ง React Hooks และ Syntax สำคัญ (React Hooks & Syntax Catalog)'
                    : 'คลังคำสั่งและคีย์ลัดทั้งหมด (Command Reference & CLI Catalog)'}
                </h3>
                <p className="section-subtitle">
                  {isReact
                    ? 'รวม React Hooks พื้นฐานและขั้นสูง พร้อมไวยากรณ์และคำอธิบายภาษาไทย'
                    : 'รวมคำสั่ง Slash Commands ที่สามารถพิมพ์สั่งการได้ทั้งในเทอร์มินัล CLI และผ่าน Gateway แชท'}
                </p>

                <div className="command-groups-container">
                  {content.commandGroups.map((group) => (
                    <div key={group.groupTitleTh} className="command-group-card">
                      <div className="command-group-header">
                        <h4 className="command-group-title">
                          {group.groupTitleTh}
                        </h4>
                        <p className="command-group-desc">
                          {group.groupDescriptionTh}
                        </p>
                      </div>

                      <div className="command-table-wrap">
                        <table className="command-table">
                          <thead>
                            <tr>
                              <th>คำสั่ง (Command / Hook)</th>
                              <th>ตัวอย่างการใช้งาน (Usage)</th>
                              <th>คำอธิบาย (Description)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.commands.map((cmd) => (
                              <tr key={cmd.command}>
                                <td className="cmd-cell">
                                  <code>{cmd.command}</code>
                                  {cmd.aliases && (
                                    <div className="cmd-aliases">
                                      {cmd.aliases.map((alias) => (
                                        <span key={alias} className="alias-tag">
                                          {alias}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </td>
                                <td className="usage-cell">
                                  <code>{cmd.usageTh}</code>
                                </td>
                                <td className="desc-cell">
                                  {cmd.descriptionTh}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          <div className="section-footer-nav">
            {prevNav ? (
              <button
                type="button"
                className="section-step-nav-btn prev"
                onClick={() => setActiveSection(prevNav.id)}
              >
                ← ก่อนหน้า: {prevNav.labelTh}
              </button>
            ) : (
              <div />
            )}
            {nextNav ? (
              <button
                type="button"
                className="section-step-nav-btn next"
                onClick={() => setActiveSection(nextNav.id)}
              >
                ถัดไป: {nextNav.labelTh} →
              </button>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>
    </article>
  );
}
