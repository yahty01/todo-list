import React from 'react';
import styled from "styled-components";
import {useTasks} from "./hooks/useTasks";
import {useTodoLists} from "./hooks/useTodoLists";
import Todolist from "./TodoList";

function App() {
	const {removeTask, addTask, changeStatus, allTodoTasks} = useTasks();
	const {todoLists, changeTodoFilter} = useTodoLists();

	return (
		<StyledApp className="App">
			<Container>
				{
					todoLists.map(el => {
							let tasksForFilter = allTodoTasks[el.id]

							if (el.filter === 'active') {
								tasksForFilter = tasksForFilter.filter(task => !task.isDone)
							}
							if (el.filter === 'completed') {
								tasksForFilter = tasksForFilter.filter(task => task.isDone)
							}

							return <Todolist key={el.id}
							                 todolistId={el.id}
							                 title={el.title}
							                 tasksList={tasksForFilter}
							                 removeTask={removeTask}
							                 changeFilter={changeTodoFilter}
							                 addTask={addTask}
							                 changeStatus={changeStatus}
							                 filter={el.filter}
							/>
						}
					)

				}
			</Container>

		</StyledApp>
	)

}

export default App;

const StyledApp = styled.div`
  justify-content: center;
  align-items: center;
	flex-wrap: wrap;
  min-height: 100vh;
  width: 80vw;
	margin: 0 auto;
`

export const Container = styled.div`
	padding: 30px;
	margin-top: 10vh;
  background-color: #FFFFFF;
  width: 80vw;
  min-height: 80vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
	border-radius: 20px;
`