import { FilterType } from "../ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons"
import { FilterValue } from "../ui/Todolists/Todolist/Todolist"
import { TodolistResponse } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { AppDispatch } from "app/store"
import { setAppStatusAC } from "app/model/app-reducer"
import { RequestStatus, ResultCode } from "common/types/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"

// actions (функции варбрики)
export const setTodolistsAC = (todolists: TodolistResponse[]) => {
  return { type: "SET-TODOLIST", todolists } as const
}
export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { todolistId } } as const
}
export const addTodolistAC = (todolist: TodolistResponse) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}
export const updateTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}
export const updateTodolistFilterAC = (payload: { todolistId: string; filter: FilterType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}
export const setTasksLoadedAC = (payload: { status: RequestStatus; todolistId: string }) => {
  return { type: "SET-TASK-LOADED", payload } as const
}
export const setTodolistEntityStatus = (payload: { status: RequestStatus; todolistId: string }) => {
  return { type: "SET-ENTITY-STATUS", payload } as const
}

//thunks (TC - функция высшего порядка для TodoT)
export const fetchTodolistsTC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC(RequestStatus.loading))
    const res = await todolistsApi.getTodolists()
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC(RequestStatus.succeeded))
  } catch (err) {
    handleServerNetworkError(err, dispatch)
  }
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC(RequestStatus.loading))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC(RequestStatus.succeeded))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch))
}
export const removeTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setTodolistEntityStatus({ status: RequestStatus.loading, todolistId }))
  dispatch(setAppStatusAC(RequestStatus.loading))
  todolistsApi
    .removeTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppStatusAC(RequestStatus.succeeded))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((res) => {
      dispatch(setTodolistEntityStatus({ status: RequestStatus.failed, todolistId }))
      dispatch(setAppStatusAC(RequestStatus.failed))
    })
}
export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC(RequestStatus.loading))
  todolistsApi
    .updateTodolist(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTodolistTitleAC(arg))
        dispatch(setAppStatusAC(RequestStatus.succeeded))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch))
}

const initialState: DomainTodolist[] = []
//Reducer
export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsTodolist): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLIST": {
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: RequestStatus.idle,
        tasksLoaded: RequestStatus.idle,
      }))
    }

    case "REMOVE-TODOLIST": {
      const { todolistId } = action.payload
      return state.filter((tl) => tl.id !== todolistId)
    }

    case "ADD-TODOLIST": {
      const { todolist } = action.payload
      const newTodolist: DomainTodolist = {
        id: todolist.id,
        title: todolist.title,
        addedDate: todolist.addedDate,
        order: todolist.order,
        filter: "all",
        entityStatus: RequestStatus.idle,
        tasksLoaded: RequestStatus.idle,
      }
      return [newTodolist, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      const { id, title } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, title } : tl))
    }
    case "CHANGE-TODOLIST-FILTER": {
      const { todolistId, filter } = action.payload
      return state.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl))
    }
    case "SET-TASK-LOADED": {
      const { status, todolistId } = action.payload
      return state.map((tl) => (tl.id === todolistId ? { ...tl, tasksLoaded: status } : tl))
    }
    case "SET-ENTITY-STATUS": {
      const { status, todolistId } = action.payload
      return state.map((tl) => (tl.id === todolistId ? { ...tl, entityStatus: status } : tl))
    }
    default:
      return state
  }
}

//types
export type ActionsTodolist = //Union type
  //todos
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof updateTodolistTitleAC>
  | ReturnType<typeof updateTodolistFilterAC>
  | ReturnType<typeof setTodolistEntityStatus>
  //tasks
  | ReturnType<typeof setTasksLoadedAC>

export type DomainTodolist = TodolistResponse & {
  filter: FilterValue
  entityStatus: RequestStatus
  tasksLoaded: RequestStatus
}
