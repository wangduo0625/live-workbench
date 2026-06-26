import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronLeft, Play, Pause, Mic, Volume2, Camera,
  Check, RefreshCw, CircleDot, Eye, Palette,
  Type, Gift, MessageSquare, Sparkles, FileText, Wand2, X, Trash2
} from "lucide-react";

const bgTemplates = [
  { id: "brand", name: "品牌旗舰风", desc: "品牌墙、主色、活动信息" },
  { id: "factory", name: "工厂溯源风", desc: "产线、仓库、原料展示" },
  { id: "counter", name: "专柜陈列风", desc: "货架、试用台、产品矩阵" },
  { id: "review", name: "专业测评风", desc: "桌面、仪器、对比样品" },
  { id: "promo", name: "节日促销风", desc: "大促主题、倒计时、权益区" },
];

const aiModels = [
  { id: "gpt-image-2", name: "GPT Image 2", desc: "通用质量高" },
  { id: "gpt-image-1.5", name: "GPT Image 1.5", desc: "透明背景支持" },
  { id: "dall-e-3", name: "DALL·E 3", desc: "创意风格强" },
];

const ttsVoices = [
  { id: "v1", name: "品牌授权克隆音色 A", type: "克隆", status: "authorized", desc: "温和女声 · 语速适中" },
  { id: "v2", name: "品牌授权克隆音色 B", type: "克隆", status: "authorized", desc: "活力女声 · 语速偏快" },
  { id: "v3", name: "平台标准音色 - 小薇", type: "平台", status: "available", desc: "亲切女声" },
  { id: "v4", name: "平台标准音色 - 阿泽", type: "平台", status: "available", desc: "沉稳男声" },
];

const scriptList = [
  { id: "s1", type: "30秒短促销版", duration: "28秒", text: "这款玻尿酸精华，2%浓度深层补水，上脸不黏腻。今天直播间券后只要89元，原价169，直接半价。点左下角1号链接，现货秒发。" },
  { id: "s2", type: "1分钟标准版", duration: "52秒", text: "这款玻尿酸保湿精华液，采用2%烟酰胺配方，能够有效提亮肤色、淡化痘印。搭配专利渗透技术，吸收率提升40%。质地清爽不黏腻，适合所有肤质，敏感肌也完全没问题。今天直播间专属价89元，原价169，直接半价还送小样。" },
  { id: "s3", type: "3分钟深度讲解版", duration: "2分48秒", text: "今天要给大家重点推荐的，就是这款玻尿酸保湿精华液。先说核心成分：2%烟酰胺加双重玻尿酸，一个负责提亮，一个负责锁水。搭配专利渗透技术，让有效成分直达肌底，吸收率提升40%。质地是那种很清爽的凝露状，上脸完全不黏腻，吸收速度很快。适合所有肤质，包括敏感肌，因为不含酒精、香精和色素。今天直播间专属价89元，原价169，相当于直接打了五折还送两个小样，非常划算。" },
  { id: "s4", type: "问答版", duration: "15秒", text: "敏感肌的姐妹问能不能用？完全可以。这款不含酒精、香精和色素，通过了敏感肌测试，放心拍。" },
];

