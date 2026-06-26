import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout.jsx";
import {
  Check, ChevronRight, Video, Radio, Sparkles, Palette, User, Target,
  Calendar, Play, Clock, Info
} from "lucide-react";

const steps = [
  { id: 0, label: "直播间名称", icon: Video },
  { id: 1, label: "平台选择", icon: Radio },
  { id: 2, label: "直播模式", icon: Sparkles },
  { id: 3, label: "行业模板", icon: Palette },
  { id: 4, label: "主播人设", icon: User },
  { id: 5, label: "直播目标", icon: Target },
  { id: 6, label: "开播时间", icon: Calendar },
];

const platforms = [
  { id: "douyin", name: "抖音", desc: "日活超 7 亿，短视频引流直播" },
  { id: "kuaishou", name: "快手", desc: "下沉市场强信任，老铁经济" },
  { id: "taobao", name: "淘宝直播", desc: "电商基因强，转化链路短" },
  { id: "weixin", name: "视频号", desc: "私域流量，社交裂变" },
  { id: "rtmp", name: "其他 RTMP", desc: "自定义推流地址" },
];

const modes = [
  { id: "presenter", name: "真人展示 AI 代播", desc: "真人出镜展示，AI 完成口播并驱动嘴形替换", tag: "推荐" },
  { id: "confirm", name: "场控确认 AI 代播", desc: "AI 生成话术需场控确认后播报，适合大促和强合规" },
  { id: "auto", name: "全自动数字人", desc: "AI 驱动数字人口播，无人值守，适合夜间和循环直播" },
];

const templates = [
  { id: "beauty", name: "美妆个护", bg: "专柜陈列风" },
  { id: "fashion", name: "服饰穿搭", bg: "品牌旗舰风" },
  { id: "food", name: "食品生鲜", bg: "工厂溯源风" },
  { id: "electronics", name: "数码家电", bg: "专业测评风" },
  { id: "education", name: "教育培训", bg: "品牌旗舰风" },
  { id: "local", name: "本地生活", bg: "节日促销风" },
];

const personas = [
  { id: "owner", name: "店长", desc: "亲切实在，懂行有底气" },
  { id: "expert", name: "专业顾问", desc: "知识型讲解，成分功效通透" },
  { id: "reviewer", name: "测评员", desc: "客观对比，数据说话" },
  { id: "founder", name: "品牌创始人", desc: "故事感强，品牌理念传递" },
];

const goals = [
  { id: "sales", name: "成交转化", desc: "以 GMV 为核心，强化逼单和权益" },
  { id: "followers", name: "涨粉引流", desc: "引导关注、加粉丝团、私域沉淀" },
  { id: "clearance", name: "清库存", desc: "以走量为主，突出价格优势" },
  { id: "launch", name: "新品发布", desc: "强调产品力、首发权益和稀缺性" },
];

const scheduleOptions = [
  { id: "now", name: "立即开播", desc: "创建完成后直接进入准备流程" },
  { id: "later", name: "排期开播", desc: "设定开播时间，到时提醒" },
  { id: "recurring", name: "周期直播", desc: "每日/每周固定时段自动开播" },
];

