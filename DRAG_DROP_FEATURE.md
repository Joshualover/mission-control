# 拖拽排序功能说明

## 功能概述

日历页面现已支持任务卡片的拖拽排序功能，用户可以通过直观的拖拽操作重新排列任务顺序。

## 技术实现

### 使用的库
- **@dnd-kit/core**: 核心拖拽功能
- **@dnd-kit/sortable**: 列表排序功能
- **@dnd-kit/utilities**: 工具函数和动画支持

### 架构设计

```
app/calendar/
├── page.tsx                    # 主页面（集成DndContext）
└── components/
    └── DraggableTaskCard.tsx   # 可拖拽任务卡片组件
```

## 功能特性

### 1. 拖拽操作
- **拖动手柄**: 每个任务卡片左侧有⋮⋮图标作为拖动手柄
- **视觉反馈**: 
  - 拖拽时卡片轻微放大（scale 1.03）
  - 半透明阴影效果（紫色主题）
  - 边框颜色变为紫色（#667eea）
  - 轻微旋转效果（1度）

### 2. 动画效果
- **平滑过渡**: 使用 cubic-bezier(0.4, 0, 0.2, 1) 缓动函数
- **实时预览**: 拖拽过程中其他卡片实时调整位置
- **视觉层次**: 拖拽中的卡片z-index提升至1000

### 3. 数据持久化
- **自动保存**: 拖拽结束后自动保存到 localStorage
- **存储键**: `mission-control-tasks`
- **加载机制**: 页面加载时从 localStorage 恢复任务顺序

### 4. 兼容性
- **桌面端**: 支持鼠标拖拽（8px移动阈值防止误操作）
- **移动端**: 支持触摸拖拽
- **键盘**: 支持键盘操作（通过 KeyboardSensor）

## 使用说明

### 拖拽排序
1. 将鼠标悬停在任务卡片左侧的拖动手柄（⋮⋮）上
2. 按住鼠标左键并拖动任务到目标位置
3. 松开鼠标完成排序
4. 新顺序自动保存

### 视觉提示
- **拖动手柄颜色**: 默认灰色（#d1d5db），悬停时变为紫色
- **拖动状态**: 鼠标指针变为 grabbing
- **导出按钮**: 仍可正常使用（通过 stopPropagation 防止冲突）

## 技术细节

### 激活约束
```typescript
activationConstraint: {
  distance: 8, // 8px移动阈值
}
```
防止点击时意外触发拖拽。

### 碰撞检测
使用 `closestCenter` 算法，提供最直观的排序体验。

### 排序策略
使用 `verticalListSortingStrategy` 适配垂直列表布局。

### 样式保持
- 保持现有紫色主题（#667eea）
- 不破坏现有的搜索和过滤功能
- 响应式设计，适配不同屏幕尺寸

## 代码示例

### 基本用法
```tsx
import { DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
  <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
    {tasks.map(task => (
      <DraggableTaskCard key={task.id} task={task} />
    ))}
  </SortableContext>
</DndContext>
```

### 拖拽处理
```typescript
const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (over && active.id !== over.id) {
    setTasks(items => {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      const newTasks = arrayMove(items, oldIndex, newIndex);
      localStorage.setItem('mission-control-tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }
};
```

## 性能优化

1. **CSS Transform**: 使用 transform 而非 position，获得更好的性能
2. **事件委托**: DndContext 统一管理拖拽事件
3. **最小化重渲染**: 只更新必要的组件
4. **防抖配置**: 8px 移动阈值防止频繁触发

## 浏览器兼容性

- ✅ Chrome/Edge (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ 移动浏览器（iOS Safari, Chrome Mobile）

## 未来改进

- [ ] 添加拖拽撤销功能
- [ ] 支持多选拖拽
- [ ] 拖拽到不同日期
- [ ] 拖拽动画自定义配置

## 故障排除

### 拖拽不工作
1. 检查浏览器控制台是否有错误
2. 清除 localStorage: `localStorage.removeItem('mission-control-tasks')`
3. 刷新页面重试

### 样式问题
确保加载了完整的 Tailwind CSS 配置和 @dnd-kit 样式。

### 性能问题
如果任务列表很长（>100项），考虑使用虚拟滚动优化。
