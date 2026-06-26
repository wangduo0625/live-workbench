import { useState } from "react";
import { Layout } from "../components/Layout.jsx";
import { Link } from "react-router-dom";
import {
  Search, Plus, Play, RefreshCw, Shield, Check, AlertTriangle,
  Mic, Clock, FileText, Sparkles, Eye, Volume2, ListChecks,
  Link2, ChevronUp, ChevronDown, PackageOpen, X, GripVertical
} from "lucide-react";

const roomProducts = [
  { id: 1, name: "玻尿酸保湿精华液", price: 89, orig: 169, stock: 2340, status: "ready", initial: "玻", queueOrder: 1 },
  { id: 2, name: "氨基酸洁面乳", price: 45, orig: 89, stock: 1560, status: "ready", initial: "氨", queueOrder: 2 },
  { id: 3, name: "烟酰胺亮肤面膜10片", price: 69, orig: 129, stock: 890, status: "pending", initial: "烟", queueOrder: 3 },
  { id: 4, name: "视黄醇抗皱眼霜", price: 159, orig: 299, stock: 456, status: "ready", initial: "视", queueOrder: 4 },
  { id: 5, name: "神经酰胺修护面霜", price: 119, orig: 199, stock: 1120, status: "pending", initial: "神", queueOrder: 5 },
];

const libraryProducts = [
  { id: 10, name: "维C亮肤精华", initial: "维", price: 99 },
  { id: 11, name: "水光针精华液", initial: "水", price: 129 },
  { id: 12, name: "防晒霜SPF50", initial: "防", price: 79 },
  { id: 13, name: "卸妆油", initial: "卸", price: 59 },
];

const scripts = [
  { id: 1, type: "30秒短促销版", status: "passed", duration: "28秒", auto: true, text: "这款玻尿酸精华，2%浓度深层补水，上脸不黏腻。今天直播间券后只要89元，原价169，直接半价。" },
  { id: 2, type: "1分钟标准版", status: "passed", duration: "52秒", auto: true, text: "姐妹们看过来，这款玻尿酸保湿精华液，采用2%烟酰胺配方，能够有效提亮肤色、淡化痘印。搭配专利渗透技术，吸收率提升40%。" },
  { id: 3, type: "3分钟深度讲解版", status: "review", duration: "2分48秒", auto: true, text: "今天要给大家重点推荐的，就是这款玻尿酸保湿精华液。先说核心成分：2%烟酰胺加双重玻尿酸..." },
  { id: 4, type: "问答版", status: "passed", duration: "15秒", auto: true, text: "敏感肌的姐妹问能不能用？完全可以。这款不含酒精、香精和色素，通过了敏感肌测试。" },
];

