"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DraggableTaskCardProps {
  task: {
    id: number;
    title: string;
    time: string;
    status: string;
    type: string;
    priority: string;
  };
  onExport: (task: any) => void;
}

export default function DraggableTaskCard({ task, onExport }: DraggableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task-card"
    >
      <div
        style={{
          padding: '20px 20px 20px 40px',
          borderRadius: '16px',
          border: '2px solid',
          borderColor: task.status === 'completed' ? '#dcfce7' : '#f3f4f6',
          backgroundColor: task.status === 'completed' ? '#f0fdf4' : 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative',
          userSelect: 'none',
          ...(isDragging && {
            transform: 'scale(1.03) rotate(1deg)',
            boxShadow: '0 25px 50px rgba(102, 126, 234, 0.35)',
            borderColor: '#667eea',
            zIndex: 1000,
          })
        }}
      >
        {/* Drag Handle - Always visible */}
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '8px 6px',
            cursor: 'grab',
            color: isDragging ? '#667eea' : '#d1d5db',
            fontSize: '18px',
            fontWeight: 'bold',
            lineHeight: '12px',
            letterSpacing: '-2px',
            transition: 'all 0.2s ease',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#667eea';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#d1d5db';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ⋮⋮
        </div>

        {/* Status Icon */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          backgroundColor: task.status === 'completed' ? '#dcfce7' : '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          flexShrink: 0,
          transition: 'all 0.2s ease',
        }}>
          {task.status === 'completed' ? '✅' : task.type === 'recurring' ? '🔄' : '📋'}
        </div>

        {/* Task Info */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            fontSize: '17px', 
            fontWeight: '600', 
            color: '#1a1a1a', 
            marginBottom: '4px',
            transition: 'color 0.2s ease',
          }}>
            {task.title}
          </div>
          <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>
            {task.time} {task.type === 'recurring' ? '· 循环任务' : '· 单次任务'} · {task.priority === 'high' ? '🔴 高优先级' : task.priority === 'medium' ? '🟡 中优先级' : '🟢 低优先级'}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExport(task);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '700',
              backgroundColor: 'white',
              color: '#667eea',
              border: '2px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="导出此任务为.ics文件"
          >
            📥
          </button>
          <div style={{
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '700',
            backgroundColor: task.status === 'completed' ? '#dcfce7' : task.status === 'pending' ? '#fef3c7' : '#fee2e2',
            color: task.status === 'completed' ? '#16a34a' : task.status === 'pending' ? '#d97706' : '#dc2626',
            transition: 'all 0.2s ease',
          }}>
            {task.status === 'completed' ? '已完成' : '待办'}
          </div>
        </div>
      </div>
    </div>
  );
}
