"use client";

import { useState, useEffect, FormEvent } from "react";
import { Id } from "./convex/_generated/dataModel";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { zhCN } from "date-fns/locale";

type ScheduledTask = {
  _id: Id<"scheduledTasks">;
  title: string;
  description?: string;
  scheduledTime: number;
  status: "pending" | "completed" | "cancelled";
  taskType: "one-time" | "recurring";
  recurrenceRule?: string;
  assignedTo: "斌哥" | "约书亚";
  priority: "low" | "medium" | "high";
  completedAt?: number;
  createdAt: number;
  updatedAt: number;
};

const PRIORITIES = [
  { value: "low", label: "🟢 低", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "🟡 中", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "🔴 高", color: "bg-red-100 text-red-800" },
] as const;

const ASSIGNEES = [
  { value: "斌哥", label: "斌哥", avatar: "👨‍💼" },
  { value: "约书亚", label: "约书亚", avatar: "🤖" },
] as const;

const STATUSES = [
  { value: "pending", label: "⏳ 待执行", color: "bg-blue-100 text-blue-800" },
  { value: "completed", label: "✅ 已完成", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "❌ 已取消", color: "bg-gray-100 text-gray-800" },
] as const;

export default function Home() {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ScheduledTask | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheduledTime: "",
    taskType: "one-time" as const,
    assignedTo: "斌哥" as const,
    priority: "medium" as const,
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    // 模拟数据
    const now = Date.now();
    const mockTasks: ScheduledTask[] = [
      {
        _id: "1" as Id<"scheduledTasks">,
        title: "每日工作总结",
        description: "生成每日工作报告并上传到网盘",
        scheduledTime: now + 3600000, // 1小时后
        status: "pending",
        taskType: "recurring",
        recurrenceRule: "0 15 * * *", // 每天15:00
        assignedTo: "约书亚",
        priority: "high",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: "2" as Id<"scheduledTasks">,
        title: "技能Dashboard更新",
        description: "每12小时更新一次技能Dashboard",
        scheduledTime: now + 7200000, // 2小时后
        status: "pending",
        taskType: "recurring",
        recurrenceRule: "0 */12 * * *",
        assignedTo: "约书亚",
        priority: "medium",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: "3" as Id<"scheduledTasks">,
        title: "内容管道创意会",
        description: "讨论新内容创意和脚本",
        scheduledTime: now - 3600000, // 1小时前
        status: "completed",
        taskType: "one-time",
        assignedTo: "斌哥",
        priority: "high",
        completedAt: now - 1800000,
        createdAt: now - 86400000,
        updatedAt: now - 1800000,
      },
    ];
    setTasks(mockTasks);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const scheduledTime = new Date(formData.scheduledTime).getTime();
    const newTask: ScheduledTask = {
      _id: Math.random().toString() as Id<"scheduledTasks">,
      title: formData.title,
      description: formData.description,
      scheduledTime,
      taskType: formData.taskType,
      recurrenceRule: formData.taskType === "recurring" ? "0 9 * * *" : undefined,
      assignedTo: formData.assignedTo,
      priority: formData.priority,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      scheduledTime: "",
      taskType: "one-time",
      assignedTo: "斌哥",
      priority: "medium",
    });
  };

  const completeTask = async (taskId: Id<"scheduledTasks">) => {
    setTasks(
      tasks.map((task) =>
        task._id === taskId
          ? { ...task, status: "completed", completedAt: Date.now(), updatedAt: Date.now() }
          : task
      )
    );
  };

  const cancelTask = async (taskId: Id<"scheduledTasks">) => {
    setTasks(
      tasks.map((task) =>
        task._id === taskId
          ? { ...task, status: "cancelled", updatedAt: Date.now() }
          : task
      )
    );
  };

  const deleteTask = async (taskId: Id<"scheduledTasks">) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  // 获取当前月份的日历
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // 获取指定日期的任务
  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.scheduledTime);
      return isSameDay(taskDate, date);
    });
  };

  // 获取即将到来的任务（7天内）
  const upcomingTasks = tasks
    .filter(
      (task) =>
        task.status === "pending" &&
        task.scheduledTime >= Date.now() &&
        task.scheduledTime <= Date.now() + 7 * 24 * 60 * 60 * 1000
    )
    .sort((a, b) => a.scheduledTime - b.scheduledTime)
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                🎯 任务控制中心
              </h1>
              <p className="text-gray-600">跟踪所有计划任务和 cron 作业</p>
            </div>
            <div className="flex space-x-3">
              <a
                href="/memories"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md border-2 border-blue-600"
              >
                🧠 记忆库
              </a>
              <a
                href="/team"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md border-2 border-blue-600"
              >
                👥 团队
              </a>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                ➕ 计划新任务
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-blue-600">{tasks.length}</div>
            <div className="text-sm text-gray-600">总任务数</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-yellow-600">
              {tasks.filter((t) => t.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">待执行</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-green-600">
              {tasks.filter((t) => t.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">已完成</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-3xl font-bold text-purple-600">
              {tasks.filter((t) => t.taskType === "recurring").length}
            </div>
            <div className="text-sm text-gray-600">定期任务</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-md">
              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ← 上月
                </button>
                <h2 className="text-xl font-bold">
                  {format(currentMonth, "yyyy年 MMMM", { locale: zhCN })}
                </h2>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  下月 →
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["一", "二", "三", "四", "五", "六", "日"].map((day) => (
                  <div key={day} className="text-center font-semibold text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date) => {
                  const dayTasks = getTasksForDate(date);
                  const isCurrentMonth = isSameMonth(date, currentMonth);
                  const isToday = isSameDay(date, new Date());

                  return (
                    <div
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      className={`
                        min-h-[80px] p-2 border rounded-lg cursor-pointer transition-all
                        ${isCurrentMonth ? "bg-white" : "bg-gray-50 opacity-50"}
                        ${isToday ? "border-blue-500 border-2" : "border-gray-200"}
                        ${selectedDate && isSameDay(date, selectedDate) ? "ring-2 ring-blue-300" : ""}
                        hover:shadow-md
                      `}
                    >
                      <div className={`text-sm font-semibold mb-1 ${
                        isToday ? "text-blue-600" : ""
                      }`}>
                        {format(date, "d")}
                      </div>
                      <div className="space-y-1">
                        {dayTasks.slice(0, 3).map((task) => (
                          <div
                            key={task._id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTask(task);
                            }}
                            className={`
                              text-xs p-1 rounded truncate cursor-pointer
                              ${
                                task.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : task.status === "cancelled"
                                  ? "bg-gray-100 text-gray-800"
                                  : PRIORITIES.find((p) => p.value === task.priority)?.color
                              }
                            `}
                            title={task.title}
                          >
                            {task.title}
                          </div>
                        ))}
                        {dayTasks.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{dayTasks.length - 3} 更多
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold mb-4">📋 即将到来</h3>
              {upcomingTasks.length === 0 ? (
                <p className="text-gray-500 text-sm">没有即将执行的任务</p>
              ) : (
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task._id}
                      onClick={() => setSelectedTask(task)}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm">
                          {ASSIGNEES.find((a) => a.value === task.assignedTo)?.avatar}
                        </span>
                        <span className="font-semibold text-sm">{task.title}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {format(new Date(task.scheduledTime), "MM/dd HH:mm")}
                      </div>
                      <div className="mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            PRIORITIES.find((p) => p.value === task.priority)?.color
                          }`}
                        >
                          {PRIORITIES.find((p) => p.value === task.priority)?.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Date Tasks */}
            {selectedDate && (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4">
                  📅 {format(selectedDate, "yyyy年MM月dd日", { locale: zhCN })}的任务
                </h3>
                <div className="space-y-2">
                  {getTasksForDate(selectedDate).map((task) => (
                    <div
                      key={task._id}
                      onClick={() => setSelectedTask(task)}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className="font-semibold text-sm">{task.title}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {format(new Date(task.scheduledTime), "HH:mm")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Task Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">📝 计划新任务</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">任务标题 *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入任务标题..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">任务描述</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="输入任务描述..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">计划时间 *</label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.scheduledTime}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduledTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">任务类型</label>
                    <select
                      value={formData.taskType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          taskType: e.target.value as "one-time" | "recurring",
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="one-time">一次性任务</option>
                      <option value="recurring">定期任务</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">分配给</label>
                    <select
                      value={formData.assignedTo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignedTo: e.target.value as "斌哥" | "约书亚",
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {ASSIGNEES.map((assignee) => (
                        <option key={assignee.value} value={assignee.value}>
                          {assignee.avatar} {assignee.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">优先级</label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value as "low" | "medium" | "high",
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {PRIORITIES.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    创建任务
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Task Detail Modal */}
        {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedTask.title}</h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">描述</h3>
                  <p className="text-gray-800">
                    {selectedTask.description || "无描述"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">计划时间</h3>
                    <p className="text-gray-800">
                      {format(new Date(selectedTask.scheduledTime), "yyyy/MM/dd HH:mm")}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">状态</h3>
                    <p className="text-gray-800">
                      {STATUSES.find((s) => s.value === selectedTask.status)?.label}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">任务类型</h3>
                    <p className="text-gray-800">
                      {selectedTask.taskType === "recurring" ? "🔄 定期任务" : "📅 一次性"}
                    </p>
                  </div>
                  {selectedTask.recurrenceRule && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-1">重复规则</h3>
                      <p className="text-gray-800 text-sm font-mono">
                        {selectedTask.recurrenceRule}
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">分配给</h3>
                    <p className="text-gray-800">
                      {ASSIGNEES.find((a) => a.value === selectedTask.assignedTo)?.avatar}{" "}
                      {ASSIGNEES.find((a) => a.value === selectedTask.assignedTo)?.label}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">优先级</h3>
                    <p className="text-gray-800">
                      {PRIORITIES.find((p) => p.value === selectedTask.priority)?.label}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  {selectedTask.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          completeTask(selectedTask._id);
                          setSelectedTask({
                            ...selectedTask,
                            status: "completed",
                            completedAt: Date.now(),
                          });
                        }}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
                      >
                        ✅ 完成
                      </button>
                      <button
                        onClick={() => {
                          cancelTask(selectedTask._id);
                          setSelectedTask({
                            ...selectedTask,
                            status: "cancelled",
                          });
                        }}
                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                      >
                        ❌ 取消
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => {
                      deleteTask(selectedTask._id);
                      setSelectedTask(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                  >
                    🗑️ 删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
