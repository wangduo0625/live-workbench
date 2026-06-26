import { Layout } from "../components/Layout.jsx";
import {
  Activity, Wifi, Video, Mic, AlertTriangle, Check,
  RefreshCw, Radio, ChevronRight
} from "lucide-react";

const platforms = [
  { name: "抖音", status: "pushing", bitrate: "4500", fps: "30", audio: "-12dB", latency: "2.1s", uptime: "2h 34m" },
  { name: "快手", status: "pushing", bitrate: "3800", fps: "30", audio: "-10dB", latency: "2.8s", uptime: "1h 12m" },
];

const healthMetrics = [
  { label: "推流码率", value: "4500 kbps", status: "ok", target: "≥3000" },
  { label: "视频帧率", value: "30 fps", status: "ok", target: "30" },
  { label: "音频电平", value: "-12 dB", status: "ok", target: "-20 ~ -6" },
  { label: "端到端延迟", value: "2.1s", status: "ok", target: "≤5s" },
  { label: "丢帧率", value: "0.02%", status: "ok", target: "≤1%" },
  { label: "重连次数", value: "0", status: "ok", target: "0" },
];

const alerts = [
  { time: "02:31:14", level: "warn", text: "快手推流码率短暂下降至 2800kbps，已自动恢复", platform: "快手" },
  { time: "02:15:08", level: "info", text: "抖音推流连接稳定，延迟 2.1s", platform: "抖音" },
  { time: "01:58:42", level: "warn", text: "嘴形跟踪短暂丢失 0.8s，已回退为真人静音展示", platform: "系统" },
  { time: "01:12:00", level: "info", text: "快手直播间开播推流", platform: "快手" },
  { time: "00:00:00", level: "info", text: "抖音直播间开播推流", platform: "抖音" },
];

const statusMap = {
  ok: { color: "var(--ok)", bg: "var(--ok-dim)", icon: Check },
  warn: { color: "var(--warn)", bg: "var(--warn-dim)", icon: AlertTriangle },
  info: { color: "var(--info)", bg: "var(--info-dim)", icon: Activity },
};

export function StreamMonitor() {
  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <div>
            <h1 className="page-title">推流监控</h1>
            <p className="page-subtitle">实时监控推流链路健康状态</p>
          </div>
          <div className="section-actions">
            <button className="btn btn-secondary btn-sm"><RefreshCw size={12} /> 刷新</button>
            <button className="btn btn-danger btn-sm">紧急停止推流</button>
          </div>
        </div>

        <div className="stream-platforms">
          {platforms.map((p) => (
            <div key={p.name} className="stream-platform-card">
              <div className="stream-platform-header">
                <div className="stream-platform-name">
                  <Radio size={16} />
                  {p.name}
                </div>
                <span className="stream-status-badge pushing">
                  <span className="room-status-dot" style={{ background: "var(--ok)" }} />
                  推流中
                </span>
              </div>
              <div className="stream-platform-metrics">
                <div className="stream-metric">
                  <div className="stream-metric-label">码率</div>
                  <div className="stream-metric-value mono">{p.bitrate} kbps</div>
                </div>
                <div className="stream-metric">
                  <div className="stream-metric-label">帧率</div>
                  <div className="stream-metric-value mono">{p.fps} fps</div>
                </div>
                <div className="stream-metric">
                  <div className="stream-metric-label">音频</div>
                  <div className="stream-metric-value mono">{p.audio}</div>
                </div>
                <div className="stream-metric">
                  <div className="stream-metric-label">延迟</div>
                  <div className="stream-metric-value mono">{p.latency}</div>
                </div>
                <div className="stream-metric">
                  <div className="stream-metric-label">推流时长</div>
                  <div className="stream-metric-value mono">{p.uptime}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="review-grid">
          <div className="review-card">
            <div className="review-card-header">
              <h3 className="review-card-title"><Activity size={14} /> 链路健康指标</h3>
            </div>
            <div className="health-list">
              {healthMetrics.map((m) => {
                const st = statusMap[m.status];
                const Icon = st.icon;
                return (
                  <div key={m.label} className="health-row">
                    <span className="health-check" style={{ background: st.bg, color: st.color }}>
                      <Icon size={12} />
                    </span>
                    <span className="health-label">{m.label}</span>
                    <span className="health-value mono">{m.value}</span>
                    <span className="health-target">目标 {m.target}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="review-card">
            <div className="review-card-header">
              <h3 className="review-card-title"><AlertTriangle size={14} /> 告警日志</h3>
            </div>
            <div className="alert-list">
              {alerts.map((a, i) => {
                const st = statusMap[a.level];
                const Icon = st.icon;
                return (
                  <div key={i} className="alert-row">
                    <span className="alert-icon" style={{ background: st.bg, color: st.color }}>
                      <Icon size={11} />
                    </span>
                    <span className="alert-time mono">{a.time}</span>
                    <span className="alert-text">{a.text}</span>
                    <span className="alert-platform">{a.platform}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="review-card">
          <div className="review-card-header">
            <h3 className="review-card-title"><Wifi size={14} /> 推流链路架构</h3>
          </div>
          <div className="pipeline" style={{ justifyContent: "center", padding: "16px 0" }}>
            {["话术生成", "TTS 合成", "嘴形替换", "画面混流", "编码器", "RTMP 推流", "平台"].map((step, i, arr) => (
              <span key={step} style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
                <span className="pipeline-step"><span className="pipeline-step-dot" />{step}</span>
                {i < arr.length - 1 && <span className="pipeline-arrow">›</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
