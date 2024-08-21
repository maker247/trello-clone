import { 
    createContext,
    useContext,
    FC,
    Dispatch
} from "react"

import {
    Task,
    List,
    AppState,
    appStateReducer
} from "./AppStateReducer"

import { Action } from "./actions"

import { useImmerReducer } from "use-immer"

import { DragItem } from "../DragItem"

type AppStateContextProps = {
    draggedItem: DragItem | null
    lists: List[],
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

const appData: AppState = {
    draggedItem: null,
    lists: [
        {
            id: "0",
            text: "todo",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
}

// use an as operator to make TypeScript think that our empty object actually has AppStateContextProps type

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const useAppState = () => {
    return useContext(AppStateContext)
}

export const AppStateProvider: FC<{children?: React.ReactNode}> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData)

    const {draggedItem, lists} = state

    const getTasksByListId = (id: string) => {
        return lists.find(list => list.id === id)?.tasks || []
    }

    return (
        <AppStateContext.Provider 
            value={{ 
                draggedItem,
                lists,
                getTasksByListId,
                dispatch
            }}
        >
            {children}
        </AppStateContext.Provider>
    )
}