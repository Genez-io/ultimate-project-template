// Request DTOs

// Create Task Request DTO
type CreateTaskRequest = {
  title: string;
  ownerId?: string;
  solved: boolean;
  date?: Date;
};

// Create Task Request DTO
type CreateTaskRequestPostgres = {
  taskId?: number;
  title: string;
  ownerId?: string;
  solved: boolean;
  date: Date;
};

// Update Task Request DTO
type UpdateTaskRequest = {
  id: string;
  title?: string;
  solved?: boolean;
  date?: Date;
};

// Update Task Request DTO
type UpdateTaskRequestPostgres = {
  id: number;
  title?: string;
  solved?: boolean;
  date?: Date;
};

// Response DTOs

// Task Response DTO
type TaskResponse = {
  taskId?: number;
  _id?: string;
  ownerId: string;
  title: string;
  solved: boolean;
  date: Date;
};

// Get Tasks Response DTO
type GetTasksResponse = {
  tasks: TaskResponse[];
};

// Get Task Response DTO
type GetTaskResponse = {
  task: TaskResponse;
};

// Create Task Response DTO
type CreateTaskResponse = {
  task: TaskResponse;
};

// Update Task Response DTO
type UpdateTaskResponse = {
  task: TaskResponse;
};

type UpdateTaskResponsePostgres = {
  modifiedRows?: [number];
};

// Export the DTOs
export {
  CreateTaskRequestPostgres,
  UpdateTaskResponsePostgres,
  UpdateTaskRequestPostgres,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
  GetTasksResponse,
  GetTaskResponse,
  CreateTaskResponse,
  UpdateTaskResponse,
};