const actions = [
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

export function ProductScripts() {
  const [selected, setSelected] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  const product = roomProducts.find((p) => p.id === selected);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <Layout>
      <div className="page product-page">
        {/* Left: Room product queue */}
        <div className="product-sidebar">
          <div className="panel-header" style={{ padding: "0 14px", height: "48px" }}>
            <div>
              <span className="panel-title">商品队列</span>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>品牌旗舰 618大促专场</div>
            </div>
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
            {roomProducts.map((p, i) => {
              const st = statusMap[p.status];
              return (
                <div key={p.id} className={"product-item" + (p.id === selected ? " active" : "")} onClick={() => setSelected(p.id)}>
                  <GripVertical size={12} style={{ color: "var(--text-faint)", flexShrink: 0 }} />
                  <span className="queue-order">{p.queueOrder}</span>
                  <div className="product-thumb">{p.initial}</div>
                  <div className="product-info">
                    <div className="product-name">{p.name}</div>
                    <div className="product-price-row">
                      <span className="product-price">¥{p.price}</span>
                    </div>
                  </div>
                  <span className={"product-badge " + st.class}>{st.label}</span>
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

        {/* Right: Room-specific product config */}
        <div className="product-detail">
          <div className="detail-header">
            <div className="detail-product-info">
              <div className="detail-product-thumb">{product.initial}</div>
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
            <Link to="/preview" className="btn btn-secondary btn-sm"><Eye size={12} /> 画面与预览</Link>
            <button className="btn btn-primary btn-sm"><Play size={12} /> 模拟开播</button>
          </div>

          {/* AI Scripts */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h3 className="detail-section-title"><FileText size={14} /> AI 话术</h3>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-secondary btn-sm" onClick={handleGenerate}>
                  <RefreshCw size={12} className={generating ? "spin" : ""} /> {generating ? "生成中..." : "重新生成"}
                </button>
                <button className="btn btn-secondary btn-sm"><Plus size={12} /> 自定义</button>
              </div>
            </div>
            <div className="script-gen-hint">
              <Sparkles size={12} />
              系统根据商品档案自动生成话术，此处为直播间专属配置
            </div>
            <div className="script-list">
              {scripts.map((s) => (
                <div key={s.id} className="script-card">
                  <div className="script-card-header">
                    <div className="script-card-title">
                      <span className="script-type">{s.type}</span>
                      <span className="script-duration mono">{s.duration}</span>
                      {s.auto && <span className="script-auto-tag"><Sparkles size={9} /> AI生成</span>}
                    </div>
                    <span className={"script-status status-" + s.status}>
                      {s.status === "passed" ? <Check size={11} /> : <AlertTriangle size={11} />}
                      {s.status === "passed" ? "合规通过" : "待确认"}
                    </span>
                  </div>
                  <p className="script-text">{s.text}</p>
                  <div className="script-actions">
                    <button className="btn btn-ghost btn-sm"><Play size={11} /> 试听</button>
                    <button className="btn btn-ghost btn-sm"><RefreshCw size={11} /> 重写</button>
                    <button className="btn btn-ghost btn-sm"><Shield size={11} /> 合规检查</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Display Actions */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h3 className="detail-section-title"><ListChecks size={14} /> 展示动作序列</h3>
              <button className="btn btn-secondary btn-sm"><RefreshCw size={12} /> 重新生成</button>
            </div>
            <div className="action-sequence">
              {actions.map((a, i) => (
                <div key={a.id} className="action-seq-item">
                  <div className="action-seq-num">{i + 1}</div>
                  <div className="action-seq-text">{a.text}</div>
                  <div className="action-seq-duration mono">{a.duration}</div>
                </div>
              ))}
            </div>
          </div>

          {/* TTS + Lipsync config */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h3 className="detail-section-title"><Mic size={14} /> TTS 音色与嘴形配置</h3>
              <Link to="/preview" className="btn btn-secondary btn-sm"><Eye size={12} /> 打开预览测试</Link>
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
                <Link to="/preview" className="btn btn-ghost btn-sm" style={{ marginTop: 6 }}><Eye size={11} /> 编辑画面</Link>
              </div>
              <div className="config-card">
                <div className="config-label">模拟开播</div>
                <div className="config-value" style={{ color: "var(--warn)" }}>待测试</div>
                <div className="config-status"><span className="status-dot" style={{ background: "var(--warn)" }} />需完成验证</div>
                <button className="btn btn-primary btn-sm" style={{ marginTop: 6 }}><Play size={11} /> 开始模拟</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add from library modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">从商品库添加商品到队列</span>
              <X size={16} onClick={() => setShowAddModal(false)} style={{ cursor: "pointer" }} />
            </div>
            <div className="modal-body">
              <div className="assoc-hint">
                从全局商品库选择商品关联到「品牌旗舰 618大促专场」，关联后自动生成默认话术和配置
              </div>
              <div className="add-lib-search">
                <Search size={14} />
                <input placeholder="搜索商品库" className="search-input" />
              </div>
              <div className="add-lib-list">
                {libraryProducts.map((p) => (
                  <div key={p.id} className="add-lib-row">
                    <div className="product-thumb" style={{ width: "32px", height: "32px", fontSize: "13px" }}>{p.initial}</div>
                    <div style={{ flex: 1 }}>
                      <div className="product-name">{p.name}</div>
                      <div className="product-price-row"><span className="product-price">¥{p.price}</span></div>
                    </div>
                    <button className="btn btn-primary btn-sm"><Plus size={12} /> 添加</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
