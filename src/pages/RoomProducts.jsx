import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Search, Plus, Play, RefreshCw, Shield, Check, AlertTriangle,
  Mic, Clock, FileText, Sparkles, Eye, Volume2, ListChecks,
  Link2, ChevronLeft, X, GripVertical, PackageOpen,
  Edit3, Trash2, ChevronUp, ChevronDown, ChevronRight, Loader, Wand2
} from "lucide-react";

const initialRoomProducts = [
  { id: 1, name: "玻尿酸保湿精华液", price: 89, orig: 169, stock: 2340, status: "ready", initial: "玻", queueOrder: 1, image: "url(/products/product-essence.png)" },
  { id: 2, name: "氨基酸洁面乳", price: 45, orig: 89, stock: 1560, status: "ready", initial: "氨", queueOrder: 2, image: "url(/products/product-cleanser.png)" },
  { id: 3, name: "烟酰胺亮肤面膜10片", price: 69, orig: 129, stock: 890, status: "pending", initial: "烟", queueOrder: 3, image: "url(/products/product-mask.png)" },
  { id: 4, name: "视黄醇抗皱眼霜", price: 159, orig: 299, stock: 456, status: "ready", initial: "视", queueOrder: 4, image: "url(/products/product-eye-cream.png)" },
  { id: 5, name: "神经酰胺修护面霜", price: 119, orig: 199, stock: 1120, status: "pending", initial: "神", queueOrder: 5, image: "url(/products/product-face-cream.png)" },
];

const libraryProducts = [
  { id: 10, name: "维C亮肤精华", initial: "维", price: 99 },
  { id: 11, name: "水光针精华液", initial: "水", price: 129 },
  { id: 12, name: "防晒霜SPF50", initial: "防", price: 79 },
  { id: 13, name: "卸妆油", initial: "卸", price: 59 },
];

const initialScripts = [
  { id: 1, type: "30秒短促销版", status: "passed", duration: "28秒", auto: true, editable: false, text: "这款玻尿酸精华，2%浓度深层补水，上脸不黏腻。今天直播间券后只要89元，原价169，直接半价。" },
  { id: 2, type: "1分钟标准版", status: "passed", duration: "52秒", auto: true, editable: false, text: "姐妹们看过来，这款玻尿酸保湿精华液，采用2%烟酰胺配方，能够有效提亮肤色、淡化痘印。搭配专利渗透技术，吸收率提升40%。" },
  { id: 3, type: "3分钟深度讲解版", status: "review", duration: "2分48秒", auto: true, editable: false, text: "今天要给大家重点推荐的，就是这款玻尿酸保湿精华液。先说核心成分：2%烟酰胺加双重玻尿酸，一个负责提亮，一个负责锁水。" },
  { id: 4, type: "问答版", status: "passed", duration: "15秒", auto: true, editable: false, text: "敏感肌的姐妹问能不能用？完全可以。这款不含酒精、香精和色素，通过了敏感肌测试。" },
];

const initialActions = [
  { id: 1, text: "标签朝镜头 · 展示正面", duration: "10s" },
  { id: 2, text: "展示质地 · 手指轻按精华液于手背", duration: "15s" },
  { id: 3, text: "指向商品卡 · 强调券后价", duration: "8s" },
  { id: 4, text: "展示成分表 · 指向烟酰胺", duration: "12s" },
  { id: 5, text: "手持商品 · 微笑面向镜头", duration: "10s" },
];

const readinessChecks = [
  { label: "商品资料完整", done: true },
  { label: "AI 话术生成通过", done: true },
  { label: "展示动作已生成", done: true },
  { label: "商品画面已绑定", done: true },
  { label: "TTS 音色已配置", done: true },
  { label: "模拟开播通过", done: false },
];

const statusMap = {
  ready: { label: "可播", class: "badge-active" },
  pending: { label: "待模拟", class: "badge-pending" },
  blocked: { label: "不可播", class: "badge-blocked" },
};

