import { useDragLayer } from "react-dnd"

import { Column } from "./Column"

import { 
    CustomDragLayerContainer,
    DragPreviewWrapper
} from "./styles"

import { useAppState } from "./state/AppStateContext"

import { Card } from "./Card"

export const CustomDragLayer = () => {
    const { draggedItem } = useAppState()

    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset()
    }))

    return draggedItem && currentOffset ? (
        <DragPreviewWrapper position={currentOffset}>
            <CustomDragLayerContainer>
                {draggedItem.type === "COLUMN" ? (
                    <Column 
                        id={draggedItem.id}
                        text={draggedItem.text}
                        isPreview
                    />
                ) : (
                    <Card 
                        columnId={draggedItem.columnId}
                        isPreview
                        id={draggedItem.id}
                        text={draggedItem.text}
                    />
                )}
            </CustomDragLayerContainer>
        </DragPreviewWrapper>
    ) : null
}