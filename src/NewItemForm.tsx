import {
    // useRef,
    useState
} from "react"

import {
    NewItemFormContainer,
    NewItemButton,
    NewItemInput
} from "./styles"

import { useFocus } from "./utils/useFocus"

type NewItemFormProps = {
    onAdd(text: string): void
}

export const NewItemForm = ({onAdd}: NewItemFormProps) => {
    const InputRef = useFocus()

    // why can't i use useRef()
    // const InputRef = useRef()

    const [text, setText] = useState("")

    const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            onAdd(text)
        }
    }

    return (
        <NewItemFormContainer>
            <NewItemInput 
                ref={InputRef}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyPress={handleAddText}
            />
            <NewItemButton 
                onClick={() => onAdd(text)}
            >
                Create
            </NewItemButton>
        </NewItemFormContainer>
    )
}