export function CreateRoom() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();

  const select = (key, value) => {
    setSelections({ ...selections, [key]: value });
  };

  const finish = () => {
    setCreated(true);
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  };

  if (created) {
    return (
      <Layout>
        <div className="page" style={{ maxWidth: "600px", textAlign: "center", paddingTop: "60px", margin: "0 auto" }}>
          <div className="create-success-icon">
            <Check size={40} />
          </div>
          <h1 className="page-title" style={{ fontSize: "22px", marginTop: "20px" }}>直播间创建成功</h1>
          <p className="page-subtitle" style={{ marginBottom: "32px" }}>
            接下来需要完成商品准备和模拟开播，验证通过后即可正式开播
          </p>
          <div className="create-next-steps">
            <div className="create-next-card" onClick={() => navigate("/products")}>
              <div className="create-next-icon"><Check size={20} /></div>
              <div className="create-next-info">
                <div className="create-next-title">导入商品并生成话术</div>
                <div className="create-next-desc">导入 SKU，AI 自动生成话术和展示动作</div>
              </div>
              <ChevronRight size={16} />
            </div>
            <div className="create-next-card" onClick={() => navigate("/room/1/preview")}>
              <div className="create-next-icon"><Play size={20} /></div>
              <div className="create-next-info">
                <div className="create-next-title">配置画面并模拟开播</div>
                <div className="create-next-desc">选择背景、配置 TTS、测试嘴形替换，完成模拟开播</div>
              </div>
              <ChevronRight size={16} />
            </div>
            <div className="create-next-card" onClick={() => navigate("/workbench")}>
              <div className="create-next-icon" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
                <Video size={20} />
              </div>
              <div className="create-next-info">
                <div className="create-next-title">进入导播台开播</div>
                <div className="create-next-desc">模拟开播通过后，正式开始直播</div>
              </div>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const options = [null, platforms, modes, templates, personas, goals, scheduleOptions];
  const keys = ["name", "platform", "mode", "template", "persona", "goal", "schedule"];
  const currentOptions = options[step];
  const currentKey = keys[step];

  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <div>
            <h1 className="page-title">创建直播间</h1>
            <p className="page-subtitle">{steps.length} 步快速搭建你的 AI 嘴替直播间</p>
          </div>
        </div>

        <div className="wizard-steps">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <div key={s.id} className={"wizard-step" + (active ? " active" : "") + (done ? " done" : "")}>
                <div className="wizard-step-icon">
                  {done ? <Check size={14} /> : <Icon size={14} />}
                </div>
                <span className="wizard-step-label">{s.label}</span>
                {i < steps.length - 1 && <div className="wizard-step-line" />}
              </div>
            );
          })}
        </div>

        <div className="wizard-content">
          <h2 className="wizard-question">
            {step === 0 && "输入直播间名称"}
            {step === 1 && "选择直播平台"}
            {step === 2 && "选择直播模式"}
            {step === 3 && "选择行业模板"}
            {step === 4 && "选择主播人设"}
          </h2>
            {step === 5 && "设定直播目标"}

          {step === 0 ? (
            <div style={{ maxWidth: "500px" }}>
              <div className="form-group">
                <label className="form-label">直播间名称 <span className="required">*</span></label>
                <input
                  className="form-input"
                  style={{ fontSize: "16px", padding: "12px 14px" }}
                  placeholder="如：品牌旗舰 618大促专场"
                  value={selections.name || ""}
                  onChange={(e) => select("name", e.target.value)}
                />
              </div>
              <div className="wizard-hint" style={{ marginTop: "12px" }}>
                <Info size={12} />
                直播间名称将显示在直播间列表和导播台中，可随时修改
              </div>
            </div>
          ) : step === 6 ? (
            <div style={{ maxWidth: "500px" }}>
              {scheduleOptions.map((opt) => {
                const selected = selections.schedule === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={"option-card" + (selected ? " selected" : "")}
                    style={{ marginBottom: "10px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px" }}
                    onClick={() => select("schedule", opt.id)}
                  >
                    <div style={{ flex: 1 }}>
                      <div className="option-name" style={{ marginBottom: "4px" }}>{opt.name}</div>
                      <div className="option-desc">{opt.desc}</div>
                    </div>
                    {opt.id === "later" && selected && (
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <input type="date" className="date-input" />
                        <input type="time" className="date-input" style={{ width: "80px" }} />
                      </div>
                    )}
                    {opt.id === "recurring" && selected && (
                      <select className="date-input" style={{ width: "120px" }}>
                        <option>每日</option>
                        <option>每周</option>
                        <option>工作日</option>
                      </select>
                    )}
                    {selected && <Check size={16} style={{ color: "var(--accent)" }} />}
                  </div>
                );
              })}
              <div className="wizard-hint" style={{ marginTop: "16px" }}>
                <Clock size={12} />
                排期创建后，直播间状态为"已排期"。到时间前 30 分钟系统提醒场控准备。
              </div>
            </div>
          ) : (
            <div className={"option-grid" + (step === 1 ? " option-grid-small" : "")}>
              {currentOptions.map((opt) => {
                const selected = selections[currentKey] === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={"option-card" + (selected ? " selected" : "")}
                    onClick={() => select(currentKey, opt.id)}
                  >
                    <div className="option-card-header">
                      <span className="option-name">{opt.name}</span>
                      {opt.tag && <span className="product-badge badge-active">{opt.tag}</span>}
                    </div>
                    <p className="option-desc">{opt.desc}</p>
                    {opt.bg && <span className="option-meta">{opt.bg}</span>}
                    {selected && <Check size={14} className="option-check" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="wizard-footer">
          <button
            className="btn btn-secondary"
            onClick={() => step > 0 && setStep(step - 1)}
            style={{ visibility: step === 0 ? "hidden" : "visible" }}
          >
            上一步
          </button>
          <button className="btn btn-primary" onClick={next}>
            {step === steps.length - 1 ? "完成创建" : "下一步"}
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </Layout>
  );
}
