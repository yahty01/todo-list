import {
  addTaskAC,
  addTodolistAC,
  removeTaskAC,
  removeTodolistAC,
  tasksReducer,
  TasksStateType,
  updateTaskAC,
} from "../tasks-reducer"
import { mockDataTasks, newTaskData, todolistData } from "../mockData/mock-data"
import { DomainTask } from "../../api/tasksApi.types"
import { TaskStatus } from "../../lib/enums"

test("correct tasks should be deleted from correct array", () => {
  const startState: TasksStateType = { ...mockDataTasks }
  const action = removeTaskAC({ taskId: "2", todolistId: "todolistId2" })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"].length).toBe(2)
})

test("correct tasks should be added to correct array", () => {
  const startState: TasksStateType = { ...mockDataTasks }
  const newTask: DomainTask = newTaskData

  if (newTask) {
    const action = addTaskAC({ task: newTask })
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId1"].length).toBe(4)
    expect(endState["todolistId2"].length).toBe(3)
    expect(endState["todolistId2"][0].title).toBe("0")
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.New)
  }
})

test("status of specified tasks should be changed", () => {
  const startState: TasksStateType = { ...mockDataTasks }
  const newTask: DomainTask = startState["todolistId1"].filter((item) => item.id === "3")[0]
  newTask.status = TaskStatus.Complete
  newTask.id = "3"
  console.log(newTask)
  // const action = updateTaskAC("2", false, "todolistId2")
  const action = updateTaskAC({ task: newTask })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][2].status).toBe(TaskStatus.Complete)
  expect(endState["todolistId1"][2].title).toBe("2")
  expect(endState["todolistId1"][1].status).toBe(TaskStatus.New)
})

test("title of specified tasks should be changed", () => {
  const startState: TasksStateType = { ...mockDataTasks }
  const newTask: DomainTask = startState["todolistId2"].filter((item) => item.id === "1")[0]
  newTask.title = "new"

  const action = updateTaskAC({ task: newTask })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][0].status).toBe(TaskStatus.New)
  expect(endState["todolistId2"][0].title).toBe("new")
  expect(endState["todolistId2"][2].title).toBe("2")
})

test("new array should be added when new todolist is added", () => {
  const startState: TasksStateType = { ...mockDataTasks }
  const newTodo = { ...todolistData, title: "new todo" }
  const action = addTodolistAC({ todolist: newTodo })

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
  const startState: TasksStateType = { ...mockDataTasks }

  const action = removeTodolistAC("todolistId2")

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})
