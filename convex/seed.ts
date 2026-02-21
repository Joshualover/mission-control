import { components } from "./_generated/api";
import { convexTest, runMutation } from "convex-dev";
import { api } from "./_generated/api";

async function seed() {
  const test = convexTest();

  // 添加示例记忆
  await runMutation(test, api.memories.createMemory, {
    title: "项目快速部署脚本",
    content: "使用 quick-web-deploy 技能可以在30秒内创建并部署完整的 Web 应用。脚本位于 /root/.openclaw/workspace/skills/quick-web-deploy/quick-deploy.sh。",
    category: "工作流程",
    tags: ["部署", "自动化", "GitHub Pages"],
    importance: "high",
  });

  await runMutation(test, api.memories.createMemory, {
    title: "GitHub 克隆镜像使用",
    content: "由于网络速度慢（~13-18 kB/s），GitHub 直接克隆经常失败。使用 gh-proxy.com 镜像：git clone https://gh-proxy.com/https://github.com/{user}/{repo}.git",
    category: "技术决策",
    tags: ["GitHub", "网络", "镜像"],
    importance: "high",
  });

  await runMutation(test, api.memories.createMemory, {
    title: "版本参数解决浏览器缓存",
    content: "在 Web 应用中遇到浏览器缓存问题，通过添加版本参数解决：<link rel=\"stylesheet\" href=\"style.css?v=2.1.2\">。",
    category: "问题解决",
    tags: ["浏览器缓存", "性能", "前端"],
    importance: "medium",
  });

  await runMutation(test, api.memories.createMemory, {
    title: "斌哥的偏好设置",
    content: "斌哥喜欢直接、高效的沟通。不要用'问得好'、'我很乐意为您效劳'等开场白。直接回答问题。注重实用性而非完美执行。",
    category: "个人偏好",
    tags: ["斌哥", "沟通", "偏好"],
    importance: "high",
  });

  // 添加示例团队成员
  await runMutation(test, api.teamMembers.createTeamMember, {
    name: "斌哥",
    role: "开发者",
    description: "项目负责人，负责系统架构和决策",
    responsibilities: ["系统设计", "项目管理", "技术决策"],
    skills: ["系统设计", "项目管理", "决策"],
    avatar: "",
    status: "active",
  });

  await runMutation(test, api.teamMembers.createTeamMember, {
    name: "约书亚",
    role: "主控AI",
    description: "AI助手，负责日常任务执行和协调",
    responsibilities: ["任务执行", "代码开发", "文档编写"],
    skills: ["任务执行", "代码开发", "文档编写"],
    avatar: "",
    status: "active",
  });

  // 添加示例项目
  await runMutation(test, api.projects.createProject, {
    title: "Mission Control 界面优化",
    description: "优化用户界面，提升用户体验",
    stage: "production",
    assignedTo: "约书亚",
    priority: "high",
  });

  await runMutation(test, api.projects.createProject, {
    title: "AI 团队协作系统",
    description: "开发完整的AI团队协作管理系统",
    stage: "idea",
    assignedTo: "斌哥",
    priority: "medium",
  });

  // 添加示例任务
  const now = Date.now();
  
  await runMutation(test, api.tasks.createTask, {
    title: "完成界面设计",
    description: "设计新的用户界面",
    scheduledTime: now + 3600000, // 1小时后
    taskType: "one-time",
    assignedTo: "约书亚",
    priority: "high",
  });

  await runMutation(test, api.tasks.createTask, {
    title: "团队会议",
    description: "每周团队同步会议",
    scheduledTime: now + 7200000, // 2小时后
    taskType: "recurring",
    recurrenceRule: "weekly",
    assignedTo: "斌哥",
    priority: "medium",
  });

  await runMutation(test, api.tasks.createTask, {
    title: "代码审查",
    description: "审查项目代码",
    scheduledTime: now + 10800000, // 3小时后
    taskType: "one-time",
    assignedTo: "斌哥",
    priority: "low",
  });

  console.log("✅ 数据库初始化完成！");
}

seed().catch(console.error);
