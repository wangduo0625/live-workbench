import { ProductForm } from "../components/ProductForm.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout.jsx";
import {
  Search, Plus, PackageOpen, Download, Upload, Link2,
  ChevronRight, Check, AlertTriangle, Tag, Image, FileText, Shield,
  Layers, X, ShoppingBag, Sparkles, RefreshCw, Play, Loader
} from "lucide-react";

const products = [
  {
    id: 1, name: "玻尿酸保湿精华液", initial: "玻", category: "美妆个护",
    price: 89, orig: 169, stock: 2340, roomCount: 3, source: "平台同步",
    sellPoints: ["2%烟酰胺提亮", "专利渗透技术", "无酒精敏感肌可用"],
    compliance: "passed", evidence: 4, hasDetail: true,
    baseScriptStatus: "done", image: "url(/products/product-essence.png)",
  },
  {
    id: 2, name: "氨基酸洁面乳", initial: "氨", category: "美妆个护",
    price: 45, orig: 89, stock: 1560, roomCount: 2, source: "批量导入",
    sellPoints: ["温和不紧绷", "pH5.5弱酸性", "深层清洁毛孔"],
    compliance: "passed", evidence: 3, hasDetail: true,
    baseScriptStatus: "done", image: "url(/products/product-cleanser.png)",
  },
  {
    id: 3, name: "烟酰胺亮肤面膜10片", initial: "烟", category: "美妆个护",
    price: 69, orig: 129, stock: 890, roomCount: 1, source: "手动创建",
    sellPoints: ["5%烟酰胺浓度", "天丝膜布贴合", "提亮淡印"],
    compliance: "review", evidence: 2, hasDetail: true,
    baseScriptStatus: "done", image: "url(/products/product-mask.png)",
  },
  {
    id: 4, name: "视黄醇抗皱眼霜", initial: "视", category: "美妆个护",
    price: 159, orig: 299, stock: 456, roomCount: 2, source: "平台同步",
    sellPoints: ["0.3%视黄醇", "淡化细纹", "缓释技术不刺激"],
    compliance: "passed", evidence: 5, hasDetail: true,
    baseScriptStatus: "done", image: "url(/products/product-eye-cream.png)",
  },
  {
    id: 5, name: "神经酰胺修护面霜", initial: "神", category: "美妆个护",
    price: 119, orig: 199, stock: 1120, roomCount: 1, source: "平台同步",
    sellPoints: ["三重神经酰胺", "修复屏障", "24小时保湿"],
    compliance: "passed", evidence: 3, hasDetail: true,
    baseScriptStatus: "generating", image: "url(/products/product-face-cream.png)",
  },
  {
    id: 6, name: "多肽紧致精华液", initial: "多", category: "美妆个护",
    price: 139, orig: 259, stock: 0, roomCount: 0, source: "API对接",
    sellPoints: ["六胜肽抗皱", "提拉紧致", "质地清爽"],
    compliance: "blocked", evidence: 1, hasDetail: false,
    baseScriptStatus: "pending", image: null,
  },
];

const rooms = [
  { id: 1, name: "品牌旗舰 618大促专场" },
  { id: 2, name: "夏季清仓特卖" },
  { id: 3, name: "新品发布预热场" },
  { id: 4, name: "夜间无人橱窗" },
];

const complianceMap = {
  passed: { label: "合规通过", class: "badge-active", icon: Check },
  review: { label: "待确认", class: "badge-pending", icon: AlertTriangle },
  blocked: { label: "不通过", class: "badge-blocked", icon: AlertTriangle },
};

const baseScriptStatusMap = {
  done: { label: "已生成", class: "badge-active", icon: Check },
  generating: { label: "生成中", class: "badge-pending", icon: Loader },
  pending: { label: "待生成", class: "badge-blocked", icon: AlertTriangle },
};

const baseGenSteps = [
  { id: 1, label: "提取商品卖点", desc: "从商品资料中提取 3-5 条核心卖点", status: "done" },
  { id: 2, label: "生成基础话术", desc: "生成 30秒/1分钟/3分钟/问答版 4 个版本", status: "done" },
  { id: 3, label: "合规初检", desc: "检查极限词、功效承诺、价格表达", status: "done" },
  { id: 4, label: "生成基础动作", desc: "根据商品类目和物理特性生成展示动作", status: "done" },
];

