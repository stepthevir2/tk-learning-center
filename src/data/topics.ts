import {
  CategoryMeta,
  createTopicId,
  LessonTopic,
} from '../types/learning';

export const CATEGORIES: readonly CategoryMeta[] = [
  {
    id: 'all',
    labelTh: 'ทั้งหมด',
    descriptionTh: 'หัวข้อและบทเรียนทั้งหมดของ TK Learning Center',
  },
  {
    id: 'ai-agents',
    labelTh: 'AI Agents & LLM',
    descriptionTh: 'สถาปัตยกรรมและการสร้างตัวแทนปัญญาประดิษฐ์ (AI Agents)',
  },
  {
    id: 'system-arch',
    labelTh: 'System Architecture',
    descriptionTh: 'โครงสร้างระบบและสภาพแวดล้อมการประมวลผล (Sandboxes & Infrastructure)',
  },
  {
    id: 'frontend-ui',
    labelTh: 'Frontend & React',
    descriptionTh: 'การออกแบบส่วนติดต่อผู้ใช้และเทคนิคการแสดงผลแบบโต้ตอบ',
  },
] as const;

export const TOPICS = [
  {
    status: 'ready',
    id: createTopicId('hermes-agent'),
    categoryId: 'ai-agents',
    categoryLabel: 'AI Agents & LLM',
    title: 'Hermes Agent (Nous Research)',
    summaryTh: 'สำรวจสถาปัตยกรรมภายในของ Hermes Agent โครงข่ายตัวแทนอัจฉริยะแบบ open-weights พร้อมระบบความจำ 4 ชั้นและการเรียนรู้ทักษะอัตโนมัติ',
    flowPreview: [
      'Input Routing & Context Assembly',
      'Sandboxed Tool & Subagent Execution',
      'Persistent Memory & Skill Crystallization',
    ],
    content: {
      headlineTh: 'Hermes Agent คืออะไร? (สรุปเข้าใจง่ายใน 1 นาที)',
      introTh: 'Hermes Agent เป็น Agent Harness แบบ open-weights จาก Nous Research ที่ถูกออกแบบมาเพื่อขับเคลื่อนโมเดลตระกูล Hermes ให้ทำงานเป็นตัวแทนอัตโนมัติที่คิด วิเคราะห์ เรียกใช้เครื่องมือ และสะสมทักษะใหม่ได้อย่างปลอดภัยและเป็นระบบ',
      pillars: [
        {
          titleTh: 'โครงสร้างแบบ 4 ชั้น (4-Tier Architecture)',
          descriptionTh: 'แยกส่วนการรับคำสั่ง วงจรคิดของเอเจนต์ คลังเครื่องมือ และความจำถาวรออกจากกันอย่างชัดเจน',
        },
        {
          titleTh: 'วงจรประมวลผลและสร้างทักษะ (Skill Generation Loop)',
          descriptionTh: 'เมื่อทำงานสำเร็จ เอเจนต์สามารถตกผลึกคำสั่งเป็น Procedural Skill ไว้ใช้ซ้ำได้ทันที',
        },
        {
          titleTh: 'ความปลอดภัยและการควบคุมสิทธิ์ (Security Sandbox)',
          descriptionTh: 'มีโหมดสิทธิ์ Smart, Manual และ Off ควบคุมการเข้าถึงไฟล์และระบบคำสั่งภายนอกอย่างรัดกุม',
        },
      ],
      layers: [
        {
          id: 'entry-routing',
          codeLabel: 'Layer 01',
          titleTh: 'ช่องทางรับคำสั่ง & ตัวเลือกโมเดล',
          subtitleTh: 'Entry Routing & Runtime Provider',
          files: [
            'hermes_cli/main.py',
            'gateway/run.py',
            'hermes_cli/runtime_provider.py',
          ],
          highlightsTh: [
            'รับคำสั่งผ่าน CLI หรือ Gateway API ส่งต่อบริบทเข้าสู่ Runtime Provider',
            'สลับสับเปลี่ยน Local Model หรือ Cloud Inference ได้อย่างไร้รอยต่อ',
            'ตรวจสอบการตั้งค่าคอนฟิกและกำหนดสภาพแวดล้อมก่อนเริ่มทำงาน',
          ],
        },
        {
          id: 'core-loop',
          codeLabel: 'Layer 02',
          titleTh: 'วงจร AIAgent & จัดการบริบท 3 ชั้น',
          subtitleTh: 'Agent Execution Loop',
          files: [
            'run_agent.py',
            'agent/conversation_loop.py',
            'agent/prompt_builder.py',
          ],
          highlightsTh: [
            'ควบคุมวงจรคิดและตัดสินใจของเอเจนต์ผ่าน conversation_loop และ run_agent.py',
            'ใช้ Tiered Prompt Assembly แบ่งข้อมูลเป็นชั้นชัดเจนเพื่อรักษาประสิทธิภาพ',
            'คำนวณและปรับลดขอบเขตบริบทเพื่อรักษาประสิทธิภาพของ Token Cache',
          ],
        },
        {
          id: 'tools-sandboxes',
          codeLabel: 'Layer 03',
          titleTh: 'คลังเครื่องมือ, Subagent & ตู้คอนเทนเนอร์',
          subtitleTh: 'Tools, Sandboxes & Delegation',
          files: [
            'model_tools.py',
            'agent/tool_executor.py',
            'tools/delegate_tool.py',
          ],
          highlightsTh: [
            'จัดการเครื่องมือคำสั่งไฟล์ การรันเชลล์ และเว็บเบราว์เซอร์ผ่าน executor',
            'ส่งต่องานย่อยให้ Subagent ทำงานแบบคู่ขนานเพื่อกระจายภาระ',
            'กักกันการทำงานที่ไม่น่าไว้วางใจให้อยู่ภายใน Docker หรือ Isolated Container',
          ],
        },
        {
          id: 'memory-skills',
          codeLabel: 'Layer 04',
          titleTh: 'ความจำถาวร & การสร้างทักษะใหม่',
          subtitleTh: 'Persistent Memory & Skill Generation',
          files: [
            'hermes_state.py',
            'SOUL.md',
            'HERMES.md',
            'MEMORY.md',
            'USER.md',
          ],
          highlightsTh: [
            'รักษาอัตลักษณ์และบุคลิกผ่านชุดไฟล์ Markdown สำหรับตัวตนและผู้ใช้งาน',
            'ใช้ SQLite FTS5 สำหรับการสืบค้นประวัติและบริบทข้อความอย่างรวดเร็ว',
            'จัดเก็บสถานะการสนทนาและทักษะที่ตกผลึกใหม่ลงในหน่วยจัดเก็บถาวร',
          ],
        },
      ],
      workflowSteps: [
        {
          stepNumber: 1,
          buttonLabelTh: 'ขั้นที่ 1: รับคำสั่ง & โหลดความจำ',
          titleTh: 'ขั้นที่ 1: รับคำสั่ง & โหลดความจำ',
          descriptionTh: 'โหลดบุคลิกและตัวตนจาก SOUL.md และความจำระยะยาวเข้าสู่ระบบ',
          keyArtifacts: ['Identity Context', 'User Preferences', 'Long-term Storage'],
        },
        {
          stepNumber: 2,
          buttonLabelTh: 'ขั้นที่ 2: ประกอบ Prompt 3 ชั้น',
          titleTh: 'ขั้นที่ 2: ประกอบ Prompt 3 ชั้น',
          descriptionTh: 'ใช้ prompt_builder.py รวบรวม System Prompt, History และ Scratchpad เข้าด้วยกันอย่างมีแบบแผน',
          keyArtifacts: ['KV Cache Ready Prompt', 'Dynamic Prompt Template'],
        },
        {
          stepNumber: 3,
          buttonLabelTh: 'ขั้นที่ 3: เรียก LLM & แยกงาน Tool',
          titleTh: 'ขั้นที่ 3: เรียก LLM & แยกงาน Tool',
          descriptionTh: 'ส่งคำสั่งไปยังโมเดลภาษาและตรวจจับ Tool Call จากการตอบกลับ',
          keyArtifacts: ['Inference API', 'JSON Function Schema'],
        },
        {
          stepNumber: 4,
          buttonLabelTh: 'ขั้นที่ 4: รันใน Sandbox / Subagent',
          titleTh: 'ขั้นที่ 4: รันใน Sandbox / Subagent',
          descriptionTh: 'นำคำสั่งเครื่องมือไปรันในสภาพแวดล้อมแยกเดี่ยว ปลอดภัย หรือส่งต่อให้ Subagent',
          keyArtifacts: ['Isolated Container', 'Subagent Worker'],
        },
        {
          stepNumber: 5,
          buttonLabelTh: 'ขั้นที่ 5: บันทึกทักษะใหม่',
          titleTh: 'ขั้นที่ 5: บันทึกทักษะใหม่',
          descriptionTh: 'แปลงผลลัพธ์การทำงานที่สำเร็จเป็น Procedural Skill เพื่อนำกลับมาใช้ซ้ำ',
          keyArtifacts: ['Skill Catalog', 'Learned Workflows'],
        },
      ],
      contextTiers: [
        {
          id: 'stable',
          name: 'Stable Tier',
          subtitleTh: 'ส่วนระบบคงที่ (System Prompt & Persona)',
          usagePercent: 35,
          badgeText: 'KV Cache Hit 100%',
          retentionTh: 'คงอยู่ตลอดเซสชัน ไม่เปลี่ยนตำแหน่งเพื่อ cache hit สูงสุด',
        },
        {
          id: 'context',
          name: 'Context Tier',
          subtitleTh: 'บริบทงานและทักษะที่เกี่ยวข้อง (Retrieved Skills & Tool Schemas)',
          usagePercent: 30,
          badgeText: 'Dynamic Cache',
          retentionTh: 'โหลดตามบริบทของงานที่ได้รับมอบหมาย',
        },
        {
          id: 'volatile',
          name: 'Volatile Tier',
          subtitleTh: 'ประวัติการสนทนาและการทดลองปัจจุบัน (Recent Turns & Scratchpad)',
          usagePercent: 20,
          badgeText: 'Rolling Window',
          retentionTh: 'หมุนเวียนตัดทอนตามขนาดบริบทที่เหลือ',
        },
        {
          id: 'sqlite-fts5',
          name: 'SQLite FTS5',
          subtitleTh: 'ความจำระยะยาวและดัชนีข้อความแบบเต็ม (Full-Text Search Index)',
          usagePercent: 15,
          badgeText: 'Disk Storage',
          retentionTh: 'บันทึกในฐานข้อมูลพร้อมค้นหาตลอดเวลา',
        },
      ],
      permissionProfiles: [
        {
          mode: 'Smart',
          summaryTh: 'โหมดสิทธิ์อัตโนมัติแบบชาญฉลาด คัดกรองคำสั่งปลอดภัยให้ทำงานได้ทันที',
          readActionPolicyTh: 'อนุมัติคำสั่งอ่านไฟล์อัตโนมัติ โดยไม่ต้องรบกวนผู้ใช้งาน',
          writeCommandPolicyTh: 'แจ้งเตือนและขอการยืนยันสำหรับคำสั่งแก้ไขโค้ดหรือรันเชลล์สคริปต์',
          blocklistPolicyTh: 'บล็อกคำสั่งอันตรายต่อระบบทันที (rm -rf, format, etc.)',
        },
        {
          mode: 'Manual',
          summaryTh: 'โหมดควบคุมด้วยตนเองอย่างเคร่งครัด',
          readActionPolicyTh: 'ถามผู้ใช้ทุกครั้งก่อนรันเครื่องมือ แม้เป็นเพียงการอ่านข้อมูล',
          writeCommandPolicyTh: 'ผู้ใช้ต้องกดอนุมัติการทำงานทุกขั้นตอน',
          blocklistPolicyTh: 'ไม่อนุญาตคำสั่งที่ไม่ได้ระบุไว้ใน allowlist',
        },
        {
          mode: 'Off',
          summaryTh: 'โหมด Sandbox ปลอดภัยสูงสุด ปิดกั้นการเข้าถึงระบบภายนอก',
          readActionPolicyTh: 'จำกัดสิทธิ์อ่านเฉพาะโฟลเดอร์ชั่วคราวใน container',
          writeCommandPolicyTh: 'ไม่อนุญาตให้รันคำสั่งภายนอก sandbox',
          blocklistPolicyTh: 'บล็อกการเชื่อมต่อเน็ตเวิร์กภายนอกทั้งหมด',
        },
      ],
    },
  },
  {
    status: 'upcoming',
    id: createTopicId('mcp-protocol'),
    categoryId: 'ai-agents',
    categoryLabel: 'AI Agents & LLM',
    title: 'Model Context Protocol (MCP)',
    summaryTh: 'มาตรฐานโปรโตคอลสากลสำหรับการเชื่อมต่อโมเดลภาษาเข้ากับเครื่องมือ แหล่งข้อมูล และระบบภายนอก',
    flowPreview: [
      'MCP Server Definition',
      'Client JSON-RPC Negotiation',
      'Resource & Tool Discovery',
    ],
  },
  {
    status: 'upcoming',
    id: createTopicId('docker-sandbox'),
    categoryId: 'system-arch',
    categoryLabel: 'System Architecture',
    title: 'Docker & Sandbox Execution',
    summaryTh: 'การวางโครงสร้าง Container และ Sandbox ปลอดภัยสำหรับการรันโค้ดอัตโนมัติโดย AI Agent',
    flowPreview: [
      'Ephemeral Container Creation',
      'Volume Mount Isolation',
      'Resource & Network Throttling',
    ],
  },
  {
    status: 'upcoming',
    id: createTopicId('react-visual-patterns'),
    categoryId: 'frontend-ui',
    categoryLabel: 'Frontend & React',
    title: 'React Visual Learning Patterns',
    summaryTh: 'เทคนิคการออกแบบสถาปัตยกรรม UI และคอมโพเนนต์สำหรับการสื่อสารแนวคิดทางเทคนิคที่ซับซ้อนให้เข้าใจง่าย',
    flowPreview: [
      'Discriminated Union Models',
      'Interactive Stepper State',
      'Accessible Navigation Controls',
    ],
  },
] as const satisfies readonly LessonTopic[];
