// Request DTOs

// Create Task Request DTO
type CreateTaskRequest = {
  title: string;
  ownerId: string;
  solved: boolean;
};

// Update Task Request DTO
type UpdateTaskRequest = {
  id: string;
  title?: string;
  solved?: boolean;
};

// Response DTOs

// Task Response DTO
type TaskResponse = {
  id: string;
  ownerId: string;
  title: string;
  solved: boolean;
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
  UpdateTaskResponsePostgres,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
  GetTasksResponse,
  GetTaskResponse,
  CreateTaskResponse,
  UpdateTaskResponse,
};
