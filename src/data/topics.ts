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
] as const satisfies readonly LessonTopic[];
