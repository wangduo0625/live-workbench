import { useState } from "react";
import {
  Check, ChevronRight, ChevronLeft, X, Upload, Image as ImageIcon,
  Sparkles, Shield, AlertTriangle, FileText
} from "lucide-react";

const steps = [
  { id: 0, label: "基础信息" },
  { id: 1, label: "卖点与证据" },
  { id: 2, label: "合规约束" },
  { id: 3, label: "确认生成" },
];

const categories = ["美妆个护", "服饰穿搭", "食品生鲜", "数码家电", "教育培训", "本地生活", "母婴亲子", "家居日用"];

export function ProductForm({ onClose, onSave }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "", category: "美妆个护", brand: "",
    price: "", orig: "", stock: "", specs: "",
    coverImage: null, detailImages: [],
    sellPoints: ["", "", ""],
    audience: "", scene: "",
    ingredients: "", params: "",
    evidence: [],
    bannedWords: "", noPromise: "", afterSales: "",
  });

  const update = (key, val) => setData({ ...data, [key]: val });
  const updatePoint = (i, val) => {
    const pts = [...data.sellPoints];
    pts[i] = val;
    setData({ ...data, sellPoints: pts });
  };
  const addPoint = () => setData({ ...data, sellPoints: [...data.sellPoints, ""] });
  const removePoint = (i) => setData({ ...data, sellPoints: data.sellPoints.filter((_, idx) => idx !== i) });

  const canNext = () => {
    if (step === 0) return data.name && data.price && data.stock;
    if (step === 1) return data.sellPoints.filter(s => s.trim()).length >= 2;
    return true;
  };

  const finish = () => {
    onSave && onSave(data);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card product-form-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <span className="modal-title">手动创建商品</span>
          <X size={16} onClick={onClose} style={{ cursor: "pointer" }} />
        </div>

        {/* Steps */}
        <div className="form-steps">
          {steps.map((s, i) => (
            <div key={s.id} className={"form-step" + (i === step ? " active" : "") + (i < step ? " done" : "")}>
              <div className="form-step-num">{i < step ? <Check size={12} /> : i + 1}</div>
              <span className="form-step-label">{s.label}</span>
              {i < steps.length - 1 && <div className="form-step-line" />}
            </div>
          ))}
        </div>

        <div className="form-body">
          {/* Step 0: Basic Info */}
          {step === 0 && (
            <div className="form-step-content">
              <div className="form-group">
                <label className="form-label">商品名称 <span className="required">*</span></label>
                <input className="form-input" placeholder="如：玻尿酸保湿精华液" value={data.name} onChange={(e) => update("name", e.target.value)} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">商品类目</label>
                  <select className="form-input" value={data.category} onChange={(e) => update("category", e.target.value)}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">品牌</label>
                  <input className="form-input" placeholder="如：XX护肤" value={data.brand} onChange={(e) => update("brand", e.target.value)} />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">原价 <span className="required">*</span></label>
                  <input className="form-input" type="number" placeholder="169" value={data.orig} onChange={(e) => update("orig", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">直播价 <span className="required">*</span></label>
                  <input className="form-input" type="number" placeholder="89" value={data.price} onChange={(e) => update("price", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">库存 <span className="required">*</span></label>
                  <input className="form-input" type="number" placeholder="2340" value={data.stock} onChange={(e) => update("stock", e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">规格</label>
                <input className="form-input" placeholder="如：30ml / 50ml" value={data.specs} onChange={(e) => update("specs", e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">商品封面图</label>
                {data.coverImage ? (
                  <div className="upload-preview">
                    <div className="upload-preview-img" style={{ background: data.coverImage }} />
                    <button className="btn btn-ghost btn-sm" onClick={() => update("coverImage", null)}>
                      <X size={12} /> 移除
                    </button>
                  </div>
                ) : (
                  <div className="upload-area" onClick={() => update("coverImage", "linear-gradient(135deg,#e8c4a0,#d4a574)")}>
                    <Upload size={20} />
                    <span>点击或拖拽上传封面图</span>
                    <span className="upload-hint">建议 800x800px，支持 JPG/PNG</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 1: Selling Points & Evidence */}
          {step === 1 && (
            <div className="form-step-content">
              <div className="form-group">
                <label className="form-label">核心卖点 <span className="required">*</span> <span className="form-hint">（至少 2 条，每条一句话讲清一个卖点）</span></label>
                {data.sellPoints.map((pt, i) => (
                  <div key={i} className="sell-point-row">
                    <span className="sell-point-num">{i + 1}</span>
                    <input className="form-input" placeholder="如：2%烟酰胺提亮肤色" value={pt} onChange={(e) => updatePoint(i, e.target.value)} />
                    {data.sellPoints.length > 1 && (
                      <button className="sell-point-del" onClick={() => removePoint(i)}><X size={14} /></button>
                    )}
                  </div>
                ))}
                {data.sellPoints.length < 5 && (
                  <button className="btn btn-ghost btn-sm" onClick={addPoint}><ChevronRight size={12} /> 添加卖点</button>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">适用人群</label>
                  <input className="form-input" placeholder="如：所有肤质，敏感肌可用" value={data.audience} onChange={(e) => update("audience", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">使用场景</label>
                  <input className="form-input" placeholder="如：日常护肤、熬夜急救" value={data.scene} onChange={(e) => update("scene", e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">成分/材质/参数</label>
                <textarea className="form-textarea" rows={3} placeholder="如：2%烟酰胺、双重玻尿酸、无酒精香精色素" value={data.ingredients} onChange={(e) => update("ingredients", e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">证据素材</label>
                <div className="evidence-upload">
                  <div className="evidence-upload-item">
                    <FileText size={16} />
                    <span>检测报告</span>
                  </div>
                  <div className="evidence-upload-item">
                    <ImageIcon size={16} />
                    <span>对比图</span>
                  </div>
                  <div className="evidence-upload-item">
                    <FileText size={16} />
                    <span>资质证书</span>
                  </div>
                  <div className="evidence-upload-item">
                    <ImageIcon size={16} />
                    <span>用户评价</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Compliance */}
          {step === 2 && (
            <div className="form-step-content">
              <div className="compliance-warn">
                <Shield size={14} />
                合规约束将作为 AI 话术生成的限制条件，违反约束的话术会被自动拦截
              </div>

              <div className="form-group">
                <label className="form-label">禁用词</label>
                <textarea className="form-textarea" rows={2} placeholder="如：绝对、第一、治愈、最便宜、全网最低" value={data.bannedWords} onChange={(e) => update("bannedWords", e.target.value)} />
                <span className="form-hint">用逗号分隔多个禁用词</span>
              </div>

              <div className="form-group">
                <label className="form-label">不可承诺内容</label>
                <textarea className="form-textarea" rows={2} placeholder="如：医疗功效、永久效果、三天见效、适合所有人群" value={data.noPromise} onChange={(e) => update("noPromise", e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">售后限制</label>
                <input className="form-input" placeholder="如：拆封不退、7天无理由、不支持退货" value={data.afterSales} onChange={(e) => update("afterSales", e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 3: Confirm & Generate */}
          {step === 3 && (
            <div className="form-step-content">
              <div className="confirm-card">
                <div className="confirm-icon"><Sparkles size={28} /></div>
                <h3 className="confirm-title">确认创建并生成基础话术</h3>
                <p className="confirm-desc">
                  创建后系统将自动执行以下操作，生成的基础话术和动作可跨直播间复用
                </p>

                <div className="confirm-gen-list">
                  <div className="confirm-gen-item">
                    <span className="confirm-gen-num">1</span>
                    <span>提取商品卖点（{data.sellPoints.filter(s => s.trim()).length} 条）</span>
                  </div>
                  <div className="confirm-gen-item">
                    <span className="confirm-gen-num">2</span>
                    <span>生成基础话术（30秒/1分钟/3分钟/问答版 4 个版本）</span>
                  </div>
                  <div className="confirm-gen-item">
                    <span className="confirm-gen-num">3</span>
                    <span>合规初检（禁用词、功效承诺、价格表达）</span>
                  </div>
                  <div className="confirm-gen-item">
                    <span className="confirm-gen-num">4</span>
                    <span>生成基础展示动作（基于{data.category}类目特性）</span>
                  </div>
                </div>

                <div className="confirm-summary">
                  <div className="confirm-summary-row">
                    <span className="confirm-summary-label">商品名称</span>
                    <span className="confirm-summary-value">{data.name || "—"}</span>
                  </div>
                  <div className="confirm-summary-row">
                    <span className="confirm-summary-label">类目</span>
                    <span className="confirm-summary-value">{data.category}</span>
                  </div>
                  <div className="confirm-summary-row">
                    <span className="confirm-summary-label">直播价</span>
                    <span className="confirm-summary-value">¥{data.price || "—"}</span>
                  </div>
                  <div className="confirm-summary-row">
                    <span className="confirm-summary-label">卖点数</span>
                    <span className="confirm-summary-value">{data.sellPoints.filter(s => s.trim()).length} 条</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="form-footer">
          <button
            className="btn btn-secondary"
            onClick={() => step > 0 ? setStep(step - 1) : onClose()}
          >
            {step === 0 ? "取消" : "上一步"}
          </button>
          {step < steps.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={() => canNext() && setStep(step + 1)}
              disabled={!canNext()}
            >
              下一步 <ChevronRight size={14} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={finish}>
              <Sparkles size={14} /> 创建并生成
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
