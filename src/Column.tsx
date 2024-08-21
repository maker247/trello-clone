import { useRef } from "react"

import { useDrop } from "react-dnd"

import { useItemDrag } from "./utils/useItemDrag"

import { 
    ColumnContainer,
    ColumnTitle
} from "./styles"

import { AddNewItem } from "./AddNewItem"

import { useAppState } from "./state/AppStateContext"

import { Card } from "./Card"

import { 
    addTask,
    moveList,
    moveTask, 
    setDraggedItem
} from "./state/actions"

import { isHidden } from "./utils/isHidden"

import { DragItem } from "./DragItem"

type ColumnProps = {
    text: string,
    id: string,
    isPreview?: boolean
}

export const Column = ({ text, id, isPreview}: ColumnProps) => {
    const {draggedItem, getTasksByListId, dispatch} = useAppState()

    const tasks = getTasksByListId(id)

    const ref = useRef<HTMLDivElement>(null)

    const {drag} = useItemDrag({
        type: "COLUMN",
        id,
        text
    })

    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover(item: DragItem) {

            // if(item.type === "COLUMN") {
            
            // } else {
            //     if(draggedItem.columnId === id) {
            //         return 
            //     }

            //     if(tasks.length) {
            //         return 
            //     }

            //     dispatch(
            //         moveTask(draggedItem.id, null, draggedItem.columnId, id)
            //     )

            //     dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
            // }

            if(! draggedItem) {
                return
            }

            if(draggedItem.type === "COLUMN") {
                if(draggedItem.id === id) {
                    return
                }

                dispatch(moveList(draggedItem.id, id))
            }
        }
    })

    drag(drop(ref))

    return (
        <ColumnContainer 
            isPreview={isPreview}
            ref={ref}
            isHidden={isHidden(draggedItem, "COLUMN", id)}
        >
            <ColumnTitle>{ text }</ColumnTitle>

            {tasks.map(task => (
                <Card
                    key={task.id}
                    id={task.id}
                    text={task.text}
                    columnId={id}
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