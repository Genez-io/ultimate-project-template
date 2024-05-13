// Request DTOs

// Create Task Request DTO
type CreateTaskRequest = {
  title: string;
  ownerId?: string;
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

type UpdateTaskResponsePostgres = {
  modifiedRows?: [number];
};

// Export the DTOs
export {
  UpdateTaskResponsePostgres,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
};
