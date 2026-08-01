import React, { useState, useEffect } from "react";
import { getAdminStats } from "./api";

const C = {
  bg: "#0F0F1A",
  card: "#1A1A2E",
  primary: "#7C3AED",
  text: "#FFFFFF",
  muted: "#A0A0B8",
  success: "#22C55E",
  danger: "#EF4444",
  warning: "#F59E0B",
};

function StatCard({ title, value, subtitle, icon, color }) {
  return (
    <div style={{
      background: C.card,
      borderRadius: 16,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: C.muted, fontSize: 13 }}>{title}</span>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color || C.text }}>
        {value}
      </div>
      {subtitle && <div style={{ fontSize: 12, color: C.muted }}>{subtitle}</div>}
    </div>
  );
}

export default function AdminDashboard({ onBack }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAdminStats()
      .then((data) => { setStats(data); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 20, color: C.muted, textAlign: "center" }}>
        Загрузка статистики...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 20, color: C.danger, textAlign: "center" }}>
        ❌ {error}
      </div>
    );
  }

  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", flex: 1 }}>
      {/* Хедер */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h2 style={{ margin: 0, fontSize: 20, color: C.text }}>📊 Админ-панель</h2>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10,
          padding: "8px 14px", color: C.muted, fontSize: 13, cursor: "pointer"
        }}>
          ← Назад
        </button>
      </div>

      {/* Карточки */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <StatCard
          title="Заказы сегодня"
          value={stats.orders_today}
          icon="🛒"
          color={C.primary}
        />
        <StatCard
          title="Выручка сегодня"
          value={`${stats.revenue_today.toLocaleString("ru-RU")} ₽`}
          icon="💰"
          color={C.success}
        />
        <StatCard
          title="Всего пользователей"
          value={stats.total_users}
          subtitle={`+${stats.new_users_today} сегодня`}
          icon="👤"
          color={C.text}
        />
        <StatCard
          title="Баланс giftapi"
          value={`$${stats.giftapi_balance}`}
          icon="💵"
          color={stats.giftapi_balance < 50 ? C.danger : C.warning}
        />
      </div>
    </div>
  );
}
