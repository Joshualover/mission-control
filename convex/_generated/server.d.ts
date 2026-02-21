// 生成文件，不手动编辑
export interface DataModel {
  scheduledTasks: {
    _id: string;
    _creationTime: number;
    title: string;
    description?: string;
    scheduledTime: number;
    status: "pending" | "completed" | "cancelled";
    taskType: "one-time" | "recurring";
    recurrenceRule?: string;
    assignedTo: string;
    priority: "low" | "medium" | "high";
    completedAt?: number;
    createdAt: number;
    updatedAt: number;
  };
  comments: {
    _id: string;
    _creationTime: number;
    taskId: string;
    author: string;
    content: string;
    createdAt: number;
    updatedAt: number;
    mentions?: string[];
    isEdited: boolean;
  };
}
