import { 
    ColumnContainer,
    ColumnTitle
} from "./styles"

import { AddNewItem } from "./AddNewItem"

import { useAppState } from "./state/AppStateContext"

import { Card } from "./Card"

import { addTask } from "./state/action"

// type ColumnProps = React.PropsWithChildren<{
//     text: string
// }>

// type ColumnProps = {
//
// text: string;
// } & {
//
// children?: React.ReactNode;
// }

type ColumnProps = {
    text: string,
    id: string
}

export const Column = ({ text, id}: ColumnProps) => {
    const {getTasksByListId, dispatch} = useAppState()

    const tasks = getTasksByListId(id)

    return (
        <ColumnContainer>
            <ColumnTitle>{ text }</ColumnTitle>

            {tasks.map(task => (
                <Card
                    key={task.id}
                    id={task.id}
                    text={task.text}
                />
            ))}

            <AddNewItem
                onAdd={() => dispatch(addTask(text, id))}
                toggleButtonText="+ Add another task"
                dark
            />
        </ColumnContainer>
    )
}