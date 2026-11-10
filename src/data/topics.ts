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
      commandGroups: [
        {
          groupTitleTh: '1. จัดการเซสชัน & ประวัติการสนทนา (Session & History)',
          groupDescriptionTh: 'คำสั่งสำหรับควบคุมบทสนทนา แยกสายความคิด และบีบอัด Context',
          commands: [
            {
              command: '/new [name]',
              aliases: ['/reset'],
              usageTh: '/new my-research หรือ /new now',
              descriptionTh: 'เริ่มเซสชันใหม่ เคลียร์บริบทให้ว่างเปล่า พร้อมตั้งชื่อหัวข้อใหม่ (ใส่ now เพื่อข้ามการกดยืนยัน)',
            },
            {
              command: '/resume [name|id]',
              usageTh: '/resume 7fed7d3e หรือ /resume dev-session',
              descriptionTh: 'เปิดเซสชันเดิมที่เคยคุยค้างไว้กลับมาทำงานต่อ โดยดึงประวัติจากฐานข้อมูล SQLite',
            },
            {
              command: '/sessions',
              usageTh: '/sessions',
              descriptionTh: 'เปิดเมนูแบบ Interactive เพื่อค้นหาและเลือกดูประวัติเซสชันทั้งหมดในระบบ',
            },
            {
              command: '/branch [name]',
              aliases: ['/fork'],
              usageTh: '/branch alternative-approach',
              descriptionTh: 'แตกกิ่งบทสนทนาจากจุดปัจจุบัน เพื่อทดลองแนวทางแก้ปัญหาอื่นโดยไม่กระทบสายเดิม',
            },
            {
              command: '/split [name]',
              usageTh: '/split new-task',
              descriptionTh: 'แตกกิ่งเซสชันและเปิดออกเป็นหน้าต่างเทอร์มินัลใหม่ทันที',
            },
            {
              command: '/undo',
              usageTh: '/undo',
              descriptionTh: 'ยกเลิกข้อความและการเรียกเครื่องมือในรอบล่าสุด (Turn) ออกจากการสนทนา',
            },
            {
              command: '/compress [here [N]]',
              aliases: ['/compact'],
              usageTh: '/compress หรือ /compress here 3',
              descriptionTh: 'สั่งบีบอัดประวัติการสนทนาเก่าเพื่อคืนพื้นที่ Token โดยรักษาข้อความ N รอบล่าสุดไว้ครบถ้วน',
            },
            {
              command: '/handoff <platform>',
              usageTh: '/handoff telegram หรือ /handoff discord',
              descriptionTh: 'โอนย้ายเซสชันการทำงานปัจจุบันไปยังแอปส่งข้อความภายนอกเพื่อคุยต่อผ่านมือถือ',
            },
          ],
        },
        {
          groupTitleTh: '2. ควบคุมงานอัตโนมัติ & Subagents (Execution & Automation)',
          groupDescriptionTh: 'คำสั่งสำหรับตั้งเป้าหมายระยะยาว สั่งวนลูป และกระจายงานตัวลูก',
          commands: [
            {
              command: '/goal <prompt>',
              usageTh: '/goal สร้าง REST API พร้อมเขียน test ทั้งหมด',
              descriptionTh: 'ตั้งเป้าหมายระยะยาวให้ระบบทำงานต่อเนื่องผ่าน Ralph loop จนกว่าจะสำเร็จ (มี /goal pause, resume, clear)',
            },
            {
              command: '/subgoal',
              usageTh: '/subgoal หรือ /subgoal remove 2',
              descriptionTh: 'ตรวจสอบหรือลบเป้าหมายย่อยที่ Agent แตกออกมาจาก /goal หลัก',
            },
            {
              command: '/stop',
              usageTh: '/stop',
              descriptionTh: 'สั่งหยุดการรันเครื่องมือ งานเบื้องหลัง หรือหยุด Subagent ที่กำลังทำงานอยู่ทันที',
            },
            {
              command: '/queue <prompt>',
              aliases: ['/q'],
              usageTh: '/queue ตรวจสอบโค้ดหลังรันเทสต์เสร็จ',
              descriptionTh: 'ต่อคิวคำสั่งให้ทำในรอบถัดไปโดยไม่ขัดจังหวะรอบคำตอบที่กำลังพิมพ์อยู่',
            },
            {
              command: '/loop [interval] <prompt>',
              usageTh: '/loop 5m git pull && npm test',
              descriptionTh: 'สั่งให้รันคำสั่งซ้ำตามช่วงเวลาที่กำหนดอย่างสม่ำเสมอ',
            },
            {
              command: '/background <prompt>',
              aliases: ['/bg'],
              usageTh: '/bg ค้นคว้าเอกสารไลบรารีใหม่',
              descriptionTh: 'แตกงานออกไปรันใน Subagent เบื้องหลัง แยกพื้นที่บริบทไม่ให้รบกวนหน้าต่างหลัก',
            },
            {
              command: '/agents',
              aliases: ['/tasks'],
              usageTh: '/agents',
              descriptionTh: 'แสดงรายการ Subagents และงาน Background tasks ทั้งหมดที่กำลังรันอยู่',
            },
            {
              command: '/steer <instruction>',
              usageTh: '/steer ให้เขียนโค้ดด้วย TypeScript เท่านั้น',
              descriptionTh: 'ส่งคำสั่งแทรกเพื่อปรับทิศทางการคิดของ Agent กลางคันโดยไม่ต้องเริ่มใหม่',
            },
            {
              command: '/btw <question>',
              usageTh: '/btw ฟังก์ชันนี้ใช้หน่วยความจำเท่าไหร่?',
              descriptionTh: 'ถามคำถามแทรกด่วนชั่วคราวโดยไม่บันทึกลงในประวัติแชทหลักและไม่เรียกใช้เครื่องมือ',
            },
          ],
        },
        {
          groupTitleTh: '3. สลับโมเดล & ตั้งค่าระบบ (Models & Configuration)',
          groupDescriptionTh: 'คำสั่งเลือก AI Provider ปรับแต่งความละเอียด และบุคลิกภาพ',
          commands: [
            {
              command: '/model [model-name]',
              usageTh: '/model claude-sonnet-4 หรือ /model --global',
              descriptionTh: 'แสดงชื่อโมเดลปัจจุบัน หรือสลับโมเดลกลางเซสชันได้ทันที (ใส่ --global เพื่อบันทึกลง config.yaml)',
            },
            {
              command: '/models',
              usageTh: '/models',
              descriptionTh: 'เปิดเมนู Interactive ให้เลือกและค้นหาโมเดลจาก 200+ รายการผ่าน Providers ต่าง ๆ',
            },
            {
              command: '/config',
              usageTh: '/config',
              descriptionTh: 'แสดงค่า Configuration ปัจจุบันของระบบ Hermes Agent ทั้งหมด',
            },
            {
              command: '/personality',
              usageTh: '/personality',
              descriptionTh: 'สลับหรือดูบุคลิกภาพที่ตั้งค่าไว้ล่วงหน้าของตัวแทน AI',
            },
            {
              command: '/verbose',
              usageTh: '/verbose',
              descriptionTh: 'สลับระดับการแสดงผลลัพธ์ของเครื่องมือ (วนลูป: off → new → all → verbose)',
            },
          ],
        },
        {
          groupTitleTh: '4. จัดการเครื่องมือ & ทักษะ (Tools, Skills & MCP)',
          groupDescriptionTh: 'คำสั่งเปิด/ปิดเครื่องมือ โหลดทักษะที่ Agent สร้างขึ้น และรีโหลด MCP',
          commands: [
            {
              command: '/tools [list|enable|disable] [name...]',
              usageTh: '/tools list หรือ /tools disable terminal',
              descriptionTh: 'ตรวจสอบรายการเครื่องมือทั้งหมด หรือเปิด/ปิดการใช้งานเฉพาะเครื่องมือในเซสชันนี้',
            },
            {
              command: '/toolsets',
              usageTh: '/toolsets',
              descriptionTh: 'แสดงกลุ่มชุดเครื่องมือที่มีให้ใช้ เช่น terminal, web, skills, browser',
            },
            {
              command: '/skills',
              usageTh: '/skills',
              descriptionTh: 'เปิดหน้าต่างค้นหา ตรวจสอบ ติดตั้ง หรือลบทักษะ Procedural Skills ในเครื่อง',
            },
            {
              command: '/skill <name>',
              usageTh: '/skill code-refactor',
              descriptionTh: 'สั่งโหลดและเรียกใช้งาน Skill ที่ติดตั้งไว้แบบเฉพาะเจาะจง',
            },
            {
              command: '/<skill-name>',
              usageTh: '/refactor หรือ /test-suite',
              descriptionTh: 'เรียกใช้ Skill โดยตรงเหมือนคำสั่งประจำตัว (ทุก Skill จะสร้าง Slash command ของตัวเองอัตโนมัติ)',
            },
            {
              command: '/reload-skills',
              usageTh: '/reload-skills',
              descriptionTh: 'สแกนโฟลเดอร์และโหลดทักษะที่ Agent หรือผู้ใช้เพิ่งสร้างใหม่เข้าสู่ระบบทันที',
            },
            {
              command: '/reload-mcp',
              usageTh: '/reload-mcp',
              descriptionTh: 'ล้างแคชและเชื่อมต่อกับเซิร์ฟเวอร์ Model Context Protocol (MCP) ภายนอกใหม่อีกครั้ง',
            },
            {
              command: '/browser [connect|disconnect|status]',
              usageTh: '/browser status หรือ /browser connect',
              descriptionTh: 'ควบคุมการเชื่อมต่อกับเว็บเบราว์เซอร์ Chromium ในเครื่องสำหรับงาน Automation',
            },
          ],
        },
        {
          groupTitleTh: '5. ตรวจสอบสถานะ & ค่าใช้จ่าย (Status, Info & Inspection)',
          groupDescriptionTh: 'คำสั่งเช็ค Token ค่าบริการ ความจำ และรายงานระบบ',
          commands: [
            {
              command: '/help [topic]',
              usageTh: '/help หรือ /help model',
              descriptionTh: 'เปิดคู่มือช่วยเหลือและคำอธิบายคำสั่งแต่ละประเภท',
            },
            {
              command: '/status',
              usageTh: '/status',
              descriptionTh: 'แสดงสถานะการทำงาน ขนาดของ Context Window ปัจจุบัน และจำนวน Token ที่ใช้ไป',
            },
            {
              command: '/usage',
              aliases: ['/cost'],
              usageTh: '/usage หรือ /cost',
              descriptionTh: 'แสดงสถิติการใช้งาน Token อย่างละเอียด พร้อมคำนวณค่าบริการ (USD) และโควตาที่เหลือ',
            },
            {
              command: '/journey',
              usageTh: '/journey',
              descriptionTh: 'แสดงไทม์ไลน์การเรียนรู้ ประสบการณ์ ความจำ และทักษะใหม่ที่ Agent สรุปสะสมไว้ตลอดเวลา',
            },
            {
              command: '/history',
              usageTh: '/history',
              descriptionTh: 'พิมพ์ประวัติบทสนทนาและผลลัพธ์ของเครื่องมือย้อนหลังออกมาทั้งหมด',
            },
            {
              command: '/whoami',
              usageTh: '/whoami',
              descriptionTh: 'แสดงระดับสิทธิ์การเข้าถึงของผู้ใช้ปัจจุบัน (admin / user)',
            },
            {
              command: '/gateway',
              usageTh: '/gateway',
              descriptionTh: 'ตรวจสอบสถานะการเชื่อมต่อของ Messaging Gateway กับแพลตฟอร์มต่าง ๆ (Telegram, Discord ฯลฯ)',
            },
          ],
        },
        {
          groupTitleTh: '6. เครื่องมือเสริมในเทอร์มินัล & ออกจากโปรแกรม (CLI Helpers & Exit)',
          groupDescriptionTh: 'คีย์ลัด คัดลอกข้อความ แนบรูปภาพ และการปิดเซสชัน',
          commands: [
            {
              command: '/copy [N]',
              usageTh: '/copy หรือ /copy 2',
              descriptionTh: 'คัดลอกคำตอบล่าสุดของ Agent (หรือคำตอบที่ N ย้อนหลัง) ลง Clipboard ของระบบ',
            },
            {
              command: '/image <path>',
              usageTh: '/image ./screenshot.png',
              descriptionTh: 'แนบไฟล์รูปภาพในเครื่องส่งไปพร้อมกับข้อความถัดไปให้โมเดลวิเคราะห์',
            },
            {
              command: '/palette หรือ Ctrl+P',
              usageTh: 'กด Ctrl+P หรือพิมพ์ /palette',
              descriptionTh: 'เปิดหน้าต่างค้นหาคำสั่งและทักษะทั้งหมดแบบ Fuzzy Search คล้าย Command Palette ใน VS Code',
            },
            {
              command: '/clear',
              usageTh: '/clear',
              descriptionTh: 'เคลียร์หน้าจอเทอร์มินัลให้โล่ง สะอาดตา',
            },
            {
              command: '/quit',
              aliases: ['/exit'],
              usageTh: '/quit หรือ /quit --delete',
              descriptionTh: 'ออกจากโปรแกรม CLI (ใส่ --delete หากต้องการลบข้อมูลเซสชันนี้ทิ้งจากฐานข้อมูล state.db)',
            },
          ],
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