export function PreviewConfig() {
  const { id } = useParams();
  const [bg, setBg] = useState("brand");
  const [voice, setVoice] = useState("v1");
  const [playing, setPlaying] = useState(false);
  const [lipsyncOn, setLipsyncOn] = useState(true);
  const [bgReplace, setBgReplace] = useState(true);
  const [subtitleOn, setSubtitleOn] = useState(true);
  const [scriptIdx, setScriptIdx] = useState(1);
  const [seqMode, setSeqMode] = useState(true);
  const currentScript = scriptList[scriptIdx];
  const [showAiGen, setShowAiGen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiModel, setAiModel] = useState("gpt-image-2");
  const [aiGenResults, setAiGenResults] = useState([]);
  const [aiGenId, setAiGenId] = useState(0);
  const [customBgs, setCustomBgs] = useState([]);

  const handleAiGen = () => {
    setAiGenerating(true);
    const newId = aiGenId + 1;
    setAiGenId(newId);
    setTimeout(() => {
      setAiGenerating(false);
      const colors = ["linear-gradient(135deg,#1a3a2e,#2d5a4a)", "linear-gradient(135deg,#3a2a1a,#5a4a3a)", "linear-gradient(135deg,#1a1a3a,#3a3a5a)", "linear-gradient(135deg,#2a1a3a,#4a2a5a)"];
      setAiGenResults([{ id: newId, prompt: aiPrompt || "AI生成背景", thumb: colors[newId % colors.length], status: "pending" }, ...aiGenResults]);
    }, 2500);
  };

  const confirmBg = (resultId) => {
    const result = aiGenResults.find(r => r.id === resultId);
    if (result) {
      const customId = "ai-" + resultId;
      setCustomBgs([...customBgs, { id: customId, name: "AI生成 #" + resultId, thumb: result.thumb, desc: result.prompt.substring(0, 20) }]);
      setBg(customId);
      setAiGenResults(aiGenResults.filter(r => r.id !== resultId));
    }
  };

  const deleteResult = (resultId) => {
    setAiGenResults(aiGenResults.filter(r => r.id !== resultId));
  };

  const deleteCustomBg = (bgId) => {
    setCustomBgs(customBgs.filter(b => b.id !== bgId));
    if (bg === bgId && bgTemplates.length > 0) setBg(bgTemplates[0].id);
  };

  return (
    <div className="sub-page">
      <header className="sub-topbar">
        <Link to={`/room/${id}/products`} className="topbar-back">
          <ChevronLeft size={16} /> 返回商品配置
        </Link>
        <div className="sub-topbar-title">
          <span className="sub-topbar-room">品牌旗舰 618大促专场</span>
          <span className="sub-topbar-sep">·</span>
          <span className="sub-topbar-section">画面与预览</span>
        </div>
        <div className="topbar-spacer" />
        <button className="btn btn-secondary btn-sm">
          <CircleDot size={12} /> 录制测试
        </button>
        <button className="btn btn-primary btn-sm">
          <Play size={12} /> 开始模拟开播
        </button>
      </header>

      <div className="preview-config-page">
        <div className="preview-config-grid">
          {/* Left: Preview + Script */}
          <div className="pc-preview-section">
            <div className="pc-preview-header">
              <span className="pc-section-title"><Eye size={14} /> 实时合成预览</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button className={"toolbar-btn" + (playing ? "" : " active")} onClick={() => setPlaying(false)}>
                  <Pause size={12} /> 暂停
                </button>
                <button className={"toolbar-btn" + (playing ? " active" : "")} onClick={() => setPlaying(true)}>
                  <Play size={12} /> 播放
                </button>
              </div>
            </div>

            <div className="pc-preview-wrap">
              <div className="pc-preview-frame">
                <div className="pv-top">
                  <span className="pv-brand">品牌旗舰</span>
                  <span className="pv-activity">618大促</span>
                  <span className="pv-viewers"><span className="pv-viewers-dot" />预览模式</span>
                </div>
                <div className="pv-presenter">
                  <div className="pv-silhouette" />
                </div>
                <div className="pv-product-card">
                  <div className="pv-product-thumb" />
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
                {subtitleOn && (
                  <div className="pv-subtitle">
                    <span className="pv-subtitle-text">这款精华液含有<span className="pv-subtitle-hl">2%烟酰胺</span>，能够有效提亮肤色</span>
                  </div>
                )}
                <div className="pv-bottom">
                  <span className="pv-buy">点击下方链接购买</span>
                </div>
              </div>
            </div>

            <div className="pc-lipsync-bar">
              <div className="pc-lipsync-item">
                <span className="pc-lipsync-dot" style={{ background: lipsyncOn ? "var(--ok)" : "var(--text-muted)" }} />
                <span className="pc-lipsync-label">嘴形替换</span>
                <span className="pc-lipsync-value">{lipsyncOn ? "已开启" : "已关闭"}</span>
              </div>
              <div className="pc-lipsync-item">
                <span className="pc-lipsync-dot" style={{ background: "var(--ok)" }} />
                <span className="pc-lipsync-label">人脸跟踪</span>
                <span className="pc-lipsync-value">正常</span>
              </div>
              <div className="pc-lipsync-item">
                <span className="pc-lipsync-dot" style={{ background: "var(--ok)" }} />
                <span className="pc-lipsync-label">口型同步</span>
                <span className="pc-lipsync-value">180ms</span>
              </div>
              <div className="pc-lipsync-item">
                <span className="pc-lipsync-dot" style={{ background: "var(--ok)" }} />
                <span className="pc-lipsync-label">同步评分</span>
                <span className="pc-lipsync-value">4.2 / 5</span>
              </div>
            </div>

            {/* Script panel */}
            <div className="pc-script-panel">
              <div className="pc-script-header">
                <span className="pc-section-title"><FileText size={14} /> 当前播放话术</span>
                <div className="pc-script-modes">
                  <button className={"pc-script-mode" + (seqMode ? " active" : "")} onClick={() => setSeqMode(true)}>顺序播放</button>
                  <button className={"pc-script-mode" + (!seqMode ? " active" : "")} onClick={() => setSeqMode(false)}>单条播放</button>
                </div>
              </div>
              <div className="pc-script-tabs">
                {scriptList.map((s, i) => (
                  <button key={s.id} className={"pc-script-tab" + (i === scriptIdx ? " active" : "")} onClick={() => setScriptIdx(i)}>
                    <span className="pc-script-tab-type">{s.type}</span>
                    <span className="pc-script-tab-dur mono">{s.duration}</span>
                    {seqMode && i === scriptIdx && <span className="pc-script-tab-playing">播放中</span>}
                  </button>
                ))}
              </div>
              <div className="pc-script-text">{currentScript.text}</div>
              <div className="pc-script-progress">
                <div className="pc-script-bar"><div className="pc-script-fill" style={{ width: playing ? "52%" : "0%" }} /></div>
                <span className="pc-script-time mono">{playing ? "00:27 / " + currentScript.duration : "00:00 / " + currentScript.duration}</span>
                {seqMode && scriptIdx < scriptList.length - 1 && playing && (
                  <span className="pc-script-next">下一条: {scriptList[scriptIdx + 1].type}</span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Config panels */}
          <div className="pc-config-section">
            {/* Background */}
            <div className="pc-config-card">
              <div className="pc-config-header">
                <span className="pc-section-title"><Palette size={14} /> 背景模板</span>
                <span className="pc-config-status">{bgReplace ? "背景替换已开启" : "背景替换已关闭"}</span>
              </div>
              <div className="pc-toggle-row">
                <span className="pc-toggle-label">真人背景替换</span>
                <button className={"toggle-switch" + (bgReplace ? " on" : "")} onClick={() => setBgReplace(!bgReplace)} />
              </div>
              <div className="pc-bg-grid">
                {bgTemplates.map((t) => (
                  <div key={t.id} className={"pc-bg-card" + (bg === t.id ? " selected" : "")} onClick={() => setBg(t.id)}>
                    <div className="pc-bg-thumb" data-bg={t.id} />
                    <div className="pc-bg-name">{t.name}</div>
                    <div className="pc-bg-desc">{t.desc}</div>
                    {bg === t.id && <Check size={14} className="pc-bg-check" />}
                  </div>
                ))}
                {customBgs.map((c) => (
                  <div key={c.id} className={"pc-bg-card" + (bg === c.id ? " selected" : "")} onClick={() => setBg(c.id)}>
                    <div className="pc-bg-thumb" style={{ background: c.thumb }} />
                    <div className="pc-bg-name">{c.name}</div>
                    <div className="pc-bg-desc">{c.desc}</div>
                    {bg === c.id && <Check size={14} className="pc-bg-check" />}
                    <button className="pc-bg-del" onClick={(e) => { e.stopPropagation(); deleteCustomBg(c.id); }}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              {/* AI background generation */}
              <div className="pc-ai-bg-section">
                <button className="btn btn-secondary btn-sm" style={{ width: "100%" }} onClick={() => setShowAiGen(!showAiGen)}>
                  <Wand2 size={12} /> AI 生成背景
                </button>
                {showAiGen && (
                  <div className="pc-ai-gen-panel">
                    {/* Model selector */}
                    <div className="pc-ai-model-row">
                      <span className="pc-ai-model-label">生成模型</span>
                      <select className="pc-ai-model-select" value={aiModel} onChange={(e) => setAiModel(e.target.value)}>
                        {aiModels.map((m) => (
                          <option key={m.id} value={m.id}>{m.name} — {m.desc}</option>
                        ))}
                      </select>
                    </div>
                    <textarea className="form-textarea" rows={2} placeholder="描述你想要的背景，如：简约白色货架背景，带品牌LOGO和暖色灯光" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} />
                    <button className="btn btn-primary btn-sm" style={{ marginTop: 8, width: "100%" }} onClick={handleAiGen} disabled={aiGenerating}>
                      {aiGenerating ? <><RefreshCw size={12} className="spin" /> 生成中...</> : <><Sparkles size={12} /> 生成背景</>}
                    </button>
                    {aiGenerating && (
                      <div className="pc-ai-gen-steps">
                        <div className="pc-ai-gen-step"><RefreshCw size={11} className="spin" /> 解析描述...</div>
                        <div className="pc-ai-gen-step" style={{ opacity: 0.5 }}><RefreshCw size={11} className="spin" /> {aiModels.find(m => m.id === aiModel)?.name} 生成中...</div>
                        <div className="pc-ai-gen-step" style={{ opacity: 0.3 }}><RefreshCw size={11} /> 适配9:16画幅...</div>
                      </div>
                    )}
                    {/* Generation results - pending confirmation */}
                    {aiGenResults.length > 0 && (
                      <div className="pc-ai-results">
                        <div className="pc-ai-results-label">生成结果（待确认，可反复生成）</div>
                        {aiGenResults.map((r) => (
                          <div key={r.id} className="pc-ai-result-card">
                            <div className="pc-ai-result-thumb" style={{ background: r.thumb }} />
                            <div className="pc-ai-result-info">
                              <div className="pc-ai-result-prompt">{r.prompt}</div>
                              <div className="pc-ai-result-meta">{aiModels.find(m => m.id === aiModel)?.name} · 9:16</div>
                            </div>
                            <div className="pc-ai-result-actions">
                              <button className="btn btn-primary btn-sm" onClick={() => confirmBg(r.id)}>
                                <Check size={11} /> 确认采用
                              </button>
                              <button className="btn btn-ghost btn-sm" onClick={() => deleteResult(r.id)}>
                                <Trash2 size={11} /> 删除
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* TTS Voice */}
            <div className="pc-config-card">
              <div className="pc-config-header">
                <span className="pc-section-title"><Mic size={14} /> TTS 音色选择</span>
              </div>
              <div className="pc-voice-list">
                {ttsVoices.map((v) => (
                  <div key={v.id} className={"pc-voice-card" + (voice === v.id ? " selected" : "")} onClick={() => setVoice(v.id)}>
                    <div className="pc-voice-info">
                      <div className="pc-voice-name">
                        {v.name}
                        <span className={"pc-voice-tag tag-" + v.type}>{v.type}</span>
                      </div>
                      <div className="pc-voice-desc">{v.desc}</div>
                      {v.status === "authorized" && (
                        <div className="pc-voice-status"><Check size={10} /> 已授权 · 有效期至 2026-12-31</div>
                      )}
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={(e) => e.stopPropagation()}>
                      <Volume2 size={12} /> 试听
                    </button>
                  </div>
                ))}
              </div>
              <div className="pc-voice-settings">
                <div className="pc-slider-row">
                  <span className="pc-slider-label">语速</span>
                  <input type="range" className="pc-slider" min="50" max="200" defaultValue="100" />
                  <span className="pc-slider-value mono">1.0x</span>
                </div>
                <div className="pc-slider-row">
                  <span className="pc-slider-label">音调</span>
                  <input type="range" className="pc-slider" min="50" max="200" defaultValue="100" />
                  <span className="pc-slider-value mono">0</span>
                </div>
                <div className="pc-slider-row">
                  <span className="pc-slider-label">音量</span>
                  <input type="range" className="pc-slider" min="0" max="100" defaultValue="80" />
                  <span className="pc-slider-value mono">80%</span>
                </div>
              </div>
            </div>

            {/* Lipsync */}
            <div className="pc-config-card">
              <div className="pc-config-header">
                <span className="pc-section-title"><Camera size={14} /> 嘴形替换</span>
              </div>
              <div className="pc-toggle-row">
                <span className="pc-toggle-label">启用嘴形替换</span>
                <button className={"toggle-switch" + (lipsyncOn ? " on" : "")} onClick={() => setLipsyncOn(!lipsyncOn)} />
              </div>
              <div className="pc-lipsync-settings">
                <div className="pc-setting-row">
                  <span className="pc-setting-label">延迟补偿</span>
                  <span className="pc-setting-value mono">180ms</span>
                </div>
                <div className="pc-setting-row">
                  <span className="pc-setting-label">异常回退策略</span>
                  <span className="pc-setting-value">回退为真人静音展示</span>
                </div>
                <div className="pc-setting-row">
                  <span className="pc-setting-label">重新校准</span>
                  <button className="btn btn-secondary btn-sm"><RefreshCw size={11} /> 校准</button>
                </div>
              </div>
            </div>

            {/* Overlay */}
            <div className="pc-config-card">
              <div className="pc-config-header">
                <span className="pc-section-title"><Type size={14} /> 画面组件</span>
              </div>
              <div className="pc-overlay-list">
                <div className="pc-toggle-row">
                  <span className="pc-toggle-label"><MessageSquare size={13} /> 口播字幕</span>
                  <button className={"toggle-switch" + (subtitleOn ? " on" : "")} onClick={() => setSubtitleOn(!subtitleOn)} />
                </div>
                <div className="pc-toggle-row">
                  <span className="pc-toggle-label"><Gift size={13} /> 优惠券组件</span>
                  <button className="toggle-switch on" />
                </div>
                <div className="pc-toggle-row">
                  <span className="pc-toggle-label"><MessageSquare size={13} /> 评论精选显示</span>
                  <button className="toggle-switch on" />
                </div>
                <div className="pc-toggle-row">
                  <span className="pc-toggle-label"><Eye size={13} /> 在线人数显示</span>
                  <button className="toggle-switch on" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
