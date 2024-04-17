// Request DTOs

// Create Task Request DTO
type CreateTaskRequest = {
  title: string;
  solved: boolean;
  date?: Date;
};

// Create Task Request DTO
type CreateTaskRequestPostgres = {
  taskId: string;
  title: string;
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

// Response DTOs

// Task Response DTO
type TaskResponse = {
  _id?: string;
  title: string;
  solved: boolean;
  date: Date;
};

// Get Tasks Response DTO
type GetTasksResponse = {
  success: boolean;
  tasks: TaskResponse[];
  error?: string;
};

// Get Task Response DTO
type GetTaskResponse = {
  success: boolean;
  task?: TaskResponse;
  error?: string;
};

// Create Task Response DTO
type CreateTaskResponse = {
  success: boolean;
  task?: TaskResponse;
  error?: string;
};

// Update Task Response DTO
type UpdateTaskResponse = {
  success: boolean;
  task?: TaskResponse;
  error?: string;
};

// Delete Task Response DTO
type DeleteTaskResponse = {
  success: boolean;
  error?: string;
};

type UpdateTaskResponsePostgres = {
  success: boolean;
  modifiedRows?: [number];
  error?: string;
};

// Export the DTOs
export {
  CreateTaskRequestPostgres,
  UpdateTaskResponsePostgres,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
  GetTasksResponse,
  GetTaskResponse,
  CreateTaskResponse,
  UpdateTaskResponse,
  DeleteTaskResponse,
};
