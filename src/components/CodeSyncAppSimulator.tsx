import React, { useState } from 'react';
import {
  Code2,
  Users,
  Copy,
  Check,
  Play,
  LogOut,
  Send,
  MessageSquare,
  Sparkles,
  Terminal,
  Globe,
  Share2
} from 'lucide-react';

interface CodeSyncAppSimulatorProps {
  githubUrl: string;
}

export const CodeSyncAppSimulator: React.FC<CodeSyncAppSimulatorProps> = ({ githubUrl }) => {
  const [inRoom, setInRoom] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>('594f69d2-e4a5-4cd0-9393-196a81f0770a');
  const [username, setUsername] = useState<string>('Chinmayi');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');

  // Editor Code state
  const [code, setCode] = useState<string>(`// Welcome to Code Sync!
// Real-time collaborative code editing room

function codeSyncSession(roomId, user) {
  console.log(\`[SOCKET] User \${user} joined room \${roomId}\`);
  
  const activePeers = ["Chinmayi", "Alex Dev", "Sarah"];
  return {
    status: "CONNECTED",
    room: roomId,
    collaborators: activePeers.length,
    syncEngine: "Socket.IO + Express"
  };
}

// Execute session test
const result = codeSyncSession("${roomId}", "${username}");
console.log("Session details:", result);`);

  // Console output
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    'Ready to execute code. Click "Run Code" above.'
  ]);

  // Live Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Alex Dev', text: 'Hey Chinmayi! Welcome to Code Sync room!', time: '10:14 AM' },
    { sender: 'Sarah', text: 'I updated the data synchronization handler.', time: '10:15 AM' }
  ]);
  const [newMessage, setNewMessage] = useState<string>('');

  // Generate random UUID
  const handleGenerateRoomId = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    setRoomId(uuid);
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim() || !username.trim()) return;
    setInRoom(true);
    setConsoleOutput([
      `[Socket.IO] Connected to server at wss://codesync-live.api`,
      `[Room] Joined room ID: ${roomId} as "${username}"`,
      `[Sync] Peer synchronization initialized. 3 active users.`
    ]);
  };

  const handleRunCode = () => {
    const timestamp = new Date().toLocaleTimeString();
    try {
      // Simple simulated JS evaluation log
      setConsoleOutput([
        `[${timestamp}] Executing ${selectedLanguage.toUpperCase()} script...`,
        `[stdout] [SOCKET] User ${username} joined room ${roomId}`,
        `[stdout] Session details: { status: "CONNECTED", room: "${roomId}", collaborators: 3, syncEngine: "Socket.IO + Express" }`,
        `[System] Code broadcasted live to all room members!`
      ]);
    } catch (err) {
      setConsoleOutput([`[Error] Execution error: ${String(err)}`]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: username, text: newMessage.trim(), time }]);
    setNewMessage('');
  };

  // Render State 1: Login / Room Join Page (exact match to screenshot)
  if (!inRoom) {
    return (
      <div className="relative w-full rounded-2xl bg-[#1c1e22] text-slate-100 p-6 sm:p-10 border border-slate-800 shadow-2xl min-h-[460px] flex flex-col justify-center overflow-hidden font-sans">
        {/* GitHub Top Right Banner */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-0 right-0 z-10 group"
          title="Fork on GitHub"
        >
          <div className="bg-[#10b981] text-slate-950 text-[10px] font-black uppercase tracking-widest py-1 px-8 rotate-45 translate-x-7 translate-y-3 shadow-md hover:bg-[#34d399] transition-colors">
            GitHub
          </div>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto w-full">
          {/* Left Illustration */}
          <div className="flex justify-center items-center p-4">
            <div className="relative w-full max-w-xs aspect-4/3 flex items-center justify-center">
              <svg
                viewBox="0 0 500 400"
                className="w-full h-auto drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Floor Ellipse */}
                <ellipse cx="250" cy="310" rx="200" ry="60" fill="#2d323b" opacity="0.5" />
                
                {/* Desk */}
                <rect x="130" y="210" width="240" height="12" rx="4" fill="#e2e8f0" />
                <rect x="150" y="222" width="12" height="110" fill="#94a3b8" />
                <rect x="338" y="222" width="12" height="110" fill="#94a3b8" />
                <rect x="180" y="240" width="8" height="92" fill="#cbd5e1" opacity="0.6" />

                {/* Main Monitor */}
                <rect x="200" y="110" width="100" height="75" rx="6" fill="#1e293b" stroke="#e2e8f0" strokeWidth="6" />
                <rect x="208" y="118" width="84" height="59" rx="3" fill="#10b981" opacity="0.15" />
                {/* Screen lines */}
                <path d="M 216 130 Q 250 120 284 150" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
                <path d="M 216 150 Q 250 160 284 135" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
                <rect x="242" y="185" width="16" height="25" fill="#cbd5e1" />
                <ellipse cx="250" cy="210" rx="24" ry="5" fill="#94a3b8" />

                {/* Laptop on desk */}
                <path d="M 155 180 L 195 180 L 202 210 L 148 210 Z" fill="#94a3b8" />
                <rect x="160" y="152" width="30" height="28" rx="2" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" />
                <path d="M 166 162 Q 175 158 184 170" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />

                {/* Keyboard & Coffee mug */}
                <rect x="220" y="212" width="60" height="6" rx="2" fill="#cbd5e1" />
                <rect x="295" y="202" width="12" height="15" rx="3" fill="#10b981" />

                {/* Developer Character standing */}
                {/* Legs */}
                <rect x="288" y="220" width="14" height="70" rx="6" fill="#334155" />
                <rect x="306" y="220" width="14" height="65" rx="6" fill="#475569" />
                {/* Shoes */}
                <ellipse cx="295" cy="290" rx="14" ry="7" fill="#10b981" />
                <ellipse cx="317" cy="285" rx="14" ry="7" fill="#10b981" />
                {/* Torso */}
                <rect x="282" y="150" width="36" height="75" rx="12" fill="#e2e8f0" />
                <circle cx="300" cy="130" r="18" fill="#f87171" />
                <path d="M 290 120 C 295 110, 310 110, 315 122" fill="#451a03" />

                {/* Mobile Phone in Hand */}
                <rect x="335" y="150" width="18" height="30" rx="4" fill="#10b981" />
                <path d="M 340 160 Q 344 155 348 168" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

                {/* Sync badge floating */}
                <g transform="translate(325, 110)">
                  <rect x="0" y="0" width="30" height="26" rx="6" fill="#10b981" />
                  <path d="M 10 13 A 5 5 0 0 1 20 13" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M 20 13 A 5 5 0 0 1 10 13" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>

          {/* Right Column: Code Sync Logo & Form */}
          <div className="space-y-6">
            {/* Header / Logo */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {/* Green Connected Network Icon */}
                <div className="relative flex items-center justify-center w-10 h-10">
                  <div className="absolute w-3 h-3 rounded-full bg-[#10b981] top-0 left-0" />
                  <div className="absolute w-3 h-3 rounded-full bg-[#10b981] top-0 right-0" />
                  <div className="absolute w-4 h-4 rounded-full bg-[#10b981] center" />
                  <div className="absolute w-3 h-3 rounded-full bg-[#10b981] bottom-0 left-0" />
                  <div className="absolute w-3 h-3 rounded-full bg-[#10b981] bottom-0 right-0" />
                  <svg className="w-full h-full text-[#10b981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="6" y1="6" x2="12" y2="12" />
                    <line x1="18" y1="6" x2="12" y2="12" />
                    <line x1="6" y1="18" x2="12" y2="12" />
                    <line x1="18" y1="18" x2="12" y2="12" />
                  </svg>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                  Code <span className="text-[#10b981]">Sync</span>
                </h1>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Code, Chat and Collaborate. It's All in Sync.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleJoinRoom} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="ROOM ID"
                  required
                  className="w-full px-4 py-3 rounded-md bg-[#2a2e37] border border-slate-700/80 text-white placeholder-slate-400 font-mono text-sm focus:outline-none focus:border-[#10b981] transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="USERNAME"
                  required
                  className="w-full px-4 py-3 rounded-md bg-[#2a2e37] border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#10b981] transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md bg-[#10b981] hover:bg-[#059669] text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                Join
              </button>

              <div className="text-center pt-2 space-y-2">
                <div>
                  <button
                    type="button"
                    onClick={handleGenerateRoomId}
                    className="text-xs font-semibold text-slate-300 hover:text-[#10b981] underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    Generate Unique Room Id
                  </button>
                </div>

                <div className="pt-2">
                  <a
                    href="https://collaborative-code-editor-wheat.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold transition-all"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Launch Live Vercel App ↗</span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Render State 2: Active Collaborative Room Workspace
  return (
    <div className="w-full rounded-2xl bg-[#1e2025] border border-slate-800 text-slate-100 overflow-hidden shadow-2xl flex flex-col font-sans">
      {/* Top Header Navigation */}
      <div className="bg-[#16181d] px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center text-slate-950 font-black text-[10px]">
            CS
          </div>
          <span className="font-bold text-white tracking-wide">
            Code <span className="text-[#10b981]">Sync</span>
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
            WebSocket Connected
          </span>
        </div>

        {/* Room Info & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2a2e37] border border-slate-700 font-mono text-[11px]">
            <span className="text-slate-400">ROOM:</span>
            <span className="text-emerald-400 font-bold truncate max-w-[120px] sm:max-w-[180px]">{roomId}</span>
            <button
              onClick={handleCopyRoomId}
              className="p-1 hover:text-white text-slate-400 transition-colors cursor-pointer"
              title="Copy Room ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-[#2a2e37] border border-slate-700 text-slate-200 text-xs font-mono focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>

          <button
            onClick={() => setInRoom(false)}
            className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Leave Room</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[420px]">
        {/* Left Sidebar: Active Members & Chat */}
        <div className="p-4 bg-[#181a1f] border-r border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#10b981]" /> Connected Members (3)
            </h3>

            <div className="space-y-2">
              {/* Member 1: User */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#242831] border border-slate-800 text-xs font-medium">
                <div className="w-6 h-6 rounded-full bg-[#10b981] text-slate-950 font-bold flex items-center justify-center text-[11px]">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-bold">{username}</span>
                <span className="text-[10px] text-emerald-400 ml-auto">(You)</span>
              </div>

              {/* Member 2 */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#1e2025] text-xs font-medium text-slate-300">
                <div className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-[11px]">
                  A
                </div>
                <span>Alex Dev</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 ml-auto" />
              </div>

              {/* Member 3 */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#1e2025] text-xs font-medium text-slate-300">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center text-[11px]">
                  S
                </div>
                <span>Sarah</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 ml-auto" />
              </div>
            </div>
          </div>

          {/* Live Chat Box */}
          <div className="flex flex-col h-56 border-t border-slate-800 pt-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Live Chat
            </h4>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs mb-2">
              {chatMessages.map((msg, i) => (
                <div key={i} className="p-2 rounded-lg bg-[#242831] space-y-0.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-cyan-400">{msg.sender}</span>
                    <span className="text-slate-500">{msg.time}</span>
                  </div>
                  <p className="text-slate-200 text-[11px] leading-snug">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-1">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type message..."
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#2a2e37] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#10b981]"
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-[#10b981] text-slate-950 hover:bg-[#059669] transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Area: Code Editor & Console */}
        <div className="lg:col-span-3 flex flex-col justify-between p-4 space-y-3 bg-[#1c1e22]">
          {/* Editor Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Code2 className="w-4 h-4 text-[#10b981]" />
              <span>main.{selectedLanguage === 'python' ? 'py' : selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : 'js'}</span>
            </div>

            <button
              onClick={handleRunCode}
              className="px-3.5 py-1.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Run Code</span>
            </button>
          </div>

          {/* Code Textarea / Lines */}
          <div className="relative flex-1 bg-[#16181d] rounded-xl border border-slate-800 p-3 font-mono text-xs text-emerald-300 flex overflow-hidden">
            <div className="select-none text-slate-600 pr-3 border-r border-slate-800 text-right leading-relaxed font-mono">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 pl-3 bg-transparent text-emerald-300 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              rows={12}
            />
          </div>

          {/* Terminal Console */}
          <div className="bg-[#16181d] rounded-xl border border-slate-800 p-3 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1">
              <span className="flex items-center gap-1 text-cyan-400 font-bold">
                <Terminal className="w-3 h-3" /> Execution Console
              </span>
              <span>Output Status: OK</span>
            </div>
            <div className="font-mono text-[11px] text-slate-300 space-y-1 max-h-24 overflow-y-auto pt-1">
              {consoleOutput.map((log, idx) => (
                <div key={idx} className="leading-tight">
                  <span className="text-[#10b981]">&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
