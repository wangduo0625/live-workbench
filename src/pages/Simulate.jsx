import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronLeft, Check, AlertTriangle, X, RefreshCw, Play, Pause,
  FileText, Shield, Mic, Camera, Layers, Radio, Loader,
  Eye, Clock, ArrowRight
} from "lucide-react";

const pipelineSteps = [
  { id: 0, label: "商品资料校验", desc: "检查商品信息、卖点、证据素材是否完整", icon: FileText, detail: "商品信息完整 · 5 条卖点 · 4 份证据素材" },
  { id: 1, label: "话术生成与合规", desc: "验证专属话术已生成并通过合规检查", icon: Shield, detail: "4 个话术版本 · 合规通过 · 无极限词" },
  { id: 2, label: "TTS 语音合成", desc: "测试 TTS 音色合成是否正常，首包延迟 < 1.5s", icon: Mic, detail: "首包延迟 0.8s · 音质正常 · 音色已授权" },
  { id: 3, label: "嘴形替换测试", desc: "验证人脸跟踪、口型同步、延迟补偿 < 300ms", icon: Camera, detail: "人脸跟踪正常 · 同步延迟 180ms · 评分 4.2/5" },
  { id: 4, label: "画面混流测试", desc: "背景、真人画面、商品卡、字幕、评论组件合成", icon: Layers, detail: "背景替换正常 · 商品卡绑定 · 字幕同步" },
  { id: 5, label: "编码推流测试", desc: "RTMP 推流连接、码率、帧率、音画同步验证", icon: Radio, detail: "RTMP 连接成功 · 码率 4500kbps · 30fps · 延迟 2.1s" },
];

const checklistItems = [
  { label: "商品资料完整", done: true },
  { label: "AI 话术生成通过", done: true },
  { label: "展示动作已生成", done: true },
  { label: "商品画面已绑定", done: true },
  { label: "TTS 音色已配置", done: true },
  { label: "模拟开播通过", done: false },
];

