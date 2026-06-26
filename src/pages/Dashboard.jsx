import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout.jsx";
import {
  Radio, Plus, Eye, DollarSign, Clock, Package,
  ChevronRight, Play, Calendar, Info, X, Monitor
} from "lucide-react";

const stats = [
  { label: "活跃直播间", value: "2", sub: "正在推流", icon: Radio, color: "var(--live)" },
  { label: "今日 GMV", value: "¥126,580", sub: "较昨日 +23%", icon: DollarSign, color: "var(--gold-text)" },
  { label: "累计直播时长", value: "18h 42m", sub: "本周", icon: Clock, color: "var(--info)" },
  { label: "商品可播率", value: "94%", sub: "15/16 商品可播", icon: Package, color: "var(--ok)", clickable: true },
];

const rooms = [
  { id: 1, name: "品牌旗舰 618大促专场", platform: "抖音", status: "live", viewers: 1284, gmv: "¥48,260", duration: "2h 34m", products: 12, readyProducts: 12, mode: "真人展示 AI 代播" },
  { id: 2, name: "夏季清仓特卖", platform: "快手", status: "live", viewers: 856, gmv: "¥22,180", duration: "1h 12m", products: 8, readyProducts: 7, mode: "场控确认 AI 代播" },
  { id: 3, name: "新品发布预热场", platform: "抖音", status: "scheduled", viewers: 0, gmv: "—", duration: "未开始", products: 6, readyProducts: 4, mode: "真人展示 AI 代播", scheduledTime: "今晚 20:00" },
  { id: 4, name: "夜间无人橱窗", platform: "淘宝", status: "scheduled", viewers: 0, gmv: "—", duration: "未开始", products: 20, readyProducts: 20, mode: "全自动数字人", scheduledTime: "每日 23:00" },
  { id: 5, name: "美妆专场回放", platform: "抖音", status: "ended", viewers: 0, gmv: "¥56,140", duration: "3h 28m", products: 15, readyProducts: 15, mode: "真人展示 AI 代播", endedTime: "昨天" },
];

const statusMap = {
  live: { label: "直播中", class: "badge-active", dot: "var(--live)" },
  scheduled: { label: "已排期", class: "badge-pending", dot: "var(--text-muted)" },
  ended: { label: "已结束", class: "badge-done", dot: "var(--text-faint)" },
};

