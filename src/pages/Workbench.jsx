import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mic, Play, Pause, ChevronRight, Eye, Radio, Settings,
  RefreshCw, AlertTriangle, Check, MessageSquare,
  Monitor, Shield, VolumeX, SkipForward, Clock, ChevronLeft, X, Sparkles, Loader, Send,
  Package
} from "lucide-react";

const products = [
  { id: 1, name: "玻尿酸保湿精华液", price: 89, orig: 169, stock: 2340, status: "active", initial: "玻", image: "url(/products/product-essence.png)" },
  { id: 2, name: "氨基酸洁面乳", price: 45, orig: 89, stock: 1560, status: "pending", initial: "氨", image: "url(/products/product-cleanser.png)" },
  { id: 3, name: "烟酰胺亮肤面膜10片", price: 69, orig: 129, stock: 890, status: "pending", initial: "烟", image: "url(/products/product-mask.png)" },
  { id: 4, name: "视黄醇抗皱眼霜", price: 159, orig: 299, stock: 456, status: "loop", initial: "视", image: "url(/products/product-eye-cream.png)" },
  { id: 5, name: "神经酰胺修护面霜", price: 119, orig: 199, stock: 1120, status: "pending", initial: "神", image: "url(/products/product-face-cream.png)" },
  { id: 6, name: "多肽紧致精华液", price: 139, orig: 259, stock: 0, status: "blocked", initial: "多", image: null },
];

const queueItems = [
  { id: 1, title: "玻尿酸精华 3分钟标准版", meta: "商品讲解", time: "00:47 / 03:00", status: "active" },
  { id: 2, title: "限时券逼单话术", meta: "转化逼单", time: "20秒", status: "pending" },
  { id: 3, title: "评论回答 敏感肌能用吗", meta: "互动问答", time: "15秒", status: "pending" },
  { id: 4, title: "开场话术", meta: "暖场引导", time: "已完成", status: "done" },
  { id: 5, title: "最划算的价格", meta: "极限词拦截", time: "—", status: "blocked" },
];

const comments = [
  { id: 1, user: "小红同学", text: "敏感肌可以用吗？", tag: "high" },
  { id: 2, user: "花花世界", text: "和XX品牌比怎么样？", tag: "high" },
  { id: 3, user: "省钱小能手", text: "价格比上次贵了", tag: "negative" },
  { id: 4, user: "张三", text: "什么时候发货？", tag: "service" },
  { id: 5, user: "李四", text: "有没有小样送？", tag: "repeat" },
  { id: 6, user: "美妆达人", text: "适合什么肤质？", tag: "high" },
];

const readinessItems = ["商品与话术", "商品画面", "音色与嘴形", "模拟开播", "推流状态"];
const pipelineSteps = ["商品资料", "话术生成", "TTS", "嘴形替换", "混流推送"];
const statusLabels = { active: "讲解中", pending: "待播", loop: "循环", blocked: "不可播" };
const tagLabels = { high: "高价值", negative: "负面", service: "售后", repeat: "重复" };

function Icon({ name, size }) {
  const map = { Play, Clock, Check, AlertTriangle, Mic, Pause, RefreshCw, MessageSquare, Monitor, ChevronRight, SkipForward, VolumeX, Eye, Radio, Settings, Shield, Package };
  const C = map[name];
  return C ? <C size={size} /> : null;
}

