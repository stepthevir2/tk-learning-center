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
    status: 'ready',
    id: createTopicId('mcp-protocol'),
    categoryId: 'ai-agents',
    categoryLabel: 'AI Agents & LLM',
    title: 'Model Context Protocol (MCP) ไกด์ฉบับเห็นภาพจริง',
    summaryTh:
      'เจาะลึกมาตรฐานเปิดสากล MCP: สถาปัตยกรรม Host, Client, Server, ระบบ 3 เสาหลัก (Tools, Resources, Prompts), การสื่อสารผ่าน JSON-RPC 2.0 (stdio / SSE) และความปลอดภัย',
    flowPreview: [
      'Client & Server Handshake',
      'Tool & Resource Discovery',
      'JSON-RPC Tool Invocation',
    ],
    content: {
      headlineTh:
        'Model Context Protocol (MCP) ทำงานอย่างไร? (มาตรฐานเชื่อมต่อ LLM ยุคใหม่)',
      introTh:
        'ก่อนหน้านี้ การทำให้ AI เข้าถึงไฟล์ ฐานข้อมูล หรือเครื่องมือภายนอก ต้องเขียนโค้ดเชื่อมต่อเฉพาะของแต่ละค่าย (N x M integrations) Model Context Protocol (MCP) คือมาตรฐานโปรโตคอลเปิดระดับสากลจาก Anthropic ที่ทำหน้าที่เปรียบเสมือน "พอร์ต USB-C สำหรับ AI" ทำให้โมเดลภาษาจากทุกค่ายเชื่อมต่อกับเครื่องมือและแหล่งข้อมูลใดก็ได้ผ่านโปรโตคอลเดียว',
      pillars: [
        {
          titleTh: '1. Universal Open Standard (มาตรฐานเปิดเชื่อมต่อแบบ N:1:M)',
          descriptionTh:
            'นักพัฒนาสร้าง MCP Server สำหรับบริการตนเองเพียงครั้งเดียว (เช่น GitHub, SQLite, Google Drive) แล้ว AI Host ทุกตัว (เช่น Claude, Hermes, VS Code) จะสามารถตรวจพบและใช้งานได้ทันที',
        },
        {
          titleTh: '2. Three Core Primitives (Tools, Resources, Prompts)',
          descriptionTh:
            'MCP แบ่งความสามารถออกเป็น 3 ชนิดชัดเจน: Tools (ฟังก์ชันที่สั่งรันได้), Resources (ข้อมูลและเอกสารที่เปิดอ่านได้เหมือนไฟล์หรือ URI), และ Prompts (เทมเพลตคำสั่งสำเร็จรูปจากเซิร์ฟเวอร์)',
        },
        {
          titleTh: '3. Secure JSON-RPC 2.0 Transport (stdio & SSE)',
          descriptionTh:
            'การส่งข้อความมีโครงสร้างมาตรฐาน JSON-RPC 2.0 เชื่อมต่อแบบ Local Process ผ่าน stdio หรือผ่านเครือข่ายด้วย Server-Sent Events (SSE) พร้อมระบบ Security Boundaries ที่ควบคุมสิทธิ์ผู้ใช้เสมอ',
        },
      ],
      layers: [
        {
          id: 'entry-routing',
          codeLabel: 'LAYER 01 • MCP HOST APPLICATION',
          titleTh: '1. แอปพลิเคชันโฮสต์และส่วนติดต่อผู้ใช้ (MCP Host)',
          subtitleTh: 'Claude Desktop, Hermes Agent CLI, T3 Code และ IDEs',
          files: ['mcp_config.json', 'client_manager.py', 'settings.json'],
          highlightsTh: [
            '<strong>บทบาทของ Host:</strong> เป็นตัวกลางที่คอยประสานงานระหว่างผู้ใช้, โมเดลภาษา LLM, และ MCP Servers ที่ต่อพ่วงอยู่',
            '<strong>Configuration File:</strong> กำหนดรายชื่อ MCP Server ที่ต้องการเปิดใช้งาน พร้อมวิธีรัน (เช่น command: "npx -y @modelcontextprotocol/server-sqlite") และ Environment Variables',
            '<strong>Security Gatekeeper:</strong> Host เป็นผู้ถือสิทธิ์เด็ดขาดในการถามผู้ใช้ (Human-in-the-loop) ก่อนยอมให้ส่งคำสั่งไปรันบน Server',
          ],
        },
        {
          id: 'core-loop',
          codeLabel: 'LAYER 02 • MCP CLIENT ENGINE',
          titleTh: '2. ตัวจัดการโปรโตคอลและการเจรจาสิทธิ์ (MCP Client)',
          subtitleTh: 'Handshake, Capabilities Negotiation & Schema Validation',
          files: ['mcp/client.py', 'jsonrpc_parser.ts', 'capabilities.ts'],
          highlightsTh: [
            '<strong>Lifecycle Handshake:</strong> เริ่มต้นด้วยเมธอด initialize เพื่อตกลงเวอร์ชันโปรโตคอลและระบุว่า Client และ Server รองรับฟีเจอร์ใดบ้าง',
            '<strong>Discovery & Registry:</strong> ส่งคำขอ tools/list และ resources/list แล้วนำ JSON Schema ของเครื่องมือไปแปลงเป็น Function Calling ให้ LLM เข้าใจ',
            '<strong>JSON-RPC 2.0 Engine:</strong> จัดการ Request ID, Error Handling และการจับคู่คำตอบแบบ Asynchronous',
          ],
        },
        {
          id: 'tools-sandboxes',
          codeLabel: 'LAYER 03 • TRANSPORT PIPELINE',
          titleTh: '3. ท่อลำเลียงข้อมูลระหว่างโพรเซส (Transport Layer)',
          subtitleTh: 'stdio (Standard Input/Output) และ HTTP with SSE',
          files: [
            'StdioServerTransport',
            'SSEServerTransport',
            'WebSocketTransport',
          ],
          highlightsTh: [
            '<strong>stdio Transport:</strong> รัน Server เป็น Subprocess ในเครื่องเดียวกัน สื่อสารผ่าน stdin/stdout มีความปลอดภัยสูงสุดเพราะไม่เปิดพอร์ตเครือข่าย',
            '<strong>SSE (Server-Sent Events):</strong> ใช้ HTTP สำหรับเชื่อมต่อไปยัง Remote MCP Server บนคลาวด์ โดย Server สตรีมข้อมูลกลับมาทาง SSE stream',
            '<strong>Message Framing:</strong> ตรวจสอบความสมบูรณ์ของแพ็กเกจข้อความ JSON ที่ไหลผ่านท่ออย่างแม่นยำ',
          ],
        },
        {
          id: 'memory-skills',
          codeLabel: 'LAYER 04 • MCP SERVERS & CAPABILITIES',
          titleTh: '4. ปลายทางผู้ให้บริการข้อมูลและเครื่องมือ (MCP Servers)',
          subtitleTh: 'SQLite, File System, Git, Fetch API, Postgres, Docker',
          files: ['server.py', 'tools_handler.ts', 'resource_provider.py'],
          highlightsTh: [
            '<strong>Tools:</strong> ฟังก์ชันที่คอมพิวเตอร์รันได้จริง เช่น read_file, execute_sql, search_web มี inputSchema ระบุพารามิเตอร์ชัดเจน',
            '<strong>Resources:</strong> แหล่งข้อมูลที่มี URI เฉพาะ เช่น file:///logs/app.log หรือ postgres://db/users ให้ Agent ดึงมาเป็นบริบทในการคิด',
            '<strong>Prompts:</strong> พรอมต์สำเร็จรูปที่เขียนจากฝั่ง Server เช่น /git-review-commit ที่เตรียมคำสั่งให้โมเดลทำงานได้อย่างแม่นยำ',
          ],
        },
      ],
      workflowSteps: [
        {
          stepNumber: 1,
          buttonLabelTh: 'ขั้นที่ 1: เชื่อมต่อ & Handshake',
          titleTh:
            'ขั้นที่ 1: เริ่มต้นโปรเซสและเจรจาความสามารถ (Protocol Handshake)',
          descriptionTh:
            'Host เปิด Subprocess ของ Server และ Client ส่ง JSON-RPC request "initialize" พร้อมแจ้ง capabilities ของตน Server ตอบกลับยืนยันเวอร์ชันและฟีเจอร์ที่รองรับ',
          keyArtifacts: [
            '{"method": "initialize"}',
            'protocolVersion: "2024-11-05"',
            'serverInfo',
          ],
        },
        {
          stepNumber: 2,
          buttonLabelTh: 'ขั้นที่ 2: ดึงคลัง Tool & Resource',
          titleTh:
            'ขั้นที่ 2: สำรวจรายการเครื่องมือและแหล่งข้อมูล (Discovery Phase)',
          descriptionTh:
            'Client ส่งคำขอ "tools/list", "resources/list" และ "prompts/list" เพื่อรับรายการฟังก์ชันทั้งหมดพร้อมคำอธิบายและ JSON Schema พารามิเตอร์',
          keyArtifacts: [
            'tools/list',
            'resources/list',
            'Tool Parameter JSONSchema',
          ],
        },
        {
          stepNumber: 3,
          buttonLabelTh: 'ขั้นที่ 3: LLM เลือกใช้เครื่องมือ',
          titleTh:
            'ขั้นที่ 3: โมเดลภาษาประเมินบริบทและตัดสินใจเรียก Tool (Tool Selection)',
          descriptionTh:
            'เมื่อผู้ใช้สั่งงาน โมเดลภาษา (LLM) อ่านคำอธิบาย Tool ในบริบท แล้วส่ง JSON Tool Call ระบุชื่อฟังก์ชันและค่าพารามิเตอร์ที่ต้องการส่งไปรัน',
          keyArtifacts: [
            'LLM Function Calling JSON',
            'tool_name: "query_database"',
            'arguments: {...}',
          ],
        },
        {
          stepNumber: 4,
          buttonLabelTh: 'ขั้นที่ 4: รันคำสั่งผ่าน tools/call',
          titleTh:
            'ขั้นที่ 4: ตรวจสอบความปลอดภัยและสั่งรันโค้ดจริง (Execution Phase)',
          descriptionTh:
            'Host ตรวจสอบสิทธิ์ (ขอความยินยอมจากผู้ใช้หากจำเป็น) แล้ว Client ส่งคำสั่ง {"method": "tools/call", "params": {...}} ไปยัง Server เพื่อรันคำสั่งจริง',
          keyArtifacts: [
            'tools/call Request',
            'User Consent Prompt',
            'Server Execution Runtime',
          ],
        },
        {
          stepNumber: 5,
          buttonLabelTh: 'ขั้นที่ 5: คืนผลลัพธ์สู่ LLM',
          titleTh:
            'ขั้นที่ 5: ส่งข้อมูลผลลัพธ์กลับสู่บริบทของโมเดล (Context Integration)',
          descriptionTh:
            'Server ส่งผลลัพธ์กลับมาในรูป text หรือ image Client นำผลลัพธ์นี้ยัดกลับเข้าไปในข้อความสนทนา เพื่อให้ LLM ใช้วิเคราะห์และสรุปคำตอบสุดท้ายให้ผู้ใช้',
          keyArtifacts: [
            'content: [{"type": "text", "text": "..."}]',
            'Assistant Final Summary',
          ],
        },
      ],
      contextTiers: [
        {
          id: 'tool-schemas',
          name: 'Tool Schema Context',
          subtitleTh: 'JSON Schema นิยามฟังก์ชันและชนิดข้อมูลพารามิเตอร์',
          usagePercent: 90,
          badgeText: 'tools/list',
          retentionTh:
            'โหลดเข้า System Prompt เสมอเพื่อให้โมเดลรู้ว่ามีเครื่องมืออะไรบ้าง',
        },
        {
          id: 'resource-cache',
          name: 'Dynamic Resource Subscriptions',
          subtitleTh:
            'การอ่านและติดตามการแก้ไขไฟล์หรือฐานข้อมูลแบบเรียลไทม์',
          usagePercent: 65,
          badgeText: 'resources/read',
          retentionTh: 'โหลดเฉพาะเมื่อโมเดลร้องขอไฟล์หรือ URI ที่ระบุ',
        },
        {
          id: 'prompt-catalog',
          name: 'Server-Provided Prompt Templates',
          subtitleTh: 'แม่แบบคำถามที่เซิร์ฟเวอร์เตรียมไว้ล่วงหน้า',
          usagePercent: 40,
          badgeText: 'prompts/get',
          retentionTh: 'ดึงมาใช้งานเมื่อผู้ใช้พิมพ์คำสั่งลัดหรือ Slash Command',
        },
        {
          id: 'transport-buffer',
          name: 'JSON-RPC Stdio Stream Buffer',
          subtitleTh: 'บัฟเฟอร์การส่งผ่านข้อมูลดิบระหว่างโพรเซส',
          usagePercent: 80,
          badgeText: 'stdin / stdout pipe',
          retentionTh: 'ประมวลผลทันทีและคืนหน่วยความจำเมื่อข้อความจบ',
        },
      ],
      permissionProfiles: [
        {
          mode: 'Smart',
          summaryTh:
            'โหมด Granular Policy: อ่านข้อมูลอัตโนมัติ แต่คำสั่งที่มีผลต่อระบบต้องยืนยัน',
          readActionPolicyTh:
            'อนุญาตให้เข้าถึง Resources และรันเครื่องมือประเภท Read-only (เช่น ค้นหาไฟล์, อ่านข้อมูล) ได้ทันทีโดยไม่รบกวนผู้ใช้',
          writeCommandPolicyTh:
            'เมื่อเครื่องมือจะแก้ไขไฟล์, ลบฐานข้อมูล หรือส่งข้อมูลออกนอกระบบ Host จะเด้งหน้าต่างถามการยืนยันจากผู้ใช้ก่อนเสมอ',
          blocklistPolicyTh:
            'ห้ามรันคำสั่งเชลล์อันตรายนอกขอบเขตไดเรกทอรีที่ได้รับอนุญาต',
        },
        {
          mode: 'Manual',
          summaryTh:
            'โหมด Strict Confirmation: ถามผู้ใช้ทุกครั้งก่อนเรียกใช้เครื่องมือใดๆ',
          readActionPolicyTh:
            'แม้กระทั่งการอ่านไฟล์หรือค้นหาเอกสาร ก็ต้องให้ผู้ใช้กด Approve ทุกครั้ง เหมาะสำหรับงานความลับสูง',
          writeCommandPolicyTh:
            'แสดงรายละเอียดของพารามิเตอร์ทั้งหมดในรูปแบบ JSON ให้ผู้ใช้ตรวจสอบก่อนกดยืนยันการรัน',
          blocklistPolicyTh:
            'บล็อกการทำงานเบื้องหลังอัตโนมัติทั้งหมด ทุกการกระทำต้องผ่านสายตามนุษย์',
        },
        {
          mode: 'Off',
          summaryTh:
            'โหมด Autonomous Sandbox: รันอัตโนมัติเต็มรูปแบบในสภาพแวดล้อมจำกัด',
          readActionPolicyTh:
            'เปิดให้อ่านข้อมูลทั้งหมดในเครื่องมือที่เชื่อมต่อได้อย่างอิสระ',
          writeCommandPolicyTh:
            'Agent สามารถเรียก Tool และทำงานต่อเนื่องได้ด้วยตนเอง เหมาะสำหรับงานทดสอบในเครื่องเสมือนหรือตู้คอนเทนเนอร์ปิด',
          blocklistPolicyTh:
            'จำกัดขอบเขตด้วยสิทธิ์ของผู้ใช้ในระบบปฏิบัติการ (OS-level user permissions)',
        },
      ],
      commandGroups: [
        {
          groupTitleTh:
            '1. เมธอดหลักตามมาตรฐาน JSON-RPC 2.0 (MCP Protocol Methods)',
          groupDescriptionTh:
            'เมธอดมาตรฐานที่ Client และ Server ใช้สื่อสารกันผ่านท่อ stdio หรือ HTTP',
          commands: [
            {
              command: 'initialize',
              usageTh:
                '{"jsonrpc": "2.0", "method": "initialize", "params": {...}}',
              descriptionTh:
                'เมธอดแรกที่ Client ส่งไปเจรจาเวอร์ชันโปรโตคอลและแลกเปลี่ยนความสามารถกับ Server',
            },
            {
              command: 'tools/list',
              usageTh: '{"jsonrpc": "2.0", "method": "tools/list"}',
              descriptionTh:
                'ร้องขอรายชื่อเครื่องมือทั้งหมดที่ Server มี พร้อมคำอธิบายและ JSON Schema ของอาร์กิวเมนต์',
            },
            {
              command: 'tools/call',
              usageTh:
                '{"jsonrpc": "2.0", "method": "tools/call", "params": {"name": "read_file", "arguments": {"path": "..."}}}',
              descriptionTh:
                'ส่งคำสั่งเรียกใช้งานเครื่องมือที่ระบุ พร้อมส่งค่าพารามิเตอร์ไปให้ Server ดำเนินการ',
            },
            {
              command: 'resources/list',
              usageTh: '{"jsonrpc": "2.0", "method": "resources/list"}',
              descriptionTh:
                'ร้องขอรายชื่อแหล่งข้อมูลทั้งหมด (Resources) เช่น ไฟล์, เอกสาร หรือตารางฐานข้อมูลที่เปิดให้อ่าน',
            },
            {
              command: 'resources/read',
              usageTh:
                '{"jsonrpc": "2.0", "method": "resources/read", "params": {"uri": "file:///path/to/file"}}',
              descriptionTh:
                'ส่ง URI ไปขออ่านเนื้อหาของ Resource นั้นๆ จากเซิร์ฟเวอร์',
            },
            {
              command: 'prompts/list & prompts/get',
              usageTh:
                '{"jsonrpc": "2.0", "method": "prompts/get", "params": {"name": "analyze_code"}}',
              descriptionTh:
                'เรียกดูและดึงเทมเพลตคำสั่งสำเร็จรูปที่เซิร์ฟเวอร์เตรียมไว้มาใช้งาน',
            },
          ],
        },
        {
          groupTitleTh:
            '2. การตั้งค่าคอนฟิกและการเชื่อมต่อ (Host Configuration & CLI)',
          groupDescriptionTh:
            'การระบุรายชื่อ MCP Servers ในไฟล์คอนฟิกของแอปพลิเคชัน Host',
          commands: [
            {
              command:
                'mcpServers: { "sqlite": { "command": "npx", "args": [...] } }',
              usageTh:
                'ใส่ใน config.json ของ Host เพื่อสั่งเปิด MCP Server อัตโนมัติ',
              descriptionTh:
                'โครงสร้าง JSON มาตรฐานสำหรับกำหนดโปรแกรมคำสั่งและอาร์กิวเมนต์ที่ Host จะใช้เรียกเปิด Server ผ่าน stdio',
            },
            {
              command: 'npx @modelcontextprotocol/inspector',
              usageTh:
                'npx @modelcontextprotocol/inspector <command-to-run-server>',
              descriptionTh:
                'เปิดเว็บเบราว์เซอร์หน้าต่าง DevTools สำหรับทดสอบยิงเมธอด MCP, ตรวจสอบ Tools และดีบั๊ก Server แบบ Interactive',
            },
            {
              command: 'fastmcp (Python SDK)',
              usageTh: 'from fastmcp import FastMCP; mcp = FastMCP("demo")',
              descriptionTh:
                'ไลบรารี Python สำหรับสร้าง MCP Server อย่างรวดเร็ว เพียงใส่ decorator @mcp.tool() บนฟังก์ชันปกติ',
            },
          ],
        },
      ],
    },
  },
  {
    status: 'ready',
    id: createTopicId('docker-sandbox'),
    categoryId: 'system-arch',
    categoryLabel: 'System Architecture',
    title: 'Docker & Sandbox Execution (รันโค้ดอัตโนมัติอย่างปลอดภัย)',
    summaryTh:
      'สถาปัตยกรรมการวางระบบ Sandbox สำหรับ AI Agent: การสร้าง Ephemeral Container, การจำกัด Resource (cgroups), การกักขัง Filesystem และ Network Isolation ป้องกันไม่ให้เครื่อง Host เสียหาย',
    flowPreview: [
      'Ephemeral Container Spawning',
      'Volume Mount & Net Isolation',
      'cgroups Limits & Destruction',
    ],
    content: {
      headlineTh:
        'Docker & Sandbox ทำงานอย่างไร? (ระบบรันโค้ดอัตโนมัติที่ปลอดภัย)',
      introTh:
        'เมื่อ AI Agent ต้องเขียนและรันคำสั่งเชลล์ สคริปต์ Python หรือติดตั้งแพ็กเกจด้วยตนเอง หากปล่อยให้รันบนเครื่อง Host โดยตรง ย่อมเสี่ยงต่อการลบไฟล์สำคัญ หลุดขโมยข้อมูล หรือติดมัลแวร์ ระบบ Sandbox บน Docker จึงถูกนำมาใช้เพื่อกักขังการทำงานไว้ในคอนเทนเนอร์ชั่วคราว (Ephemeral Container) ที่แยกตัวออกจากเครื่องหลักอย่างเด็ดขาดและทำลายทิ้งได้ทันทีหลังเสร็จงาน',
      pillars: [
        {
          titleTh: '1. Ephemeral & Disposable Containers (ใช้แล้วทิ้ง)',
          descriptionTh:
            'ทุกภารกิจจะรันในคอนเทนเนอร์ที่สร้างขึ้นใหม่ เมื่อทำงานเสร็จจะถูกทำลายทิ้งทันที (docker run --rm) ทำให้สภาพแวดล้อมสะอาดและไม่มีสถานะตกค้างไปรบกวนภารกิจถัดไป',
        },
        {
          titleTh:
            '2. Multi-Layer Kernel Isolation (cgroups, namespaces, seccomp)',
          descriptionTh:
            'จำกัดทรัพยากรด้วย cgroups ป้องกันโค้ดวนลูปจน CPU 100% หรือกินแรมจนเครื่องค้าง พร้อมบล็อก System Calls อันตรายด้วย seccomp profile และปิดสิทธิ์ Root',
        },
        {
          titleTh:
            '3. Controlled Workdir Bridging (กักขังพื้นที่ไฟล์และเน็ตเวิร์ก)',
          descriptionTh:
            'แชร์เฉพาะโฟลเดอร์โปรเจกต์เข้าไปในคอนเทนเนอร์ผ่าน Volume Mount เพื่อไม่ให้ Agent แอบอ่านโฟลเดอร์ส่วนตัวของ Host และตัดการเชื่อมต่ออินเทอร์เน็ต (--network none) หากไม่จำเป็น',
        },
      ],
      layers: [
        {
          id: 'entry-routing',
          codeLabel: 'LAYER 01 • AGENT ORCHESTRATION',
          titleTh: '1. ตัวควบคุมและจัดคิวงาน Sandbox (Sandbox Manager)',
          subtitleTh:
            'Agent Runtime, Process Dispatcher และ Execution Timeout Watcher',
          files: [
            'sandbox_manager.py',
            'docker_runner.ts',
            'agent/executor.py',
          ],
          highlightsTh: [
            '<strong>Task Wrapping:</strong> รับคำสั่งเชลล์จาก Agent แล้วนำมาห่อหุ้มด้วย Docker CLI flags ที่ปลอดภัยก่อนส่งไปรัน',
            '<strong>Timeout Guard:</strong> ตั้งเวลานับถอยหลัง (เช่น 60 วินาที) หากคำสั่งรันนานเกินไปจะส่งสัญญาณ SIGKILL ทำลายคอนเทนเนอร์ทันที',
            '<strong>Stream Capture:</strong> ดักจับเอาต์พุตทั้ง stdout, stderr และ exit code ส่งกลับมาให้ Agent วิเคราะห์',
          ],
        },
        {
          id: 'core-loop',
          codeLabel: 'LAYER 02 • DOCKER RUNTIME ENGINE',
          titleTh: '2. เอนจินรันคอนเทนเนอร์ (Docker Engine & containerd)',
          subtitleTh:
            'Image Management, Container Lifecycle และ Bridge Network',
          files: ['dockerd', 'containerd', 'runc', '/var/run/docker.sock'],
          highlightsTh: [
            '<strong>Base Images:</strong> ใช้ Image ขนาดเล็กที่ปลอดภัย เช่น alpine, python:3.11-slim, node:20-alpine ที่ไม่มีโปรแกรมส่วนเกิน',
            '<strong>Fast Spawning:</strong> สร้างและเปิดคอนเทนเนอร์พร้อมรันคำสั่งได้ภายในเสี้ยววินาทีด้วย runc',
            '<strong>Status Tracking:</strong> ตรวจสอบสถานะการทำงาน หน่วยความจำที่ใช้ และการตรวจจับ OOM (Out Of Memory)',
          ],
        },
        {
          id: 'tools-sandboxes',
          codeLabel: 'LAYER 03 • KERNEL SECURITY GUARDS',
          titleTh:
            '3. กลไกความปลอดภัยระดับเคอร์เนลลินุกซ์ (Linux Kernel Isolation)',
          subtitleTh:
            'cgroups v2, Namespaces, AppArmor, seccomp และ User ID Mapping',
          files: [
            '/sys/fs/cgroup/',
            'seccomp.json',
            'capabilities(7)',
            'namespaces(7)',
          ],
          highlightsTh: [
            '<strong>cgroups v2:</strong> ควบคุมเพดานการใช้ทรัพยากร เช่น --memory=512m --cpus=1.0 ป้องกันปัญหา Fork Bomb หรือ Memory Leak',
            '<strong>Namespaces (PID, Mount, Net):</strong> จำลองให้คอนเทนเนอร์เห็นว่ามีเพียงตัวมันเองในระบบ ไม่เห็น Process อื่นของเครื่อง Host',
            '<strong>Cap Drop & Non-root:</strong> ปลดความสามารถพิเศษของ Root ทิ้งด้วย --cap-drop ALL และรันด้วยสิทธิ์ผู้ใช้ธรรมดา (--user 1000:1000)',
          ],
        },
        {
          id: 'memory-skills',
          codeLabel: 'LAYER 04 • ISOLATED GUEST ENVIRONMENT',
          titleTh:
            '4. สภาพแวดล้อมเสมือนภายในคอนเทนเนอร์ (Guest Workspace)',
          subtitleTh:
            'Read-only Rootfs, /tmp tmpfs, และ /workspace Volume Mount',
          files: [
            '/workspace',
            '/tmp (tmpfs in RAM)',
            '/etc/passwd (read-only)',
          ],
          highlightsTh: [
            '<strong>Read-only Root Filesystem:</strong> โฟลเดอร์ระบบของคอนเทนเนอร์เปิดแบบอ่านได้อย่างเดียว (--read-only) ป้องกันการฝังไฟล์อันตราย',
            '<strong>RAM-based /tmp:</strong> ให้เขียนไฟล์ชั่วคราวได้เฉพาะบน RAM (tmpfs) ซึ่งจะระเหยหายไปทันทีเมื่อดับคอนเทนเนอร์',
            '<strong>Volume Mount:</strong> เชื่อมเฉพาะโฟลเดอร์งานเข้ามาที่ /workspace เท่านั้น ไม่สามารถทะลุออกไปโฟลเดอร์อื่นของเครื่องหลักได้',
          ],
        },
      ],
      workflowSteps: [
        {
          stepNumber: 1,
          buttonLabelTh: 'ขั้นที่ 1: กำหนดสเปก & สั่งสร้าง',
          titleTh:
            'ขั้นที่ 1: ตรวจสอบคำสั่งและเปิดคอนเทนเนอร์ชั่วคราว (Ephemeral Provisioning)',
          descriptionTh:
            'Agent รับโค้ดที่จะรัน แล้วออกคำสั่ง docker run พร้อมแฟล็กควบคุมความปลอดภัยครบถ้วน เช่น --rm, --memory=512m, --network=none',
          keyArtifacts: [
            'docker run --rm -it',
            '--memory=512m --cpus=1.0',
            '--read-only',
          ],
        },
        {
          stepNumber: 2,
          buttonLabelTh: 'ขั้นที่ 2: ผูกเฉพาะโฟลเดอร์งาน',
          titleTh:
            'ขั้นที่ 2: เชื่อมต่อพื้นที่จัดเก็บข้อมูลแบบจำกัด (Workspace Mounting)',
          descriptionTh:
            'ทำการ Volume Mount เฉพาะโฟลเดอร์โปรเจกต์ของงานนั้นเข้าไปที่ /workspace โดยไม่อนุญาตให้เข้าถึง Home directory หรือไฟล์ระบบของ Host',
          keyArtifacts: [
            '-v /path/to/project:/workspace',
            '-w /workspace',
            '--user 1000:1000',
          ],
        },
        {
          stepNumber: 3,
          buttonLabelTh: 'ขั้นที่ 3: รันโค้ด & สตรีมผลลัพธ์',
          titleTh:
            'ขั้นที่ 3: ปฏิบัติการรันคำสั่งและดักจับสัญญาณ (Execution & Output Streaming)',
          descriptionTh:
            'รันสคริปต์ในคอนเทนเนอร์ ดักจับข้อมูลผลลัพธ์ stdout และ stderr ส่งกลับมาแบบเรียลไทม์ พร้อมติดตามสถานะ exit code',
          keyArtifacts: [
            'stdout & stderr capture',
            'exit code 0/1',
            'Runtime Execution Watcher',
          ],
        },
        {
          stepNumber: 4,
          buttonLabelTh: 'ขั้นที่ 4: เฝ้าระวัง OOM & Timeout',
          titleTh:
            'ขั้นที่ 4: ตรวจจับเหตุการณ์ผิดปกติและการใช้ทรัพยากรเกิน (Quota Enforcement)',
          descriptionTh:
            'เคอร์เนลลินุกซ์คอยจับตาดู หากโปรแกรมกินแรมเกิน 512MB จะสั่ง OOM Killer ตัดกระบวนการทันที หรือหากค้างเกินเวลาระบบจะสั่ง docker stop',
          keyArtifacts: [
            'OOMKilled: true',
            'SIGTERM / SIGKILL',
            'Timeout Exception',
          ],
        },
        {
          stepNumber: 5,
          buttonLabelTh: 'ขั้นที่ 5: สั่งทำลายทิ้งทันที',
          titleTh:
            'ขั้นที่ 5: ทำลายคอนเทนเนอร์และคืนสถานะสะอาด (Clean Destruction & Teardown)',
          descriptionTh:
            'เนื่องจากมีแฟล็ก --rm เมื่อกระบวนการเสร็จสิ้น คอนเทนเนอร์จะถูกลบทิ้งจากระบบทันที เหลือไว้เฉพาะไฟล์ผลลัพธ์งานใน /workspace บนเครื่อง Host',
          keyArtifacts: [
            'Container Auto-Removal (--rm)',
            'Zero Residue State',
            'Host Workspace Preserved',
          ],
        },
      ],
      contextTiers: [
        {
          id: 'image-cache',
          name: 'Immutable Base Image Cache',
          subtitleTh: 'อิมเมจระบบปฏิบัติการตั้งต้นที่ไม่มีการเปลี่ยนแปลง',
          usagePercent: 90,
          badgeText: 'alpine / python-slim',
          retentionTh: 'เก็บใน Host Docker Storage แคชไว้ใช้ซ้ำได้ทันที',
        },
        {
          id: 'overlay-layer',
          name: 'Ephemeral Container OverlayFS',
          subtitleTh: 'เลเยอร์ไฟล์ชั่วคราวขณะรันคอนเทนเนอร์',
          usagePercent: 50,
          badgeText: 'Disposable Layer',
          retentionTh: 'ถูกลบทิ้ง 100% ทันทีที่คอนเทนเนอร์หยุดทำงาน',
        },
        {
          id: 'volume-workspace',
          name: 'Shared Project Volume (/workspace)',
          subtitleTh: 'พื้นที่ทำงานจริงที่บันทึกซอร์สโค้ดและผลงาน',
          usagePercent: 95,
          badgeText: 'Host Mounted Directory',
          retentionTh:
            'คงอยู่ถาวรบนเครื่อง Host แม้คอนเทนเนอร์จะถูกทำลายไปแล้ว',
        },
        {
          id: 'kernel-cgroups',
          name: 'Linux cgroups Resource Quotas',
          subtitleTh:
            'ตัวเลขโควต้าหน่วยความจำและ CPU ที่ระบบจัดสรรให้',
          usagePercent: 75,
          badgeText: 'Memory 512M / CPU 1.0',
          retentionTh:
            'ควบคุมระดับฮาร์ดแวร์โดยเคอร์เนลลินุกซ์ตลอดเวลาที่รัน',
        },
      ],
      permissionProfiles: [
        {
          mode: 'Smart',
          summaryTh:
            'โหมด Filtered Network: อนุญาตให้ออกเน็ตได้เฉพาะโดเมนดาวน์โหลดแพ็กเกจที่ปลอดภัย',
          readActionPolicyTh:
            'อ่านไฟล์ในโฟลเดอร์ /workspace ได้อย่างอิสระ แต่อ่านไฟล์ระบบของคอนเทนเนอร์แบบ Read-only เท่านั้น',
          writeCommandPolicyTh:
            'สามารถติดตั้ง dependencies เพิ่มเติมจาก Registry ที่ได้รับอนุญาต (เช่น npmjs, PyPI) แต่ห้ามเข้าถึง Private IP ในวง LAN',
          blocklistPolicyTh:
            'บล็อกการเชื่อมต่อไปยัง IP ภายในเครือข่ายองค์กร (192.168.x.x, 10.x.x.x) และบล็อกพอร์ตอันตราย',
        },
        {
          mode: 'Manual',
          summaryTh:
            'โหมด Air-Gapped Sandbox (--network none): ตัดขาดจากโลกอินเทอร์เน็ตโดยสิ้นเชิง',
          readActionPolicyTh:
            'อ่านได้เฉพาะไฟล์และไลบรารีที่มีอยู่แล้วใน Container Image และ /workspace เท่านั้น',
          writeCommandPolicyTh:
            'เขียนและประมวลผลโค้ดได้อย่างปลอดภัยสูงสุด ป้องกันข้อมูลรั่วไหลหรือการแอบส่งข้อมูลออกนอกเครื่อง 100%',
          blocklistPolicyTh:
            'ตัดการเข้าถึง Network Socket ทั้งหมด ไม่สามารถ ping หรือเชื่อมต่อเน็ตเวิร์กใดๆ ได้',
        },
        {
          mode: 'Off',
          summaryTh:
            'โหมด Privileged Dev: สิทธิ์ระดับนักพัฒนาสำหรับงานตั้งค่าระบบและประกอบอิมเมจ',
          readActionPolicyTh:
            'อนุญาตให้เข้าถึงระบบได้อย่างเต็มที่เพื่อการทดสอบ',
          writeCommandPolicyTh:
            'สามารถรัน Docker-in-Docker หรือติดตั้งโปรแกรมระดับระบบได้ เหมาะสำหรับงาน CI/CD ในระบบปิด',
          blocklistPolicyTh:
            'ปิดการป้องกันบางส่วน จึงไม่ควรใช้รันโค้ดที่มาจากผู้ใช้ภายนอกที่ไม่น่าไว้วางใจ',
        },
      ],
      commandGroups: [
        {
          groupTitleTh:
            '1. คำสั่งสร้างและรัน Sandbox พื้นฐาน (Docker Sandbox CLI)',
          groupDescriptionTh:
            'คำสั่ง Docker ที่นิยมใช้ในการสร้างกล่องทดลองรันโค้ดสำหรับ AI Agent',
          commands: [
            {
              command: 'docker run --rm -it alpine sh',
              usageTh: 'docker run --rm -it alpine sh',
              descriptionTh:
                'เปิดคอนเทนเนอร์ Alpine ชั่วคราว และเมื่อออกจากเชลล์จะลบคอนเทนเนอร์ทิ้งอัตโนมัติทันที (--rm)',
            },
            {
              command: 'docker run -m 512m --cpus 1.0',
              usageTh:
                'docker run --rm -m 512m --cpus 1.0 node:20-alpine node -e "..."',
              descriptionTh:
                'จำกัดแรมไม่เกิน 512MB และใช้ CPU ไม่เกิน 1 Core ป้องกันโปรแกรมกินทรัพยากรจนเครื่องหลักค้าง',
            },
            {
              command: 'docker run --network none',
              usageTh:
                'docker run --rm --network none python:3.11-slim python script.py',
              descriptionTh:
                'ตัดการเชื่อมต่ออินเทอร์เน็ตทั้งหมด (Air-Gapped) ป้องกันโค้ดยิงข้อมูลส่วนตัวออกนอกเครื่อง',
            },
            {
              command: 'docker run -v $(pwd):/workspace -w /workspace',
              usageTh:
                'docker run --rm -v $(pwd):/workspace -w /workspace node:20-alpine npm test',
              descriptionTh:
                'เชื่อมต่อโฟลเดอร์ปัจจุบันเข้าไปเป็นโฟลเดอร์ทำงานในคอนเทนเนอร์ เพื่อให้รันคำสั่งและบันทึกผลงานได้',
            },
          ],
        },
        {
          groupTitleTh:
            '2. แฟล็กความปลอดภัยขั้นสูง (Hardening & Isolation Flags)',
          groupDescriptionTh:
            'ตัวเลือกความปลอดภัยระดับ Kernel เพื่อป้องกันไม่ให้โค้ดหลุดออกจากคอนเทนเนอร์ (Container Escape)',
          commands: [
            {
              command: '--read-only',
              usageTh:
                'docker run --read-only --tmpfs /tmp:rw,noexec,nosuid',
              descriptionTh:
                'ทำให้ระบบไฟล์ทั้งหมดของคอนเทนเนอร์เป็น Read-Only โดยอนุญาตให้เขียนไฟล์ชั่วคราวได้เฉพาะบน RAM (/tmp) เท่านั้น',
            },
            {
              command: '--cap-drop ALL',
              usageTh: 'docker run --cap-drop ALL --cap-add CHOWN ...',
              descriptionTh:
                'ตัดสิทธิ์ความสามารถระดับ Kernel Capabilities ของ Linux ทิ้งทั้งหมด ป้องกันไม่ให้เปลี่ยนสิทธิ์หรือแทรกแซงฮาร์ดแวร์',
            },
            {
              command: '--security-opt no-new-privileges',
              usageTh:
                'docker run --security-opt no-new-privileges:true ...',
              descriptionTh:
                'ป้องกันไม่ให้โปรแกรมภายในใช้คำสั่ง sudo หรือ SUID เพื่อยกดับสิทธิ์ตนเองเป็น Root',
            },
            {
              command: '--user 1000:1000',
              usageTh: 'docker run --user 1000:1000 ...',
              descriptionTh:
                'บังคับให้รันคอนเทนเนอร์ด้วยสิทธิ์ Non-root UID/GID เสมอ เพื่อความปลอดภัยสูงสุด',
            },
          ],
        },
        {
          groupTitleTh:
            '3. การควบคุมอายุและการล้างระบบ (Cleanup & Lifecycle)',
          groupDescriptionTh:
            'คำสั่งสำหรับตัดจบกระบวนการที่ค้างและทำความสะอาดระบบ',
          commands: [
            {
              command: 'docker stop -t 5 <container_id>',
              usageTh: 'docker stop -t 5 <container_id>',
              descriptionTh:
                'ส่งสัญญาณ SIGTERM ให้โปรแกรมหยุดทำงานอย่างสุภาพ และหากไม่ยอมหยุดใน 5 วินาทีจะส่ง SIGKILL ดับทันที',
            },
            {
              command: 'docker rm -f <container_id>',
              usageTh: 'docker rm -f <container_id>',
              descriptionTh: 'บังคับลบคอนเทนเนอร์ที่ค้างทิ้งทันที',
            },
            {
              command: 'docker stats --no-stream',
              usageTh: 'docker stats --no-stream',
              descriptionTh:
                'ตรวจสอบปริมาณ CPU, RAM, Network I/O ของคอนเทนเนอร์ที่กำลังรันอยู่แบบ Snapshot',
            },
          ],
        },
      ],
    },
  },
  {
    status: 'ready',
    id: createTopicId('react-visual-patterns'),
    categoryId: 'frontend-ui',
    categoryLabel: 'Frontend & React',
    title: 'React Visual Learning (เข้าใจ React ด้วยภาพ)',
    summaryTh: 'เรียนรู้ React ตั้งแต่พื้นฐาน Component, Props, State จนถึง Virtual DOM และ Lifecycle ด้วยแผนผังเข้าใจง่าย ไม่ต้องท่องจำ',
    flowPreview: [
      'Component Tree (บล็อกต่อ)',
      'State & Props Flow',
      'Virtual DOM Diff & Re-render',
    ],
    content: {
      headlineTh: 'React ทำงานอย่างไร? (สรุปหลักการสร้าง UI ให้เห็นภาพชัดเจน)',
      introTh: 'React คือไลบรารี JavaScript สำหรับสร้าง User Interface ที่ใช้แนวคิด Component (ชิ้นส่วนเลโก้) ประกอบรวมกัน เมื่อข้อมูลภายใน (State) เปลี่ยน React จะคำนวณส่วนต่างผ่าน Virtual DOM และอัปเดตเฉพาะจุดบนหน้าจอจริงอย่างรวดเร็ว',
      pillars: [
        {
          titleTh: '1. Component-Based Architecture',
          descriptionTh: 'แยกหน้าเว็บออกเป็นส่วนย่อยที่มีอิสระต่อกัน (เช่น ปุ่ม, การ์ด, เมนู) นำกลับมาใช้ซ้ำได้ และแก้ไขง่ายโดยไม่กระทบส่วนอื่น',
        },
        {
          titleTh: '2. Unidirectional Data Flow',
          descriptionTh: 'ข้อมูลไหลทางเดียวจากแม่ไปลูกผ่าน Props เสมอ ทำให้ติดตามที่มาของข้อมูลและหาจุดผิดพลาดได้ชัดเจน',
        },
        {
          titleTh: '3. Virtual DOM Reconciliation',
          descriptionTh: 'เมื่อ State เปลี่ยน React จะวาดหน้าจำลองในหน่วยความจำก่อน แล้วเทียบ Diff เพื่อเปลี่ยนเฉพาะส่วนที่เปลี่ยนจริงบน Real DOM',
        },
      ],
      layers: [
        {
          id: 'entry-routing',
          codeLabel: 'LAYER 01 • JSX & COMPONENTS',
          titleTh: '1. โครงสร้าง JSX และการสร้าง Component',
          subtitleTh: 'เขียนโครงสร้างหน้าตาเหมือน HTML แต่อยู่ในไฟล์ JavaScript/TypeScript',
          files: ['src/App.tsx', 'src/main.tsx', 'index.html'],
          highlightsTh: [
            '<strong>JSX คืออะไร:</strong> ไวยากรณ์ส่วนขยายที่ช่วยให้เขียนโครงสร้าง HTML ลงในฟังก์ชัน JavaScript ได้อย่างเป็นธรรมชาติ',
            '<strong>Function Component:</strong> ฟังก์ชันธรรมดาที่รับค่า props แล้ว return โครงสร้าง JSX ออกมาแสดงผล',
            '<strong>การประกอบร่าง (Composition):</strong> นำ Component เล็ก ๆ มาซ้อนกันเป็นหน้าจอขนาดใหญ่เหมือนต่อเลโก้',
          ],
        },
        {
          id: 'core-loop',
          codeLabel: 'LAYER 02 • STATE & PROPS',
          titleTh: '2. ตัวแปร State และการส่งข้อมูล Props',
          subtitleTh: 'กลไกการจำข้อมูลและการส่งข้อมูลระหว่าง Component แม่ลูก',
          files: ['src/components/CategoryHub.tsx', 'src/components/LessonViewer.tsx'],
          highlightsTh: [
            '<strong>Props (ภายนอกส่งมา):</strong> ข้อมูลที่ Component ลูกได้รับจากแม่ มีลักษณะ Read-only แก้ไขโดยตรงไม่ได้',
            '<strong>State (ภายในจำเอง):</strong> หน่วยความจำเฉพาะตัวของ Component เมื่อเปลี่ยนค่าผ่านฟังก์ชัน set React จะสั่ง Re-render อัตโนมัติ',
            '<strong>Lifting State Up:</strong> หาก Component สองตัวต้องการใช้ข้อมูลร่วมกัน ให้ยก State ไปไว้ที่ Component แม่ตัวเดียวกัน',
          ],
        },
        {
          id: 'tools-sandboxes',
          codeLabel: 'LAYER 03 • REACT HOOKS',
          titleTh: '3. เครื่องมือ React Hooks ยอดนิยม',
          subtitleTh: 'ฟังก์ชันช่วยจัดการ State, Side Effects และการคำนวณขั้นสูง',
          files: ['useState', 'useEffect', 'useMemo / useCallback'],
          highlightsTh: [
            '<strong>useState:</strong> ใช้สร้างตัวแปรที่เมื่อเปลี่ยนค่าแล้วหน้าจอจะอัปเดตทันที',
            '<strong>useEffect:</strong> ใช้จัดการงานภายนอก (Side Effects) เช่น ยิง API, ดึงข้อมูลจากฐานข้อมูล หรือจับเวลา',
            '<strong>Custom Hooks:</strong> การรวม Logic ที่ใช้ซ้ำบ่อย ๆ แยกออกมาเป็น Hook ตัวเองเพื่อความสะอาดของโค้ด',
          ],
        },
        {
          id: 'memory-skills',
          codeLabel: 'LAYER 04 • VIRTUAL DOM & RENDER',
          titleTh: '4. วงจรการวาดภาพ Virtual DOM & Reconciliation',
          subtitleTh: 'เบื้องหลังความเร็วสูงของ React ในการอัปเดตหน้าจอ',
          files: ['Trigger Render', 'Render Phase (Diffing)', 'Commit Phase (Real DOM)'],
          highlightsTh: [
            '<strong>Trigger:</strong> ผู้ใช้กดปุ่ม หรือข้อมูลใหม่เข้ามาทำให้ State เปลี่ยน',
            '<strong>Render Phase:</strong> React วิ่งคำนวณ Virtual DOM กิ่งใหม่ แล้วเปรียบเทียบ (Diffing) กับกิ่งเดิมในหน่วยความจำ',
            '<strong>Commit Phase:</strong> อัปเดตเฉพาะ DOM Node บนหน้าจอจริงที่ผลลัพธ์ต่างกัน ช่วยลดการกระตุกของเบราว์เซอร์',
          ],
        },
      ],
      workflowSteps: [
        {
          stepNumber: 1,
          buttonLabelTh: 'ขั้นที่ 1: กำหนด Component',
          titleTh: 'ขั้นที่ 1: แยกย่อยหน้าเว็บเป็นชิ้นส่วน Component (Component Design)',
          descriptionTh: 'เริ่มจากการมองหน้าจอที่จะสร้าง แล้วตัดแบ่งออกเป็นกล่อง เช่น Header, Sidebar, Card จากนั้นเขียนฟังก์ชันแยกแต่ละชิ้น',
          keyArtifacts: ['function Card()', 'return <div className="card">...</div>'],
        },
        {
          stepNumber: 2,
          buttonLabelTh: 'ขั้นที่ 2: วางตัวแปร State',
          titleTh: 'ขั้นที่ 2: ระบุว่าข้อมูลใดเปลี่ยนไปตามเวลา (State Identification)',
          descriptionTh: 'แยกแยะระหว่างข้อมูลคงที่ (ใช้ตัวแปรปกติหรือ Props) กับข้อมูลที่ผู้ใช้โต้ตอบแล้วเปลี่ยน (ต้องหุ้มด้วย useState เพื่อให้ React รู้ว่าต้องวาดใหม่)',
          keyArtifacts: ['const [count, setCount] = useState(0)'],
        },
        {
          stepNumber: 3,
          buttonLabelTh: 'ขั้นที่ 3: ส่งต่อด้วย Props',
          titleTh: 'ขั้นที่ 3: ส่งข้อมูลจากแม่ไปหาลูก (Props Passing & Events)',
          descriptionTh: 'ส่งค่าตัวแปรและฟังก์ชันจัดการ Event จาก Component แม่ลงไปให้ Component ลูกผ่าน Attributes เพื่อให้ลูกเรียกใช้ได้',
          keyArtifacts: ['<Card title={item.name} onClick={handleClick} />'],
        },
        {
          stepNumber: 4,
          buttonLabelTh: 'ขั้นที่ 4: เชื่อมโยง Side Effects',
          titleTh: 'ขั้นที่ 4: จัดการงานภายนอกด้วย useEffect (Lifecycle & APIs)',
          descriptionTh: 'เมื่อเปิดหน้าเว็บครั้งแรก หากต้องการดึงข้อมูลจาก Server หรือบันทึกค่าลง LocalStorage ให้เขียนไว้ใน useEffect พร้อมระบุ Dependency Array',
          keyArtifacts: ['useEffect(() => { fetchData(); }, [])'],
        },
        {
          stepNumber: 5,
          buttonLabelTh: 'ขั้นที่ 5: Re-render อัตโนมัติ',
          titleTh: 'ขั้นที่ 5: Virtual DOM ตรวจจับความเปลี่ยนแปลงและวาดใหม่ (Reconciliation)',
          descriptionTh: 'เมื่อผู้ใช้คลิกปุ่มและ State เปลี่ยนแปลง React จะจับส่วนต่างอย่างแม่นยำและนำไปแสดงผลบนหน้าจอทันทีโดยที่หน้าเว็บไม่ต้องรีเฟรช',
          keyArtifacts: ['Virtual DOM Tree', 'DOM Mutation Engine'],
        },
      ],
      contextTiers: [
        {
          id: 'vdom-diff',
          name: 'Virtual DOM Diffing',
          subtitleTh: 'การคำนวณส่วนต่างใน Memory',
          usagePercent: 85,
          badgeText: 'เร็วระดับไมโครวินาที',
          retentionTh: 'คำนวณใน RAM เสมอ',
        },
        {
          id: 'component-memo',
          name: 'Component Memoization',
          subtitleTh: 'ข้ามการคำนวณชิ้นส่วนที่ไม่เปลี่ยน',
          usagePercent: 65,
          badgeText: 'React.memo / useMemo',
          retentionTh: 'เก็บแคชผลลัพธ์',
        },
        {
          id: 'state-updates',
          name: 'State Batching',
          subtitleTh: 'รวบการอัปเดตหลายคำสั่งในรอบเดียว',
          usagePercent: 90,
          badgeText: 'Batching 18+',
          retentionTh: 'ลดรอบ Render ซ้ำซ้อน',
        },
        {
          id: 'real-dom',
          name: 'Real DOM Painting',
          subtitleTh: 'ขั้นตอนที่บราวเซอร์วาดพิกเซลจริง',
          usagePercent: 20,
          badgeText: 'วาดเฉพาะจุดที่เปลี่ยน',
          retentionTh: 'ลดงาน GPU/CPU เบราว์เซอร์',
        },
      ],
      permissionProfiles: [
        {
          mode: 'Smart',
          summaryTh: 'โหมดพัฒนาแบบมี StrictMode ช่วยเตือนโค้ดที่มีปัญหา',
          readActionPolicyTh: 'แจ้งเตือนเมื่อพบฟังก์ชันที่ก่อ Side Effect ผิดที่ผิดทาง',
          writeCommandPolicyTh: 'รันฟังก์ชัน Render สองรอบในโหมด dev เพื่อตรวจจับ Memory Leak',
          blocklistPolicyTh: 'บล็อกและเตือนทันทีเมื่อมีการแก้ไข State โดยตรงโดยไม่ผ่านฟังก์ชัน setter',
        },
        {
          mode: 'Manual',
          summaryTh: 'โหมดควบคุมวงจร Render แบบกำหนดเองทุกจุด',
          readActionPolicyTh: 'ใช้ shouldComponentUpdate หรือ custom memo comparator',
          writeCommandPolicyTh: 'ผู้พัฒนาเป็นผู้กำหนดว่า Component จะวาดใหม่เมื่อใด',
          blocklistPolicyTh: 'ป้องกันการ Re-render ส่วนเกินใน Component ขนาดใหญ่',
        },
        {
          mode: 'Off',
          summaryTh: 'โหมด Production ปิดการตรวจซ้ำเพื่อประสิทธิภาพสูงสุด',
          readActionPolicyTh: 'ตัด Warning และโค้ดสำหรับ Debug ทั้งหมดออก',
          writeCommandPolicyTh: 'รันรอบเดียวตรงไปตรงมาเพื่อความเร็วสูงสุดของผู้ใช้ปลายทาง',
          blocklistPolicyTh: 'ตัด Log และ DevTools overhead ออกทั้งหมด',
        },
      ],
      commandGroups: [
        {
          groupTitleTh: '1. พื้นฐาน React Hooks ที่ใช้บ่อยที่สุด',
          groupDescriptionTh: 'ฟังก์ชันหลักสำหรับการเขียน Component แบบ Modern React',
          commands: [
            {
              command: 'useState(initialValue)',
              usageTh: 'const [text, setText] = useState("")',
              descriptionTh: 'สร้างตัวแปร State สำหรับเก็บค่าและฟังก์ชันสำหรับอัปเดตค่า เมื่อเรียก setText หน้าจอจะวาดใหม่ทันที',
            },
            {
              command: 'useEffect(callback, deps)',
              usageTh: 'useEffect(() => { fetchUser(); }, [userId])',
              descriptionTh: 'รันโค้ดเมื่อเปิดหน้าเว็บ หรือเมื่อตัวแปรใน deps มีการเปลี่ยนแปลง เหมาะกับยิง API หรือจับเวลา',
            },
            {
              command: 'useRef(initialValue)',
              usageTh: 'const inputRef = useRef(null)',
              descriptionTh: 'สร้างตัวแปรอ้างอิงถึง DOM Node โดยตรง หรือเก็บค่าที่ต้องการเปลี่ยนแปลงโดยไม่ทำให้เกิดการ Re-render',
            },
            {
              command: 'useMemo(() => compute, deps)',
              usageTh: 'const filtered = useMemo(() => list.filter(...), [list])',
              descriptionTh: 'จดจำผลลัพธ์ของการคำนวณที่ใช้เวลานาน จะคำนวณใหม่เฉพาะเมื่อตัวแปรใน deps เปลี่ยนเท่านั้น',
            },
            {
              command: 'useCallback(fn, deps)',
              usageTh: 'const handleClick = useCallback(() => {...}, [])',
              descriptionTh: 'จดจำตัวฟังก์ชันไว้เพื่อไม่ให้สร้างฟังก์ชันก้อนใหม่ทุกรอบที่ Render ช่วยป้องกันลูก Re-render โดยไม่จำเป็น',
            },
          ],
        },
        {
          groupTitleTh: '2. กฎทองของ React ที่ควรรู้ (React Core Rules)',
          groupDescriptionTh: 'หลักการสำคัญที่จะช่วยให้ไม่สับสนเวลาเขียนโค้ด',
          commands: [
            {
              command: 'Immutability (ห้ามแก้ State ตรง ๆ)',
              usageTh: 'setUser({...user, age: 25}) ห้ามเขียน user.age = 25',
              descriptionTh: 'เพราะ React ตรวจจับความเปลี่ยนแปลงโดยการเช็ค Object Reference ใหม่ หากแก้ข้างใน React จะไม่รู้ว่าข้อมูลเปลี่ยนและจะไม่วาดใหม่',
            },
            {
              command: 'Pure Functions (ห้ามก่อ Side Effect ตอน Render)',
              usageTh: 'อย่าเรียก API หรือแก้ตัวแปร Global ในฟังก์ชัน Component',
              descriptionTh: 'Component ต้องเป็น Pure Function ที่ให้ input (Props) เดียวกันแล้วได้ JSX ผลลัพธ์เหมือนเดิมเสมอ',
            },
            {
              command: 'Keys in Lists (ใส่ key ที่ไม่ซ้ำเสมอ)',
              usageTh: 'items.map(item => <li key={item.id}>{item.name}</li>)',
              descriptionTh: 'key ช่วยให้ Virtual DOM รู้ว่ารายการไหนถูกเพิ่ม ลบ หรือย้ายที่ ทำให้ Diff ได้อย่างถูกต้องและรวดเร็ว',
            },
          ],
        },
      ],
    },
  },
  {
    status: 'ready',
    id: createTopicId('npm-build-deploy'),
    categoryId: 'system-arch',
    categoryLabel: 'System Architecture',
    title: 'npm, Build & Deployment (ทำไมต้อง build & ลูกค้าเปิดไฟล์ไหน)',
    summaryTh: 'คู่มือภาพฉบับเห็นภาพจริง: คำสั่ง npm สำคัญ, เบื้องหลังกระบวนการ npm run build (Transpile, Bundle, Minify), วิธีนำโฟลเดอร์ dist/ ไป Deploy, และลำดับที่เบราว์เซอร์ของลูกค้าเรียกไฟล์เมื่อเปิดเว็บ',
    flowPreview: [
      'npm install & node_modules',
      'npm run build -> dist/',
      'Deploy & Client Browser Request',
    ],
    content: {
      headlineTh: 'npm, Build & Deployment ทำงานอย่างไร? (จากเขียนโค้ดสู่หน้าจอลูกค้า)',
      introTh: 'เมื่อเราสร้างเว็บด้วย React หรือ TypeScript โค้ดที่เราเขียนไม่สามารถนำไปเปิดในเบราว์เซอร์ของลูกค้าได้ทันที บทเรียนนี้จะพาไปดูเบื้องหลังว่าทำไมต้องมี npm, ทำไมต้อง build โค้ดออกมาเป็นโฟลเดอร์ dist/, จะนำไป deploy อย่างไร, และเมื่อลูกค้าพิมพ์ URL เข้าเว็บ เบราว์เซอร์จะส่งคำขอไปโหลดไฟล์อะไรมาแสดงผล',
      pillars: [
        {
          titleTh: '1. จัดการ Library ด้วย npm (Dependency Isolation)',
          descriptionTh: 'npm ทำหน้าที่ดาวน์โหลดไลบรารีภายนอกมาไว้ในเครื่องผ่าน package.json โดยล็อกเวอร์ชันอย่างแม่นยำด้วย package-lock.json เพื่อให้เพื่อนร่วมทีมหรือเซิร์ฟเวอร์ build โค้ดได้ผลลัพธ์ตรงกัน 100%',
        },
        {
          titleTh: '2. ทำไมต้อง Build (Transpile, Bundle, Minify)',
          descriptionTh: 'เบราว์เซอร์ไม่เข้าใจ TypeScript หรือ JSX และไม่ควรโหลดไฟล์ย่อยเป็นร้อยไฟล์ กระบวนการ build จึงแปลงโค้ดเป็น JavaScript มาตรฐาน รวบไฟล์ให้เหลือไม่กี่ก้อน บีบอัดขนาด และใส่ Content Hash กัน Cache ค้าง',
        },
        {
          titleTh: '3. ลูกค้าเปิดไฟล์ไหน (Client-Side Rendering Flow)',
          descriptionTh: 'เมื่อลูกค้าเข้าเว็บ เว็บเซิร์ฟเวอร์จะคืนไฟล์ index.html เป็นอันดับแรก จากนั้นเบราว์เซอร์จะอ่านแท็ก script เพื่อดาวน์โหลดไฟล์ .js และ .css ในโฟลเดอร์ assets มาประมวลผลบนเครื่องลูกค้า แล้ว React จึงเริ่มวาดหน้าจอ',
        },
      ],
      layers: [
        {
          id: 'entry-routing',
          codeLabel: 'LAYER 01 • PROJECT MANIFEST',
          titleTh: '1. ไฟล์ระบุรายการและโครงสร้างโปรเจกต์',
          subtitleTh: 'package.json, package-lock.json และซอร์สโค้ดใน src/',
          files: ['package.json', 'package-lock.json', 'src/App.tsx'],
          highlightsTh: [
            '<strong>package.json:</strong> เปรียบเหมือนใบสั่งซื้อของโปรเจกต์ ระบุว่าต้องใช้ไลบรารีอะไรบ้าง และมีสคริปต์อะไรให้รันได้ เช่น dev, build, test',
            '<strong>package-lock.json:</strong> บันทึกเวอร์ชันที่แท้จริงและ Checksum ของทุก package อย่างละเอียด ป้องกันปัญหาโค้ดรันได้ในเครื่องเราแต่พังบนเครื่องเพื่อน',
            '<strong>dependencies vs devDependencies:</strong> dependencies คือไลบรารีที่จำเป็นต่อการรันจริง (เช่น react) ส่วน devDependencies คือเครื่องมือช่วยตอนเขียนโค้ด (เช่น typescript, vite, vitest)',
          ],
        },
        {
          id: 'core-loop',
          codeLabel: 'LAYER 02 • DEPENDENCY ENGINE',
          titleTh: '2. โฟลเดอร์ node_modules และตัวจัดการแพ็กเกจ',
          subtitleTh: 'คลังไลบรารีทั้งหมดในเครื่องที่ npm ติดตั้งให้',
          files: ['node_modules/', 'node_modules/.bin/', 'npm cache'],
          highlightsTh: [
            '<strong>node_modules/:</strong> โฟลเดอร์ที่เก็บโค้ดของ Library ทั้งหมดที่ดาวน์โหลดมาจาก npm Registry มักมีขนาดใหญ่มาก จึงไม่ควร push ขึ้น git (ต้องใส่ใน .gitignore)',
            '<strong>.bin/:</strong> โฟลเดอร์ย่อยข้างใน node_modules ที่เก็บคำสั่ง Executable เช่น vite, tsc, vitest ทำให้สามารถเรียกผ่าน npm scripts หรือ npx ได้',
            '<strong>npm ci (Clean Install):</strong> คำสั่งลบ node_modules ทิ้งแล้วติดตั้งตาม package-lock.json เป๊ะๆ นิยมใช้ในระบบ CI/CD และ Deployment Server',
          ],
        },
        {
          id: 'tools-sandboxes',
          codeLabel: 'LAYER 03 • BUILD PIPELINE',
          titleTh: '3. เครื่องมือคอมไพล์และบิลด์ (Compiler & Bundler)',
          subtitleTh: 'Vite, TypeScript (tsc) และ Rollup/esbuild',
          files: ['tsconfig.json', 'vite.config.ts', 'tsc -b && vite build'],
          highlightsTh: [
            '<strong>Type Checking (tsc -b):</strong> ตรวจสอบความถูกต้องของประเภทข้อมูล TypeScript ทั้งหมด หากมี error จะหยุด build ทันที ป้องกันบั๊กหลุดไปถึงลูกค้า',
            '<strong>Transpilation (JSX & TS → JS):</strong> แปลง syntax พิเศษอย่าง JSX และฟีเจอร์ JavaScript รุ่นใหม่ ให้กลายเป็น JavaScript มาตรฐานที่เบราว์เซอร์ทุกตัวเข้าใจ',
            '<strong>Bundling & Tree-shaking:</strong> รวบรวมไฟล์แยกใน src/ เข้าด้วยกัน และตัดโค้ดส่วนที่ไม่ได้ถูก import ออก ทำให้ไฟล์เบาและโหลดเร็ว',
            '<strong>Asset Hashing:</strong> ใส่แฮชในชื่อไฟล์ เช่น index-Cjuuf2Ng.js เพื่อแก้ปัญหา Browser Cache ค้างเมื่อมีการปล่อยเวอร์ชันใหม่',
          ],
        },
        {
          id: 'memory-skills',
          codeLabel: 'LAYER 04 • PRODUCTION ASSETS',
          titleTh: '4. โฟลเดอร์ผลลัพธ์ dist/ สำหรับนำไป Deploy',
          subtitleTh: 'ไฟล์ Static แท้ๆ ที่พร้อมเสิร์ฟให้ลูกค้า',
          files: [
            'dist/index.html',
            'dist/assets/index-[hash].js',
            'dist/assets/index-[hash].css',
          ],
          highlightsTh: [
            '<strong>สิ่งที่ได้ใน dist/:</strong> จะมีเพียง index.html ก้อนเดียว และโฟลเดอร์ assets/ ที่เก็บไฟล์ JS, CSS ที่ผ่านการ minify แล้ว',
            '<strong>ขนาดไฟล์ลดลงอย่างมาก:</strong> จากโปรเจกต์ต้นฉบับหลายร้อย MB (รวม node_modules) เมื่อ build แล้ว dist/ มักเหลือเพียงไม่กี่ร้อย KB ถึงไม่กี่ MB',
            '<strong>Deploy แค่ dist/ เท่านั้น:</strong> ไม่ต้องก็อปปี้ src/ หรือ node_modules ขึ้น Static Server ให้เปลืองพื้นที่และเสี่ยงต่อความปลอดภัย',
          ],
        },
      ],
      workflowSteps: [
        {
          stepNumber: 1,
          buttonLabelTh: 'ขั้นที่ 1: ติดตั้ง npm install',
          titleTh: 'ขั้นที่ 1: ติดตั้ง Library ด้วย npm install หรือ npm ci',
          descriptionTh:
            'รันคำสั่ง npm install เพื่ออ่าน package.json และดาวน์โหลดแพ็กเกจทั้งหมดลงในเครื่อง หรือใช้ npm ci บนระบบเซิร์ฟเวอร์อัตโนมัติเพื่อให้ได้ไฟล์เหมือนกันเป๊ะ',
          keyArtifacts: ['package.json', 'package-lock.json', 'node_modules/'],
        },
        {
          stepNumber: 2,
          buttonLabelTh: 'ขั้นที่ 2: พัฒนา & ทดสอบ',
          titleTh:
            'ขั้นที่ 2: พัฒนาด้วย npm run dev และตรวจสอบด้วย npm test',
          descriptionTh:
            'รันเซิร์ฟเวอร์จำลองบน localhost ด้วย Vite มีระบบ Hot Module Replacement (HMR) ทำให้แก้โค้ดแล้วหน้าจอเปลี่ยนทันทีโดยไม่ต้องรีเฟรช และรัน Unit Test ให้ผ่าน',
          keyArtifacts: [
            'http://localhost:5173',
            'Vite Dev Server',
            'Vitest Suite',
          ],
        },
        {
          stepNumber: 3,
          buttonLabelTh: 'ขั้นที่ 3: สั่ง npm run build',
          titleTh:
            'ขั้นที่ 3: คอมไพล์และบิลด์โค้ดออกมาเป็นโฟลเดอร์ dist/',
          descriptionTh:
            'รันคำสั่ง npm run build โดย Vite จะเรียก tsc ตรวจประเภทข้อมูล จากนั้นแปลง JSX เป็น JS, ทำ Tree-shaking, บีบอัดโค้ด (Minify) และสร้างโฟลเดอร์ dist/ ที่สมบูรณ์แบบ',
          keyArtifacts: [
            'dist/index.html',
            'dist/assets/*.js',
            'dist/assets/*.css',
          ],
        },
        {
          stepNumber: 4,
          buttonLabelTh: 'ขั้นที่ 4: Deploy ขึ้น Hosting',
          titleTh:
            'ขั้นที่ 4: นำโฟลเดอร์ dist/ ไป Deploy บน Web Server หรือ CDN',
          descriptionTh:
            'อัปโหลดเฉพาะโฟลเดอร์ dist/ ขึ้น Static Hosting เช่น Cloudflare Pages, Vercel, Netlify, GitHub Pages หรือก็อปปี้ลง Nginx/Apache ที่ /var/www/html',
          keyArtifacts: [
            'Cloudflare Pages / Vercel',
            'Nginx Web Server',
            'Global CDN Edge',
          ],
        },
        {
          stepNumber: 5,
          buttonLabelTh: 'ขั้นที่ 5: ลูกค้าเปิดหน้าเว็บ',
          titleTh:
            'ขั้นที่ 5: เบราว์เซอร์ลูกค้าส่ง HTTP GET ขอไฟล์และเรนเดอร์ UI',
          descriptionTh:
            'ลูกค้าพิมพ์ URL เบราว์เซอร์ส่งคำขอไปโหลด index.html จากนั้นอ่านแท็ก script เพื่อโหลด index-[hash].js มาประมวลผลบนเครื่องลูกค้า แล้ว React จึงวาดหน้าจอแสดงผล',
          keyArtifacts: [
            'HTTP 200 GET /index.html',
            'HTTP 200 GET /assets/index.js',
            'DOM Mounting (<div id="root">)',
          ],
        },
      ],
      contextTiers: [
        {
          id: 'dev-env',
          name: 'Development Environment (Local)',
          subtitleTh: 'สภาพแวดล้อมตอนเขียนโค้ดในเครื่องตนเอง',
          usagePercent: 95,
          badgeText: 'localhost:5173',
          retentionTh:
            'ใช้ node_modules ขนาดใหญ่ มี Source Maps สำหรับดีบั๊ก',
        },
        {
          id: 'build-env',
          name: 'CI/CD Build Pipeline',
          subtitleTh: 'เครื่องสร้างไฟล์อัตโนมัติบน GitHub Actions / Cloud',
          usagePercent: 80,
          badgeText: 'npm ci && npm run build',
          retentionTh:
            'รันเทสต์ทุกเคส หากผ่านจะส่งออกเฉพาะโฟลเดอร์ dist/',
        },
        {
          id: 'cdn-env',
          name: 'Static Web Server / CDN Edge',
          subtitleTh:
            'เซิร์ฟเวอร์กระจายไฟล์ทั่วโลกที่เสิร์ฟไฟล์ให้ลูกค้า',
          usagePercent: 100,
          badgeText: 'Cloudflare / Vercel / Nginx',
          retentionTh:
            'เก็บเฉพาะไฟล์ Static ใน dist/ มี Content Hashing แคชได้ยาวนาน',
        },
        {
          id: 'client-env',
          name: 'Client Browser Runtime',
          subtitleTh: 'เครื่องคอมพิวเตอร์หรือมือถือของลูกค้าที่เปิดดูเว็บ',
          usagePercent: 50,
          badgeText: 'Chrome / Safari / Firefox',
          retentionTh:
            'โหลดไฟล์ JS/CSS มาเก็บใน Browser Cache และประมวลผลผ่าน CPU ลูกค้า',
        },
      ],
      permissionProfiles: [
        {
          mode: 'Smart',
          summaryTh:
            'โหมด SPA บน Static Hosting (Cloudflare Pages, Vercel, Netlify, GitHub Pages)',
          readActionPolicyTh:
            'เบราว์เซอร์ขอหน้าใดก็ตาม เซิร์ฟเวอร์จะคืน dist/index.html เสมอ แล้ว JavaScript ฝั่งลูกค้าจะเป็นผู้จัดการเส้นทางหน้า (SPA Routing) เอง',
          writeCommandPolicyTh:
            'Deploy ง่ายที่สุด เพียงเชื่อมต่อกับ Git Repository เมื่อ push โค้ด ระบบจะรัน build และนำ dist/ กระจายไปยัง Edge CDN ทั่วโลกอัตโนมัติ',
          blocklistPolicyTh:
            'ป้องกันไม่ให้ไฟล์ซอร์สโค้ดใน src/ หรือ node_modules รั่วไหลออกสู่ภายนอก เพราะเซิร์ฟเวอร์อนุญาตให้อ่านได้เฉพาะโฟลเดอร์ dist/ เท่านั้น',
        },
        {
          mode: 'Manual',
          summaryTh: 'โหมด Traditional Linux VPS (Nginx / Apache Server)',
          readActionPolicyTh:
            'ต้องคอนฟิก Nginx ด้วยคำสั่ง try_files $uri $uri/ /index.html; เพื่อให้เวลาลูกค้ากดรีเฟรชในหน้า URL ย่อย เซิร์ฟเวอร์จะไม่ตอบกลับ 404 Not Found',
          writeCommandPolicyTh:
            'ผู้ดูแลระบบต้องรัน npm run build แล้วใช้ scp หรือ rsync ก็อปปี้ไฟล์ใน dist/ ไปวางไว้ที่ /var/www/html/ ด้วยตนเองหรือผ่าน Bash Script',
          blocklistPolicyTh:
            'ต้องปิดการเข้าถึงไฟล์ดอท (.env, .git) ใน Web Server อย่างเด็ดขาดเพื่อความปลอดภัย',
        },
        {
          mode: 'Off',
          summaryTh: 'โหมด Local Preview บนเครื่องตนเอง (npm run preview)',
          readActionPolicyTh:
            'Vite จะเปิด HTTP Web Server จำลองขนาดเล็กเพื่ออ่านไฟล์จากโฟลเดอร์ dist/ ให้เราตรวจสอบเหมือนกับเปิดดูบนเซิร์ฟเวอร์จริงก่อนส่งขึ้นระบบ',
          writeCommandPolicyTh:
            'รันคำสั่ง npm run preview หลังรัน build เสร็จ เพื่อทดสอบว่าไฟล์ที่บิลด์ออกมาทำงานได้ถูกต้องครบถ้วนและไม่มี path ผิดพลาด',
          blocklistPolicyTh:
            'ไม่รองรับ Hot Module Replacement (HMR) เพราะกำลังรันไฟล์โปรดักชันที่ผ่านการบิลด์แล้ว ไม่ใช่โค้ดดิบ',
        },
      ],
      commandGroups: [
        {
          groupTitleTh: '1. คำสั่งติดตั้งและจัดการ Library (Package Management)',
          groupDescriptionTh:
            'คำสั่ง npm สำหรับดาวน์โหลด อัปเดต และควบคุมไลบรารีในโปรเจกต์',
          commands: [
            {
              command: 'npm install (หรือ npm i)',
              usageTh: 'npm install',
              descriptionTh:
                'อ่าน package.json แล้วดาวน์โหลดไลบรารีทั้งหมดมาไว้ในโฟลเดอร์ node_modules พร้อมสร้างหรืออัปเดต package-lock.json',
            },
            {
              command: 'npm install <package-name>',
              usageTh: 'npm install react-router-dom',
              descriptionTh:
                'ติดตั้งแพ็กเกจใหม่เข้าไปในโฟลเดอร์ node_modules และบันทึกชื่อลงใน dependencies ของ package.json (ใช้สำหรับรันในโปรเจกต์จริง)',
            },
            {
              command: 'npm install -D <package-name> (หรือ --save-dev)',
              usageTh: 'npm install -D typescript @types/react',
              descriptionTh:
                'ติดตั้งแพ็กเกจลงใน devDependencies สำหรับเครื่องมือที่ใช้เฉพาะตอนพัฒนา เช่น Compiler, Linter, Test Runner ไม่ถูกนำไปรันในเครื่องลูกค้า',
            },
            {
              command: 'npm ci (Clean Install)',
              usageTh: 'npm ci',
              descriptionTh:
                'ลบ node_modules ทิ้งแล้วติดตั้งตาม package-lock.json อย่างเคร่งครัด 100% เร็วกว่าและปลอดภัยกว่า นิยมใช้ในระบบ CI/CD และบนเซิร์ฟเวอร์บิลด์',
            },
            {
              command: 'npm uninstall <package-name>',
              usageTh: 'npm uninstall lodash',
              descriptionTh:
                'ลบแพ็กเกจที่ไม่ได้ใช้ออกจาก node_modules และนำชื่อออกจาก package.json',
            },
            {
              command: 'npm update',
              usageTh: 'npm update',
              descriptionTh:
                'อัปเดตแพ็กเกจทั้งหมดให้เป็นเวอร์ชันล่าสุดภายใต้เงื่อนไข semver ที่ระบุไว้ใน package.json',
            },
          ],
        },
        {
          groupTitleTh: '2. คำสั่งรันสคริปต์และเครื่องมือ (Scripts & Execution)',
          groupDescriptionTh:
            'คำสั่งสำหรับเริ่มเขียนโค้ด รันเทสต์ และสร้างไฟล์สำหรับใช้งานจริง',
          commands: [
            {
              command: 'npm run dev',
              usageTh: 'npm run dev',
              descriptionTh:
                'เปิดเซิร์ฟเวอร์จำลองสำหรับพัฒนา (Development Server) มีระบบโหลดโค้ดใหม่อัตโนมัติ (HMR) ทำให้เห็นผลการแก้โค้ดทันที',
            },
            {
              command: 'npm run build',
              usageTh: 'npm run build',
              descriptionTh:
                'ตรวจสอบประเภทข้อมูล (tsc) และคอมไพล์โค้ดทั้งหมด แปลง JSX/TS เป็น JS ปกติ รวบไฟล์ บีบอัด และสร้างโฟลเดอร์ dist/ สำหรับนำไปใช้งานจริง',
            },
            {
              command: 'npm test (หรือ npm run test)',
              usageTh: 'npm test',
              descriptionTh:
                'รันชุดการทดสอบ (Unit Tests / Integration Tests) เพื่อพิสูจน์ว่าโค้ดทำงานถูกต้องตามเงื่อนไขที่กำหนดไว้ก่อนนำไปบิลด์หรือปล่อยขึ้นระบบ',
            },
            {
              command: 'npm run preview',
              usageTh: 'npm run preview',
              descriptionTh:
                'เปิดเว็บเซิร์ฟเวอร์จำลองเพื่อทดสอบเปิดดูไฟล์ในโฟลเดอร์ dist/ ในเครื่องเรา เพื่อตรวจสอบความเรียบร้อยก่อนนำไป deploy จริง',
            },
            {
              command: 'npx <command>',
              usageTh: 'npx create-vite my-app --template react-ts',
              descriptionTh:
                'รันคำสั่ง Executable ของ Node.js ชั่วคราวโดยไม่ต้องติดตั้งลงเครื่องถาวร หรือใช้รันเครื่องมือที่มีอยู่ใน node_modules/.bin/',
            },
          ],
        },
        {
          groupTitleTh: '3. วิธีการ Deploy และลำดับที่เบราว์เซอร์เรียกไฟล์',
          groupDescriptionTh:
            'ความเข้าใจในการนำไฟล์ขึ้นเซิร์ฟเวอร์ และสิ่งที่เกิดขึ้นเมื่อลูกค้าเปิดหน้าเว็บ',
          commands: [
            {
              command: '1. Deploy เฉพาะโฟลเดอร์ dist/',
              usageTh: 'อัปโหลดเฉพาะโฟลเดอร์ dist/ ไปยัง Web Hosting',
              descriptionTh:
                'สิ่งที่นำไปขึ้นเซิร์ฟเวอร์มีเพียงไฟล์ใน dist/ เท่านั้น ห้ามนำ node_modules หรือ src/ ขึ้นไปเพราะหนักและไม่จำเป็น',
            },
            {
              command: '2. ลูกค้าพิมพ์ URL -> ขอ index.html',
              usageTh:
                'Browser GET https://example.com/ -> Server ส่ง index.html',
              descriptionTh:
                'เซิร์ฟเวอร์จะคืนไฟล์ dist/index.html ซึ่งเป็นโครงสร้างตั้งต้นที่มีแท็ก <div id="root"></div> และลิงก์ไปยังไฟล์ JS/CSS ในโฟลเดอร์ assets',
            },
            {
              command: '3. เบราว์เซอร์ดาวน์โหลด JS & CSS',
              usageTh:
                'Browser GET /assets/index-xxx.js และ /assets/index-xxx.css',
              descriptionTh:
                'เบราว์เซอร์อ่านแท็ก <script type="module" src="..."> และ <link rel="stylesheet"> ใน index.html แล้วส่งคำขอไปดาวน์โหลดโค้ดมาเก็บในเครื่อง',
            },
            {
              command: '4. เครื่องลูกค้ารัน JS และวาดหน้าจอ (CSR)',
              usageTh: 'Client CPU รัน React.createRoot(root).render(<App />)',
              descriptionTh:
                'เมื่อ JavaScript โหลดเสร็จ CPU ของผู้ใช้จะประมวลผลโค้ด React สร้างชิ้นส่วน DOM และใส่ลงไปในหน้าจอ ทำให้ผู้ใช้มองเห็นและกดใช้งานปุ่มต่างๆ ได้ทันที',
            },
          ],
        },
      ],
    },
  },
  {
    status: 'ready',
    id: createTopicId('https-certificate'),
    categoryId: 'system-arch',
    categoryLabel: 'System Architecture',
    title: 'HTTPS & Certificate (SSL/TLS, การเข้ารหัส & ห่วงโซ่ความเชื่อถือ)',
    summaryTh:
      'เจาะลึกระบบความปลอดภัยของเว็บ: การทำงานระหว่าง HTTP vs HTTPS, วงจร TLS 1.3 Handshake, การเข้ารหัสลูกผสม (Asymmetric & Symmetric Encryption), ห่วงโซ่ความเชื่อถือ (Root CA -> Intermediate CA -> Leaf Certificate), การขอใบรับรองฟรีอัตโนมัติด้วย Let\'s Encrypt (Certbot / ACME) และการตั้งค่า Nginx ให้ได้เกรด A+',
    flowPreview: [
      'TLS 1.3 Handshake & Key Exchange',
      'PKI Chain of Trust (Root -> Leaf)',
      'Symmetric AES-GCM Encrypted Stream',
    ],
    content: {
      headlineTh:
        'HTTPS & SSL/TLS Certificate ทำงานอย่างไร? (เข้าใจความปลอดภัยของเว็บด้วยภาพ)',
      introTh:
        'เมื่อเราเข้าเว็บไซต์ที่มีไอคอนรูปแม่กุญแจเขียว (HTTPS) ข้อมูลทุกตัวอักษรระหว่างเบราว์เซอร์กับเซิร์ฟเวอร์จะถูกเข้ารหัส ป้องกันการถูกดักจับรหัสผ่านหรือข้อมูลบัตรเครดิต (Sniffing) และป้องกันการแก้ไขข้อมูลกลางทาง (Tampering) บทเรียนนี้สรุปกลไกเบื้องหลังของ TLS 1.3, การจับคู่กุญแจ Asymmetric/Symmetric, โครงสร้างห่วงโซ่ใบรับรอง (PKI Chain of Trust), และวิธีขอใบรับรองจริงด้วย Let\'s Encrypt แบบเข้าใจง่ายและนำไปใช้ได้ทันที',
      pillars: [
        {
          titleTh: '1. Hybrid Encryption (การเข้ารหัสแบบผสมผสาน)',
          descriptionTh:
            'ผสานข้อดีของ 2 โลก: ใช้ Asymmetric Encryption (ECDHE/RSA) ในช่วงเริ่มต้นเพื่อแลกเปลี่ยนกุญแจลับอย่างปลอดภัยข้ามเครือข่ายอินเทอร์เน็ต จากนั้นสลับมาใช้ Symmetric Encryption (AES-256-GCM / ChaCha20) สำหรับรับส่งข้อมูลจริง เพราะทำงานเร็วกว่าหลายร้อยเท่าและประหยัดพลังงานซีพียู',
        },
        {
          titleTh: '2. PKI & Chain of Trust (ห่วงโซ่ความเชื่อถือของใบรับรอง)',
          descriptionTh:
            'ระบบไม่เพียงแค่เข้ารหัส แต่ต้องพิสูจน์ได้ว่า "กำลังคุยกับเซิร์ฟเวอร์ตัวจริง ไม่ใช่โจร": เบราว์เซอร์มี Root CA ที่เชื่อถือได้ฝังอยู่ในระบบล่วงหน้า จากนั้นตรวจสอบลายเซ็นดิจิทัลของ Intermediate CA ลงมาจนถึง Leaf Certificate ของโดเมนเรา หากลายเซ็นถูกต้องและไม่หมดอายุ เบราว์เซอร์จึงจะแสดงรูปแม่กุญแจสีเขียว',
        },
        {
          titleTh:
            '3. Automated ACME & Forward Secrecy (Let\'s Encrypt & ความลับตลอดไป)',
          descriptionTh:
            'ยุคใหม่ใช้โปรโตคอล ACME (Certbot) ขอและต่ออายุใบรับรองทุก 90 วันอัตโนมัติโดยไม่มีค่าใช้จ่าย พร้อมฟีเจอร์ Perfect Forward Secrecy (PFS) ด้วย Diffie-Hellman ที่รับประกันว่า แม้วันข้างหน้ากุญแจ Private Key ของเซิร์ฟเวอร์จะรั่วไหล ผู้ไม่หวังดีก็ไม่สามารถนำไปถอดรหัสข้อมูลในอดีตที่เคยดักฟังเก็บไว้ได้',
        },
      ],
      layers: [
        {
          id: 'entry-routing',
          codeLabel: 'LAYER 01 • BROWSER & CLIENT GATEKEEPER',
          titleTh: '1. หน้าต่างเบราว์เซอร์ & ฐานข้อมูล Trust Store',
          subtitleTh:
            'Address Bar Padlock, OS Root CA Store, Certificate Validation Engine',
          files: [
            'Browser Trust Store (Mozilla NSS)',
            '/etc/ssl/certs/ca-certificates.crt',
            'Windows / macOS System Keychain',
          ],
          highlightsTh: [
            '<strong>System Trust Store:</strong> เบราว์เซอร์และระบบปฏิบัติการจะติดตั้งรายชื่อ Root Certificate Authorities (เช่น ISRG, DigiCert, Sectigo) มาให้ล่วงหน้า เพื่อใช้เป็นจุดเริ่มต้นของความเชื่อถือ (Trust Anchor)',
            '<strong>Domain Match & Expiration Check:</strong> เบราว์เซอร์ตรวจสอบว่า Subject Alternative Name (SAN) ในใบรับรองตรงกับโดเมนที่พิมพ์ใน URL หรือไม่ และตรวจวันหมดอายุ (Not After)',
            '<strong>Security Warning Trigger:</strong> หากใบรับรองหมดอายุ ลายเซ็นไม่ตรง หรือไม่มี Root CA รองรับ เบราว์เซอร์จะบล็อกการเข้าถึงทันทีและแสดงหน้าจอเตือน "Your connection is not private (NET::ERR_CERT_AUTHORITY_INVALID)"',
          ],
        },
        {
          id: 'core-loop',
          codeLabel: 'LAYER 02 • TLS 1.3 CRYPTOGRAPHIC ENGINE',
          titleTh: '2. เอนจินการเข้ารหัส & ชุดอัลกอริทึม (Cipher Suites)',
          subtitleTh:
            'ECDHE (Key Exchange), AES-256-GCM / ChaCha20-Poly1305, SHA-256 / SHA-384',
          files: [
            'TLS_AES_256_GCM_SHA384',
            'TLS_CHACHA20_POLY1305_SHA256',
            'curve25519 / secp256r1',
            'HKDF (HMAC-based Key Derivation)',
          ],
          highlightsTh: [
            '<strong>TLS 1.3 Streamlined Handshake:</strong> ลดระยะเวลาการเริ่มเชื่อมต่อเหลือเพียง 1-RTT (One Round Trip Time) จากเดิมใน TLS 1.2 ที่ต้องใช้ 2-RTT ทำให้เปิดเว็บเร็วขึ้นอย่างเห็นได้ชัด',
            '<strong>ECDHE Key Agreement:</strong> ไคลเอนต์และเซิร์ฟเวอร์ส่งค่า Public Key Share ของตนเอง แล้วนำมาคำนวณทางคณิตศาสตร์ได้ผลลัพธ์ Shared Secret เดียวกัน โดยไม่ต้องส่งกุญแจลับจริงผ่านสายสัญญาณ',
            '<strong>Authenticated Encryption (AEAD):</strong> ใช้อัลกอริทึม AES-GCM หรือ ChaCha20-Poly1305 ที่เข้ารหัสข้อมูล (Confidentiality) พร้อมประทับตรา Auth Tag ป้องกันการดัดแปลงข้อมูล (Integrity) ไปพร้อมกันในรอบเดียว',
          ],
        },
        {
          id: 'tools-sandboxes',
          codeLabel: 'LAYER 03 • PUBLIC KEY INFRASTRUCTURE (PKI)',
          titleTh: '3. โครงสร้างห่วงโซ่ใบรับรองดิจิทัล (Chain of Trust & ACME)',
          subtitleTh:
            'Root CA, Intermediate CA, Leaf Certificate, OCSP Stapling & CRL',
          files: [
            'ISRG Root X1 (Root CA)',
            'R3 / E1 (Let\'s Encrypt Intermediate CA)',
            'fullchain.pem (Server + Intermediate)',
            'privkey.pem (Secret Private Key)',
          ],
          highlightsTh: [
            '<strong>Chain of Trust (ลำดับขั้นความเชื่อถือ):</strong> Root CA ใช้กุญแจลับเซ็นรับรอง Intermediate CA และ Intermediate CA ใช้กุญแจลับเซ็นรับรอง Leaf Certificate ของเว็บไซต์เรา ทำให้เบราว์เซอร์สามารถไล่สายตรวจสอบกลับขึ้นไปได้',
            '<strong>Private Key vs Public Certificate:</strong> ใบรับรอง (Certificate/fullchain.pem) เป็นข้อมูลสาธารณะที่แจกจ่ายให้ใครก็ได้ แต่ Private Key (privkey.pem) ต้องเก็บเป็นความลับสูงสุดบนเซิร์ฟเวอร์ ห้ามเปิดเผยเด็ดขาด',
            '<strong>Automated ACME Protocol:</strong> Let\'s Encrypt ใช้มาตรฐาน ACME ตรวจสอบความเป็นเจ้าของโดเมนผ่าน HTTP-01 (.well-known/acme-challenge) หรือ DNS-01 TXT Record แล้วออกใบรับรองให้อัตโนมัติใน 10 วินาที',
          ],
        },
        {
          id: 'memory-skills',
          codeLabel: 'LAYER 04 • WEB SERVER TLS TERMINATION',
          titleTh: '4. จุดตัดจบการเข้ารหัสบนเซิร์ฟเวอร์ (TLS Termination & HSTS)',
          subtitleTh:
            'Nginx SSL Module, Cloudflare Edge, HSTS, HTTP/2 & ALPN Negotiation',
          files: [
            '/etc/nginx/sites-available/default',
            'ssl_certificate / ssl_certificate_key',
            'Strict-Transport-Security (HSTS)',
            'ALPN (h2, http/1.1)',
          ],
          highlightsTh: [
            '<strong>TLS Termination:</strong> เว็บเซิร์ฟเวอร์ Nginx หรือ CDN Edge (เช่น Cloudflare) ทำหน้าที่ถอดรหัส HTTPS ที่หน้าบ้าน จากนั้นส่งต่อคำขอไปยังแอปพลิเคชันหลังบ้าน (Node.js, Python, Go) ทำให้แอปไม่ต้องแบกรับภาระถอดรหัสเอง',
            '<strong>HTTP to HTTPS Redirect:</strong> ดักฟังพอร์ต 80 (HTTP ธรรมดา) แล้วส่ง HTTP 301 Moved Permanently บังคับให้เบราว์เซอร์เปลี่ยนไปใช้ https:// (พอร์ต 443) เสมอ',
            '<strong>HSTS (Strict-Transport-Security):</strong> ส่ง HTTP Header สั่งให้เบราว์เซอร์จำว่า "โดเมนนี้ต้องเข้าด้วย HTTPS เท่านั้น" เป็นเวลา 1 ปี ป้องกันการโจมตีแบบ SSL Stripping และ Man-in-the-Middle',
          ],
        },
      ],
      workflowSteps: [
        {
          stepNumber: 1,
          buttonLabelTh: 'ขั้นที่ 1: Client Hello & Server Hello',
          titleTh:
            'ขั้นที่ 1: เริ่มต้นการเจรจา TLS 1.3 Handshake (Client & Server Hello)',
          descriptionTh:
            'เบราว์เซอร์ส่งข้อความ Client Hello พร้อมระบุรายการ Cipher Suites ที่รองรับ, โดเมนที่ต้องการเข้า (SNI: Server Name Indication) และค่า Key Share ของตนเอง เซิร์ฟเวอร์ตอบกลับ Server Hello เลือกอัลกอริทึมที่ดีที่สุด และส่งค่า Key Share ของเซิร์ฟเวอร์กลับมาในรอบเดียว (1-RTT)',
          keyArtifacts: [
            'Client Hello (SNI, Supported Ciphers, Client Key Share)',
            'Server Hello (Selected Cipher, Server Key Share)',
            '1-RTT Fast Negotiation',
          ],
        },
        {
          stepNumber: 2,
          buttonLabelTh: 'ขั้นที่ 2: ส่ง Certificate & ตรวจสอบลายเซ็น',
          titleTh:
            'ขั้นที่ 2: เซิร์ฟเวอร์ส่งมอบใบรับรอง และเบราว์เซอร์ตรวจสอบห่วงโซ่ (Certificate Validation)',
          descriptionTh:
            'เซิร์ฟเวอร์ส่งใบรับรอง X.509 (fullchain.pem) มาให้เบราว์เซอร์ เบราว์เซอร์นำ Public Key ของ Intermediate CA มาตรวจสอบลายเซ็นดิจิทัลของใบรับรอง และนำ Public Key ของ Root CA ใน Trust Store มาตรวจสอบ Intermediate CA อีกทอดหนึ่ง หากถูกต้องครบถ้วนจะยืนยันว่าคุยกับตัวจริงแน่นอน',
          keyArtifacts: [
            'Certificate (X.509 ASN.1 Payload)',
            'Digital Signature Verification',
            'Chain of Trust Validation (Root -> Intermediate -> Leaf)',
          ],
        },
        {
          stepNumber: 3,
          buttonLabelTh: 'ขั้นที่ 3: คำนวณ Session Key ผ่าน Diffie-Hellman',
          titleTh:
            'ขั้นที่ 3: คำนวณกุญแจลับร่วมกัน (ECDHE Shared Secret & Master Key Derivation)',
          descriptionTh:
            'ทั้งสองฝั่งนำค่า Key Share ของอีกฝ่ายมาคำนวณทางคณิตศาสตร์ด้วย Elliptic Curve Diffie-Hellman (ECDHE) ทำให้ทั้งไคลเอนต์และเซิร์ฟเวอร์ได้ค่ากุญแจสมมาตรชุดเดียวกัน (Symmetric Session Key) โดยที่ตัวกุญแจลับนี้ไม่เคยถูกส่งผ่านสายอินเทอร์เน็ตแม้แต่บิตเดียว',
          keyArtifacts: [
            'ECDHE Curve25519 Calculation',
            'Derived Symmetric Session Key (AES-256)',
            'Perfect Forward Secrecy Guaranteed',
          ],
        },
        {
          stepNumber: 4,
          buttonLabelTh: 'ขั้นที่ 4: รับส่งข้อมูลผ่านการเข้ารหัส AES-GCM',
          titleTh:
            'ขั้นที่ 4: เริ่มการรับส่งข้อมูลจริงผ่านช่องทางเข้ารหัส (Encrypted Application Traffic)',
          descriptionTh:
            'หลังจาก Handshake สำเร็จ ข้อความ HTTP ทั้งหมด (URL, Headers, Cookies, Request Body, รหัสผ่าน, ข้อมูลบัตรเครดิต) จะถูกห่อหุ้มและเข้ารหัสด้วยอัลกอริทึม AES-256-GCM หรือ ChaCha20 บุคคลภายนอกที่ดักจับแพ็กเก็ตกลางทาง (Sniffer) จะเห็นเพียงข้อความขยะที่ไม่สามารถถอดรหัสได้',
          keyArtifacts: [
            'AES-256-GCM Authenticated Ciphertext',
            'Encrypted HTTP Request & Response',
            'Data Integrity Auth Tag',
          ],
        },
        {
          stepNumber: 5,
          buttonLabelTh: 'ขั้นที่ 5: ต่ออายุใบรับรองอัตโนมัติด้วย ACME',
          titleTh:
            'ขั้นที่ 5: การต่ออายุใบรับรองอัตโนมัติผ่าน Let\'s Encrypt (Automated Renewal Lifecycle)',
          descriptionTh:
            'ใบรับรองของ Let\'s Encrypt มีอายุ 90 วัน เพื่อความปลอดภัยสูงสุด โปรแกรม Certbot ที่ติดตั้งไว้ในเซิร์ฟเวอร์จะตั้งเวลา Cron Job หรือ Systemd Timer วิ่งตรวจสอบทุกวัน หากใบรับรองเหลืออายุต่ำกว่า 30 วัน Certbot จะยิง ACME Challenge ไปยัง Let\'s Encrypt เพื่อขอไฟล์ใบรับรองใหม่และสั่ง Reload Nginx อัตโนมัติโดยที่เว็บไม่ดับ',
          keyArtifacts: [
            'Certbot Systemd Timer / Cron Job',
            'HTTP-01 / DNS-01 ACME Challenge',
            'Zero-Downtime Nginx Reload (nginx -s reload)',
          ],
        },
      ],
      contextTiers: [
        {
          id: 'tls-session-cache',
          name: 'TLS Session Resumption & 0-RTT Cache',
          subtitleTh: 'หน่วยความจำแคชกุญแจเซสชันสำหรับเชื่อมต่อซ้ำแบบทันที',
          usagePercent: 90,
          badgeText: 'Session Tickets (0-RTT)',
          retentionTh:
            'เซิร์ฟเวอร์จำค่าเซสชันไว้ใน RAM ชั่วคราว เมื่อผู้ใช้คนเดิมกลับมาเปิดหน้าถัดไป จะข้ามขั้นตอน Handshake ได้ทันที',
        },
        {
          id: 'os-trust-store',
          name: 'System Root CA Trust Store',
          subtitleTh: 'คลังใบรับรองต้นทางที่ได้รับความเชื่อถือระดับระบบปฏิบัติการ',
          usagePercent: 100,
          badgeText: 'Mozilla NSS / ca-certificates',
          retentionTh:
            'ฝังถาวรในระบบปฏิบัติการและเบราว์เซอร์ อัปเดตผ่านแพ็กเกจระบบ เช่น apt update ca-certificates',
        },
        {
          id: 'private-key-vault',
          name: 'Server Private Key Storage (0600)',
          subtitleTh: 'พื้นที่จัดเก็บกุญแจลับของเซิร์ฟเวอร์ที่มีการคุ้มกันสูงสุด',
          usagePercent: 95,
          badgeText: 'chmod 600 / privkey.pem',
          retentionTh:
            'เก็บถาวรใน /etc/letsencrypt/live/ โดยจำกัดสิทธิ์เฉพาะ root เท่านั้นที่อ่านได้ ห้ามแชร์หรือคอมมิตขึ้น Git',
        },
        {
          id: 'ocsp-stapling',
          name: 'OCSP Stapling & Revocation Cache',
          subtitleTh: 'แคชสถานะความถูกต้องของใบรับรองเพื่อลดภาระการตรวจสอบ',
          usagePercent: 75,
          badgeText: 'OCSP Response Cache',
          retentionTh:
            'เซิร์ฟเวอร์ดาวน์โหลดสถานะการเพิกถอนจาก CA มาแปะไว้กับใบรับรองตนเอง เพื่อให้เบราว์เซอร์ไม่ต้องยิงไปถาม CA ซ้ำ',
        },
      ],
      permissionProfiles: [
        {
          mode: 'Smart',
          summaryTh:
            'โหมด Modern HTTPS: TLS 1.3 + TLS 1.2, HSTS & Let\'s Encrypt อัตโนมัติ (แนะนำสำหรับ Production)',
          readActionPolicyTh:
            'รองรับเฉพาะเบราว์เซอร์และอุปกรณ์สมัยใหม่ที่ใช้ TLS 1.2 และ TLS 1.3 ปิดการใช้งาน SSLv3, TLS 1.0 และ TLS 1.1 ที่มีช่องโหว่ด้านความปลอดภัยอย่างสิ้นเชิง',
          writeCommandPolicyTh:
            'เปิดใช้งาน HTTP Strict Transport Security (HSTS) พร้อม max-age=31536000 บังคับให้เบราว์เซอร์ต่อตรงเข้า HTTPS เสมอ และตั้งค่า Certbot Auto-renewal',
          blocklistPolicyTh:
            'บล็อก Cipher Suites รุ่นเก่าที่มีช่องโหว่ เช่น RC4, 3DES, CBC Mode และปิดกั้นพอร์ต 80 โดยบังคับ 301 Redirect สู่พอร์ต 443 ทันที',
        },
        {
          mode: 'Manual',
          summaryTh:
            'โหมด Mutual TLS (mTLS): บังคับยืนยันใบรับรองทั้งฝั่งไคลเอนต์และเซิร์ฟเวอร์ (สำหรับ Banking & Microservices)',
          readActionPolicyTh:
            'เซิร์ฟเวอร์จะไม่ยอมรับการเชื่อมต่อใด ๆ จนกว่าฝั่งไคลเอนต์จะส่ง Client Certificate ที่เซ็นโดย Internal CA มาให้ตรวจสอบ',
          writeCommandPolicyTh:
            'ใช้สำหรับการสื่อสารระหว่างเซิร์ฟเวอร์กับเซิร์ฟเวอร์ (Service-to-Service) ภายในระบบ Cloud, Kubernetes Pods หรือระบบทำธุรกรรมการเงินระดับสูง',
          blocklistPolicyTh:
            'บล็อกการเข้าใช้งานจากเบราว์เซอร์บุคคลทั่วไปที่ไม่มีใบรับรองส่วนบุคคลติดตั้งอยู่ในเครื่อง',
        },
        {
          mode: 'Off',
          summaryTh:
            'โหมด Development / Local Self-Signed (mkcert / localhost สำหรับนักพัฒนา)',
          readActionPolicyTh:
            'ใช้สำหรับทดสอบฟีเจอร์ที่ต้องรันบน HTTPS ในเครื่องคอมพิวเตอร์ของตนเอง (เช่น Web Crypto API, Service Worker, Geolocation)',
          writeCommandPolicyTh:
            'สร้าง Local Certificate Authority ในเครื่องด้วยคำสั่ง mkcert -install แล้วออกใบรับรองสำหรับ localhost ไม่ต้องพึ่งพาอินเทอร์เน็ต',
          blocklistPolicyTh:
            'ห้ามนำใบรับรอง Self-Signed ไปใช้บนระบบ Production หรือระบบจริง เพราะเบราว์เซอร์ของลูกค้าจะขึ้นเตือนสีแดงทันที',
        },
      ],
      commandGroups: [
        {
          groupTitleTh: '1. คำสั่ง OpenSSL ตรวจสอบและสร้างกุญแจ (OpenSSL CLI)',
          groupDescriptionTh:
            'เครื่องมือมาตรฐานบนระบบปฏิบัติการ Linux / macOS สำหรับจัดการกุญแจ, สร้าง CSR และตรวจสอบใบรับรอง',
          commands: [
            {
              command:
                'openssl s_client -connect example.com:443 -servername example.com',
              usageTh:
                'openssl s_client -connect example.com:443 -servername example.com',
              descriptionTh:
                'จำลองการเชื่อมต่อ TLS Handshake ไปยังเซิร์ฟเวอร์จริง พร้อมแสดงรายละเอียดห่วงโซ่ใบรับรอง (Chain of Trust), Cipher Suite ที่ใช้ และวันหมดอายุ',
            },
            {
              command: 'openssl x509 -in cert.crt -noout -dates -issuer -subject',
              usageTh:
                'openssl x509 -in /etc/ssl/certs/cert.pem -noout -dates -issuer',
              descriptionTh:
                'อ่านข้อมูลจากไฟล์ใบรับรอง X.509 ในเครื่อง ตรวจสอบว่าใครเป็นผู้ออกให้ (Issuer), ออกให้ใคร (Subject) และหมดอายุวันไหน (Not Before / Not After)',
            },
            {
              command: 'openssl genrsa -out server.key 2048',
              usageTh: 'openssl genrsa -out server.key 2048',
              descriptionTh:
                'สร้างกุญแจลับส่วนตัว (Private Key) ชนิด RSA ขนาด 2048 บิต เก็บไว้เป็นความลับสำหรับนำไปสร้าง CSR หรือติดตั้งบนเซิร์ฟเวอร์',
            },
            {
              command: 'openssl req -new -key server.key -out server.csr',
              usageTh:
                'openssl req -new -key server.key -out server.csr -subj "/CN=example.com"',
              descriptionTh:
                'สร้างคำขอออกใบรับรอง (Certificate Signing Request - CSR) โดยส่ง Public Key และข้อมูลโดเมนไปให้ผู้ให้บริการ CA เซ็นรับรอง',
            },
          ],
        },
        {
          groupTitleTh: '2. การขอใบรับรองฟรีและต่ออายุด้วย Certbot (Let\'s Encrypt)',
          groupDescriptionTh:
            'โปรแกรมอัตโนมัติยอดนิยมสำหรับขอและต่ออายุ SSL/TLS ฟรีจาก Let\'s Encrypt บน Linux VPS',
          commands: [
            {
              command: 'certbot --nginx -d example.com -d www.example.com',
              usageTh:
                'sudo certbot --nginx -d example.com -d www.example.com',
              descriptionTh:
                'คำสั่งมหัศจรรย์: ขอใบรับรองจาก Let\'s Encrypt, ตรวจสอบโดเมนผ่าน Nginx, และเขียนคอนฟิก SSL ในไฟล์ nginx.conf ให้เสร็จสรรพในคำสั่งเดียว',
            },
            {
              command: 'certbot renew --dry-run',
              usageTh: 'sudo certbot renew --dry-run',
              descriptionTh:
                'จำลองการทดสอบต่ออายุใบรับรองทั้งหมดในเครื่อง เพื่อพิสูจน์ว่าระบบต่ออายุอัตโนมัติจะทำงานได้จริงโดยไม่ติดข้อผิดพลาดก่อนถึงวันหมดอายุจริง',
            },
            {
              command: 'certbot certificates',
              usageTh: 'sudo certbot certificates',
              descriptionTh:
                'แสดงรายชื่อโดเมนทั้งหมดที่มีใบรับรองอยู่ในเครื่อง ที่อยู่ของไฟล์ cert/key และจำนวนวันที่เหลือก่อนหมดอายุ',
            },
            {
              command: 'mkcert -install && mkcert localhost 127.0.0.1',
              usageTh: 'mkcert -install && mkcert localhost 127.0.0.1',
              descriptionTh:
                'สร้าง Local Root CA ลงในเบราว์เซอร์เครื่องตนเอง และออกใบรับรองสำหรับ localhost ทำให้ทดสอบ HTTPS ในเครื่องพัฒนาได้โดยไม่ขึ้นแจ้งเตือนสีแดง',
            },
          ],
        },
        {
          groupTitleTh:
            '3. การคอนฟิก Nginx ปลอดภัยสูงสุดระดับ A+ (Nginx TLS Best Practices)',
          groupDescriptionTh:
            'การตั้งค่าเว็บเซิร์ฟเวอร์ Nginx เพื่อรองรับ HTTPS, TLS 1.3 และเปิดใช้งาน HSTS อย่างถูกต้อง',
          commands: [
            {
              command: 'ssl_certificate & ssl_certificate_key',
              usageTh:
                'ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;\nssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;',
              descriptionTh:
                'ชี้ทางไปยังไฟล์ใบรับรองฉบับเต็ม (รวม Intermediate CA) และไฟล์กุญแจลับ Private Key ในบล็อก server { listen 443 ssl; }',
            },
            {
              command: 'ssl_protocols TLSv1.2 TLSv1.3;',
              usageTh: 'ssl_protocols TLSv1.2 TLSv1.3;',
              descriptionTh:
                'อนุญาตเฉพาะโปรโตคอล TLS เวอร์ชัน 1.2 และ 1.3 เท่านั้น ตัดทิ้งเวอร์ชันเก่าที่มีช่องโหว่เพื่อให้ได้คะแนนความปลอดภัยระดับ A+',
            },
            {
              command: 'add_header Strict-Transport-Security (HSTS)',
              usageTh:
                'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;',
              descriptionTh:
                'สั่งให้เบราว์เซอร์จำว่าต้องเข้าเว็บนี้ผ่าน HTTPS เสมอตลอดระยะเวลา 1 ปี ป้องกันการถูกดักสลับเป็น HTTP (SSL Stripping Attack)',
            },
            {
              command: 'HTTP to HTTPS 301 Redirect Block',
              usageTh:
                'server {\n  listen 80;\n  server_name example.com;\n  return 301 https://$host$request_uri;\n}',
              descriptionTh:
                'บล็อก Nginx ดักรับการเข้าถึงทางพอร์ต 80 (HTTP ปกติ) แล้วส่งรหัส 301 บังคับเบราว์เซอร์ให้เปลี่ยนไปใช้ https:// ทันที',
            },
          ],
        },
      ],
    },
  },
] as const satisfies readonly LessonTopic[];
