import styled from "styled-components";
import {Tasks} from "./components/Tasks";
import {Button} from "./components/Button";
import {TasksProps} from "./db/initialTasks";
//Почему не работает с синтаксисом ({tasks}: TaskProps)

type TodoListProps = {
	title: string
	taskList: TasksProps[]
	removeTask: (id: number) => void
}

export const Todolist = ({title, taskList, removeTask}: TodoListProps) => {
	return (
		<StyledTodoList>
			<h3>{title}</h3>
			<InputArea>
				<input/>
				<Button>+</Button>
			</InputArea>
			<Tasks tasks={taskList} removeTask={removeTask}/>
			<ButtonGr>
				<Button>All</Button>
				<Button>Active</Button>
				<Button>Completed</Button>
			</ButtonGr>
		</StyledTodoList>
	)
}

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: rgba(27, 24, 212, 0.36);
	width: 240px;
	padding: 10px;
	border-radius: 10px;
	margin: 15px 0 0 0;
	
	&:first-child {
		margin-left: 20px;
	}
`

const ButtonGr = styled.div`
  display: flex;
  gap: 3px;
`

const InputArea = styled.div`
	display: flex;
	justify-content: space-between;
	
`