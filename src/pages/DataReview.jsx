import { Link, useParams } from "react-router-dom";
import { ChevronLeft, DollarSign, Eye, MessageSquare, TrendingUp, Clock,
  Award, ThumbsUp, BarChart3 } from "lucide-react";


const metrics = [
  { label: "总 GMV", value: "¥126,580", change: "+23%", icon: DollarSign },
  { label: "平均停留时长", value: "3分12秒", change: "+8%", icon: Clock },
  { label: "互动率", value: "14.2%", change: "+2.1%", icon: MessageSquare },
  { label: "转化率", value: "6.8%", change: "+1.3%", icon: TrendingUp },
];

const topProducts = [
  { rank: 1, name: "玻尿酸保湿精华液", gmv: "¥38,420", sold: 432, conversion: "8.2%", aiRate: "92%" },
  { rank: 2, name: "视黄醇抗皱眼霜", gmv: "¥28,640", sold: 180, conversion: "7.1%", aiRate: "88%" },
  { rank: 3, name: "氨基酸洁面乳", gmv: "¥18,900", sold: 420, conversion: "6.5%", aiRate: "85%" },
  { rank: 4, name: "神经酰胺修护面霜", gmv: "¥12,480", sold: 105, conversion: "5.2%", aiRate: "79%" },
  { rank: 5, name: "烟酰胺亮肤面膜", gmv: "¥9,380", sold: 136, conversion: "4.8%", aiRate: "76%" },
];

const scriptStats = [
  { type: "商品讲解", adopted: 24, rewritten: 6, rate: "80%" },
  { type: "转化逼单", adopted: 8, rewritten: 2, rate: "80%" },
  { type: "互动问答", adopted: 32, rewritten: 4, rate: "89%" },
  { type: "开场暖场", adopted: 4, rewritten: 1, rate: "80%" },
];

const commentHotspots = [
  { topic: "敏感肌能用吗", count: 48, tag: "高价值" },
  { topic: "价格比上次贵了", count: 32, tag: "负面" },
  { topic: "什么时候发货", count: 28, tag: "售后" },
  { topic: "和其他品牌比", count: 22, tag: "高价值" },
  { topic: "有没有小样", count: 18, tag: "重复" },
];

const hourlyGmv = [
  { hour: "19:00", value: 8 },
  { hour: "20:00", value: 25 },
  { hour: "21:00", value: 45 },
  { hour: "22:00", value: 62 },
  { hour: "23:00", value: 38 },
];

export function DataReview() {
  const { id } = useParams();
  const maxGmv = Math.max(...hourlyGmv.map((h) => h.value));

  return (
    <div className="sub-page">
      <header className="sub-topbar">
        <Link to="/" className="topbar-back">
          <ChevronLeft size={16} /> 返回直播间列表
        </Link>
        <div className="sub-topbar-title">
          <span className="sub-topbar-room">品牌旗舰 618大促专场</span>
          <span className="sub-topbar-sep">·</span>
          <span className="sub-topbar-section">数据复盘</span>
        </div>
        <div className="topbar-spacer" />
        <span className="room-meta-text">2026-06-24 · 直播时长 4h 12m</span>
        <button className="btn btn-secondary btn-sm">导出报告</button>
      </header>
      <div className="page page-review">

        <div className="stats-grid">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="stat-card">
                <div className="stat-icon" style={{ color: "var(--accent-text)", background: "var(--accent-dim)" }}>
                  <Icon size={18} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{m.value}</div>
                  <div className="stat-label">{m.label}</div>
                  <div className="stat-change">较上次 {m.change}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="review-grid">
          <div className="review-card">
            <div className="review-card-header">
              <h3 className="review-card-title"><BarChart3 size={14} /> 分时 GMV 趋势</h3>
            </div>
            <div className="chart-area">
              <div className="bar-chart">
                {hourlyGmv.map((h) => (
                  <div key={h.hour} className="bar-col">
                    <div className="bar-value mono">¥{h.value}k</div>
                    <div className="bar-fill" style={{ height: (h.value / maxGmv * 100) + "%" }} />
                    <div className="bar-label">{h.hour}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-card-header">
              <h3 className="review-card-title"><Award size={14} /> 商品表现 TOP 5</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>商品</th>
                  <th>GMV</th>
                  <th>销量</th>
                  <th>转化率</th>
                  <th>话术采纳</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.rank}>
                    <td className="mono">{p.rank}</td>
                    <td>{p.name}</td>
                    <td className="mono text-accent">{p.gmv}</td>
                    <td className="mono">{p.sold}</td>
                    <td className="mono">{p.conversion}</td>
                    <td className="mono">{p.aiRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="review-card">
            <div className="review-card-header">
              <h3 className="review-card-title"><ThumbsUp size={14} /> AI 话术采纳分析</h3>
            </div>
            <div className="script-stats-list">
              {scriptStats.map((s) => (
                <div key={s.type} className="script-stat-row">
                  <span className="script-stat-type">{s.type}</span>
                  <div className="script-stat-bar">
                    <div className="script-stat-fill" style={{ width: s.rate }} />
                  </div>
                  <span className="script-stat-rate mono">{s.rate}</span>
                  <span className="script-stat-detail">采纳 {s.adopted} · 重写 {s.rewritten}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="review-card">
            <div className="review-card-header">
              <h3 className="review-card-title"><MessageSquare size={14} /> 评论热点</h3>
            </div>
            <div className="comment-hotspot-list">
              {commentHotspots.map((c) => (
                <div key={c.topic} className="comment-hotspot-row">
                  <span className="comment-hotspot-topic">{c.topic}</span>
                  <span className={"comment-tag tag-" + (c.tag === "高价值" ? "high" : c.tag === "负面" ? "negative" : c.tag === "售后" ? "service" : "repeat")}>{c.tag}</span>
                  <span className="comment-hotspot-count mono">{c.count} 条</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="review-card">
          <div className="review-card-header">
            <h3 className="review-card-title">AI 质量指标</h3>
          </div>
          <div className="quality-grid">
            <div className="quality-item">
              <div className="quality-label">话术总采纳率</div>
              <div className="quality-value mono">83%</div>
            </div>
            <div className="quality-item">
              <div className="quality-label">评论回答命中率</div>
              <div className="quality-value mono">91%</div>
            </div>
            <div className="quality-item">
              <div className="quality-label">违规拦截准确率</div>
              <div className="quality-value mono">98%</div>
            </div>
            <div className="quality-item">
              <div className="quality-label">TTS 平均延迟</div>
              <div className="quality-value mono">0.8s</div>
            </div>
            <div className="quality-item">
              <div className="quality-label">嘴形同步评分</div>
              <div className="quality-value mono">4.2/5</div>
            </div>
            <div className="quality-item">
              <div className="quality-label">声音授权异常</div>
              <div className="quality-value mono">0 次</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