export function RoomProducts() {
  const { id } = useParams();
  const [selected, setSelected] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedLibProducts, setSelectedLibProducts] = useState([]);
  const [addStep, setAddStep] = useState(0);
  const [roomConfig, setRoomConfig] = useState({
    persona: "店长", personaDesc: "亲切实在，懂行有底气",
    goal: "成交转化", goalDesc: "以 GMV 为核心，强化逼单和权益",
    template: "专柜陈列风",
    mode: "真人展示 AI 代播",
    ttsVoice: "品牌授权克隆音色 A",
  });
  const [editingConfig, setEditingConfig] = useState(false);
  const [roomName, setRoomName] = useState("品牌旗舰 618大促专场");
  const [editingRoomName, setEditingRoomName] = useState(false);
  const [showRegenPrompt, setShowRegenPrompt] = useState(false);
  const [roomProducts, setRoomProducts] = useState(initialRoomProducts);
  const [scripts, setScripts] = useState(initialScripts);
  const [actions, setActions] = useState(initialActions);
  const [editingScript, setEditingScript] = useState(null);
  const [showCustomScript, setShowCustomScript] = useState(false);
  const [showGenFlow, setShowGenFlow] = useState(null);
  const product = roomProducts.find((p) => p.id === selected);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  // Script editing
  const toggleEditScript = (scriptId) => {
    setScripts(scripts.map(s => s.id === scriptId ? { ...s, editable: !s.editable } : s));
  };
  const updateScriptText = (scriptId, text) => {
    setScripts(scripts.map(s => s.id === scriptId ? { ...s, text } : s));
  };
  const saveScript = (scriptId) => {
    setScripts(scripts.map(s => s.id === scriptId ? { ...s, editable: false, auto: false, status: "review" } : s));
  };
  const deleteScript = (scriptId) => {
    setScripts(scripts.filter(s => s.id !== scriptId));
  };
  const addCustomScript = (type, text) => {
    const newId = Math.max(...scripts.map(s => s.id), 0) + 1;
    setScripts([...scripts, { id: newId, type, status: "review", duration: "自定义", auto: false, editable: false, text }]);
    setShowCustomScript(false);
  };

  const removeProduct = (productId) => {
    setRoomProducts(roomProducts.filter(p => p.id !== productId));
    if (selected === productId && roomProducts.length > 1) {
      const next = roomProducts.find(p => p.id !== productId);
      if (next) setSelected(next.id);
    }
  };
  const moveScript = (idx, dir) => {
    const newScripts = [...scripts];
    const target = idx + dir;
    if (target < 0 || target >= newScripts.length) return;
    [newScripts[idx], newScripts[target]] = [newScripts[target], newScripts[idx]];
    setScripts(newScripts);
  };

  // Action editing
  const updateAction = (actionId, text, duration) => {
    setActions(actions.map(a => a.id === actionId ? { ...a, text, duration } : a));
  };
  const addAction = () => {
    const newId = Math.max(...actions.map(a => a.id), 0) + 1;
    setActions([...actions, { id: newId, text: "新动作", duration: "10s" }]);
  };
  const deleteAction = (actionId) => {
    setActions(actions.filter(a => a.id !== actionId));
  };
  const moveAction = (idx, dir) => {
    const newActions = [...actions];
    const target = idx + dir;
    if (target < 0 || target >= newActions.length) return;
    [newActions[idx], newActions[target]] = [newActions[target], newActions[idx]];
    setActions(newActions);
  };

  // Add from library with gen flow
  const handleAddProduct = () => {
    if (selectedLibProducts.length === 0) return;
    setAddStep(1);
  };

  const startGeneration = () => {
    setAddStep(0);
    setShowAddModal(false);
    setSelectedLibProducts([]);
    setShowGenFlow(selectedLibProducts);
  };

  return (
    <div className="sub-page">
      <header className="sub-topbar">
        <Link to="/" className="topbar-back">
          <ChevronLeft size={16} /> 返回直播间列表
        </Link>
        <div className="sub-topbar-title">
          {editingRoomName ? (
            <input
              className="room-name-input"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onBlur={() => setEditingRoomName(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingRoomName(false)}
              autoFocus
            />
          ) : (
            <span className="sub-topbar-room" onClick={() => setEditingRoomName(true)} style={{ cursor: "pointer" }} title="点击修改直播间名称">
              {roomName} <Edit3 size={12} style={{ verticalAlign: "middle", marginLeft: 4, opacity: 0.5 }} />
            </span>
          )}
          <span className="sub-topbar-sep">·</span>
          <span className="sub-topbar-section">商品配置</span>
        </div>
        <div className="topbar-spacer" />
        <Link to={`/room/${id}/preview`} className="btn btn-secondary btn-sm">
          <Eye size={12} /> 画面与预览
        </Link>
        <Link to="/workbench" className="btn btn-primary btn-sm">
          <Play size={12} /> 进入导播台
        </Link>
      </header>

      <div className="product-page" style={{ height: "calc(100vh - 48px)" }}>
        {/* Left: Room product queue */}
        <div className="product-sidebar">
          <div className="panel-header" style={{ padding: "0 14px", height: "48px" }}>
            <span className="panel-title">商品队列</span>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
              <Plus size={12} /> 添加
            </button>
          </div>
          <div className="product-search">
            <Search size={14} />
            <input placeholder="搜索商品" className="search-input" />
          </div>
          <div className="panel-body" style={{ padding: "4px 8px" }}>
            <div className="queue-hint">
              <Link2 size={10} />
              从商品库关联的商品，每个商品有独立的直播间配置
            </div>
            {roomProducts.map((p) => {
              const st = statusMap[p.status];
              return (
                <div key={p.id} className={"product-item" + (p.id === selected ? " active" : "")} onClick={() => setSelected(p.id)}>
                  <GripVertical size={12} style={{ color: "var(--text-faint)", flexShrink: 0 }} />
                  <span className="queue-order">{p.queueOrder}</span>
                  <div className="product-thumb" style={p.image ? { backgroundImage: p.image } : {}}>{p.image ? "" : p.initial}</div>
                  <div className="product-info">
                    <div className="product-name">{p.name}</div>
                    <div className="product-price-row">
                      <span className="product-price">¥{p.price}</span>
                    </div>
                  </div>
                  <div className="product-item-right">
                    <span className={"product-badge " + st.class}>{st.label}</span>
                    <button className="product-remove-btn" onClick={(e) => { e.stopPropagation(); removeProduct(p.id); }} title="移除商品"><X size={11} /></button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="queue-footer">
            <Link to="/library" className="btn btn-ghost btn-sm" style={{ width: "100%" }}>
              <PackageOpen size={12} /> 管理商品库
            </Link>
          </div>
        </div>

        {/* Right: Config */}
        <div className="product-detail">
          <div className="detail-header">
            <div className="detail-product-info">
              <div className="detail-product-thumb" style={product.image ? { backgroundImage: product.image } : {}}>{product.image ? "" : product.initial}</div>
              <div>
                <h2 className="detail-product-name">{product.name}</h2>
                <div className="detail-product-meta">
                  <span className="product-price" style={{ fontSize: "16px" }}>¥{product.price}</span>
                  <span className="product-price-orig">¥{product.orig}</span>
                  <span className="room-meta-text">库存 {product.stock.toLocaleString()}</span>
                  <Link to="/library" className="lib-link">查看商品档案</Link>
                </div>
              </div>
            </div>
            <div className="detail-readiness">
              <span className="readiness-score">5/6</span>
              <span className="readiness-label">可播准备度</span>
            </div>
          </div>

          <div className="readiness-bar">
            {readinessChecks.map((c) => (
              <div key={c.label} className={"readiness-chip" + (c.done ? " done" : " todo")}>
                {c.done ? <Check size={11} /> : <Clock size={11} />}
                <span>{c.label}</span>
              </div>
            ))}
          </div>

          <div className="detail-action-row">
            <Link to={`/room/${id}/preview`} className="btn btn-secondary btn-sm"><Eye size={12} /> 画面与预览</Link>
            <Link to={`/room/${id}/simulate`} className="btn btn-primary btn-sm"><Play size={12} /> 模拟开播</Link>
          </div>

          {/* AI Scripts - editable */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h3 className="detail-section-title"><FileText size={14} /> 直播间专属话术</h3>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-secondary btn-sm" onClick={handleGenerate}>
                  <RefreshCw size={12} className={generating ? "spin" : ""} /> {generating ? "生成中..." : "重新生成"}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowCustomScript(true)}>
                  <Plus size={12} /> 自定义话术
                </button>
              </div>
            </div>
            <div className="gen-context">
              <div className="gen-context-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>生成依据</span>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditingConfig(!editingConfig)}>
                  {editingConfig ? "完成编辑" : "编辑"}
                </button>
              </div>
              <div className="gen-context-factors">
                {editingConfig ? (
                  <>
                    <span className="gen-factor"><span className="gen-factor-label">人设</span>
                      <select className="gen-factor-select" value={roomConfig.persona} onChange={(e) => { setRoomConfig({ ...roomConfig, persona: e.target.value }); setShowRegenPrompt(true); }}>
                        <option>店长</option><option>专业顾问</option><option>测评员</option><option>品牌创始人</option>
                      </select>
                    </span>
                    <span className="gen-factor"><span className="gen-factor-label">目标</span>
                      <select className="gen-factor-select" value={roomConfig.goal} onChange={(e) => { setRoomConfig({ ...roomConfig, goal: e.target.value }); setShowRegenPrompt(true); }}>
                        <option>成交转化</option><option>涨粉引流</option><option>清库存</option><option>新品发布</option>
                      </select>
                    </span>
                    <span className="gen-factor"><span className="gen-factor-label">模板</span>
                      <select className="gen-factor-select" value={roomConfig.template} onChange={(e) => { setRoomConfig({ ...roomConfig, template: e.target.value }); setShowRegenPrompt(true); }}>
                        <option>品牌旗舰风</option><option>工厂溯源风</option><option>专柜陈列风</option><option>专业测评风</option><option>节日促销风</option>
                      </select>
                    </span>
                    <span className="gen-factor"><span className="gen-factor-label">模式</span>
                      <select className="gen-factor-select" value={roomConfig.mode} onChange={(e) => { setRoomConfig({ ...roomConfig, mode: e.target.value }); setShowRegenPrompt(true); }}>
                        <option>真人展示 AI 代播</option><option>场控确认 AI 代播</option><option>全自动数字人</option>
                      </select>
                    </span>
                    <span className="gen-factor"><span className="gen-factor-label">音色</span>
                      <select className="gen-factor-select" value={roomConfig.ttsVoice} onChange={(e) => { setRoomConfig({ ...roomConfig, ttsVoice: e.target.value }); setShowRegenPrompt(true); }}>
                        <option>品牌授权克隆音色 A</option><option>品牌授权克隆音色 B</option><option>平台标准音色 - 小薇</option><option>平台标准音色 - 阿泽</option>
                      </select>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="gen-factor"><span className="gen-factor-label">人设</span> {roomConfig.persona}</span>
                    <span className="gen-factor"><span className="gen-factor-label">目标</span> {roomConfig.goal}</span>
                    <span className="gen-factor"><span className="gen-factor-label">模板</span> {roomConfig.template}</span>
                    <span className="gen-factor"><span className="gen-factor-label">模式</span> {roomConfig.mode}</span>
                    <span className="gen-factor"><span className="gen-factor-label">音色</span> {roomConfig.ttsVoice}</span>
                  </>
                )}
              </div>
              {showRegenPrompt && (
                <div className="regen-prompt">
                  <AlertTriangle size={14} />
                  <span>生成依据已修改，是否重新生成专属话术和展示动作？</span>
                  <button className="btn btn-primary btn-sm" onClick={() => { handleGenerate(); setShowRegenPrompt(false); }}>
                    <RefreshCw size={12} /> 重新生成
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowRegenPrompt(false)}>暂不</button>
                </div>
              )}
            </div>
            {generating && (
              <div className="gen-process" style={{ marginBottom: 12 }}>
                <div className="gen-step gen-step-done">
                  <div className="gen-step-icon"><Check size={12} /></div>
                  <div className="gen-step-info"><div className="gen-step-label">加载基础话术</div><div className="gen-step-desc">从商品库获取 4 个基础版本</div></div>
                  <span className="gen-step-status">完成</span>
                </div>
                <div className="gen-step gen-step-generating">
                  <div className="gen-step-icon"><RefreshCw size={12} className="spin" /></div>
                  <div className="gen-step-info"><div className="gen-step-label">注入人设与目标策略</div><div className="gen-step-desc">店长语气 + 成交逼单策略</div></div>
                  <span className="gen-step-status">进行中</span>
                </div>
                <div className="gen-step gen-step-pending">
                  <div className="gen-step-icon"><span className="gen-step-num">3</span></div>
                  <div className="gen-step-info"><div className="gen-step-label">合规复检</div><div className="gen-step-desc">直播间级合规词库</div></div>
                  <span className="gen-step-status">等待</span>
                </div>
              </div>
            )}
            <div className="script-gen-hint">
              <Sparkles size={12} />
              基于商品库基础话术 + 直播间人设/目标/模板/模式生成专属版本，支持手动编辑
            </div>
            <div className="script-list">
              {scripts.map((s) => (
                <div key={s.id} className="script-card script-card-with-controls">
                  <div className="script-card-controls">
                    <button className="action-seq-btn" onClick={() => moveScript(scripts.indexOf(s), -1)} disabled={scripts.indexOf(s) === 0}><ChevronUp size={12} /></button>
                    <button className="action-seq-btn" onClick={() => moveScript(scripts.indexOf(s), 1)} disabled={scripts.indexOf(s) === scripts.length - 1}><ChevronDown size={12} /></button>
                  </div>
                  <div className="script-card-main">
                  <div className="script-card-header">
                    <div className="script-card-title">
                      <span className="script-type">{s.type}</span>
                      <span className="script-duration mono">{s.duration}</span>
                      {s.auto ? (
                        <span className="script-auto-tag"><Sparkles size={9} /> 专属版</span>
                      ) : (
                        <span className="script-auto-tag" style={{ background: "var(--warn-dim)", color: "var(--warn)" }}><Edit3 size={9} /> 自定义</span>
                      )}
                    </div>
                    <span className={"script-status status-" + s.status}>
                      {s.status === "passed" ? <Check size={11} /> : <AlertTriangle size={11} />}
                      {s.status === "passed" ? "合规通过" : "待确认"}
                    </span>
                  </div>
                  {s.editable ? (
                    <textarea
                      className="script-edit-textarea"
                      value={s.text}
                      onChange={(e) => updateScriptText(s.id, e.target.value)}
                      rows={4}
                    />
                  ) : (
                    <p className="script-text">{s.text}</p>
                  )}
                  <div className="script-actions">
                    {s.editable ? (
                      <>
                        <button className="btn btn-primary btn-sm" onClick={() => saveScript(s.id)}><Check size={11} /> 保存</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => toggleEditScript(s.id)}>取消</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-ghost btn-sm"><Play size={11} /> 试听</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => toggleEditScript(s.id)}><Edit3 size={11} /> 编辑</button>
                        <button className="btn btn-ghost btn-sm"><Shield size={11} /> 合规检查</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => deleteScript(s.id)}><Trash2 size={11} /></button>
                      </>
                    )}
                 </div>
               </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Display Actions - editable */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h3 className="detail-section-title"><ListChecks size={14} /> 展示动作序列</h3>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-secondary btn-sm"><RefreshCw size={12} /> 重新生成</button>
                <button className="btn btn-secondary btn-sm" onClick={addAction}><Plus size={12} /> 添加动作</button>
              </div>
            </div>
            <div className="script-gen-hint">
              <Sparkles size={12} />
              AI 自动生成展示动作，支持手动编辑、增删和排序调整
            </div>
            <div className="action-sequence">
              {actions.map((a, i) => (
                <div key={a.id} className="action-seq-item action-seq-editable">
                  <div className="action-seq-controls">
                    <button className="action-seq-btn" onClick={() => moveAction(i, -1)} disabled={i === 0}><ChevronUp size={12} /></button>
                    <button className="action-seq-btn" onClick={() => moveAction(i, 1)} disabled={i === actions.length - 1}><ChevronDown size={12} /></button>
                  </div>
                  <div className="action-seq-num">{i + 1}</div>
                  <input
                    className="action-seq-input"
                    value={a.text}
                    onChange={(e) => updateAction(a.id, e.target.value, a.duration)}
                  />
                  <input
                    className="action-seq-dur-input mono"
                    value={a.duration}
                    onChange={(e) => updateAction(a.id, a.text, e.target.value)}
                  />
                  <button className="action-seq-del" onClick={() => deleteAction(a.id)}><X size={12} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* TTS + Lipsync config */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h3 className="detail-section-title"><Mic size={14} /> TTS 音色与嘴形配置</h3>
              <Link to={`/room/${id}/preview`} className="btn btn-secondary btn-sm"><Eye size={12} /> 打开预览测试</Link>
            </div>
            <div className="config-grid">
              <div className="config-card">
                <div className="config-label">TTS 音色</div>
                <div className="config-value">品牌授权克隆音色 A</div>
                <div className="config-status"><span className="status-dot" style={{ background: "var(--ok)" }} />已授权 · 2026-12-31</div>
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 6 }}><Volume2 size={11} /> 试听</button>
              </div>
              <div className="config-card">
                <div className="config-label">嘴形替换</div>
                <div className="config-value">已开启 · 180ms</div>
                <div className="config-status"><span className="status-dot" style={{ background: "var(--ok)" }} />正常 · 4.2/5</div>
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 6 }}><Eye size={11} /> 测试预览</button>
              </div>
              <div className="config-card">
                <div className="config-label">直播画面</div>
                <div className="config-value">品牌旗舰风 · 9:16</div>
                <div className="config-status"><span className="status-dot" style={{ background: "var(--ok)" }} />商品卡已绑定</div>
                <Link to={`/room/${id}/preview`} className="btn btn-ghost btn-sm" style={{ marginTop: 6 }}><Eye size={11} /> 编辑画面</Link>
              </div>
              <div className="config-card">
                <div className="config-label">模拟开播</div>
                <div className="config-value" style={{ color: "var(--warn)" }}>待测试</div>
                <div className="config-status"><span className="status-dot" style={{ background: "var(--warn)" }} />需完成验证</div>
                <Link to={`/room/${id}/simulate`} className="btn btn-primary btn-sm" style={{ marginTop: 6 }}><Play size={11} /> 开始模拟</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add from library modal - multi-select */}
      {/* Unified add product modal - 2 steps */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => { setShowAddModal(false); setAddStep(0); setSelectedLibProducts([]); }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px" }}>
            <div className="modal-header">
              <span className="modal-title">{addStep === 0 ? "从商品库添加商品" : "确认直播间信息"}</span>
              <X size={16} onClick={() => { setShowAddModal(false); setAddStep(0); setSelectedLibProducts([]); }} style={{ cursor: "pointer" }} />
            </div>

            {/* Step indicator */}
            <div className="modal-steps">
              <div className={"modal-step" + (addStep === 0 ? " active" : " done")}>
                <div className="modal-step-num">{addStep > 0 ? <Check size={12} /> : 1}</div>
                <span>选择商品</span>
              </div>
              <div className="modal-step-line" />
              <div className={"modal-step" + (addStep === 1 ? " active" : "")}>
                <div className="modal-step-num">2</div>
                <span>确认信息</span>
              </div>
            </div>

            <div className="modal-body">
              {addStep === 0 ? (
                <>
                  <div className="assoc-hint">
                    选择一个或多个商品关联到「{roomName}」，下一步确认直播间信息后生成专属话术和动作
                  </div>
                  <div className="add-lib-search">
                    <Search size={14} />
                    <input placeholder="搜索商品库" className="search-input" />
                  </div>
                  <div className="add-lib-list">
                    {libraryProducts.map((p) => {
                      const isSelected = selectedLibProducts.some(sp => sp.id === p.id);
                      return (
                        <div key={p.id} className={"add-lib-row" + (isSelected ? " selected" : "")} onClick={() => { if (isSelected) { setSelectedLibProducts(selectedLibProducts.filter(sp => sp.id !== p.id)); } else { setSelectedLibProducts([...selectedLibProducts, p]); } }} style={{ cursor: "pointer" }}>
                          <div className="add-lib-check" style={{ width: "18px", height: "18px", borderRadius: "4px", border: isSelected ? "2px solid var(--accent)" : "2px solid var(--border)", background: isSelected ? "var(--accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {isSelected && <Check size={12} style={{ color: "#fff" }} />}
                          </div>
                          <div className="product-thumb" style={{ width: "32px", height: "32px", fontSize: "13px", ...(p.image ? { backgroundImage: p.image } : {}) }}>{p.image ? "" : p.initial}</div>
                          <div style={{ flex: 1 }}>
                            <div className="product-name">{p.name}</div>
                            <div className="product-price-row"><span className="product-price">¥{p.price}</span></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  {/* Selected products */}
                  <div className="confirm-products">
                    <div className="confirm-products-label">已选商品（{selectedLibProducts.length}）</div>
                    <div className="confirm-products-list">
                      {selectedLibProducts.map((p) => (
                        <span key={p.id} className="confirm-product-chip">{p.name}</span>
                      ))}
                    </div>
                  </div>
                  {/* Room config */}
                  <div className="confirm-config-section">
                    <div className="confirm-config-header">
                      <span className="confirm-config-title">直播间信息（生成依据）</span>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditingConfig(!editingConfig)}>
                        {editingConfig ? "完成" : "编辑"}
                      </button>
                    </div>
                    <div className="confirm-config-grid">
                      <div className="confirm-config-item">
                        <span className="confirm-config-label">主播人设</span>
                        {editingConfig ? (
                          <select className="form-input" value={roomConfig.persona} onChange={(e) => setRoomConfig({ ...roomConfig, persona: e.target.value })}>
                            <option>店长</option><option>专业顾问</option><option>测评员</option><option>品牌创始人</option>
                          </select>
                        ) : (<span className="confirm-config-value">{roomConfig.persona}</span>)}
                      </div>
                      <div className="confirm-config-item">
                        <span className="confirm-config-label">直播目标</span>
                        {editingConfig ? (
                          <select className="form-input" value={roomConfig.goal} onChange={(e) => setRoomConfig({ ...roomConfig, goal: e.target.value })}>
                            <option>成交转化</option><option>涨粉引流</option><option>清库存</option><option>新品发布</option>
                          </select>
                        ) : (<span className="confirm-config-value">{roomConfig.goal}</span>)}
                      </div>
                      <div className="confirm-config-item">
                        <span className="confirm-config-label">行业模板</span>
                        {editingConfig ? (
                          <select className="form-input" value={roomConfig.template} onChange={(e) => setRoomConfig({ ...roomConfig, template: e.target.value })}>
                            <option>品牌旗舰风</option><option>工厂溯源风</option><option>专柜陈列风</option><option>专业测评风</option><option>节日促销风</option>
                          </select>
                        ) : (<span className="confirm-config-value">{roomConfig.template}</span>)}
                      </div>
                      <div className="confirm-config-item">
                        <span className="confirm-config-label">直播模式</span>
                        {editingConfig ? (
                          <select className="form-input" value={roomConfig.mode} onChange={(e) => setRoomConfig({ ...roomConfig, mode: e.target.value })}>
                            <option>真人展示 AI 代播</option><option>场控确认 AI 代播</option><option>全自动数字人</option>
                          </select>
                        ) : (<span className="confirm-config-value">{roomConfig.mode}</span>)}
                      </div>
                      <div className="confirm-config-item" style={{ gridColumn: "1 / -1" }}>
                        <span className="confirm-config-label">TTS 音色</span>
                        {editingConfig ? (
                          <select className="form-input" value={roomConfig.ttsVoice} onChange={(e) => setRoomConfig({ ...roomConfig, ttsVoice: e.target.value })}>
                            <option>品牌授权克隆音色 A</option><option>品牌授权克隆音色 B</option><option>平台标准音色 - 小薇</option><option>平台标准音色 - 阿泽</option>
                          </select>
                        ) : (<span className="confirm-config-value">{roomConfig.ttsVoice}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="script-gen-hint">
                    <Sparkles size={12} />
                    确认后系统将基于以上信息 + 商品库基础话术，为每个商品生成专属话术和展示动作
                  </div>
                </>
              )}
            </div>

            <div className="form-footer">
              {addStep === 0 ? (
                <>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>已选 {selectedLibProducts.length} 个商品</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-secondary" onClick={() => { setShowAddModal(false); setAddStep(0); setSelectedLibProducts([]); }}>取消</button>
                    <button className="btn btn-primary" disabled={selectedLibProducts.length === 0} onClick={() => setAddStep(1)}>
                      下一步 <ChevronRight size={14} />
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                  <button className="btn btn-secondary" onClick={() => setAddStep(0)}>上一步</button>
                  <button className="btn btn-primary" onClick={startGeneration}>
                    <Sparkles size={14} /> 确认并生成
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Generation flow modal */}
      {showGenFlow && (
        <GenFlowModal
          products={Array.isArray(showGenFlow) ? showGenFlow : [showGenFlow]}
          roomConfig={roomConfig}
          onClose={() => setShowGenFlow(null)}
        />
      )}


      {showCustomScript && (
        <CustomScriptModal onClose={() => setShowCustomScript(false)} onSave={addCustomScript} />
      )}
    </div>
  );
}
function GenFlowModal({ products, roomConfig, onClose }) {
  const [step, setStep] = useState(0);
  const productNames = products.map(p => p.name).join("、");
  const steps = [
    { label: "加载基础话术", desc: `从商品库获取 ${products.length} 个商品的基础话术`, icon: Check },
    { label: "注入直播间上下文", desc: `人设：${roomConfig.persona} · 目标：${roomConfig.goal} · 模板：${roomConfig.template} · 模式：${roomConfig.mode}`, icon: RefreshCw },
    { label: "生成专属话术", desc: `基于基础话术 + 直播间上下文为 ${productNames} 生成专属版本`, icon: Sparkles },
    { label: "合规复检", desc: "直播间级合规词库 + 平台风险词检测", icon: Shield },
    { label: "生成专属展示动作", desc: "基于基础动作 + 目标策略调整动作序列", icon: ListChecks },
  ];

  if (step < steps.length) {
    setTimeout(() => setStep(step + 1), 1200);
  }

  return (
    <div className="modal-overlay" onClick={step >= steps.length ? onClose : undefined}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "520px" }}>
        <div className="modal-header">
          <span className="modal-title">生成专属配置 · {products.length} 个商品</span>
          {step >= steps.length && <X size={16} onClick={onClose} style={{ cursor: "pointer" }} />}
        </div>
        <div className="modal-body">
          {/* Product chips */}
          <div className="confirm-products" style={{ marginBottom: 16 }}>
            <div className="confirm-products-label">正在生成</div>
            <div className="confirm-products-list">
              {products.map((p) => (
                <span key={p.id} className="confirm-product-chip">{p.name}</span>
              ))}
            </div>
          </div>

          <div className="gen-process">
            {steps.map((s, i) => {
              const status = i < step ? "done" : i === step ? "generating" : "pending";
              const Icon = s.icon;
              return (
                <div key={i} className={"gen-step gen-step-" + status}>
                  <div className="gen-step-icon">
                    {status === "done" ? <Check size={12} /> : status === "generating" ? <Icon size={12} className="spin" /> : <span className="gen-step-num">{i + 1}</span>}
                  </div>
                  <div className="gen-step-info">
                    <div className="gen-step-label">{s.label}</div>
                    <div className="gen-step-desc">{s.desc}</div>
                  </div>
                  <span className="gen-step-status">{status === "done" ? "完成" : status === "generating" ? "进行中" : "等待"}</span>
                </div>
              );
            })}
          </div>
          {step >= steps.length && (
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--ok)", marginBottom: 12 }}>
                <Check size={16} style={{ verticalAlign: "middle" }} /> 全部生成完成！{products.length} 个商品已添加到队列
              </div>
              <button className="btn btn-primary btn-sm" onClick={onClose}>查看商品配置</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CustomScriptModal({ onClose, onSave }) {
  const [type, setType] = useState("");
  const [text, setText] = useState("");

  const presetTypes = ["开场话术", "暖场话术", "转品衔接", "转化逼单", "互动问答", "异常解释", "其他"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
        <div className="modal-header">
          <span className="modal-title">自定义话术</span>
          <X size={16} onClick={onClose} style={{ cursor: "pointer" }} />
        </div>
        <div className="modal-body">
          <div className="assoc-hint">
            手动创建的话术不会覆盖 AI 生成的专属话术，作为补充添加到话术列表中
          </div>
          <div className="form-group" style={{ marginBottom: 14 }}>
            <label className="form-label">话术类型</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
              {presetTypes.map((t) => (
                <button
                  key={t}
                  className={"toolbar-btn" + (type === t ? " active" : "")}
                  style={{ fontSize: "11px" }}
                  onClick={() => setType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <input
              className="form-input"
              style={{ marginTop: 8 }}
              placeholder="或自定义类型名称"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 14 }}>
            <label className="form-label">话术内容 <span className="required">*</span></label>
            <textarea
              className="form-textarea"
              rows={5}
              placeholder="输入话术内容，如：姐妹们这款精华液真的太好用了，我自己每天都在用..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="compliance-warn">
            <Shield size={12} />
            自定义话术保存后需通过合规检查才能进入播报队列
          </div>
        </div>
        <div className="form-footer">
          <button className="btn btn-secondary" onClick={onClose}>取消</button>
          <button
            className="btn btn-primary"
            disabled={!type || !text}
            onClick={() => onSave(type, text)}
          >
            <Check size={14} /> 保存话术
          </button>
        </div>
      </div>
    </div>
  );
}
