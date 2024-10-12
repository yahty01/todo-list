import {ChangeEvent, KeyboardEvent, useState} from "react";
import {StyledInput, StyledSpan} from "./EditableSpan.styled";


type EditableSpanProps = {
	value: string
	onChange: (newValue: string) => void
}

export function EditableSpan({value, onChange}: EditableSpanProps) {
	const [editableMode, setEditableMode] = useState<boolean>(false)
	const [inputItemText, setInputItemText] = useState(value);


	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInputItemText(e.target.value)
	}

	const exitEditableMod = () => {
		if (inputItemText.trim().length !== 0) {
			onChange(inputItemText)
			setInputItemText(inputItemText.trim())
		}
		setEditableMode(false)
	}

	const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (inputItemText.trim().length !== 0) {
				onChange(inputItemText)
				setInputItemText(inputItemText.trim())
			}
			setEditableMode(false)
		}
	}


	return editableMode
		? <StyledInput onChange={onChangeHandler}
		               fullWidth
		               variant="filled"
		               size={'small'}
		               onBlur={exitEditableMod}
		               autoFocus={true}
		               onKeyUp={addItemOnKeyUpHandler}
		               value={inputItemText}
		/>
		: <StyledSpan onDoubleClick={() => setEditableMode(true)}>{value}</StyledSpan>
}