const generatingSteps = [
  { id: 1, label: "提取商品卖点", desc: "从商品资料中提取 3-5 条核心卖点", status: "done" },
  { id: 2, label: "生成基础话术", desc: "生成 30秒/1分钟/3分钟/问答版 4 个版本", status: "done" },
  { id: 3, label: "合规初检", desc: "检查极限词、功效承诺、价格表达", status: "generating" },
  { id: 4, label: "生成基础动作", desc: "根据商品类目和物理特性生成展示动作", status: "pending" },
];

const baseScripts = [
  { type: "30秒短促销版", duration: "28秒", text: "这款玻尿酸精华，2%浓度深层补水，上脸不黏腻。券后89元，原价169。" },
  { type: "1分钟标准版", duration: "52秒", text: "这款玻尿酸保湿精华液，采用2%烟酰胺配方，提亮肤色、淡化痘印。专利渗透技术，吸收率提升40%。" },
  { type: "3分钟深度讲解版", duration: "2分48秒", text: "今天重点推荐这款玻尿酸保湿精华液。核心成分：2%烟酰胺加双重玻尿酸..." },
  { type: "问答版", duration: "15秒", text: "敏感肌可以用吗？完全可以，不含酒精香精色素。" },
];

export function ProductLibrary() {
  const [selected, setSelected] = useState(1);
  const [showImport, setShowImport] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showAssociate, setShowAssociate] = useState(false);
  const [showBaseScripts, setShowBaseScripts] = useState(false);
  const product = products.find((p) => p.id === selected);

  const genSteps = product?.baseScriptStatus === "generating" ? generatingSteps : baseGenSteps;

  return (
    <Layout>
      <div className="page page-responsive">
        <div className="page-header">
          <div>
            <h1 className="page-title">商品库</h1>
            <p className="page-subtitle">全局商品档案管理 · 基础话术和动作在此生成，跨直播间复用</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-secondary" onClick={() => setShowImport(true)}>
              <Download size={14} /> 导入商品
            </button>
            <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
              <Plus size={14} /> 手动创建
            </button>
          </div>
        </div>
        {showCreate && (
          <ProductForm onClose={() => setShowCreate(false)} />
        )}

        <div className="library-stats">
          <div className="lib-stat">
            <PackageOpen size={16} />
            <span className="lib-stat-value mono">{products.length}</span>
            <span className="lib-stat-label">总商品数</span>
          </div>
          <div className="lib-stat">
            <Check size={16} style={{ color: "var(--ok)" }} />
            <span className="lib-stat-value mono">{products.filter(p => p.compliance === "passed").length}</span>
            <span className="lib-stat-label">合规通过</span>
          </div>
          <div className="lib-stat">
            <Sparkles size={16} style={{ color: "var(--accent)" }} />
            <span className="lib-stat-value mono">{products.filter(p => p.baseScriptStatus === "done").length}</span>
            <span className="lib-stat-label">基础话术已生成</span>
          </div>
          <div className="lib-stat">
            <Link2 size={16} style={{ color: "var(--info)" }} />
            <span className="lib-stat-value mono">{products.reduce((s, p) => s + p.roomCount, 0)}</span>
            <span className="lib-stat-label">直播间关联</span>
          </div>
        </div>

        <div className="section-header">
          <div className="product-search" style={{ width: "280px" }}>
            <Search size={14} />
            <input placeholder="搜索商品名称" className="search-input" />
          </div>
          <div className="section-actions">
            <button className="toolbar-btn active">全部</button>
            <button className="toolbar-btn">美妆个护</button>
            <button className="toolbar-btn">食品生鲜</button>
            <button className="toolbar-btn">数码家电</button>
          </div>
        </div>

        <div className="lib-product-grid">
          {products.map((p) => {
            const st = complianceMap[p.compliance];
            const StIcon = st.icon;
            const bs = baseScriptStatusMap[p.baseScriptStatus];
            const BsIcon = bs.icon;
            return (
              <div
                key={p.id}
                className={"lib-product-card" + (p.id === selected ? " selected" : "")}
                onClick={() => setSelected(p.id)}
              >
                <div className="lib-card-top">
                  <div className="lib-card-thumb" style={p.image ? { backgroundImage: p.image } : {}}>{p.image ? "" : p.initial}</div>
                  <div className="lib-card-info">
                    <div className="lib-card-name">{p.name}</div>
                    <div className="lib-card-meta">
                      <span className="product-price">¥{p.price}</span>
                      <span className="product-price-orig">¥{p.orig}</span>
                      <span className="lib-card-cat">{p.category}</span>
                    </div>
                  </div>
                </div>
                <div className="lib-card-points">
                  {p.sellPoints.slice(0, 2).map((s, i) => (
                    <span key={i} className="lib-point">{s}</span>
                  ))}
                </div>
                <div className="lib-card-bottom">
                  <span className={"lib-compliance " + st.class}>
                    <StIcon size={10} /> {st.label}
                  </span>
                  <span className={"lib-compliance " + bs.class}>
                    <BsIcon size={10} className={p.baseScriptStatus === "generating" ? "spin" : ""} /> {bs.label}
                  </span>
                  <span className="lib-source">{p.source}</span>
                  <span className="lib-room-count">
                    <Link2 size={10} /> {p.roomCount} 间
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Import modal */}
      {showImport && (
        <div className="modal-overlay" onClick={() => setShowImport(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">导入商品到商品库</span>
              <X size={16} onClick={() => setShowImport(false)} style={{ cursor: "pointer" }} />
            </div>
            <div className="modal-body">
              <div className="import-options">
                <div className="import-option">
                  <div className="import-icon"><ShoppingBag size={24} /></div>
                  <div className="import-name">平台同步</div>
                  <div className="import-desc">从抖音/快手/淘宝商品库自动拉取</div>
                  <button className="btn btn-primary btn-sm">开始同步</button>
                </div>
                <div className="import-option">
                  <div className="import-icon"><Upload size={24} /></div>
                  <div className="import-name">批量导入</div>
                  <div className="import-desc">CSV/Excel 上传，自动字段映射</div>
                  <button className="btn btn-secondary btn-sm">上传文件</button>
                </div>
                <div className="import-option">
                  <div className="import-icon"><FileText size={24} /></div>
                  <div className="import-name">手动创建</div>
                  <div className="import-desc">表单逐个录入，适合新品测试</div>
                  <button className="btn btn-secondary btn-sm" onClick={() => { setShowImport(false); setShowCreate(true); }}>填写表单</button>
                </div>
                <div className="import-option">
                  <div className="import-icon"><Link2 size={24} /></div>
                  <div className="import-name">API 对接</div>
                  <div className="import-desc">从有赞/微盟/自建商城拉取</div>
                  <button className="btn btn-secondary btn-sm">配置 API</button>
                </div>
              </div>
              <div className="script-gen-hint" style={{ marginTop: 14 }}>
                <Sparkles size={12} />
                导入完成后系统自动生成基础话术和基础动作，供直播间复用
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Associate modal */}
      {showAssociate && (
        <div className="modal-overlay" onClick={() => setShowAssociate(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">关联到直播间 — {product.name}</span>
              <X size={16} onClick={() => setShowAssociate(false)} style={{ cursor: "pointer" }} />
            </div>
            <div className="modal-body">
              <div className="assoc-hint">
                关联后系统会基于基础话术 + 直播间的人设、目标、模板、模式，自动生成直播间专属话术和动作
              </div>
              <div className="assoc-room-list">
                {rooms.map((r) => (
                  <div key={r.id} className="assoc-room-row">
                    <span className="assoc-room-name">{r.name}</span>
                    <Link to={`/room/${r.id}/products`} className="btn btn-primary btn-sm">关联并生成</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product detail drawer */}
      <div className={"lib-drawer" + (product ? " open" : "")}>
        {product && (
          <>
            <div className="lib-drawer-header">
              <div className="detail-product-info">
                <div className="detail-product-thumb" style={product.image ? { backgroundImage: product.image } : {}}>{product.image ? "" : product.initial}</div>
                <div>
                  <h2 className="detail-product-name" style={{ fontSize: "16px" }}>{product.name}</h2>
                  <div className="detail-product-meta">
                    <span className="product-price">¥{product.price}</span>
                    <span className="product-price-orig">¥{product.orig}</span>
                    <span className="room-meta-text">库存 {product.stock.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <X size={16} onClick={() => setSelected(null)} style={{ cursor: "pointer", color: "var(--text-muted)" }} />
            </div>

            <div className="lib-drawer-body">
              {/* Source */}
              <div className="lib-drawer-section">
                <div className="lib-drawer-label">商品来源</div>
              <div className="lib-drawer-value">{product.source}</div>
              </div>

              {/* Product image */}
              <div className="lib-drawer-section">
                <div className="lib-drawer-label">商品图片</div>
                {product.image ? (
                  <div className="lib-image-gallery">
                    <div className="lib-image-main" style={{ backgroundImage: product.image }} />
                  </div>
                ) : (
                  <div className="lib-image-empty">暂无商品图片，请在档案中上传</div>
                )}
              </div>

              {/* Selling points */}
              <div className="lib-drawer-section">
                <div className="lib-drawer-label">核心卖点</div>
                <div className="lib-points-list">
                  {product.sellPoints.map((s, i) => (
                    <span key={i} className="lib-point-detail">{i + 1}. {s}</span>
                  ))}
                </div>
              </div>

              {/* Base script generation process */}
              <div className="lib-drawer-section">
                <div className="lib-drawer-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span>基础话术生成</span>
                  <button className="btn btn-ghost btn-sm">
                    <RefreshCw size={11} /> 重新生成
                  </button>
                </div>
                <div className="gen-process">
                  {genSteps.map((step, i) => (
                    <div key={step.id} className={"gen-step gen-step-" + step.status}>
                      <div className="gen-step-icon">
                        {step.status === "done" && <Check size={12} />}
                        {step.status === "generating" && <Loader size={12} className="spin" />}
                        {step.status === "pending" && <span className="gen-step-num">{i + 1}</span>}
                      </div>
                      <div className="gen-step-info">
                        <div className="gen-step-label">{step.label}</div>
                        <div className="gen-step-desc">{step.desc}</div>
                      </div>
                      <span className="gen-step-status">
                        {step.status === "done" ? "完成" : step.status === "generating" ? "进行中" : "等待"}
                      </span>
                    </div>
                  ))}
                </div>
                {product.baseScriptStatus === "done" && (
                  <button className="btn btn-secondary btn-sm" style={{ width: "100%", marginTop: 10 }} onClick={() => setShowBaseScripts(!showBaseScripts)}>
                    <FileText size={12} /> {showBaseScripts ? "收起" : "查看"}基础话术
                  </button>
                )}
                {showBaseScripts && (
                  <div className="base-script-list">
                    {baseScripts.map((s, i) => (
                      <div key={i} className="base-script-card">
                        <div className="script-card-title">
                          <span className="script-type">{s.type}</span>
                          <span className="script-duration mono">{s.duration}</span>
                          <span className="base-tag">基础版</span>
                        </div>
                        <p className="script-text" style={{ marginTop: 6 }}>{s.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Evidence */}
              <div className="lib-drawer-section">
                <div className="lib-drawer-label">证据素材 ({product.evidence} 份)</div>
                <div className="lib-evidence-list">
                  <span className="lib-evidence-item"><FileText size={11} /> 检测报告</span>
                  <span className="lib-evidence-item"><Image size={11} /> 对比图</span>
                  <span className="lib-evidence-item"><FileText size={11} /> 资质证书</span>
                  {product.evidence > 3 && <span className="lib-evidence-item"><Image size={11} /> 用户评价</span>}
                </div>
              </div>

              {/* Compliance */}
              <div className="lib-drawer-section">
                <div className="lib-drawer-label">合规约束</div>
                <div className="lib-compliance-list">
                  <div className="lib-compliance-row"><Shield size={12} /><span>禁用词：绝对、第一、治愈</span></div>
                  <div className="lib-compliance-row"><Shield size={12} /><span>不可承诺：医疗功效、永久效果</span></div>
                  <div className="lib-compliance-row"><Shield size={12} /><span>售后限制：拆封不退</span></div>
                </div>
              </div>

              {/* Room associations */}
              <div className="lib-drawer-section">
                <div className="lib-drawer-label">已关联直播间 ({product.roomCount})</div>
                <div className="lib-assoc-list">
                  {product.roomCount > 0 ? (
                    <>
                      {rooms.slice(0, product.roomCount).map((r) => (
                        <Link key={r.id} to={`/room/${r.id}/products`} className="lib-assoc-row">
                          <span className="lib-assoc-name">{r.name}</span>
                          <ChevronRight size={12} />
                        </Link>
                      ))}
                    </>
                  ) : (
                    <span className="lib-assoc-empty">尚未关联任何直播间</span>
                  )}
                </div>
              </div>
            </div>

            <div className="lib-drawer-footer">
              <button className="btn btn-primary btn-flex" onClick={() => setShowAssociate(true)}>
                <Link2 size={13} /> 关联到直播间
              </button>
              <Link to="/room/1/products" className="btn btn-secondary">
                配置话术 <ChevronRight size={13} />
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
