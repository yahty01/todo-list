import React from 'react';
import {useTasks} from "./hooks/useTasks";
import {useTodoLists} from "./hooks/useTodoLists";
import Todolist from "./TodoList";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Unstable_Grid2'

export const theme = createTheme({
	palette: {
		primary: {
			light: 'rgba(143,146,238,0.59)',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
});

function App() {


	const {removeTask, addTask, changeStatus, allTodoTasks, addEmptyTaskList, changeTitle} = useTasks();

	const {todoLists, changeTodoFilter, addTodo, removeTodo, updateTodoList} = useTodoLists(addEmptyTaskList);

	const TodoLists = todoLists.map(el => {
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
			                 removeTodo={removeTodo}
			                 updateTask={changeTitle}
			                 updateTodoList={updateTodoList}
			/>
		}
	)


	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Container fixed>
					<AppBar position="static">
						<Toolbar>
							<IconButton color="inherit">
								<MenuIcon/>
							</IconButton>
							<Button color="inherit">Login</Button>
						</Toolbar>
					</AppBar>
					<Container>
						<Grid container>
							<AddItemForm addItem={addTodo}/>
						</Grid>
						<Grid container spacing={4}>
							{TodoLists}
						</Grid>
					</Container>
				</Container>
			</div>
		</ThemeProvider>
	)

}

export default App;