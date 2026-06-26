import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mic, MicOff, Check, ChevronRight, Pause, HelpCircle,
  Volume2, ChevronLeft, Hand, X, AlertCircle
} from "lucide-react";

export function PresenterView() {
  const [showHelp, setShowHelp] = useState(false);
  const [helpReason, setHelpReason] = useState("");
  const [helpSent, setHelpSent] = useState(false);

  const helpReasons = [
    { id: "action", label: "不确定怎么展示", desc: "动作指令不清楚，需要场控指导" },
    { id: "product", label: "商品有问题", desc: "商品缺失、损坏或状态不对" },
    { id: "lipsync", label: "嘴形替换异常", desc: "感觉嘴形对不上或不自然" },
    { id: "physical", label: "身体不适", desc: "需要短暂休息或调整状态" },
    { id: "other", label: "其他问题", desc: "需要场控协助处理" },
  ];

  const sendHelp = () => {
    setHelpSent(true);
    setShowHelp(false);
    setTimeout(() => setHelpSent(false), 5000);
  };

  return (
    <div className="presenter-view">
      <header className="presenter-topbar">
        <Link to="/" className="topbar-back">
          <ChevronLeft size={18} />
        </Link>
        <div className="presenter-topbar-info">
          <span className="presenter-topbar-title">真人展示台</span>
          <span className="presenter-topbar-room">品牌旗舰 618大促专场</span>
        </div>
        <div className="presenter-topbar-status">
          <span className="presenter-status-pill">
            <MicOff size={12} /> 麦克风关闭
          </span>
          <span className="presenter-status-pill ai-active">
            <Volume2 size={12} /> AI 口播中
          </span>
        </div>
      </header>

      <div className="presenter-body">
        {/* Help sent confirmation */}
        {helpSent && (
          <div className="help-sent-banner">
            <Check size={16} />
            <span>求助信号已发送，场控将在导播台收到提醒，请稍候</span>
          </div>
        )}

        <div className="presenter-action-card">
          <div className="presenter-action-label">当前动作</div>
          <div className="presenter-action-text">标签朝镜头 · 展示正面</div>
          <div className="presenter-action-progress">
            <div className="presenter-progress-bar">
              <div className="presenter-progress-fill" style={{ width: "65%" }} />
            </div>
            <span className="presenter-progress-time">08s</span>
          </div>
        </div>

        <div className="presenter-next-card">
          <div className="presenter-next-label">下一动作</div>
          <div className="presenter-next-text">展示质地 · 手指轻按精华液于手背</div>
        </div>

        <div className="presenter-product-card">
          <div className="presenter-product-info">
            <div className="presenter-product-name">玻尿酸保湿精华液</div>
            <div className="presenter-product-price">¥89 <span className="presenter-product-orig">¥169</span></div>
            <div className="presenter-product-notes">
              <div className="presenter-note">注意：敏感肌可用，不要承诺治疗功效</div>
              <div className="presenter-note">卖点：2%烟酰胺 · 专利渗透技术 · 无酒精</div>
            </div>
          </div>
        </div>

        <div className="presenter-ai-bar">
          <div className="presenter-ai-icon">
            <Volume2 size={16} />
          </div>
          <div className="presenter-ai-text">
            <div className="presenter-ai-label">AI 正在讲</div>
            <div className="presenter-ai-summary">这款精华液采用2%烟酰胺配方，能够有效提亮肤色...</div>
          </div>
          <div className="presenter-ai-wave">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>

        <div className="presenter-controls">
          <button className="presenter-btn primary">
            <Check size={24} />
            <span>动作完成</span>
          </button>
          <button className="presenter-btn secondary">
            <ChevronRight size={24} />
            <span>下一动作</span>
          </button>
          <button className="presenter-btn danger">
            <Pause size={24} />
            <span>暂停 AI</span>
          </button>
          <button className="presenter-btn secondary" onClick={() => setShowHelp(true)}>
            <Hand size={24} />
            <span>求助场控</span>
          </button>
        </div>
      </div>

      {/* Help modal */}
      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "440px" }}>
            <div className="modal-header">
              <span className="modal-title">
                <AlertCircle size={16} style={{ verticalAlign: "middle", marginRight: 6, color: "var(--warn)" }} />
                求助场控
              </span>
              <X size={16} onClick={() => setShowHelp(false)} style={{ cursor: "pointer" }} />
            </div>
            <div className="modal-body">
              <div className="assoc-hint">
                选择求助原因，场控将在导播台立即收到高优先级提醒
              </div>
              <div className="help-reason-list">
                {helpReasons.map((r) => (
                  <div
                    key={r.id}
                    className={"help-reason-row" + (helpReason === r.id ? " selected" : "")}
                    onClick={() => setHelpReason(r.id)}
                  >
                    <div className="help-reason-radio" style={helpReason === r.id ? { borderColor: "var(--accent)", background: "var(--accent)" } : {}} />
                    <div className="help-reason-info">
                      <div className="help-reason-label">{r.label}</div>
                      <div className="help-reason-desc">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="form-group" style={{ marginTop: 14 }}>
                <label className="form-label">补充说明（可选）</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="补充描述你遇到的问题..."
                />
              </div>
              <div className="help-context">
                <span className="help-context-item">当前商品：玻尿酸保湿精华液</span>
                <span className="help-context-item">当前动作：标签朝镜头 · 展示正面</span>
                <span className="help-context-item">时间：02:34:18</span>
              </div>
            </div>
            <div className="form-footer">
              <button className="btn btn-secondary" onClick={() => setShowHelp(false)}>取消</button>
              <button className="btn btn-primary" disabled={!helpReason} onClick={sendHelp}>
                <Hand size={14} /> 发送求助
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