export function Workbench() {
  const [tab, setTab] = useState("queue");
  const [activeProduct, setActiveProduct] = useState(1);
  const [showRewrite, setShowRewrite] = useState(false);
  const [showInsert, setShowInsert] = useState(false);
  const [rewriteState, setRewriteState] = useState("idle");
  const [insertState, setInsertState] = useState("idle");
  const [rewriteReq, setRewriteReq] = useState("");
  const [rewriteText, setRewriteText] = useState("");
  const [insertText, setInsertText] = useState("");
  const [showHelpAlert, setShowHelpAlert] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const queueIcons = { active: "Play", pending: "Clock", done: "Check", blocked: "AlertTriangle" };

  return (
    <div className="workbench">
      <header className="topbar">
        <Link to="/" className="topbar-back"><ChevronLeft size={16} /></Link>
        <div className="topbar-brand">
          <div className="topbar-logo">LC</div>
          <span className="topbar-brand-name">LiveCopilot</span>
        </div>
        <div className="topbar-room">品牌旗舰 618大促专场</div>
        <div className="topbar-spacer" />
        <div className="topbar-live">
          <span className="topbar-live-dot" />
          <span className="topbar-live-label">LIVE</span>
        </div>
        <span className="topbar-timer">02:34:18</span>
        <div className="topbar-metrics">
          <div className="topbar-metric"><span className="topbar-metric-value">1,284</span><span className="topbar-metric-label">在线人数</span></div>
          <div className="topbar-metric"><span className="topbar-metric-value">12.3%</span><span className="topbar-metric-label">互动率</span></div>
          <div className="topbar-metric"><span className="topbar-metric-value">¥48,260</span><span className="topbar-metric-label">GMV</span></div>
        </div>
        <div className="topbar-right">
          <span className="topbar-tag"><Radio size={11} /> 抖音</span>
          <div className="topbar-push"><span className="topbar-push-dot" />推流中</div>
          <Settings size={15} />
          <button className="btn btn-danger btn-sm" onClick={() => setShowHelpAlert(true)} title="模拟收到真人求助">
            <AlertTriangle size={12} /> 模拟求助
          </button>
        </div>
      </header>

      {/* Help alert banner */}
      {showHelpAlert && (
        <div className="help-alert-banner">
          <div className="help-alert-icon"><AlertTriangle size={18} /></div>
          <div className="help-alert-content">
            <div className="help-alert-title">真人求助信号</div>
            <div className="help-alert-desc">
              原因：不确定怎么展示 · 商品：玻尿酸保湿精华液 · 动作：标签朝镜头 · 时间 02:34:18
            </div>
          </div>
          <div className="help-alert-actions">
            <button className="btn btn-danger btn-sm" onClick={() => setShowHelpAlert(false)}>
              <Pause size={12} /> 暂停AI
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowHelpAlert(false)}>
              切换商品
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowHelpAlert(false)}>
              <Check size={12} /> 回复继续
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowHelpAlert(false)}>
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Grid: wider center for bigger preview */}
      <div className="main-grid" style={{ gridTemplateColumns: "280px 1fr 320px" }}>
        {/* Left: Product queue + Presenter actions (bigger) */}
        <div className="col col-left">
          <div className="panel panel-flex">
            <div className="panel-header">
              <span className="panel-title">商品队列</span>
              <span className="panel-count">6/12</span>
            </div>
            <div className="panel-body">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={"product-item" + (p.id === activeProduct ? " active" : "")}
                  onClick={() => p.status !== "blocked" && setActiveProduct(p.id)}
                  style={{ cursor: p.status === "blocked" ? "not-allowed" : "pointer", opacity: p.status === "blocked" ? 0.5 : 1 }}
                >
                  <div className="product-thumb" style={p.image ? { backgroundImage: p.image } : {}}>{p.image ? "" : p.initial}</div>
                  <div className="product-info">
                    <div className="product-name">{p.name}</div>
                    <div className="product-price-row">
                      <span className="product-price">¥{p.price}</span>
                      <span className="product-price-orig">¥{p.orig}</span>
                    </div>
                  </div>
                  <div className="product-status">
                    <span className={"product-badge badge-" + p.status}>{statusLabels[p.status]}</span>
                    <span className="product-stock">库存 {p.stock.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Presenter actions - enlarged */}
          <div className="presenter">
            <div className="presenter-status">
              <span className="presenter-mic"><Mic size={10} /> 麦克风关闭</span>
              <span className="presenter-ai">AI口播中 · 嘴形替换开启</span>
            </div>
            <div className="action-current" style={{ padding: "16px 16px" }}>
              <div className="action-label">当前动作</div>
              <div className="action-text" style={{ fontSize: "18px" }}>标签朝镜头 · 展示正面</div>
              <div className="action-countdown" style={{ marginTop: "10px" }}>
                <div className="action-bar" style={{ height: "4px" }}>
                  <div className="action-bar-fill" style={{ width: "65%" }} />
                </div>
                <span className="action-time" style={{ fontSize: "13px" }}>08s</span>
              </div>
            </div>
            <div className="action-next" style={{ fontSize: "12px", padding: "8px 16px 10px" }}>
              <span style={{ color: "var(--text-faint)" }}>下一动作</span>
              <span>展示质地 · 手指轻按</span>
            </div>
            <div className="action-controls">
              <button className="btn btn-primary btn-sm btn-flex"><Check size={12} /> 动作完成</button>
              <button className="btn btn-secondary btn-sm btn-flex"><ChevronRight size={12} /> 下一动作</button>
            </div>
            <div style={{ marginTop: 6 }}>
              <button className="btn btn-danger btn-sm" style={{ width: "100%" }}><Pause size={12} /> 暂停 AI</button>
            </div>
          </div>
        </div>

        {/* Center: Bigger preview + AI controls + product switch */}
        <div className="col col-center">
          <div className="preview-wrap" style={{ padding: "16px 16px 8px" }}>
            {/* Bigger preview frame */}
            <div className="preview-frame" style={{ width: "320px" }}>
              <div className="pv-top">
                <span className="pv-brand">品牌旗舰</span>
                <span className="pv-activity">618大促</span>
                <span className="pv-viewers"><span className="pv-viewers-dot" />1,284</span>
              </div>
              <div className="pv-presenter">
                <div className="pv-silhouette" style={{ width: "100px", height: "150px" }} />
              </div>
              <div className="pv-product-card">
                <div className="pv-product-thumb" />
                <div className="pv-product-info">
                  <div className="pv-product-name">{products.find(p => p.id === activeProduct)?.name}</div>
                  <div className="pv-product-price-row">
                    <span className="pv-product-price">¥{products.find(p => p.id === activeProduct)?.price}</span>
                    <span className="pv-product-orig">¥{products.find(p => p.id === activeProduct)?.orig}</span>
                  </div>
                  <div className="pv-product-meta">
                    <span className="pv-product-stock">库存 {products.find(p => p.id === activeProduct)?.stock.toLocaleString()}</span>
                    <span className="pv-product-badge">正在讲解</span>
                  </div>
                </div>
              </div>
              <div className="pv-subtitle">
                <span className="pv-subtitle-text">这款精华液含有<span className="pv-subtitle-hl">2%烟酰胺</span>，能够有效提亮肤色</span>
              </div>
              <div className="pv-bottom">
                <span className="pv-buy">点击下方链接购买</span>
              </div>
            </div>

            {/* Manual product switch - prominent */}
            <div className="product-switch-bar">
              <div className="product-switch-info">
                <Package size={14} />
                <span className="product-switch-name">{products.find(p => p.id === activeProduct)?.name}</span>
                <span className={"product-badge badge-" + products.find(p => p.id === activeProduct)?.status}>{statusLabels[products.find(p => p.id === activeProduct)?.status]}</span>
              </div>
              <div className="product-switch-actions">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const nextP = products.find(p => p.id > activeProduct && p.status !== "blocked");
                    if (nextP) setActiveProduct(nextP.id);
                  }}
                >
                  <SkipForward size={12} /> 切到下个商品
                </button>
                <Link to="/room/1/preview" className="btn btn-secondary btn-sm">
                  <Eye size={12} /> 画面设置
                </Link>
              </div>
            </div>
          </div>

          {/* AI Controls */}
          <div className="ai-controls" style={{ maxWidth: "480px" }}>
            <div className="ai-status-row">
              <span className="ai-status-label"><span className="ai-status-dot" /> AI播报中</span>
              <div className="ai-progress">
                <div className="ai-progress-bar"><div className="ai-progress-fill" style={{ width: "26%" }} /></div>
                <span className="ai-progress-time">00:47 / 03:00</span>
              </div>
              <span className="ai-lipsync"><span className="ai-lipsync-dot" /> 嘴形 180ms</span>
            </div>
            <div className="ai-script">
              这款玻尿酸保湿精华液，采用<span className="ai-script-hl">2%烟酰胺配方</span>，能够有效提亮肤色、淡化痘印。搭配专利渗透技术，吸收率提升40%...
            </div>
            <div className="ai-btn-row">
              <button className="btn btn-danger btn-sm btn-flex"><Pause size={12} /> 暂停AI</button>
              <button className="btn btn-secondary btn-sm btn-flex" onClick={() => { setShowRewrite(true); setRewriteState("idle"); setRewriteReq(""); setRewriteText(""); }}><RefreshCw size={12} /> 重写</button>
              <button className="btn btn-secondary btn-sm btn-flex" onClick={() => setShowInsert(true)}><MessageSquare size={12} /> 插入回答</button>
              <Link to="/room/1/simulate" className="btn btn-secondary btn-sm btn-flex"><Monitor size={12} /> 模拟开播</Link>
            </div>
          </div>
        </div>

        {/* Right: Queue/Comments + Status */}
        <div className="col col-right">
          <div className="panel panel-flex">
            <div className="tabs">
              <button className={"tab" + (tab === "queue" ? " active" : "")} onClick={() => setTab("queue")}>
                口播队列 <span className="tab-count">{queueItems.length}</span>
              </button>
              <button className={"tab" + (tab === "comments" ? " active" : "")} onClick={() => setTab("comments")}>
                评论池 <span className="tab-count">{comments.length}</span>
              </button>
            </div>
            <div className="panel-body">
              {tab === "queue" && queueItems.map((q) => (
                <div key={q.id} className={"queue-item" + (q.status === "active" ? " active" : "")}>
                  <div className={"queue-icon queue-icon-" + q.status}><Icon name={queueIcons[q.status]} size={12} /></div>
                  <div className="queue-content">
                    <div className="queue-title">{q.title}</div>
                    <div className="queue-meta">
                      <span className="queue-meta-text">{q.meta}</span>
                      <span className="queue-time">{q.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              {tab === "comments" && comments.map((c) => (
                <div key={c.id} className="comment-item">
                  <div className="comment-meta">
                    <span className="comment-user">{c.user}</span>
                    <span className={"comment-tag tag-" + c.tag}>{tagLabels[c.tag]}</span>
                  </div>
                  <div className="comment-text">{c.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="status-panel">
            <div className="status-section">
              <div className="status-section-title">开播准备度</div>
              <div className="readiness-list">
                {readinessItems.map((item) => (
                  <div key={item} className="readiness-item">
                    <span className="readiness-check check-ok"><Check size={10} /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="status-section">
              <div className="status-section-title">AI代播链路</div>
              <div className="pipeline">
                {pipelineSteps.map((step, i) => (
                  <span key={step} style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
                    <span className="pipeline-step"><span className="pipeline-step-dot" />{step}</span>
                    {i < pipelineSteps.length - 1 && <span className="pipeline-arrow">›</span>}
                  </span>
                ))}
              </div>
            </div>
            <div className="status-section">
              <div className="status-section-title">开播风险</div>
              <div className="risk-row">
                <span className="readiness-check check-ok"><Check size={10} /></span>
                无风险 · 合规通过
              </div>
            </div>
            <div className="status-section">
              <div className="status-section-title">紧急控制</div>
              <div className="emergency-row">
                <button className="btn btn-danger btn-sm btn-flex"><Monitor size={12} /> 黑屏</button>
                <button className="btn btn-danger btn-sm btn-flex"><VolumeX size={12} /> 静音</button>
                <button className="btn btn-secondary btn-sm btn-flex"><RefreshCw size={12} /> 重连</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Rewrite modal */}
      {showRewrite && (
        <div className="modal-overlay" onClick={() => { setShowRewrite(false); setRewriteState("idle"); setRewriteReq(""); setRewriteText(""); }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px" }}>
            <div className="modal-header">
              <span className="modal-title">重写话术</span>
              <X size={16} onClick={() => { setShowRewrite(false); setRewriteState("idle"); setRewriteReq(""); setRewriteText(""); }} style={{ cursor: "pointer" }} />
            </div>
            <div className="modal-body">
              {rewriteState === "idle" && (
                <>
                  <div className="script-gen-hint" style={{ marginBottom: 12 }}>
                    <Sparkles size={12} />
                    AI 将基于商品信息 + 直播间上下文重新生成当前话术，可输入额外要求
                  </div>
                  <div className="form-group" style={{ marginBottom: 14 }}>
                    <label className="form-label">生成要求（可选）</label>
                    <textarea
                      className="form-textarea"
                      rows={3}
                      placeholder="如：语气更口语化、突出价格优势、加入使用场景描述..."
                      value={rewriteReq}
                      onChange={(e) => setRewriteReq(e.target.value)}
                    />
                  </div>
                  <div className="base-script-card" style={{ opacity: 0.6, marginBottom: 14 }}>
                    <div className="script-card-title" style={{ marginBottom: 6 }}>
                      <span className="script-type">当前话术</span>
                    </div>
                    <p className="script-text">这款玻尿酸保湿精华液，采用2%烟酰胺配方，能够有效提亮肤色、淡化痘印。搭配专利渗透技术，吸收率提升40%...</p>
                  </div>
                  <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => { setRewriteState("generating"); setTimeout(() => { setRewriteState("done"); setRewriteText("姐妹们看过来！这款玻尿酸保湿精华液真的太好用了，我自己每天都在用。2%烟酰胺加双重玻尿酸，一边提亮一边锁水，质地清爽完全不黏腻。今天直播间专属价只要89元，原价169，还送两个小样，真的闭眼入！"); }, 2000); }}>
                    <Sparkles size={14} /> {rewriteReq ? "按要求生成" : "生成话术"}
                  </button>
                </>
              )}
              {rewriteState === "generating" && (
                <div className="gen-process">
                  <div className="gen-step gen-step-generating">
                    <div className="gen-step-icon"><RefreshCw size={12} className="spin" /></div>
                    <div className="gen-step-info">
                      <div className="gen-step-label">重新生成话术中</div>
                      <div className="gen-step-desc">{rewriteReq ? "要求：" + rewriteReq : "人设：店长 · 目标：成交转化 · 商品：玻尿酸保湿精华液"}</div>
                    </div>
                    <span className="gen-step-status">进行中</span>
                  </div>
                  <div className="gen-step gen-step-pending">
                    <div className="gen-step-icon"><span className="gen-step-num">2</span></div>
                    <div className="gen-step-info">
                      <div className="gen-step-label">合规检查</div>
                      <div className="gen-step-desc">检查极限词、功效承诺、价格表达</div>
                    </div>
                    <span className="gen-step-status">等待</span>
                  </div>
                </div>
              )}
              {rewriteState === "done" && (
                <>
                  <div className="script-gen-hint" style={{ marginBottom: 10 }}>
                    <Sparkles size={12} />
                    生成完成，可编辑后采用
                  </div>
                  <div className="form-group" style={{ marginBottom: 10 }}>
                    <label className="form-label">新生成的话术（可编辑）</label>
                    <textarea
                      className="script-edit-textarea"
                      rows={5}
                      value={rewriteText}
                      onChange={(e) => setRewriteText(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => { setRewriteState("idle"); }}>
                      <RefreshCw size={12} /> 重新生成
                    </button>
                  </div>
                </>
              )}
            </div>
            {rewriteState === "done" && (
              <div className="form-footer">
                <button className="btn btn-secondary" onClick={() => { setShowRewrite(false); setRewriteState("idle"); setRewriteReq(""); setRewriteText(""); }}>放弃</button>
                <button className="btn btn-primary" onClick={() => { setShowRewrite(false); setRewriteState("idle"); setRewriteReq(""); setRewriteText(""); }}>
                  <Check size={14} /> 采用新话术
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Insert answer modal */}
      {showInsert && (
        <div className="modal-overlay" onClick={() => { setShowInsert(false); setSelectedComment(null); setInsertState("idle"); setInsertText(""); }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px" }}>
            <div className="modal-header">
              <span className="modal-title">插入评论回答</span>
              <X size={16} onClick={() => { setShowInsert(false); setSelectedComment(null); setInsertState("idle"); setInsertText(""); }} style={{ cursor: "pointer" }} />
            </div>
            <div className="modal-body">
              <div className="script-gen-hint" style={{ marginBottom: 12 }}>
                <MessageSquare size={12} />
                从评论池选择问题，AI 生成回答后插入到口播队列当前位置
              </div>
              <div className="insert-comment-list">
                {comments.filter(c => c.tag === "high" || c.tag === "service").map((c) => (
                  <div
                    key={c.id}
                    className={"insert-comment-row" + (selectedComment?.id === c.id ? " selected" : "")}
                    onClick={() => { setSelectedComment(c); setInsertState("idle"); setInsertText(""); }}
                  >
                    <div className="insert-comment-info">
                      <div className="insert-comment-user">{c.user}</div>
                      <div className="insert-comment-text">{c.text}</div>
                    </div>
                    <span className={"comment-tag tag-" + c.tag}>{c.tag === "high" ? "高价值" : "售后"}</span>
                  </div>
                ))}
              </div>
              {selectedComment && (
                <div style={{ marginTop: 14 }}>
                  {insertState === "idle" && (
                    <button className="btn btn-primary btn-sm" style={{ width: "100%" }} onClick={() => { setInsertState("generating"); setTimeout(() => { setInsertState("done"); setInsertText("这款精华液完全不含酒精、香精和色素，通过了敏感肌测试，敏感肌可以放心使用。如果还是担心，可以先在耳后试涂，24小时无不适再上脸。"); }, 1500); }}>
                      <Sparkles size={12} /> 生成回答
                    </button>
                  )}
                  {insertState === "generating" && (
                    <div className="gen-step gen-step-generating" style={{ padding: "8px 10px" }}>
                      <div className="gen-step-icon"><Loader size={12} className="spin" /></div>
                      <div className="gen-step-info">
                        <div className="gen-step-label">AI 正在生成回答</div>
                        <div className="gen-step-desc">基于商品资料和 FAQ 回答：{selectedComment.text}</div>
                      </div>
                    </div>
                  )}
                  {insertState === "done" && (
                    <>
                      <div className="script-gen-hint" style={{ marginBottom: 10 }}>
                        <Sparkles size={12} />
                        生成完成，可编辑后插入
                      </div>
                      <div className="form-group" style={{ marginBottom: 10 }}>
                        <label className="form-label">评论回答（可编辑）</label>
                        <textarea
                          className="script-edit-textarea"
                          rows={4}
                          value={insertText}
                          onChange={(e) => setInsertText(e.target.value)}
                        />
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => { setInsertState("idle"); setInsertText(""); }}>
                          <RefreshCw size={12} /> 重新生成
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            {insertState === "done" && (
              <div className="form-footer">
                <button className="btn btn-secondary" onClick={() => { setShowInsert(false); setSelectedComment(null); setInsertState("idle"); setInsertText(""); }}>取消</button>
                <button className="btn btn-primary" onClick={() => { setShowInsert(false); setSelectedComment(null); setInsertState("idle"); setInsertText(""); }}>
                  <Send size={14} /> 插入到队列
                </button>
              </div>
            )}
          </div>
        </div>
      )}


    </div>
  );
}
