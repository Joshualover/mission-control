"use client";

import Navigation from "../components/Navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function TeamPage() {
  const members = useQuery(api.teamMembers.getTeamMembers);
  const updateStatus = useMutation(api.teamMembers.updateMemberStatus);
  const deleteMember = useMutation(api.teamMembers.deleteMember);

  const handleStatusChange = async (memberId: Id<"teamMembers">, newStatus: string) => {
    await updateStatus({ memberId, status: newStatus });
  };

  const handleDelete = async (memberId: Id<"teamMembers">) => {
    if (confirm("确定要删除这位成员吗？")) {
      await deleteMember(memberId);
    }
  };

  if (members === undefined) {
    return (
      <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: 'var(--background)', minHeight: '100vh' }}>
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
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <Navigation />

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>👥</span>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>团队</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'white', margin: '0 0 20px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            AI 团队管理
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
            管理团队成员和职责分工
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        {members.length === 0 ? (
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '60px', borderRadius: '20px', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>👥</div>
            <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: '700' }}>暂无团队成员</h3>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>开始添加您的团队成员吧！</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            {members.map((member) => (
              <div
                key={member._id}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '40px',
                  borderRadius: '20px',
                  border: '1px solid var(--card-border)',
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => handleDelete(member._id)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    color: 'white',
                    fontWeight: '800',
                    boxShadow: '0 8px 20px rgba(102,126,234,0.3)',
                    backgroundImage: member.avatar ? `url(${member.avatar})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                    {!member.avatar && member.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
                      {member.name}
                    </h3>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', backgroundColor: member.status === 'active' ? '#dcfce7' : member.status === 'busy' ? '#fef3c7' : '#f3f4f6', borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: member.status === 'active' ? '#16a34a' : member.status === 'busy' ? '#d97706' : '#6b7280' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: member.status === 'active' ? '#16a34a' : member.status === 'busy' ? '#d97706' : '#9ca3af' }}></span>
                      {member.role}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px', margin: '0 0 24px' }}>
                  {member.description}
                </p>

                {member.currentTask && (
                  <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '10px' }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>当前任务</div>
                    <div style={{ fontSize: '14px', color: '#1a1a1a' }}>{member.currentTask}</div>
                  </div>
                )}

                <div>
                  <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    技能标签
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {member.skills.map((skill, index) => (
                      <span key={index} style={{ padding: '8px 16px', backgroundColor: '#f9fafb', borderRadius: '10px', fontSize: '14px', color: '#4b5563', fontWeight: '500' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600', marginBottom: '8px' }}>更改状态</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleStatusChange(member._id, 'active')}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: member.status === 'active' ? '#16a34a' : '#f9fafb',
                        color: member.status === 'active' ? 'white' : '#4b5563',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      活跃
                    </button>
                    <button
                      onClick={() => handleStatusChange(member._id, 'busy')}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: member.status === 'busy' ? '#d97706' : '#f9fafb',
                        color: member.status === 'busy' ? 'white' : '#4b5563',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      繁忙
                    </button>
                    <button
                      onClick={() => handleStatusChange(member._id, 'idle')}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: member.status === 'idle' ? '#6b7280' : '#f9fafb',
                        color: member.status === 'idle' ? 'white' : '#4b5563',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      空闲
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
