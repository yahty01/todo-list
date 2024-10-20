import { getTaskResponse, Task, UpdateTaskModel } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<getTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<BaseResponse<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { taskId, model, todolistId } = payload
    return instance.put<BaseResponse<{ item: Task }>>(`${todolistId}/tasks/${taskId}`, model)
  },
}