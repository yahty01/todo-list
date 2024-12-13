import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditableSpan } from "common/components"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"
import { RequestStatus } from "common/types/enums"

type Props = {
  title: string
  id: string
  entityStatus: RequestStatus
}

export const TodolistTitle = (props: Props) => {
  const { title, id, entityStatus } = props
  const dispatch = useAppDispatch()

  const removeTodoList = () => {
    dispatch(removeTodolistTC(id))
  }

  const updateTodoListTitle = (title: string) => {
    dispatch(updateTodolistTitleTC({ id, title }))
  }

  return (
    <>
      <IconButton aria-label="delete" onClick={removeTodoList} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
      <EditableSpan value={title} onChange={updateTodoListTitle} disabled={entityStatus === "loading"} />
    </>
  )
}
