import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../App';

describe('TK Learning Center', () => {
  it('renders the main category hub with categorized topics and status badges', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /TK Learning Center/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /ทั้งหมด/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /AI Agents & LLM/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /System Architecture/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Hermes Agent \(Nous Research\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Model Context Protocol \(MCP\)/i }),
    ).toBeInTheDocument();
  });

  it('filters topic cards when selecting a category on the main hub', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /System Architecture/i }),
    );

    expect(
      screen.getByRole('heading', { name: /Docker & Sandbox Execution/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        name: /Hermes Agent \(Nous Research\)/i,
      }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /ทั้งหมด/i }));
    expect(
      screen.getByRole('heading', { name: /Hermes Agent \(Nous Research\)/i }),
    ).toBeInTheDocument();
  });

  it('opens the Hermes Agent Thai visual lesson and shows the left-hand navigator sidebar', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /เข้าสู่บทเรียน Hermes Agent/i }),
    );

    expect(
      screen.getByRole('heading', {
        name: /Hermes Agent คืออะไร/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Agent Harness/i)).toBeInTheDocument();

    // Verify sidebar navigator exists
    const sidebar = screen.getByLabelText(/สารบัญบทเรียน/i);
    expect(within(sidebar).getByText(/เมนูนำทาง \(Navigator\)/i)).toBeInTheDocument();
    expect(
      within(sidebar).getByRole('button', { name: /สถาปัตยกรรม 4 เลเยอร์/i }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /กลับหน้าหมวดหมู่/i }),
    );

    expect(
      screen.getByRole('heading', { name: /หมวดหมู่ความรู้ทั้งหมด/i }),
    ).toBeInTheDocument();
  });

  it('switches between the 4 architecture layers and displays Thai explanations and source files', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /เข้าสู่บทเรียน Hermes Agent/i }),
    );

    // Switch to Layers section via left-hand sidebar
    const sidebar = screen.getByLabelText(/สารบัญบทเรียน/i);
    await user.click(
      within(sidebar).getByRole('button', { name: /สถาปัตยกรรม 4 เลเยอร์/i }),
    );

    const inspector = screen.getByTestId('layer-inspector');
    expect(within(inspector).getByText(/hermes_cli\/main\.py/i)).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /วงจร AIAgent & จัดการบริบท 3 ชั้น/i }),
    );
    expect(within(inspector).getByText(/agent\/prompt_builder\.py/i)).toBeInTheDocument();
    expect(within(inspector).getByText(/Tiered Prompt Assembly/i)).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: /คลังเครื่องมือ, Subagent & ตู้คอนเทนเนอร์/i,
      }),
    );
    expect(within(inspector).getByText(/tools\/delegate_tool\.py/i)).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: /ความจำถาวร & การสร้างทักษะใหม่/i,
      }),
    );
    expect(within(inspector).getByText(/hermes_state\.py/i)).toBeInTheDocument();
    expect(within(inspector).getByText(/SQLite/i)).toBeInTheDocument();
  });

  it('steps through the 5-step execution loop via step buttons and next/prev buttons', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /เข้าสู่บทเรียน Hermes Agent/i }),
    );

    // Switch to Workflow section via left-hand sidebar
    const sidebar = screen.getByLabelText(/สารบัญบทเรียน/i);
    await user.click(
      within(sidebar).getByRole('button', { name: /วงจรการทำงาน 5 ขั้น/i }),
    );

    const stepBox = screen.getByTestId('workflow-step-detail');
    expect(within(stepBox).getByText(/SOUL\.md/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /ขั้นตอนถัดไป/i }));
    expect(within(stepBox).getByText(/prompt_builder\.py/i)).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /ขั้นที่ 5: บันทึกทักษะใหม่/i }),
    );
    expect(within(stepBox).getByText(/Procedural Skill/i)).toBeInTheDocument();
  });

  it('displays the context tier visual chart and switches permission simulator modes', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /เข้าสู่บทเรียน Hermes Agent/i }),
    );

    // Switch to Tiers section via left-hand sidebar
    const sidebar = screen.getByLabelText(/สารบัญบทเรียน/i);
    await user.click(
      within(sidebar).getByRole('button', { name: /แผนภูมิบริบท & ความจำ/i }),
    );
    expect(screen.getByText(/Stable Tier/i)).toBeInTheDocument();
    expect(screen.getByText(/KV Cache Hit 100%/i)).toBeInTheDocument();

    // Switch to Permissions section via left-hand sidebar
    await user.click(
      within(sidebar).getByRole('button', { name: /แบบจำลองสิทธิ์ความปลอดภัย/i }),
    );

    const permissionPanel = screen.getByTestId('permission-panel');
    expect(
      within(permissionPanel).getByText(/อนุมัติคำสั่งอ่านไฟล์อัตโนมัติ/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /โหมด: Manual/i }));
    expect(
      within(permissionPanel).getByText(/ถามผู้ใช้ทุกครั้งก่อนรันเครื่องมือ/i),
    ).toBeInTheDocument();
  });

  it('renders the Hermes Agent command reference catalog with categorized slash commands', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /เข้าสู่บทเรียน Hermes Agent/i }),
    );

    // Switch to Commands section via left-hand sidebar
    const sidebar = screen.getByLabelText(/สารบัญบทเรียน/i);
    await user.click(
      within(sidebar).getByRole('button', { name: /คลังคำสั่ง & คีย์ลัด/i }),
    );

    expect(
      screen.getByRole('heading', {
        name: /คลังคำสั่งและคีย์ลัดทั้งหมด \(Command Reference & CLI Catalog\)/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('/new [name]')).toBeInTheDocument();
    expect(screen.getByText('/resume [name|id]')).toBeInTheDocument();
    expect(screen.getByText('/goal <prompt>')).toBeInTheDocument();
    expect(screen.getByText('/tools [list|enable|disable] [name...]')).toBeInTheDocument();
    expect(screen.getByText('/usage')).toBeInTheDocument();
    expect(screen.getByText('/quit')).toBeInTheDocument();
  });

  it('opens and interacts with the React Visual Learning lesson using the left-hand navigator', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Frontend & React/i }));

    const launchBtn = screen.getByRole('button', {
      name: /เข้าสู่บทเรียน React Visual Learning/i,
    });
    expect(launchBtn).toBeInTheDocument();

    await user.click(launchBtn);

    // Verify React lesson header and overview section
    expect(
      screen.getByRole('heading', {
        name: /React ทำงานอย่างไร/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Component-Based Architecture/i)).toBeInTheDocument();

    // Verify sidebar navigator with React-specific titles
    const sidebar = screen.getByLabelText(/สารบัญบทเรียน/i);
    expect(
      within(sidebar).getByRole('button', {
        name: /4 โครงสร้างหลัก \(Components & State\)/i,
      }),
    ).toBeInTheDocument();

    // Switch to Layers section via left-hand navigator
    await user.click(
      within(sidebar).getByRole('button', {
        name: /4 โครงสร้างหลัก \(Components & State\)/i,
      }),
    );

    // Switch to State & Props layer
    await user.click(
      screen.getByRole('button', {
        name: /ตัวแปร State และการส่งข้อมูล Props/i,
      }),
    );
    expect(screen.getByText(/Lifting State Up/i)).toBeInTheDocument();

    // Switch to React Hooks & Syntax catalog via left-hand navigator
    await user.click(
      within(sidebar).getByRole('button', {
        name: /คลัง React Hooks & Syntax/i,
      }),
    );
    expect(screen.getByText(/useState\(initialValue\)/i)).toBeInTheDocument();
    expect(screen.getByText(/useEffect\(callback, deps\)/i)).toBeInTheDocument();

    // Go back to category hub
    await user.click(screen.getByRole('button', { name: /กลับหน้าหมวดหมู่/i }));
    expect(
      screen.getByRole('heading', { name: /หมวดหมู่ความรู้ทั้งหมด/i }),
    ).toBeInTheDocument();
  });

  it('opens and interacts with the npm, Build & Deployment lesson', async () => {
    const user = userEvent.setup();
    render(<App />);

    const launchBtn = screen.getByRole('button', {
      name: /เข้าสู่บทเรียน npm, Build & Deployment/i,
    });
    expect(launchBtn).toBeInTheDocument();

    await user.click(launchBtn);

    // Verify headline and overview section
    expect(
      screen.getByRole('heading', {
        name: /npm, Build & Deployment ทำงานอย่างไร/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/จัดการ Library ด้วย npm/i),
    ).toBeInTheDocument();

    const sidebar = screen.getByLabelText(/สารบัญบทเรียน/i);

    // Switch to workflow section via left-hand sidebar
    await user.click(
      within(sidebar).getByRole('button', {
        name: /ขั้นตอนการ Build & Deploy/i,
      }),
    );
    expect(screen.getByText(/ลูกค้าเปิดหน้าเว็บ/i)).toBeInTheDocument();

    // Switch to commands section via left-hand sidebar
    await user.click(
      within(sidebar).getByRole('button', {
        name: /คลังคำสั่ง npm & Deployment/i,
      }),
    );
    expect(screen.getByText('npm install (หรือ npm i)')).toBeInTheDocument();
    expect(screen.getAllByText('npm run build').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('1. Deploy เฉพาะโฟลเดอร์ dist/')).toBeInTheDocument();
    expect(screen.getByText('2. ลูกค้าพิมพ์ URL -> ขอ index.html')).toBeInTheDocument();

    // Go back to hub
    await user.click(screen.getByRole('button', { name: /กลับหน้าหมวดหมู่/i }));
    expect(
      screen.getByRole('heading', { name: /หมวดหมู่ความรู้ทั้งหมด/i }),
    ).toBeInTheDocument();
  });

  it('opens and interacts with the Model Context Protocol (MCP) lesson', async () => {
    const user = userEvent.setup();
    render(<App />);

    const launchBtn = screen.getByRole('button', {
      name: /เข้าสู่บทเรียน Model Context Protocol \(MCP\)/i,
    });
    expect(launchBtn).toBeInTheDocument();

    await user.click(launchBtn);

    // Verify headline and overview section
    expect(
      screen.getByRole('heading', {
        name: /Model Context Protocol \(MCP\) ทำงานอย่างไร/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Universal Open Standard/i)).toBeInTheDocument();

    const sidebar = screen.getByLabelText(/สารบัญบทเรียน/i);

    // Switch to workflow section via left-hand sidebar
    await user.click(
      within(sidebar).getByRole('button', {
        name: /ขั้นตอนการเชื่อมต่อ & รัน Tool/i,
      }),
    );
    expect(screen.getByText(/LLM เลือกใช้เครื่องมือ/i)).toBeInTheDocument();

    // Switch to commands section via left-hand sidebar
    await user.click(
      within(sidebar).getByRole('button', {
        name: /คลังคำสั่ง MCP Protocol & Tools/i,
      }),
    );
    expect(screen.getByText('tools/list')).toBeInTheDocument();
    expect(screen.getByText('tools/call')).toBeInTheDocument();
    expect(screen.getByText('resources/read')).toBeInTheDocument();

    // Go back to hub
    await user.click(screen.getByRole('button', { name: /กลับหน้าหมวดหมู่/i }));
    expect(
      screen.getByRole('heading', { name: /หมวดหมู่ความรู้ทั้งหมด/i }),
    ).toBeInTheDocument();
  });

  it('opens and interacts with the Docker & Sandbox Execution lesson', async () => {
    const user = userEvent.setup();
    render(<App />);

    const launchBtn = screen.getByRole('button', {
      name: /เข้าสู่บทเรียน Docker & Sandbox Execution/i,
    });
    expect(launchBtn).toBeInTheDocument();

    await user.click(launchBtn);

    // Verify headline and overview section
    expect(
      screen.getByRole('heading', {
        name: /Docker & Sandbox ทำงานอย่างไร/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Ephemeral & Disposable Containers/i)).toBeInTheDocument();

    const sidebar = screen.getByLabelText(/สารบัญบทเรียน/i);

    // Switch to workflow section via left-hand sidebar
    await user.click(
      within(sidebar).getByRole('button', {
        name: /5 ขั้นตอน Container Lifecycle/i,
      }),
    );
    expect(screen.getByText(/สั่งทำลายทิ้งทันที/i)).toBeInTheDocument();

    // Switch to commands section via left-hand sidebar
    await user.click(
      within(sidebar).getByRole('button', {
        name: /คลังคำสั่ง Docker & Security Flags/i,
      }),
    );
    expect(screen.getByText('docker run --network none')).toBeInTheDocument();
    expect(screen.getByText('--read-only')).toBeInTheDocument();
    expect(screen.getByText('--cap-drop ALL')).toBeInTheDocument();

    // Go back to hub
    await user.click(screen.getByRole('button', { name: /กลับหน้าหมวดหมู่/i }));
    expect(
      screen.getByRole('heading', { name: /หมวดหมู่ความรู้ทั้งหมด/i }),
    ).toBeInTheDocument();
  });
});