export function Simulate() {
  const { id } = useParams();
  const [phase, setPhase] = useState("idle");
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepStatuses, setStepStatuses] = useState({});
  const [previewPlaying, setPreviewPlaying] = useState(false);

  const startSimulation = () => {
    setPhase("pipeline");
    setCurrentStep(0);
    setStepStatuses({});
    
  };

  useEffect(() => {
    if (phase !== "pipeline" || currentStep < 0 || currentStep >= pipelineSteps.length) return;
    const timer = setTimeout(() => {
      setStepStatuses(prev => ({ ...prev, [currentStep]: "passed" }));
      if (currentStep < pipelineSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setPhase("preview");
        setPreviewPlaying(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [phase, currentStep]);

  const allPipelinePassed = Object.keys(stepStatuses).length === pipelineSteps.length && Object.values(stepStatuses).every(s => s === "passed");

  return (
    <div className="sub-page">
      <header className="sub-topbar">
        <Link to={`/room/${id}/products`} className="topbar-back">
          <ChevronLeft size={16} /> 返回商品配置
        </Link>
        <div className="sub-topbar-title">
          <span className="sub-topbar-room">品牌旗舰 618大促专场</span>
          <span className="sub-topbar-sep">·</span>
          <span className="sub-topbar-section">模拟开播</span>
        </div>
        <div className="topbar-spacer" />
        <Link to={`/room/${id}/preview`} className="btn btn-secondary btn-sm">
          <Eye size={12} /> 画面与预览
        </Link>
      </header>

      <div className="sim-page">
        {/* Phase indicator */}
        <div className="sim-phases">
          <div className={"sim-phase" + (phase === "idle" || phase === "pipeline" ? " active" : "") + (phase === "preview" || phase === "done" ? " done" : "")}>
            <div className="sim-phase-num">{phase === "preview" || phase === "done" ? <Check size={14} /> : 1}</div>
            <span>链路验证</span>
          </div>
          <div className="sim-phase-line" />
          <div className={"sim-phase" + (phase === "preview" ? " active" : "") + (phase === "done" ? " done" : "")}>
            <div className="sim-phase-num">{phase === "done" ? <Check size={14} /> : 2}</div>
            <span>画面确认</span>
          </div>
          <div className="sim-phase-line" />
          <div className={"sim-phase" + (phase === "done" ? " active" : "")}>
            <div className="sim-phase-num">3</div>
            <span>正式开播</span>
          </div>
        </div>

        {/* Phase 1: Pipeline verification */}
        {(phase === "idle" || phase === "pipeline") && (
          <>
            <div className="sim-banner">
              <div className="sim-banner-icon"><Radio size={20} /></div>
              <div className="sim-banner-content">
                <div className="sim-banner-title">第一步：端到端链路验证</div>
                <div className="sim-banner-desc">模拟开播将走完整直播链路，验证每个环节技术是否正常</div>
              </div>
            </div>

            <div className="sim-pipeline-card">
              <div className="sim-pipeline-header">
                <span className="pc-section-title">直播链路验证</span>
                {phase === "idle" && (
                  <button className="btn btn-primary btn-sm" onClick={startSimulation}>
                    <Play size={12} /> 开始模拟
                  </button>
                )}
                {phase === "pipeline" && (
                  <span className="sim-running-badge"><Loader size={12} className="spin" /> 正在模拟...</span>
                )}
              </div>
              <div className="sim-pipeline">
                {pipelineSteps.map((step, i) => {
                  const status = stepStatuses[i];
                  const isCurrent = phase === "pipeline" && i === currentStep;
                  const isPending = !status && !isCurrent;
                  const StepIcon = step.icon;
                  return (
                    <div key={step.id} className={"sim-step" + (status === "passed" ? " passed" : "") + (isCurrent ? " current" : "") + (isPending ? " pending" : "")}>
                      <div className="sim-step-left">
                        <div className="sim-step-icon">
                          {status === "passed" ? <Check size={16} /> : isCurrent ? <StepIcon size={16} className="spin" /> : <StepIcon size={16} />}
                        </div>
                        {i < pipelineSteps.length - 1 && <div className="sim-step-line" />}
                      </div>
                      <div className="sim-step-content">
                        <div className="sim-step-header">
                          <span className="sim-step-label">{step.label}</span>
                          <span className="sim-step-status">{status === "passed" ? "通过" : isCurrent ? "验证中..." : "等待"}</span>
                        </div>
                        <div className="sim-step-desc">{step.desc}</div>
                        {status === "passed" && <div className="sim-step-detail"><Check size={10} /> {step.detail}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {phase === "idle" && (
              <div className="sim-checklist-card">
                <div className="sim-checklist-header">
                  <span className="pc-section-title">开播前检查清单</span>
                  <span className="sim-checklist-summary">5/6 已完成</span>
                </div>
                <div className="sim-checklist-list">
                  {checklistItems.map((c) => (
                    <div key={c.label} className="sim-checklist-item">
                      <span className={"readiness-check" + (c.done ? " check-ok" : "")} style={!c.done ? { background: "var(--warn-dim)", color: "var(--warn)" } : {}}>
                        {c.done ? <Check size={10} /> : <Clock size={10} />}
                      </span>
                      <span className={c.done ? "" : "text-muted"}>{c.label}</span>
                      <span className={"sim-checklist-status " + (c.done ? "done" : "pending")}>{c.done ? "完成" : "待验证"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Phase 2: Live preview confirmation */}
        {phase === "preview" && (
          <>
            <div className="sim-banner" style={{ background: "var(--ok-dim)", borderColor: "rgba(34,197,94,0.2)" }}>
              <div className="sim-banner-icon" style={{ color: "var(--ok)" }}><Check size={20} /></div>
              <div className="sim-banner-content">
                <div className="sim-banner-title" style={{ color: "var(--ok)" }}>链路验证全部通过</div>
                <div className="sim-banner-desc">第二步：请确认实时直播画面效果无误，确认后可正式开播推流</div>
              </div>
            </div>

            <div className="sim-preview-card">
              <div className="sim-preview-header">
                <span className="pc-section-title"><Eye size={14} /> 实时直播画面</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className={"toolbar-btn" + (previewPlaying ? "" : " active")} onClick={() => setPreviewPlaying(false)}>
                    <Pause size={12} /> 暂停
                  </button>
                  <button className={"toolbar-btn" + (previewPlaying ? " active" : "")} onClick={() => setPreviewPlaying(true)}>
                    <Play size={12} /> 播放
                  </button>
                </div>
              </div>

              <div className="sim-preview-wrap">
                <div className="sim-preview-frame">
                  <div className="pv-top">
                    <span className="pv-brand">品牌旗舰</span>
                    <span className="pv-activity">618大促</span>
                    <span className="pv-viewers"><span className="pv-viewers-dot" />预览模式</span>
                  </div>
                  <div className="pv-presenter">
                    <div className="pv-silhouette" style={{ width: "100px", height: "150px" }} />
                  </div>
                  <div className="pv-product-card">
                    <div className="pv-product-thumb" style={{ backgroundImage: "url(/products/product-essence.png)" }} />
                    <div className="pv-product-info">
                      <div className="pv-product-name">玻尿酸保湿精华液</div>
                      <div className="pv-product-price-row">
                        <span className="pv-product-price">¥89</span>
                        <span className="pv-product-orig">¥169</span>
                      </div>
                      <div className="pv-product-meta">
                        <span className="pv-product-stock">库存 2,340</span>
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
              </div>

              {/* Checklist for visual confirmation */}
              <div className="sim-visual-check">
                <div className="sim-visual-check-label">画面确认清单</div>
                <div className="sim-visual-check-list">
                  {[
                    "背景替换效果自然，无明显抠图痕迹",
                    "商品卡信息正确，价格和库存准确",
                    "AI 口播字幕同步，无错别字",
                    "嘴形替换自然，口型与语音基本同步",
                    "画面组件（优惠券、评论、在线人数）显示正常",
                    "音频播放正常，TTS 音色和语速符合预期",
                  ].map((item, i) => (
                    <label key={i} className="sim-visual-check-item">
                      <input type="checkbox" defaultChecked={i < 4} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirm and go live */}
            <div className="sim-confirm-bar">
              <div className="sim-confirm-left">
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  请确认画面效果无误后，点击正式开播
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setPhase("pipeline")}>
                  <RefreshCw size={12} /> 重新验证
                </button>
                <button className="btn btn-primary" onClick={() => setPhase("done")} >
                  <Radio size={14} /> 正式开播推流
                </button>
              </div>
            </div>
          </>
        )}

        {/* Phase 3: Live started */}
        {phase === "done" && (
          <div className="sim-result passed">
            <div className="sim-result-icon"><Radio size={32} /></div>
            <div className="sim-result-content">
              <div className="sim-result-title" style={{ color: "var(--ok)" }}>正式开播成功</div>
              <div className="sim-result-desc">
                推流已建立，直播间状态已更新为直播中。可进入导播台进行实时场控操作
              </div>
              <div className="sim-stream-info">
                <span className="sim-stream-item"><Check size={11} /> 抖音 RTMP 推流中</span>
                <span className="sim-stream-item"><Check size={11} /> 码率 4500kbps</span>
                <span className="sim-stream-item"><Check size={11} /> 延迟 2.1s</span>
              </div>
            </div>
            <Link to="/workbench" className="btn btn-primary">
              <Play size={14} /> 进入导播台
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
