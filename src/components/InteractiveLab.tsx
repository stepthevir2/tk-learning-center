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
  if (topicId === 'https-certificate') {
    return <HttpsCertificateLab />;
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

// -------------------------------------------------------------
// 6. HTTPS & Certificate Lab
// -------------------------------------------------------------
type HttpsLabTab = 'handshake' | 'diffie-hellman' | 'pki-chain' | 'cli-generator';
type PkiScenario = 'valid' | 'expired' | 'self-signed' | 'mismatched-domain';

export function HttpsCertificateLab() {
  const [activeTab, setActiveTab] = useState<HttpsLabTab>('handshake');

  // Tab 1: Handshake & Packet Flight Sniffer
  const [handshakeStep, setHandshakeStep] = useState<number>(1);
  const [protocol, setProtocol] = useState<'http' | 'https'>('https');
  const [customPayload, setCustomPayload] = useState<string>(
    '{"username":"admin","password":"supersecretpassword123","credit_card":"4111-2222-3333-4444"}',
  );
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [isTampered, setIsTampered] = useState<boolean>(false);
  const [packetLocation, setPacketLocation] = useState<'client' | 'wire' | 'server'>('client');

  // Tab 2: Diffie-Hellman ECDHE Visualizer
  const [clientSecretInt, setClientSecretInt] = useState<number>(6);
  const [serverSecretInt, setServerSecretInt] = useState<number>(15);
  const dhGenerator = 5;
  const dhPrime = 23;
  // Math: (g^a) mod p and (g^b) mod p
  const clientPublicDh = Math.pow(dhGenerator, clientSecretInt) % dhPrime;
  const serverPublicDh = Math.pow(dhGenerator, serverSecretInt) % dhPrime;
  const clientMasterSecret = Math.pow(serverPublicDh, clientSecretInt) % dhPrime;
  const serverMasterSecret = Math.pow(clientPublicDh, serverSecretInt) % dhPrime;

  // Tab 3: PKI Chain & Browser Lock Simulator
  const [pkiScenario, setPkiScenario] = useState<PkiScenario>('valid');
  const [isCertTampered, setIsCertTampered] = useState<boolean>(false);

  // Tab 4: CLI Generator
  const [cliPreset, setCliPreset] = useState<number>(1);
  const [copiedCli, setCopiedCli] = useState<boolean>(false);

  const handleTransmitPacket = () => {
    setIsTransmitting(true);
    setPacketLocation('client');
    setTimeout(() => {
      setPacketLocation('wire');
    }, 600);
    setTimeout(() => {
      setPacketLocation('server');
      setIsTransmitting(false);
    }, 1400);
  };

  const handshakeSteps = [
    {
      num: 1,
      nameTh: 'Client Hello',
      descTh:
        'เบราว์เซอร์ส่งข้อความ Client Hello ระบุ Cipher Suites ที่รองรับ (เช่น TLS_AES_256_GCM_SHA384), ชื่อโดเมนที่ต้องการเข้าผ่าน SNI (example.com) และค่า Public Key Share ของตนเอง (ECDHE x25519)',
      badge: 'Client -> Server',
    },
    {
      num: 2,
      nameTh: 'Server Hello & Key Share',
      descTh:
        'เซิร์ฟเวอร์ตอบรับข้อตกลง เลือก Cipher Suite ที่ปลอดภัยที่สุด และส่งค่า Public Key Share ของฝั่งเซิร์ฟเวอร์กลับมาในรอบเดียว (1-RTT)',
      badge: 'Server -> Client',
    },
    {
      num: 3,
      nameTh: 'Encrypted Certificate & Signature',
      descTh:
        'เซิร์ฟเวอร์ส่งใบรับรองดิจิทัล X.509 (fullchain.pem) และประทับลายเซ็นดิจิทัลยืนยันตัวตน เบราว์เซอร์ตรวจสอบย้อนกลับไปยัง Root CA ใน Trust Store',
      badge: 'Server -> Client (Encrypted)',
    },
    {
      num: 4,
      nameTh: 'ECDHE Shared Secret Derivation',
      descTh:
        'ทั้งสองฝั่งคำนวณสูตรคณิตศาสตร์ Diffie-Hellman ในเครื่องตนเอง ทำให้ได้กุญแจลับสมมาตร (Symmetric Master Key) ตรงกัน 100% โดยไม่มีการส่งกุญแจนี้ข้ามอินเทอร์เน็ต',
      badge: 'Local Math Calculation',
    },
    {
      num: 5,
      nameTh: 'Finished & Encrypted Traffic',
      descTh:
        'การ Handshake สมบูรณ์แบบ! ข้อมูล HTTP ทั้งหมดต่อจากนี้ (รหัสผ่าน, คุกกี้, บัตรเครดิต) จะถูกเข้ารหัสด้วย AES-256-GCM บุคคลภายนอกไม่สามารถถอดรหัสได้',
      badge: 'Secure Channel Established',
    },
  ];

  const currentHandshake =
    handshakeSteps[handshakeStep - 1] ?? handshakeSteps[0]!;

  const handleCopyCli = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="interactive-lab-container" data-testid="https-certificate-lab">
      <div className="lab-header">
        <div className="lab-badge">🔒 HTTPS & Security Lab</div>
        <h4 className="lab-title">
          ห้องทดลอง HTTPS, TLS 1.3 Handshake & ห่วงโซ่ใบรับรอง (PKI Simulator)
        </h4>
        <p className="lab-desc">
          สำรวจกลไกความปลอดภัยระดับลึก: สังเกตการดักจับแพ็กเก็ตเปรียบเทียบระหว่าง HTTP vs HTTPS,
          จำลองการตรวจสอบสายสัมพันธ์ของใบรับรอง (Root CA ➔ Intermediate ➔ Leaf) บน Address Bar
          และทดลองรันคำสั่ง OpenSSL / Certbot
        </p>
      </div>

      {/* Sub-tab Navigation */}
      <div className="lab-controls-bar">
        <button
          type="button"
          className={`lab-btn ${activeTab === 'handshake' ? 'primary' : ''}`}
          onClick={() => setActiveTab('handshake')}
        >
          🤝 1. TLS 1.3 Handshake & ดักจับแพ็กเก็ต
        </button>
        <button
          type="button"
          className={`lab-btn ${activeTab === 'diffie-hellman' ? 'primary' : ''}`}
          onClick={() => setActiveTab('diffie-hellman')}
        >
          🎨 2. Diffie-Hellman Key Exchange (ECDHE Simulator)
        </button>
        <button
          type="button"
          className={`lab-btn ${activeTab === 'pki-chain' ? 'primary' : ''}`}
          onClick={() => setActiveTab('pki-chain')}
        >
          🏛️ 3. ห่วงโซ่ความเชื่อถือ (Chain of Trust) & Browser Lock
        </button>
        <button
          type="button"
          className={`lab-btn ${activeTab === 'cli-generator' ? 'primary' : ''}`}
          onClick={() => setActiveTab('cli-generator')}
        >
          ⌨️ 4. เครื่องมือคำสั่ง OpenSSL & Certbot
        </button>
      </div>

      {/* -------------------------------------------------------- */}
      {/* Tab 1: Handshake & Packet Sniffer Simulation            */}
      {/* -------------------------------------------------------- */}
      {activeTab === 'handshake' && (
        <div className="https-tab-content">
          <div className="https-controls-row">
            <div className="https-control-group">
              <span className="control-label">โปรโตคอลที่ทดสอบ:</span>
              <div className="btn-toggle-group">
                <button
                  type="button"
                  className={`lab-btn ${protocol === 'http' ? 'warning' : ''}`}
                  onClick={() => setProtocol('http')}
                >
                  ⚠️ HTTP (พอร์ต 80 ธรรมดา)
                </button>
                <button
                  type="button"
                  className={`lab-btn ${protocol === 'https' ? 'primary' : ''}`}
                  onClick={() => setProtocol('https')}
                >
                  🔒 HTTPS (พอร์ต 443 + TLS 1.3)
                </button>
              </div>
            </div>

            {protocol === 'https' && (
              <div className="https-control-group">
                <span className="control-label">ขั้นตอน Handshake:</span>
                <div className="btn-toggle-group">
                  <button
                    type="button"
                    className="lab-btn"
                    disabled={handshakeStep === 1}
                    onClick={() => setHandshakeStep((prev) => Math.max(1, prev - 1))}
                  >
                    ← ก่อนหน้า
                  </button>
                  <button
                    type="button"
                    className="lab-btn primary"
                    disabled={handshakeStep === 5}
                    onClick={() => setHandshakeStep((prev) => Math.min(5, prev + 1))}
                  >
                    ก้าวต่อไป (Step {handshakeStep}/5) →
                  </button>
                  <button
                    type="button"
                    className="lab-btn"
                    onClick={() => setHandshakeStep(1)}
                  >
                    รีเซ็ต ↺
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Display */}
          {protocol === 'https' && (
            <div className="handshake-stepper">
              {handshakeSteps.map((step) => {
                const isCurrent = step.num === handshakeStep;
                const isPassed = step.num < handshakeStep;
                return (
                  <div
                    key={step.num}
                    className={`handshake-step-card ${isCurrent ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                    onClick={() => setHandshakeStep(step.num)}
                  >
                    <span className="step-idx">{step.num}</span>
                    <strong className="step-name">{step.nameTh}</strong>
                    <span className="step-badge">{step.badge}</span>
                  </div>
                );
              })}
            </div>
          )}

          {protocol === 'https' && (
            <div className="handshake-current-detail">
              <div className="detail-tag">{currentHandshake.badge}</div>
              <h4>
                ขั้นตอนที่ {currentHandshake.num}: {currentHandshake.nameTh}
              </h4>
              <p>{currentHandshake.descTh}</p>
            </div>
          )}

          {/* Interactive Live Packet Flight Transmitter */}
          <div className="packet-flight-box">
            <div className="packet-flight-header">
              <div className="flight-title">
                🚀 <strong>จำลองการยิงข้อมูลผ่านเครือข่ายจริง (Live Packet Transmission Simulator)</strong>
              </div>
              <div className="flight-actions">
                <span className="preset-label">ตัวอย่างข้อมูล:</span>
                <button
                  type="button"
                  className="preset-btn"
                  onClick={() =>
                    setCustomPayload('{"user":"admin","password":"supersecretpassword123","credit_card":"4111-2222-3333-4444"}')
                  }
                >
                  🔑 รหัสผ่าน & บัตร
                </button>
                <button
                  type="button"
                  className="preset-btn"
                  onClick={() =>
                    setCustomPayload('{"action":"transfer","to":"089-123-4567","amount":50000,"currency":"THB"}')
                  }
                >
                  💸 โอนเงิน 50,000฿
                </button>
                <button
                  type="button"
                  className="preset-btn"
                  onClick={() =>
                    setCustomPayload('{"auth":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}')
                  }
                >
                  🪙 JWT Secret Token
                </button>
              </div>
            </div>

            <div className="packet-input-row">
              <input
                type="text"
                className="packet-payload-input"
                value={customPayload}
                onChange={(e) => setCustomPayload(e.target.value)}
                placeholder="ระบุข้อความหรือ JSON Payload ที่ต้องการส่ง..."
              />
              <button
                type="button"
                className={`lab-btn primary ${isTransmitting ? 'transmitting' : ''}`}
                onClick={handleTransmitPacket}
                disabled={isTransmitting}
              >
                {isTransmitting ? '⏳ กำลังส่งข้อมูล...' : '🚀 ยิงแพ็กเก็ต (Send Packet)'}
              </button>
              <label className="tamper-checkbox-label">
                <input
                  type="checkbox"
                  checked={isTampered}
                  onChange={(e) => setIsTampered(e.target.checked)}
                />
                <span>🚨 จำลองแฮกเกอร์แอบแก้ข้อมูล (Tamper Attack)</span>
              </label>
            </div>

            {/* Flight Pipeline Track */}
            <div className="flight-pipeline-track">
              <div className={`station-badge ${packetLocation === 'client' ? 'active' : ''}`}>
                💻 Client (Browser)
              </div>
              <div className="pipeline-wire">
                <div
                  className={`packet-capsule ${protocol === 'http' ? 'insecure' : 'secure'} ${
                    isTransmitting ? 'in-flight' : ''
                  }`}
                >
                  {protocol === 'http'
                    ? isTampered
                      ? '⚠️ [HTTP TAMPERED DATA]'
                      : '🔓 [HTTP PLAINTEXT DATA]'
                    : isTampered
                      ? '💥 [TAMPERED CIPHERTEXT]'
                      : '🔒 [AES-256-GCM ENCRYPTED]'}
                </div>
              </div>
              <div className={`station-badge hacker-station ${packetLocation === 'wire' ? 'active' : ''}`}>
                🕵️‍♂️ Wi-Fi Sniffer (Wiretap)
              </div>
              <div className="pipeline-wire"></div>
              <div className={`station-badge ${packetLocation === 'server' ? 'active' : ''}`}>
                🖥️ Web Server (:443)
              </div>
            </div>
          </div>

          {/* 3-Actor Data Flow & Hacker Sniffer View */}
          <div className="https-actors-grid">
            <div className="actor-box client-box">
              <div className="actor-header">💻 เบราว์เซอร์ (Client)</div>
              <div className="actor-content">
                <p>
                  <strong>โดเมนเป้าหมาย:</strong> example.com
                </p>
                <p>
                  <strong>คำขอ HTTP:</strong> POST /api/checkout
                </p>
                <div className="actor-secret-badge">
                  {protocol === 'https' && handshakeStep >= 4
                    ? '🔑 คำนวณ Session Key สำเร็จ'
                    : protocol === 'https'
                      ? '⏳ กำลังเจรจา Handshake'
                      : '🔓 ส่งข้อมูลแบบ Plaintext'}
                </div>
                <div className="client-data-preview">
                  <span className="preview-label">Payload ก่อนส่ง:</span>
                  <code>{customPayload}</code>
                </div>
              </div>
            </div>

            <div className="actor-box sniffer-box">
              <div className="sniffer-header">
                🕵️‍♂️ บุคคลกลางทาง / แฮกเกอร์ (Packet Sniffer on Public Wi-Fi)
              </div>
              <div className="sniffer-content">
                {protocol === 'http' ? (
                  <div className="sniffer-alert alert-danger">
                    <div className="alert-badge">🚨 ข้อความเปิดเผย (Plaintext Leaked!)</div>
                    <pre className="packet-dump">
{`POST /api/checkout HTTP/1.1
Host: example.com
Content-Type: application/json

${
  isTampered
    ? '{"user":"admin","action":"transfer","to":"HACKER_ACCOUNT_999","amount":9999999}'
    : customPayload.includes('supersecretpassword123')
      ? `POST /api/login HTTP/1.1\nHost: example.com\nUser-Agent: Mozilla/5.0\nContent-Type: application/json\n\n{\n  "username": "admin",\n  "password": "supersecretpassword123",\n  "credit_card": "4111-2222-3333-4444"\n}`
      : customPayload
}`}
                    </pre>
                    <p className="danger-text">
                      {isTampered ? (
                        <>
                          💥 <strong>ข้อมูลถูกดัดแปลงสำเร็จ!</strong> เพราะ HTTP ไม่มีลายเซ็นรับรอง (MAC)
                          แฮกเกอร์สามารถดักแก้เลขบัญชีหรือยอดเงินได้ตามใจชอบ โดยที่ระบบไม่รู้ตัวเลย!
                        </>
                      ) : (
                        <>
                          ⚠️ <strong>อันตรายร้ายแรง:</strong> บุคคลในเครือข่าย Wi-Fi เดียวกันหรือ ISP
                          สามารถดักจับและอ่านรหัสผ่านและบัตรเครดิตได้ตรง ๆ 100%!
                        </>
                      )}
                    </p>
                  </div>
                ) : handshakeStep < 5 ? (
                  <div className="sniffer-alert alert-info">
                    <div className="alert-badge">ℹ️ แพ็กเกจเจรจา TLS Handshake</div>
                    <pre className="packet-dump">
{`ClientHello:
  TLS Version: 1.3
  SNI ServerName: example.com
  KeyShare: x25519 (Client Public Key)
  CipherSuites: TLS_AES_256_GCM_SHA384

ServerHello:
  KeyShare: x25519 (Server Public Key)
  SelectedCipher: TLS_AES_256_GCM_SHA384
  EncryptedExtensions: [...]`}
                    </pre>
                    <p className="info-text">
                      👀 แฮกเกอร์เห็นเพียงชื่อโดเมน (SNI) และกุญแจ Public Key Share
                      แต่ไม่สามารถถอดหากุญแจลับร่วม (Shared Secret) ได้เลย
                    </p>
                  </div>
                ) : (
                  <div className={`sniffer-alert ${isTampered ? 'alert-danger' : 'alert-success'}`}>
                    <div className="alert-badge">
                      {isTampered
                        ? '🚨 พบความพยายามดัดแปลง Ciphertext!'
                        : '🔒 ข้อมูลถูกเข้ารหัสสมบูรณ์ (AES-256-GCM)'}
                    </div>
                    <pre className="packet-dump">
{`TLS 1.3 Record Layer [Application Data]:
Length: ${customPayload.length + 32} bytes
Payload (Encrypted Ciphertext):
9e a1 4f 8b 21 c7 34 f0 8a dd 12 9c 5e b3 78 fa
18 c0 39 ff 71 a2 e4 50 bb 6d 81 29 0e 4a c8 9d
31 f6 02 a9 e3 b4 c1 77 88 da 52 14 f7 99 2b 88

AEAD Auth Tag (Integrity):
${isTampered ? 'XX BAD_MAC_FAIL 00 00 (SIGNATURE INVALID!)' : '8e f4 1b 3a d5 c2 77 90 (HMAC Validated)'}`}
                    </pre>
                    <p className={isTampered ? 'danger-text' : 'success-text'}>
                      {isTampered ? (
                        <>
                          🛡️ <strong>ป้องกันสำเร็จ:</strong> แฮกเกอร์พยายามแอบแก้ข้อมูลในไบนารี แต่ระบบ
                          AEAD (Authenticated Encryption) ตรวจพบว่า Auth Tag ไม่ตรง จึงสั่ง Drop แพ็กเก็ตทิ้งทันที!
                        </>
                      ) : (
                        <>
                          🛡️ <strong>ปลอดภัยสูงสุด:</strong> ข้อมูลถูกเข้ารหัสด้วย AES-256
                          แฮกเกอร์ต้องใช้เวลาคำนวณนับพันล้านปีเพื่อเจาะรหัสข้อมูลก้อนนี้!
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="actor-box server-box">
              <div className="actor-header">🖥️ เว็บเซิร์ฟเวอร์ (Nginx :443)</div>
              <div className="actor-content">
                <p>
                  <strong>ใบรับรอง:</strong> ISRG ➔ R3 ➔ example.com
                </p>
                <p>
                  <strong>การเข้ารหัส:</strong> TLS 1.3 / AES-256-GCM
                </p>
                <div className="actor-secret-badge">
                  {protocol === 'https' && isTampered
                    ? '❌ TLS Record MAC Failed (Drop Packet)'
                    : protocol === 'https' && handshakeStep === 5
                      ? '✅ ถอดรหัสคำขอสำเร็จ ส่งต่อแอป'
                      : protocol === 'https'
                        ? '🔑 มีกุญแจ Private Key (privkey.pem)'
                        : '⚠️ พอร์ต 80 ไม่ปลอดภัย'}
                </div>
                <div className="server-data-preview">
                  <span className="preview-label">ผลลัพธ์ที่ Server ได้รับ:</span>
                  {protocol === 'https' && isTampered ? (
                    <div className="server-status error">💥 400 Bad Request: TLS MAC Verification Failed!</div>
                  ) : protocol === 'https' && handshakeStep < 5 ? (
                    <div className="server-status wait">⏳ กำลังรอ Handshake ให้เสร็จสิ้น...</div>
                  ) : (
                    <div className="server-status ok">
                      <code>{isTampered && protocol === 'http' ? '{"user":"admin","action":"transfer","to":"HACKER"}' : customPayload}</code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* Tab 2: Diffie-Hellman Key Exchange (ECDHE Simulator)    */}
      {/* -------------------------------------------------------- */}
      {activeTab === 'diffie-hellman' && (
        <div className="https-tab-content">
          <div className="dh-explanation-banner">
            <h4>🎨 อุปมาการแลกเปลี่ยนกุญแจลับด้วยโมเดลผสมสี (Diffie-Hellman Key Exchange)</h4>
            <p>
              คำถามที่หลายคนสงสัย: <em>"ถ้าเราส่งกุญแจผ่านสายแลน แฮกเกอร์ก็ดักจับกุญแจได้สิ แล้ว HTTPS ทำอย่างไรให้ทั้งสองฝ่ายมีกุญแจตรงกันโดยไม่ต้องส่งกุญแจลับ?"</em>
              <br />
              คำตอบคือการใช้ <strong>คณิตศาสตร์ทางเดียว (One-Way Mathematical Function)</strong> เปรียบเสมือนการผสมสีที่ผสมง่ายแต่แยกสียากมาก!
            </p>
          </div>

          <div className="dh-interactive-grid">
            {/* Alice (Browser) */}
            <div className="dh-card client-dh">
              <div className="dh-card-header">💻 ฝั่งไคลเอนต์ (Alice / Browser)</div>
              <div className="dh-card-body">
                <div className="color-swatch-box">
                  <span className="swatch-label">1. สีลับส่วนตัว (Private Secret a):</span>
                  <div className="color-badge blue">🟦 สีน้ำเงินลับ (Blue)</div>
                  <div className="slider-control">
                    <label>ค่าลับส่วนตัว a: <strong>{clientSecretInt}</strong></label>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      value={clientSecretInt}
                      onChange={(e) => setClientSecretInt(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="color-swatch-box">
                  <span className="swatch-label">2. ผสมกับสีสาธารณะ 🟨 (Public Base g=5, p=23):</span>
                  <div className="color-badge cyan">
                    🟩 สีผสมสาธารณะ (Cyan Share A = {clientPublicDh})
                  </div>
                  <p className="math-desc">สูตร: 5^{clientSecretInt} mod 23 = <strong>{clientPublicDh}</strong></p>
                </div>

                <div className="color-swatch-box highlight-secret">
                  <span className="swatch-label">3. นำสีผสมของ Server มาผสมกับสีลับ a:</span>
                  <div className="color-badge brown">
                    🟫 กุญแจลับสมบูรณ์ (Master Key S = {clientMasterSecret})
                  </div>
                  <p className="math-desc">สูตร: {serverPublicDh}^{clientSecretInt} mod 23 = <strong>{clientMasterSecret}</strong></p>
                </div>
              </div>
            </div>

            {/* Hacker in the middle */}
            <div className="dh-card sniffer-dh">
              <div className="dh-card-header">🕵️‍♂️ สายส่งสาธารณะ & แฮกเกอร์ (Eve)</div>
              <div className="dh-card-body">
                <div className="public-intercept-box">
                  <span className="intercept-title">สิ่งที่วิ่งผ่านสายอินเทอร์เน็ตที่ใครก็เห็น:</span>
                  <ul>
                    <li>🟨 สีพื้นฐานร่วม (Public Generator g=5, Prime p=23)</li>
                    <li>🟩 สีผสมของ Alice (Public Share A = <strong>{clientPublicDh}</strong>)</li>
                    <li>🟧 สีผสมของ Bob (Public Share B = <strong>{serverPublicDh}</strong>)</li>
                  </ul>
                </div>
                <div className="dh-eve-status">
                  <div className="eve-badge">🛡️ ไม่สามารถแยกสีกลับได้!</div>
                  <p>
                    แฮกเกอร์รู้เฉพาะสีที่ผสมแล้ว (Cyan={clientPublicDh} และ Orange={serverPublicDh}) แต่ในทางคณิตศาสตร์
                    การคำนวณย้อนกลับเพื่อหาสีลับน้ำเงินหรือแดง เรียกว่า <strong>Discrete Logarithm Problem</strong>
                    ซึ่งต้องใช้คอมพิวเตอร์คำนวณเป็นล้านปี!
                  </p>
                </div>
              </div>
            </div>

            {/* Bob (Server) */}
            <div className="dh-card server-dh">
              <div className="dh-card-header">🖥️ ฝั่งเซิร์ฟเวอร์ (Bob / Nginx)</div>
              <div className="dh-card-body">
                <div className="color-swatch-box">
                  <span className="swatch-label">1. สีลับส่วนตัว (Private Secret b):</span>
                  <div className="color-badge red">🟥 สีแดงลับ (Red)</div>
                  <div className="slider-control">
                    <label>ค่าลับส่วนตัว b: <strong>{serverSecretInt}</strong></label>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      value={serverSecretInt}
                      onChange={(e) => setServerSecretInt(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="color-swatch-box">
                  <span className="swatch-label">2. ผสมกับสีสาธารณะ 🟨 (Public Base g=5, p=23):</span>
                  <div className="color-badge orange">
                    🟧 สีผสมสาธารณะ (Orange Share B = {serverPublicDh})
                  </div>
                  <p className="math-desc">สูตร: 5^{serverSecretInt} mod 23 = <strong>{serverPublicDh}</strong></p>
                </div>

                <div className="color-swatch-box highlight-secret">
                  <span className="swatch-label">3. นำสีผสมของ Client มาผสมกับสีลับ b:</span>
                  <div className="color-badge brown">
                    🟫 กุญแจลับสมบูรณ์ (Master Key S = {serverMasterSecret})
                  </div>
                  <p className="math-desc">สูตร: {clientPublicDh}^{serverSecretInt} mod 23 = <strong>{serverMasterSecret}</strong></p>
                </div>
              </div>
            </div>
          </div>

          <div className="dh-summary-banner">
            <div className="summary-icon">🎉</div>
            <div className="summary-text">
              <strong>ผลลัพธ์อันน่าทึ่ง:</strong> ทั้ง Client และ Server ได้กุญแจลับเดียวกันคือ{' '}
              <span className="key-highlight">S = {clientMasterSecret}</span> โดยที่กุญแจตัวเลขนี้
              <strong>ไม่เคยถูกส่งผ่านสายส่งอินเทอร์เน็ตแม้แต่ครั้งเดียว!</strong> จากนั้นทั้งสองฝ่ายจึงนำกุญแจนี้ไปใช้กับ AES-256 เพื่อเข้ารหัสข้อมูลเว็บ
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* Tab 2: PKI Chain of Trust & Address Bar Simulator       */}
      {/* -------------------------------------------------------- */}
      {activeTab === 'pki-chain' && (
        <div className="https-tab-content">
          <div className="https-controls-row">
            <span className="control-label">จำลองสถานะใบรับรอง:</span>
            <div className="btn-toggle-group">
              <button
                type="button"
                className={`lab-btn ${pkiScenario === 'valid' && !isCertTampered ? 'primary' : ''}`}
                onClick={() => {
                  setPkiScenario('valid');
                  setIsCertTampered(false);
                }}
              >
                ✅ ใบรับรองถูกต้องสมบูรณ์ (Let's Encrypt)
              </button>
              <button
                type="button"
                className={`lab-btn ${pkiScenario === 'expired' ? 'warning' : ''}`}
                onClick={() => {
                  setPkiScenario('expired');
                  setIsCertTampered(false);
                }}
              >
                ⏰ ใบรับรองหมดอายุ (Expired)
              </button>
              <button
                type="button"
                className={`lab-btn ${pkiScenario === 'self-signed' ? 'warning' : ''}`}
                onClick={() => {
                  setPkiScenario('self-signed');
                  setIsCertTampered(false);
                }}
              >
                ❓ ใบรับรองเซ็นเอง (Self-Signed)
              </button>
              <button
                type="button"
                className={`lab-btn ${pkiScenario === 'mismatched-domain' ? 'warning' : ''}`}
                onClick={() => {
                  setPkiScenario('mismatched-domain');
                  setIsCertTampered(false);
                }}
              >
                ❌ โดเมนไม่ตรง (Mismatched SAN)
              </button>
              <button
                type="button"
                className={`lab-btn ${isCertTampered ? 'warning' : ''}`}
                onClick={() => setIsCertTampered((prev) => !prev)}
              >
                🚨 {isCertTampered ? 'ปิดการปลอมแปลง' : 'จำลองแฮกเกอร์ปลอมใบรับรอง (Tamper)'}
              </button>
            </div>
          </div>

          {/* Browser Mockup */}
          <div className="browser-mockup">
            <div className="browser-chrome-header">
              <div className="browser-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className={`browser-address-bar ${pkiScenario === 'valid' && !isCertTampered ? 'secure' : 'insecure'}`}>
                <span className="lock-icon">
                  {pkiScenario === 'valid' && !isCertTampered ? '🔒' : '⚠️'}
                </span>
                <span className="address-scheme">
                  {pkiScenario === 'valid' && !isCertTampered ? 'https://' : 'https://'}
                </span>
                <span className="address-domain">example.com</span>
                <span className="address-path">/checkout</span>
                <span className="security-status-badge">
                  {pkiScenario === 'valid' && !isCertTampered
                    ? 'ปลอดภัย (Secure Connection)'
                    : 'ไม่ปลอดภัย (Not Secure)'}
                </span>
              </div>
            </div>

            <div className="browser-viewport">
              {pkiScenario === 'valid' && !isCertTampered ? (
                <div className="browser-page-secure">
                  <div className="secure-modal-popup">
                    <div className="modal-title">
                      <span className="icon">🔒</span> การเชื่อมต่อปลอดภัย
                    </div>
                    <p className="modal-body">
                      ข้อมูลที่คุณส่งไปยังไซต์นี้ เช่น รหัสผ่าน หรือข้อมูลบัตรเครดิต
                      จะเป็นส่วนตัวเมื่อส่งมายังไซต์นี้
                    </p>
                    <div className="cert-info-box">
                      <div>
                        <strong>ใบรับรอง:</strong> ถูกต้อง (Valid)
                      </div>
                      <div>
                        <strong>ออกให้แก่:</strong> example.com (*.example.com)
                      </div>
                      <div>
                        <strong>ออกโดย:</strong> R3 (Let's Encrypt Authority)
                      </div>
                      <div>
                        <strong>วันหมดอายุ:</strong> เหลืออีก 85 วัน (ต่ออายุอัตโนมัติ)
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="browser-page-warning">
                  <div className="warning-splash">
                    <div className="warning-triangle">⚠️</div>
                    <h3>การเชื่อมต่อของคุณไม่เป็นส่วนตัว</h3>
                    <p className="error-code">
                      {isCertTampered
                        ? 'NET::ERR_CERT_AUTHORITY_INVALID (TAMPER_DETECTED)'
                        : pkiScenario === 'expired'
                          ? 'NET::ERR_CERT_DATE_INVALID'
                          : pkiScenario === 'self-signed'
                            ? 'NET::ERR_CERT_AUTHORITY_INVALID'
                            : 'NET::ERR_CERT_COMMON_NAME_INVALID'}
                    </p>
                    <p className="error-explanation">
                      {isCertTampered
                        ? '🚨 ตรวจพบการปลอมแปลงใบรับรอง (Forged Certificate Attack)! แฮกเกอร์พยายามปลอมใบรับรองเป็น example.com แต่เนื่องจากแฮกเกอร์ไม่มีกุญแจลับ Private Key ของ Let\'s Encrypt R3 มาเซ็นกำกับ ลายเซ็นดิจิทัลจึงไม่ตรงกับ Hash ของใบรับรอง เบราว์เซอร์จึงบล็อกการเชื่อมต่อทันที 100%!'
                        : pkiScenario === 'expired'
                          ? 'ผู้โจมตีอาจพยายามขโมยข้อมูลของคุณจาก example.com ใบรับรองความปลอดภัยของไซต์นี้หมดอายุแล้ว'
                          : pkiScenario === 'self-signed'
                            ? 'เบราว์เซอร์ไม่รู้จักหน่วยงานผู้ออกใบรับรองนี้ (Untrusted Issuer) ใบรับรองนี้อาจถูกสร้างขึ้นมาเองโดยไม่ได้ผ่านการรับรองจาก Root CA'
                            : 'ใบรับรองความปลอดภัยของเซิร์ฟเวอร์นี้ออกให้แก่ badguy.com ไม่ตรงกับชื่อโดเมน example.com ที่คุณเข้าใช้งาน'}
                    </p>
                    <div className="warning-buttons">
                      <button
                        type="button"
                        className="btn-back-safety"
                        onClick={() => {
                          setPkiScenario('valid');
                          setIsCertTampered(false);
                        }}
                      >
                        กลับสู่ความปลอดภัย (แนะนำ)
                      </button>
                      <button type="button" className="btn-advanced">
                        ขั้นสูง (เสี่ยงอันตราย)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PKI Hierarchy Visual Tree */}
          <div className="pki-tree-container">
            <h4>ลำดับชั้นห่วงโซ่ใบรับรองดิจิทัล (Chain of Trust Hierarchy)</h4>
            <div className="pki-cards-chain">
              <div className="pki-card root-ca">
                <div className="card-rank">ชั้นที่ 1: Root CA (ต้นทางความเชื่อถือ)</div>
                <h5 className="ca-name">🏛️ ISRG Root X1 / DigiCert Global Root</h5>
                <p className="ca-desc">
                  ติดตั้งล่วงหน้าใน OS / เบราว์เซอร์ (Mozilla NSS Trust Store) ถือกุญแจลับสูงสุด
                </p>
                <div className="pki-badge success">✔ เชื่อถือล่วงหน้าในระบบปฏิบัติการ</div>
              </div>

              <div className="pki-connector">
                <span className="arrow">⬇ เซ็นรับรองด้วย Private Key</span>
              </div>

              <div className="pki-card intermediate-ca">
                <div className="card-rank">ชั้นที่ 2: Intermediate CA (ตัวแทนผู้ออก)</div>
                <h5 className="ca-name">🏢 Let's Encrypt R3 / E1</h5>
                <p className="ca-desc">
                  ทำหน้าที่ออกใบรับรองให้แก่โดเมนทั่วไป เพื่อป้องกันไม่ให้ Root CA ตัวจริงต้องต่อเน็ต
                </p>
                <div className="pki-badge success">✔ ตรวจสอบลายเซ็นกับ Root CA ผ่าน</div>
              </div>

              <div className="pki-connector">
                <span className="arrow">⬇ เซ็นรับรองด้วย Private Key</span>
              </div>

              <div className={`pki-card leaf-cert ${pkiScenario === 'valid' ? 'valid' : 'invalid'}`}>
                <div className="card-rank">ชั้นที่ 3: Leaf Certificate (ใบรับรองเว็บเรา)</div>
                <h5 className="ca-name">📜 example.com (Server Certificate)</h5>
                <p className="ca-desc">
                  ติดตั้งบนเซิร์ฟเวอร์ Nginx คู่กับไฟล์ privkey.pem
                </p>
                <div className={`pki-badge ${pkiScenario === 'valid' ? 'success' : 'danger'}`}>
                  {pkiScenario === 'valid'
                    ? '✔ ลายเซ็นดิจิทัลถูกต้องและยังไม่หมดอายุ'
                    : pkiScenario === 'expired'
                      ? '✖ หมดอายุการใช้งาน (Date Invalid)'
                      : pkiScenario === 'self-signed'
                        ? '✖ ไม่มี Root CA รับรอง (Authority Invalid)'
                        : '✖ โดเมนไม่ตรงกับ Subject Alternative Name'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* Tab 3: OpenSSL & Certbot Playground                      */}
      {/* -------------------------------------------------------- */}
      {activeTab === 'cli-generator' && (
        <div className="https-tab-content">
          <div className="cli-presets-bar">
            <button
              type="button"
              className={`lab-btn ${cliPreset === 1 ? 'primary' : ''}`}
              onClick={() => setCliPreset(1)}
            >
              1. ตรวจสอบใบรับรองบนเซิร์ฟเวอร์จริง (OpenSSL)
            </button>
            <button
              type="button"
              className={`lab-btn ${cliPreset === 2 ? 'primary' : ''}`}
              onClick={() => setCliPreset(2)}
            >
              2. สร้าง Private Key & CSR สำหรับขอ Cert
            </button>
            <button
              type="button"
              className={`lab-btn ${cliPreset === 3 ? 'primary' : ''}`}
              onClick={() => setCliPreset(3)}
            >
              3. ขอใบรับรองฟรีอัตโนมัติด้วย Certbot
            </button>
            <button
              type="button"
              className={`lab-btn ${cliPreset === 4 ? 'primary' : ''}`}
              onClick={() => setCliPreset(4)}
            >
              4. บล็อกคอนฟิก Nginx ปลอดภัยระดับ A+
            </button>
          </div>

          {cliPreset === 1 && (
            <div className="cli-detail-panel">
              <div className="cli-box-header">
                <h5>คำสั่งตรวจสอบห่วงโซ่ใบรับรองและวันหมดอายุของเซิร์ฟเวอร์</h5>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() =>
                    handleCopyCli(
                      'openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -dates -issuer -subject',
                    )
                  }
                >
                  {copiedCli ? '✔ คัดลอกแล้ว' : '📋 คัดลอกคำสั่ง'}
                </button>
              </div>
              <pre className="cli-command-box">
openssl s_client -connect example.com:443 -servername example.com &lt;/dev/null 2&gt;/dev/null | openssl x509 -noout -dates -issuer -subject
              </pre>
              <div className="cli-flags-explanation">
                <strong>คำอธิบายแฟล็ก:</strong>
                <ul>
                  <li>
                    <code>-connect example.com:443</code> : ต่อไปยังพอร์ต SSL/TLS ของเซิร์ฟเวอร์
                  </li>
                  <li>
                    <code>-servername example.com</code> : ส่งค่า SNI เพื่อให้เซิร์ฟเวอร์ส่งใบรับรองที่ถูกต้อง
                  </li>
                  <li>
                    <code>openssl x509 -noout -dates -issuer</code> : ถอดรหัสไฟล์ X.509
                    และอ่านวันหมดอายุและผู้ออกใบรับรอง
                  </li>
                </ul>
              </div>
              <div className="cli-terminal-output">
                <span className="term-title">💻 ผลลัพธ์ตัวอย่างในเทอร์มินัล:</span>
                <pre>
{`notBefore=Oct 15 00:00:00 2026 GMT
notAfter=Jan 13 23:59:59 2027 GMT
issuer=C=US, O=Let's Encrypt, CN=R3
subject=CN=example.com`}
                </pre>
              </div>
            </div>
          )}

          {cliPreset === 2 && (
            <div className="cli-detail-panel">
              <div className="cli-box-header">
                <h5>คำสั่งสร้างกุญแจลับ (Private Key 2048 บิต) และใบขอรับรอง (CSR)</h5>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() =>
                    handleCopyCli(
                      'openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr -subj "/C=TH/ST=Bangkok/L=Bangkok/O=MyCompany/CN=example.com"',
                    )
                  }
                >
                  {copiedCli ? '✔ คัดลอกแล้ว' : '📋 คัดลอกคำสั่ง'}
                </button>
              </div>
              <pre className="cli-command-box">
openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr -subj "/C=TH/ST=Bangkok/L=Bangkok/O=MyCompany/CN=example.com"
              </pre>
              <div className="cli-flags-explanation">
                <strong>คำอธิบายแฟล็ก:</strong>
                <ul>
                  <li>
                    <code>-newkey rsa:2048</code> : สร้างคู่กุญแจใหม่แบบ RSA ขนาด 2048 บิต
                  </li>
                  <li>
                    <code>-nodes</code> : ไม่ต้องใส่รหัสผ่านล็อคไฟล์กุญแจลับ (No DES encryption) เพื่อให้ Nginx สตาร์ทเองได้
                  </li>
                  <li>
                    <code>-keyout server.key</code> : บันทึกกุญแจลับ Private Key (ต้องเก็บเป็นความลับ 0600)
                  </li>
                  <li>
                    <code>-out server.csr</code> : สร้างไฟล์ CSR ส่งให้ CA ทำการเซ็นรับรอง
                  </li>
                </ul>
              </div>
            </div>
          )}

          {cliPreset === 3 && (
            <div className="cli-detail-panel">
              <div className="cli-box-header">
                <h5>คำสั่งขอใบรับรองฟรีอัตโนมัติด้วย Certbot (Let's Encrypt)</h5>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() =>
                    handleCopyCli(
                      'sudo certbot --nginx -d example.com -d www.example.com --non-interactive --agree-tos -m admin@example.com',
                    )
                  }
                >
                  {copiedCli ? '✔ คัดลอกแล้ว' : '📋 คัดลอกคำสั่ง'}
                </button>
              </div>
              <pre className="cli-command-box">
sudo certbot --nginx -d example.com -d www.example.com --non-interactive --agree-tos -m admin@example.com
              </pre>
              <div className="cli-flags-explanation">
                <strong>สิ่งที่ Certbot ทำให้อัตโนมัติ:</strong>
                <ul>
                  <li>1. ตรวจสอบไฟล์คอนฟิก Nginx ในเครื่องและค้นหาบล็อก server_name</li>
                  <li>2. ยิง HTTP-01 Challenge ไปยัง Let's Encrypt เพื่อพิสูจน์ว่าเป็นเจ้าของโดเมน</li>
                  <li>3. ดาวน์โหลด fullchain.pem และ privkey.pem มาเก็บไว้ที่ /etc/letsencrypt/live/</li>
                  <li>4. เขียนคอนฟิก SSL ใน nginx.conf และ reload เซิร์ฟเวอร์ให้ทันทีโดยไม่มี Downtime</li>
                </ul>
              </div>
              <div className="cli-terminal-output">
                <span className="term-title">💻 คำสั่งทดสอบการต่ออายุอัตโนมัติ:</span>
                <pre>sudo certbot renew --dry-run</pre>
              </div>
            </div>
          )}

          {cliPreset === 4 && (
            <div className="cli-detail-panel">
              <div className="cli-box-header">
                <h5>บล็อกคอนฟิก Nginx ระดับความปลอดภัย A+ (Modern SSL & TLS 1.3)</h5>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() =>
                    handleCopyCli(
`server {
  listen 80;
  server_name example.com www.example.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name example.com www.example.com;

  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers off;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
}`,
                    )
                  }
                >
                  {copiedCli ? '✔ คัดลอกแล้ว' : '📋 คัดลอกคำสั่ง'}
                </button>
              </div>
              <pre className="cli-command-box">
{`server {
  listen 80;
  server_name example.com www.example.com;
  return 301 https://$host$request_uri; # บังคับเปลี่ยนเป็น HTTPS
}

server {
  listen 443 ssl http2;
  server_name example.com www.example.com;

  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  # อนุญาตเฉพาะ TLS 1.2 และ 1.3
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers off;

  # HSTS บังคับเบราว์เซอร์จำว่าต้องเข้าด้วย HTTPS ตลอด 1 ปี
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}`}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Metrics Row */}
      <div className="lab-metrics-grid">
        <div className="lab-metric-card">
          <span className="metric-label">เวอร์ชันโปรโตคอล TLS</span>
          <span className="metric-value highlight">TLS 1.3 (1-RTT Fast Handshake)</span>
        </div>
        <div className="lab-metric-card">
          <span className="metric-label">อัลกอริทึมเข้ารหัส (Cipher)</span>
          <span className="metric-value">AES-256-GCM / SHA-384</span>
        </div>
        <div className="lab-metric-card">
          <span className="metric-label">ความลับไปข้างหน้า (Forward Secrecy)</span>
          <span className="metric-value success">✔ ECDHE (Curve25519)</span>
        </div>
        <div className="lab-metric-card">
          <span className="metric-label">ผู้ออกใบรับรอง (Issuer)</span>
          <span className="metric-value">Let's Encrypt R3 (Auto-Renewed)</span>
        </div>
      </div>
    </div>
  );
}