export function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [showRateInfo, setShowRateInfo] = useState(false);
  const filteredRooms = filter === "all" ? rooms : rooms.filter((r) => r.status === filter);

  return (
    <Layout>
      <div className="page page-responsive">
        <div className="page-header">
          <div>
            <h1 className="page-title">直播间总览</h1>
            <p className="page-subtitle">管理所有直播间、商品和直播数据</p>
          </div>
          <Link to="/create" className="btn btn-primary">
            <Plus size={14} /> 创建直播间
          </Link>
        </div>

        <div className="stats-grid">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat-card" style={s.clickable ? { cursor: "pointer" } : {}} onClick={s.clickable ? () => setShowRateInfo(true) : undefined}>
                <div className="stat-icon" style={{ color: s.color, background: s.color + "15" }}>
                  <Icon size={18} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">
                    {s.label}
                    {s.clickable && <Info size={10} style={{ marginLeft: 4, verticalAlign: "middle" }} />}
                  </div>
                  <div className="stat-change" style={{ color: "var(--text-muted)" }}>{s.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {showRateInfo && (
          <div className="rate-info-card" onClick={() => setShowRateInfo(false)}>
            <div className="rate-info-header">
              <span className="rate-info-title">商品可播率计算方式</span>
              <X size={14} />
            </div>
            <div className="rate-info-body">
              <div className="rate-formula">可播商品数 ÷ 总商品数 × 100%</div>
              <div className="rate-formula-example">15 ÷ 16 × 100% = 94%</div>
              <div className="rate-info-desc">"可播"指商品完成以下 6 项检查：</div>
              <div className="rate-checks">
                <span className="rate-check">商品资料完整</span>
                <span className="rate-check">AI 话术通过合规</span>
                <span className="rate-check">展示动作已生成</span>
                <span className="rate-check">商品画面已绑定</span>
                <span className="rate-check">TTS 音色已配置</span>
                <span className="rate-check">模拟开播通过</span>
              </div>
              <div className="rate-info-desc" style={{ marginTop: 8 }}>
                不可播商品：多肽紧致精华液（缺声音授权）
              </div>
            </div>
          </div>
        )}

        <div className="section-header">
          <h2 className="section-title">直播间列表</h2>
          <div className="section-actions">
            <button className={"toolbar-btn" + (filter === "all" ? " active" : "")} onClick={() => setFilter("all")}>全部</button>
            <button className={"toolbar-btn" + (filter === "live" ? " active" : "")} onClick={() => setFilter("live")}>直播中</button>
            <button className={"toolbar-btn" + (filter === "scheduled" ? " active" : "")} onClick={() => setFilter("scheduled")}>已排期</button>
            <button className={"toolbar-btn" + (filter === "ended" ? " active" : "")} onClick={() => setFilter("ended")}>已结束</button>
          </div>
        </div>

        <div className="room-list">
          {filteredRooms.map((room) => {
            const st = statusMap[room.status];
            return (
              <div key={room.id} className="room-card room-card-responsive">
                <div className="room-card-main">
                  <div className="room-status-badge">
                    <span className="room-status-dot" style={{ background: st.dot }} />
                    <span className={"product-badge " + st.class}>{st.label}</span>
                  </div>
                  <div className="room-name">{room.name}</div>
                  <div className="room-meta">
                    <span className="room-tag">{room.platform}</span>
                    <span className="room-meta-text">{room.mode}</span>
                    <span className="room-meta-text">{room.products} 个商品</span>
                    <span className="room-meta-text">可播 {room.readyProducts}/{room.products}</span>
                    {room.scheduledTime && (
                      <span className="room-meta-text room-schedule">
                        <Calendar size={11} style={{ verticalAlign: "middle", marginRight: 2 }} />
                        {room.scheduledTime}
                      </span>
                    )}
                    {room.endedTime && <span className="room-meta-text">· {room.endedTime}</span>}
                  </div>
                </div>
                <div className="room-card-stats">
                  {room.status === "live" && (
                    <>
                      <div className="room-stat"><Eye size={12} /><span className="mono">{room.viewers.toLocaleString()}</span></div>
                      <div className="room-stat"><DollarSign size={12} /><span className="mono">{room.gmv}</span></div>
                      <div className="room-stat"><Clock size={12} /><span className="mono">{room.duration}</span></div>
                    </>
                  )}
                  {room.status === "ended" && (
                    <>
                      <div className="room-stat"><DollarSign size={12} /><span className="mono">{room.gmv}</span></div>
                      <div className="room-stat"><Clock size={12} /><span className="mono">{room.duration}</span></div>
                    </>
                  )}
                  {room.status === "scheduled" && (
                    <div className="room-stat"><Calendar size={12} /><span>{room.scheduledTime}</span></div>
                  )}
                </div>
                <div className="room-card-actions">
                  <Link to={`/room/${room.id}/products`} className="btn btn-secondary btn-sm">
                    <Package size={12} /> 商品配置
                  </Link>
                  {room.status === "live" ? (
                    <>
                      <a href="#/presenter" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                        <Monitor size={12} /> 真人展示台
                      </a>
                      <a href="#/workbench" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                        <Play size={12} /> 导播台
                      </a>
                    </>
                  ) : room.status === "scheduled" ? (
                    <Link to={`/room/${room.id}/simulate`} className="btn btn-primary btn-sm">
                      模拟开播
                    </Link>
                  ) : (
                    <Link to={`/room/${room.id}/review`} className="btn btn-secondary btn-sm">
                      复盘 <ChevronRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
