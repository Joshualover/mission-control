"use client";

import { useState } from "react";
import Navigation from "../components/Navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function MemoriesPage() {
  const memories = useQuery(api.memories.getMemories);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterImportance, setFilterImportance] = useState<string>("all");
  const deleteMemory = useMutation(api.memories.deleteMemory);

  const categories = memories
    ? ["all", ...Array.from(new Set(memories.map(m => m.category).filter(Boolean)))]
    : ["all"];

  const filteredMemories = memories?.filter(memory => {
    if (filterCategory !== "all" && memory.category !== filterCategory) return false;
    if (filterImportance !== "all" && memory.importance !== filterImportance) return false;
    return true;
  }) ?? [];

  const handleDelete = async (memoryId: Id<"memories">) => {
    if (confirm("确定要删除这条记忆吗？")) {
      await deleteMemory(memoryId);
    }
  };

  if (memories === undefined) {
    return (
      <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <Navigation />
        <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <p style={{ fontSize: '18px', color: '#666' }}>加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Navigation />

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>🧠</span>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>记忆库</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'white', margin: '0 0 20px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            知识管理中心
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
            存储和管理重要信息、经验和知识
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        {/* Filters */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '20px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '14px', color: '#666', fontWeight: '600', marginBottom: '8px', display: 'block' }}>分类</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ padding: '10px 16px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', minWidth: '160px', cursor: 'pointer' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === "all" ? "全部" : cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '14px', color: '#666', fontWeight: '600', marginBottom: '8px', display: 'block' }}>重要性</label>
              <select
                value={filterImportance}
                onChange={(e) => setFilterImportance(e.target.value)}
                style={{ padding: '10px 16px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', minWidth: '160px', cursor: 'pointer' }}
              >
                <option value="all">全部</option>
                <option value="high">关键</option>
                <option value="medium">重要</option>
                <option value="low">普通</option>
              </select>
            </div>
            <div style={{ marginLeft: 'auto', color: '#666', fontSize: '15px', fontWeight: '500' }}>
              共 {filteredMemories.length} 条记忆
            </div>
          </div>
        </div>

        {/* Memories Grid */}
        {filteredMemories.length === 0 ? (
          <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
            <h3 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '12px', fontWeight: '700' }}>暂无记忆</h3>
            <p style={{ fontSize: '16px', color: '#666' }}>开始记录您的第一条知识吧！</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
            {filteredMemories.map((memory) => (
              <div
                key={memory._id}
                style={{
                  backgroundColor: 'white',
                  padding: '32px',
                  borderRadius: '20px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => handleDelete(memory._id)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    opacity: '0.5',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
                  title="删除"
                >
                  🗑️
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', backgroundColor: memory.importance === 'high' ? '#fef2f2' : memory.importance === 'medium' ? '#fffbeb' : '#f0fdf4', color: memory.importance === 'high' ? '#dc2626' : memory.importance === 'medium' ? '#d97706' : '#16a34a' }}>
                    {memory.importance === 'high' ? '🔴 关键' : memory.importance === 'medium' ? '🟡 重要' : '🟢 普通'}
                  </div>
                  {memory.category && (
                    <div style={{ padding: '6px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: '600', backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                      {memory.category}
                    </div>
                  )}
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', marginBottom: '12px', marginTop: '0', lineHeight: '1.3' }}>
                  {memory.title}
                </h3>

                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', marginBottom: '20px', margin: '0 0 20px' }}>
                  {memory.content}
                </p>

                {memory.tags && memory.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {memory.tags.map((tag, index) => (
                      <span key={index} style={{ padding: '4px 12px', backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>
                  {new Date(memory.createdAt).toLocaleDateString('zh-CN')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
