import { useState } from 'react';
import type { TopicId } from '../types/learning';

interface InteractiveLabProps {
  readonly topicId: TopicId;
}

export function InteractiveLab({ topicId }: InteractiveLabProps) {
  if (topicId === 'react-visual-patterns') {
    return <ReactVisualLab />;
  }
  if (topicId === 'mcp-protocol') {
    return <McpProtocolLab />;
  }
  if (topicId === 'docker-sandbox') {
    return <DockerSandboxLab />;
  }
  if (topicId === 'npm-build-deploy') {
    return <NpmBuildDeployLab />;
  }
  return <HermesAgentLab />;
}

// -------------------------------------------------------------
// 1. React Visual Lab
// -------------------------------------------------------------
function ReactVisualLab() {
  const [count, setCount] = useState<number>(0);
  const [isMemoEnabled, setIsMemoEnabled] = useState<boolean>(true);
  const [renderCount, setRenderCount] = useState<number>(1);
  const [lastDiffTime, setLastDiffTime] = useState<number>(0.3);
  const [lastAction, setLastAction] = useState<string>('เริ่มต้น Component ติดตั้งลง Real DOM ครั้งแรก');

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    setRenderCount((prev) => prev + 1);
    setLastDiffTime(Number((0.2 + Math.random() * 0.3).toFixed(2)));
    setLastAction(`State เปลี่ยนเป็น count = ${count + 1} -> Virtual DOM ตรวจพบความต่าง -> อัปเดตเฉพาะ <span> บน Real DOM`);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
    setRenderCount((prev) => prev + 1);
    setLastDiffTime(Number((0.2 + Math.random() * 0.3).toFixed(2)));
    setLastAction(`State เปลี่ยนเป็น count = ${count - 1} -> Virtual DOM ตรวจพบความต่าง -> อัปเดตเฉพาะ <span> บน Real DOM`);
  };

  const handleReset = () => {
    setCount(0);
    setRenderCount((prev) => prev + 1);
    setLastAction('รีเซ็ต State เป็น 0 -> Re-render ทันที');
  };

  return (
    <div className="interactive-lab-container" data-testid="react-visual-lab">
      <div className="lab-header">
        <div className="lab-badge">⚡ Interactive Lab</div>
        <h4 className="lab-title">ห้องทดลอง Virtual DOM & Reconciliation (จำลองการทำงานของ React)</h4>
        <p className="lab-desc">
          คลิกปุ่มเพื่อสังเกตการเปรียบเทียบ Virtual DOM Diffing: เมื่อ State เปลี่ยน React จะวาดต้นไม้จำลองในหน่วยความจำ แล้วอัปเดตเฉพาะโหนดที่เปลี่ยนจริงบน Real DOM เท่านั้น
        </p>
      </div>

      <div className="lab-controls-bar">
        <button type="button" className="lab-btn primary" onClick={handleIncrement}>
          + เพิ่มค่า (setCount + 1)
        </button>
        <button type="button" className="lab-btn" onClick={handleDecrement}>
          - ลดค่า (setCount - 1)
        </button>
        <button type="button" className="lab-btn" onClick={handleReset}>
          รีเซ็ต (Reset)
        </button>
        <button
          type="button"
          className={`lab-btn toggle ${isMemoEnabled ? 'active' : ''}`}
          onClick={() => setIsMemoEnabled((prev) => !prev)}
        >
          {isMemoEnabled ? '🟢 เปิด React.memo (ข้ามโหนดคงที่)' : '⚪ ปิด React.memo'}
        </button>
      </div>

      <div className="lab-metrics-grid">
        <div className="lab-metric-card">
          <span className="metric-label">ค่า State ปัจจุบัน</span>
          <span className="metric-value highlight">{count}</span>
        </div>
        <div className="lab-metric-card">
          <span className="metric-label">จำนวนรอบ Render</span>
          <span className="metric-value">{renderCount} ครั้ง</span>
        </div>
        <div className="lab-metric-card">
          <span className="metric-label">ความเร็ว Diffing ใน RAM</span>
          <span className="metric-value">{lastDiffTime} ms</span>
        </div>
        <div className="lab-metric-card">
          <span className="metric-label">จำนวนโหนดที่เขียนลง Real DOM</span>
          <span className="metric-value success">1 โหนด (&lt;span&gt;)</span>
        </div>
      </div>

      <div className="vdom-comparison-grid">
        <div className="vdom-box">
          <div className="vdom-box-title">🌳 1. Virtual DOM Tree (ในหน่วยความจำ)</div>
          <div className="tree-node parent">
            <code>&lt;App /&gt;</code>
            <span className="node-badge static">คงที่</span>
          </div>
          <div className="tree-branch">
            <div className={`tree-node child ${isMemoEnabled ? 'memoized' : ''}`}>
              <code>&lt;Header title="ระบบนับเลข" /&gt;</code>
              <span className="node-badge static">{isMemoEnabled ? 'ข้ามการ Re-render (memo)' : 'คงที่'}</span>
            </div>
            <div className="tree-node child changed">
              <code>&lt;CounterBadge count=&#123;{count}&#125; /&gt;</code>
              <span className="node-badge dirty">ตรวจพบการเปลี่ยนแปลง (Diffing)</span>
            </div>
          </div>
        </div>

        <div className="vdom-box real-dom">
          <div className="vdom-box-title">🖥️ 2. Real DOM บนหน้าจอเบราว์เซอร์</div>
          <div className="real-dom-preview">
            <div className="dom-element static-elem">
              <code>&lt;h1&gt;ระบบนับเลข&lt;/h1&gt;</code>
              <small>(ไม่ถูกแตะต้อง ไม่กระตุก)</small>
            </div>
            <div className="dom-element patched-elem">
              <code>&lt;span className="counter-val"&gt;{count}&lt;/span&gt;</code>
              <small className="patch-tag">⚡ อัปเดตเฉพาะจุดนี้จุดเดียว!</small>
            </div>
          </div>
        </div>
      </div>

      <div className="lab-log-box">
        <span className="log-label">สถานะการทำงานแบบเรียลไทม์:</span>
        <span className="log-text">{lastAction}</span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. Model Context Protocol (MCP) Lab
// -------------------------------------------------------------
function McpProtocolLab() {
  const [transport, setTransport] = useState<'stdio' | 'sse'>('stdio');
  const [lastMethod, setLastMethod] = useState<string>('initialize');
  const [packetLog, setPacketLog] = useState<readonly string[]>([
    'Client -> Server: {"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05"}}',
    'Server -> Client: {"jsonrpc": "2.0", "id": 1, "result": {"protocolVersion": "2024-11-05", "capabilities": {"tools": {}, "resources": {}}}}',
  ]);
  const [simulatedTools, setSimulatedTools] = useState<readonly string[]>([
    'read_file',
    'write_file',
    'query_sqlite',
  ]);

  const sendMethod = (method: string, requestJson: string, responseJson: string) => {
    setLastMethod(method);
    setPacketLog((prev) => [
      `Client -> Server [${transport}]: ${requestJson}`,
      `Server -> Client [${transport}]: ${responseJson}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleInitialize = () => {
    sendMethod(
      'initialize',
      '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05"}}',
      '{"jsonrpc": "2.0", "id": 1, "result": {"protocolVersion": "2024-11-05", "serverInfo": {"name": "demo-mcp-server", "version": "1.0.0"}}}',
    );
  };

  const handleListTools = () => {
    sendMethod(
      'tools/list',
      '{"jsonrpc": "2.0", "id": 2, "method": "tools/list"}',
      '{"jsonrpc": "2.0", "id": 2, "result": {"tools": [{"name": "read_file"}, {"name": "write_file"}, {"name": "query_sqlite"}]}}',
    );
    setSimulatedTools(['read_file', 'write_file', 'query_sqlite', 'execute_command']);
  };

  const handleCallTool = (toolName: string) => {
    sendMethod(
      'tools/call',
      `{"jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": {"name": "${toolName}", "arguments": {"query": "SELECT * FROM users;"}}}`,
      `{"jsonrpc": "2.0", "id": 3, "result": {"content": [{"type": "text", "text": "ผลลัพธ์จาก ${toolName}: 3 rows returned successfully"}]}}`,
    );
  };

  const handleReadResource = () => {
    sendMethod(
      'resources/read',
      '{"jsonrpc": "2.0", "id": 4, "method": "resources/read", "params": {"uri": "file:///project/app.log"}}',
      '{"jsonrpc": "2.0", "id": 4, "result": {"contents": [{"uri": "file:///project/app.log", "text": "[INFO] System healthy"}]}}',
    );
  };

  return (
    <div className="interactive-lab-container" data-testid="mcp-protocol-lab">
      <div className="lab-header">
        <div className="lab-badge">🔌 Interactive MCP Protocol Inspector</div>
        <h4 className="lab-title">ห้องทดลองจำลองการส่งข้อมูล JSON-RPC 2.0 ระหว่าง Host และ MCP Server</h4>
        <p className="lab-desc">
          กดคลิกสั่งรันเมธอดต่างๆ เพื่อดูแพ็กเกจ JSON-RPC 2.0 ที่ส่งผ่านท่อ Stdio / SSE และสังเกตการค้นพบ Tools และการเรียกรันคำสั่งจริง
        </p>
      </div>

      <div className="lab-controls-bar">
        <button type="button" className="lab-btn primary" onClick={handleInitialize}>
          1. ส่ง initialize (Handshake)
        </button>
        <button type="button" className="lab-btn" onClick={handleListTools}>
          2. ส่ง tools/list (ค้นหาเครื่องมือ)
        </button>
        <button type="button" className="lab-btn" onClick={() => handleCallTool('query_sqlite')}>
          3. สั่ง tools/call (query_sqlite)
        </button>
        <button type="button" className="lab-btn" onClick={handleReadResource}>
          4. อ่าน resources/read (app.log)
        </button>
        <button
          type="button"
          className="lab-btn toggle"
          onClick={() => setTransport((prev) => (prev === 'stdio' ? 'sse' : 'stdio'))}
        >
          {transport === 'stdio' ? 'ท่อส่ง: 🟢 stdio pipe (Local)' : 'ท่อส่ง: 🌐 SSE HTTP Stream'}
        </button>
      </div>

      <div className="mcp-actors-diagram">
        <div className="actor-card host">
          <span className="actor-icon">🖥️</span>
          <span className="actor-name">MCP Host Application</span>
          <span className="actor-role">Claude Desktop / Hermes Agent</span>
        </div>
        <div className="transport-pipe-indicator">
          <span className="pipe-flow-arrow">⇄</span>
          <span className="pipe-label">JSON-RPC 2.0 via {transport}</span>
        </div>
        <div className="actor-card server">
          <span className="actor-icon">⚙️</span>
          <span className="actor-name">MCP Server (Standalone)</span>
          <span className="actor-role">SQLite & Filesystem Provider</span>
        </div>
      </div>

      <div className="mcp-details-grid">
        <div className="tools-card">
          <h5>คลังเครื่องมือที่ลงทะเบียนในเซิร์ฟเวอร์ (Available Tools):</h5>
          <div className="artifact-tags">
            {simulatedTools.map((t) => (
              <span key={t} className="artifact-tag tool-tag" onClick={() => handleCallTool(t)}>
                🛠️ {t} (คลิกเพื่อทดสอบเรียก)
              </span>
            ))}
          </div>
        </div>

        <div className="mcp-console-view">
          <div className="console-title">บันทึกแพ็กเกจข้อความ JSON-RPC ล่าสุด (Method: {lastMethod})</div>
          <div className="console-stream">
            {packetLog.map((log) => (
              <div key={log} className="stream-line">
                <code>{log}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. Docker & Sandbox Lab
// -------------------------------------------------------------
function DockerSandboxLab() {
  const [ramLimit, setRamLimit] = useState<number>(512);
  const [isNetworkDisabled, setIsNetworkDisabled] = useState<boolean>(true);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [containerState, setContainerState] = useState<'idle' | 'running' | 'oom' | 'done'>('idle');
  const [usedRam, setUsedRam] = useState<number>(45);
  const [terminalLog, setTerminalLog] = useState<readonly string[]>([
    'Sandbox Manager: พร้อมรับคำสั่งทดลองรันในกล่อง...',
  ]);

  const addLog = (msg: string) => {
    setTerminalLog((prev) => [...prev.slice(-5), msg]);
  };

  const handleSpawn = () => {
    setContainerState('running');
    setUsedRam(60);
    addLog(`$ docker run --rm -it -m ${ramLimit}m ${isNetworkDisabled ? '--network none' : '--network bridge'} ${isReadOnly ? '--read-only' : ''} alpine sh`);
    addLog('✔ คอนเทนเนอร์ชั่วคราวเปิดทำงาน (ID: e8f14b2) ใน Linux Namespaces สำเร็จ');
  };

  const handleTestWriteShadow = () => {
    if (containerState !== 'running') {
      addLog('คำเตือน: ต้องเปิดคอนเทนเนอร์ก่อนโดยคลิกปุ่ม Spawn Container');
      return;
    }
    addLog('$ touch /etc/shadow');
    if (isReadOnly) {
      addLog('❌ บล็อกความปลอดภัย: touch: /etc/shadow: Read-only file system (ป้องกันระบบ Host สำเร็จ 🛡️)');
    } else {
      addLog('⚠️ เตือน: ไฟล์ถูกเขียนได้ (เนื่องจากปิดโหมด Read-only)');
    }
  };

  const handleTestLeak = () => {
    if (containerState !== 'running') {
      addLog('คำเตือน: ต้องเปิดคอนเทนเนอร์ก่อน');
      return;
    }
    addLog('$ python -c "a = [0] * 100_000_000" (จำลองสคริปต์กินแรม)');
    setUsedRam(ramLimit);
    setContainerState('oom');
    addLog(`💥 Kernel cgroups แจ้งเตือน: ใช้แรมเกินโควต้า ${ramLimit}MB -> OOM Killer สั่ง SIGKILL (137) ดับทันที!`);
    addLog('✔ คอนเทนเนอร์หยุดทำงานและถูกลบทิ้งอัตโนมัติ (--rm) เครื่อง Host ปลอดภัย 100%');
  };

  const handleTestNetwork = () => {
    if (containerState !== 'running') {
      addLog('คำเตือน: ต้องเปิดคอนเทนเนอร์ก่อน');
      return;
    }
    addLog('$ curl https://external-api.com');
    if (isNetworkDisabled) {
      addLog('🔒 บล็อกความปลอดภัย: curl: (6) Could not resolve host (Air-Gapped สำเร็จ ป้องกันข้อมูลรั่วไหล)');
    } else {
      addLog('🌐 เชื่อมต่ออินเทอร์เน็ตสำเร็จ: HTTP 200 OK');
    }
  };

  const handleStop = () => {
    setContainerState('done');
    setUsedRam(0);
    addLog('$ docker stop -t 2 e8f14b2');
    addLog('✔ คอนเทนเนอร์ดับเรียบร้อยและถูกลบทำลายทิ้งทันที (--rm) ไม่เหลือขยะตกค้าง');
  };

  return (
    <div className="interactive-lab-container" data-testid="docker-sandbox-lab">
      <div className="lab-header">
        <div className="lab-badge">🛡️ Interactive Sandbox Lab</div>
        <h4 className="lab-title">ห้องทดลองความปลอดภัย Docker Sandbox & Linux cgroups</h4>
        <p className="lab-desc">
          ปรับแต่งข้อจำกัดของคอนเทนเนอร์ (RAM, Network, Read-only) แล้วทดสอบรันการโจมตีหรือข้อผิดพลาดจำลอง เพื่อดูการกักกันระดับเคอร์เนล
        </p>
      </div>

      <div className="lab-controls-bar">
        <button type="button" className="lab-btn primary" onClick={handleSpawn}>
          1. 🚀 สร้าง Container (docker run --rm)
        </button>
        <button type="button" className="lab-btn" onClick={handleTestWriteShadow}>
          2. 🛡️ ทดสอบเขียนทับ /etc/shadow
        </button>
        <button type="button" className="lab-btn warning" onClick={handleTestLeak}>
          3. 💥 ทดสอบจำลองกินแรมเกิน (Trigger OOM)
        </button>
        <button type="button" className="lab-btn" onClick={handleTestNetwork}>
          4. 🌐 ทดสอบส่งข้อมูลออกเน็ต (curl)
        </button>
        <button type="button" className="lab-btn" onClick={handleStop}>
          5. 🧹 สั่งหยุดและทำลาย (Auto Teardown)
        </button>
      </div>

      <div className="sandbox-settings-panel">
        <div className="setting-control">
          <label>เพดานจำกัดแรม (cgroups Memory Limit): <strong>{ramLimit} MB</strong></label>
          <div className="slider-row">
            <input
              type="range"
              min="128"
              max="1024"
              step="128"
              value={ramLimit}
              onChange={(e) => setRamLimit(Number(e.target.value))}
            />
            <span className="slider-val">{ramLimit} MB</span>
          </div>
        </div>

        <div className="setting-toggles">
          <button
            type="button"
            className={`toggle-tag ${isNetworkDisabled ? 'active' : ''}`}
            onClick={() => setIsNetworkDisabled((prev) => !prev)}
          >
            {isNetworkDisabled ? '🔒 --network none (ตัดเน็ต 100%)' : '🌐 --network bridge (เปิดเน็ต)'}
          </button>
          <button
            type="button"
            className={`toggle-tag ${isReadOnly ? 'active' : ''}`}
            onClick={() => setIsReadOnly((prev) => !prev)}
          >
            {isReadOnly ? '🛡️ --read-only (ห้ามเขียนทับระบบ)' : '⚠️ Read-Write (อนุญาตเขียน)'}
          </button>
        </div>
      </div>

      <div className="container-status-monitor">
        <div className="status-indicator-bar">
          <span className="status-name">
            สถานะ Container: <strong>{containerState.toUpperCase()}</strong>
          </span>
          <span className="ram-meter-label">RAM Usage: {usedRam} MB / {ramLimit} MB</span>
        </div>
        <div className="tier-bar-track">
          <div
            className={`tier-bar-fill ${containerState === 'oom' ? 'danger' : ''}`}
            style={{ width: `${Math.min(100, (usedRam / ramLimit) * 100)}%` }}
          />
        </div>
      </div>

      <div className="terminal-screen">
        <div className="terminal-header">Terminal / Sandbox Console (Alpine Guest)</div>
        <div className="terminal-body">
          {terminalLog.map((log) => (
            <div key={log} className="terminal-line">
              <code>{log}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. npm, Build & Deploy Lab
// -------------------------------------------------------------
function NpmBuildDeployLab() {
  const [pipelineStep, setPipelineStep] = useState<number>(1);
  const [distHash, setDistHash] = useState<string>('1DfoV2vF');
  const [browserStep, setBrowserStep] = useState<string>('ยังไม่มีการเปิดหน้าเว็บ');

  const handleStep1 = () => {
    setPipelineStep(1);
  };

  const handleStep2 = () => {
    setPipelineStep(2);
    setDistHash(Math.random().toString(36).substring(2, 9));
  };

  const handleStep3 = () => {
    setPipelineStep(3);
  };

  const handleStep4 = () => {
    setPipelineStep(4);
    setBrowserStep('1. เบราว์เซอร์ส่ง HTTP GET / -> 2. เซิร์ฟเวอร์ตอบกลับ dist/index.html -> 3. เบราว์เซอร์โหลด /assets/index.js -> 4. CPU ลูกค้ารัน React และวาด DOM สำเร็จ! 🎉');
  };

  return (
    <div className="interactive-lab-container" data-testid="npm-build-deploy-lab">
      <div className="lab-header">
        <div className="lab-badge">🚀 Interactive Pipeline & Request Lab</div>
        <h4 className="lab-title">ห้องทดลองวงจร npm, Build และการเรียกไฟล์ของเบราว์เซอร์</h4>
        <p className="lab-desc">
          คลิกตามลำดับ 4 ขั้นตอนเพื่อดูการเปลี่ยนแปลง: จากโค้ดดิบหลายร้อย MB กลายเป็นโฟลเดอร์ dist/ ขนาดกะทัดรัด และลำดับคำขอที่เบราว์เซอร์เรียกไฟล์เมื่อลูกค้าเปิดเว็บ
        </p>
      </div>

      <div className="lab-controls-bar">
        <button
          type="button"
          className={`lab-btn ${pipelineStep === 1 ? 'primary' : ''}`}
          onClick={handleStep1}
        >
          ขั้นที่ 1: npm install (โหลด Library)
        </button>
        <button
          type="button"
          className={`lab-btn ${pipelineStep === 2 ? 'primary' : ''}`}
          onClick={handleStep2}
        >
          ขั้นที่ 2: npm run build (คอมไพล์)
        </button>
        <button
          type="button"
          className={`lab-btn ${pipelineStep === 3 ? 'primary' : ''}`}
          onClick={handleStep3}
        >
          ขั้นที่ 3: Deploy ขึ้น Cloud / CDN
        </button>
        <button
          type="button"
          className={`lab-btn ${pipelineStep === 4 ? 'primary' : ''}`}
          onClick={handleStep4}
        >
          ขั้นที่ 4: จำลองลูกค้าเปิดหน้าเว็บ
        </button>
      </div>

      <div className="pipeline-visual-display">
        {pipelineStep === 1 && (
          <div className="pipeline-stage-card">
            <h5>📁 สถานะโปรเจกต์หลังรัน `npm install`:</h5>
            <div className="file-tree-preview">
              <div>📄 package.json <small>(ระบุ react, typescript, vite)</small></div>
              <div>📄 package-lock.json <small>(ล็อกเวอร์ชันแม่นยำ 100%)</small></div>
              <div>📁 node_modules/ <small className="warn-tag">ขนาด 185 MB (ห้ามนำขึ้นเซิร์ฟเวอร์!)</small></div>
              <div>📁 src/ <small>(ซอร์สโค้ดดิบ JSX/TSX ที่เบราว์เซอร์ยังอ่านไม่รู้เรื่อง)</small></div>
            </div>
          </div>
        )}

        {pipelineStep === 2 && (
          <div className="pipeline-stage-card">
            <h5>⚡ ผลลัพธ์หลังรัน `npm run build` (tsc -b &amp;&amp; vite build):</h5>
            <div className="file-tree-preview">
              <div className="dist-folder-title">📁 โฟลเดอร์ที่พร้อมนำไปใช้งานจริง: dist/ (ขนาดรวมเพียง 320 KB)</div>
              <div className="dist-file">📄 dist/index.html <small>(โครงสร้างหลัก 0.5 KB)</small></div>
              <div className="dist-file">📄 dist/assets/index-{distHash}.js <small>(รวมโค้ด React ทั้งหมดที่บีบอัดแล้ว)</small></div>
              <div className="dist-file">📄 dist/assets/index-{distHash}.css <small>(รวมสไตล์ทั้งหมด)</small></div>
            </div>
            <p className="dist-note">
              ✔ <strong>สังเกต:</strong> ไม่ต้องใช้ node_modules อีกต่อไป โค้ดทั้งหมดถูกมัดรวมและสร้าง Content Hash ({distHash}) กันแคชค้างเรียบร้อย!
            </p>
          </div>
        )}

        {pipelineStep === 3 && (
          <div className="pipeline-stage-card">
            <h5>☁️ การ Deploy โฟลเดอร์ `dist/` ขึ้นระบบ Hosting &amp; CDN:</h5>
            <div className="cdn-edge-network">
              <div className="cdn-node">🌏 Cloudflare / Vercel Edge Singapore</div>
              <div className="cdn-node">🌏 Cloudflare / Vercel Edge Bangkok</div>
              <div className="cdn-node">🌏 Cloudflare / Vercel Edge Tokyo</div>
            </div>
            <p className="dist-note">
              ไฟล์ใน <code>dist/</code> ถูกกระจายไปยังเซิร์ฟเวอร์ทั่วโลก ลูกค้าไม่ว่าจะเปิดจากที่ไหนก็จะดาวน์โหลดได้เร็วในระดับมิลลิวินาที
            </p>
          </div>
        )}

        {pipelineStep === 4 && (
          <div className="pipeline-stage-card customer-view">
            <h5>🌐 ลำดับการเรียกไฟล์เมื่อลูกค้าเข้า URL (Client Waterfall Request):</h5>
            <div className="waterfall-steps">
              <div className="waterfall-row">
                <span className="req-num">1</span>
                <span className="req-url">GET https://my-app.com/</span>
                <span className="res-file">เซิร์ฟเวอร์ส่ง: <strong>index.html</strong></span>
              </div>
              <div className="waterfall-row">
                <span className="req-num">2</span>
                <span className="req-url">GET /assets/index-{distHash}.css</span>
                <span className="res-file">โหลดสไตล์ตกแต่งหน้าตา</span>
              </div>
              <div className="waterfall-row">
                <span className="req-num">3</span>
                <span className="req-url">GET /assets/index-{distHash}.js</span>
                <span className="res-file">โหลดโค้ด React มาที่เครื่องลูกค้า</span>
              </div>
              <div className="waterfall-row client-render">
                <span className="req-num">4</span>
                <span className="req-url">CPU ลูกค้ารัน JavaScript</span>
                <span className="res-file">วาด DOM ลงใน <code>&lt;div id="root"&gt;</code> หน้าจอแสดงผลทันที!</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="lab-log-box">
        <span className="log-label">คำอธิบายขั้นตอน:</span>
        <span className="log-text">{browserStep}</span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. Hermes Agent Lab
// -------------------------------------------------------------
function HermesAgentLab() {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isDone, setIsDone] = useState<boolean>(false);

  const handleNextLoop = () => {
    if (activeStage < 5) {
      setActiveStage((prev) => prev + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleResetLoop = () => {
    setActiveStage(1);
    setIsDone(false);
  };

  return (
    <div className="interactive-lab-container" data-testid="hermes-agent-lab">
      <div className="lab-header">
        <div className="lab-badge">🧠 Interactive Agent Engine</div>
        <h4 className="lab-title">ห้องทดลองจำลอง 5-Step Execution Loop ของ Hermes Agent</h4>
        <p className="lab-desc">
          ทดลองจำลองวงจรคิด วิเคราะห์ เรียกเครื่องมือ และตกผลึกทักษะใหม่ลงในฐานข้อมูลความจำถาวร SQLite
        </p>
      </div>

      <div className="lab-controls-bar">
        <button type="button" className="lab-btn primary" onClick={handleNextLoop} disabled={isDone}>
          {isDone ? '✔ การทำงานวนลูปเสร็จสิ้น' : `▶ รันขั้นตอนที่ ${activeStage} สู่ขั้นถัดไป`}
        </button>
        <button type="button" className="lab-btn" onClick={handleResetLoop}>
          เริ่มใหม่ (Reset Loop)
        </button>
      </div>

      <div className="agent-loop-flow">
        <div className={`loop-step-box ${activeStage === 1 ? 'active' : activeStage > 1 ? 'passed' : ''}`}>
          <span className="step-num">1</span>
          <span className="step-label">Input Routing &amp; SOUL.md</span>
        </div>
        <div className={`loop-step-box ${activeStage === 2 ? 'active' : activeStage > 2 ? 'passed' : ''}`}>
          <span className="step-num">2</span>
          <span className="step-label">Prompt 3 ชั้น (KV Cache)</span>
        </div>
        <div className={`loop-step-box ${activeStage === 3 ? 'active' : activeStage > 3 ? 'passed' : ''}`}>
          <span className="step-num">3</span>
          <span className="step-label">LLM Tool Calling</span>
        </div>
        <div className={`loop-step-box ${activeStage === 4 ? 'active' : activeStage > 4 ? 'passed' : ''}`}>
          <span className="step-num">4</span>
          <span className="step-label">Subagent / Sandbox Execution</span>
        </div>
        <div className={`loop-step-box ${activeStage === 5 ? 'active' : isDone ? 'passed' : ''}`}>
          <span className="step-num">5</span>
          <span className="step-label">Skill Crystallization (SQLite)</span>
        </div>
      </div>

      <div className="lab-metrics-grid">
        <div className="lab-metric-card">
          <span className="metric-label">อัตราแคช KV Cache Hit</span>
          <span className="metric-value highlight">100%</span>
        </div>
        <div className="lab-metric-card">
          <span className="metric-label">สิทธิ์การรัน (Permission)</span>
          <span className="metric-value">Smart Mode (Auto-Approve Read)</span>
        </div>
        <div className="lab-metric-card">
          <span className="metric-label">สถานะ Subagent</span>
          <span className="metric-value">{activeStage >= 4 ? 'ทำงานเสร็จสิ้น' : 'สแตนด์บาย'}</span>
        </div>
        <div className="lab-metric-card">
          <span className="metric-label">ทักษะใหม่ใน SQLite</span>
          <span className="metric-value success">{isDone || activeStage === 5 ? '✔ บันทึกแล้ว' : 'กำลังประมวลผล'}</span>
        </div>
      </div>
    </div>
  );
}
