import { addTask, clearTasks, removeTask, Tasks, tasksReducer, updateTask } from "../tasksSlice"
import { mockDataTasks, newTaskData, todolistData } from "../mockData/mock-data"
import { RequestStatus, TaskStatus } from "common/types/enums"
import { ResponseTask } from "../../api/tasksApi.types"
import { addTodolist, removeTodolist } from "../todolistsSlice"

test("correct tasks should be deleted from correct array", () => {
  const startState: Tasks = { ...mockDataTasks }
  const action = removeTask({ taskId: "2", todolistId: "todolistId2" })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"].length).toBe(2)
})

test("correct tasks should be added to correct array", () => {
  const startState: Tasks = { ...mockDataTasks }
  const newTask: ResponseTask = newTaskData

  if (newTask) {
    const action = addTask({ task: newTask })
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId1"].length).toBe(4)
    expect(endState["todolistId2"].length).toBe(3)
    expect(endState["todolistId2"][0].title).toBe("0")
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.New)
    expect(endState["todolistId1"][0].entityStatus).toBe(RequestStatus.idle)
  }
})

test("status of specified tasks should be changed", () => {
  const startState: Tasks = { ...mockDataTasks }
  const action = updateTask({ todolistId: "todolistId1", taskId: "3", domainModel: { status: TaskStatus.Complete } })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][2].status).toBe(TaskStatus.Complete)
  expect(endState["todolistId1"][2].title).toBe("2")
  expect(endState["todolistId1"][1].status).toBe(TaskStatus.New)
})

test("title of specified tasks should be changed", () => {
  const startState: Tasks = { ...mockDataTasks }

  const action = updateTask({ todolistId: "todolistId2", taskId: "1", domainModel: { status: TaskStatus.Complete } })
  const action2 = updateTask({ todolistId: "todolistId2", taskId: "1", domainModel: { title: "new" } })

  const prewState = tasksReducer(startState, action)
  const endState = tasksReducer(prewState, action2)

  expect(endState["todolistId2"][0].status).toBe(TaskStatus.Complete)
  expect(endState["todolistId2"][0].title).toBe("new")
  expect(endState["todolistId2"][2].status).toBe(TaskStatus.New)
  expect(endState["todolistId2"][2].title).toBe("2")
})

test("new array should be added when new todolist is added", () => {
  const startState: Tasks = { ...mockDataTasks }
  const newTodo = { ...todolistData, title: "new todo" }
  const action = addTodolist({ todolist: newTodo })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const startState: Tasks = { ...mockDataTasks }

  const action = removeTodolist({ todolistId: "todolistId2" })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})

test("correct clear all tasks", () => {
  const startState: Tasks = { ...mockDataTasks }

  const endState = tasksReducer(startState, clearTasks())

  for (let i = 0; i < 100; i++) {
    expect(endState[i]).toBe(undefined)
  }
})
