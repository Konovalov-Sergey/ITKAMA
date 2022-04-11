import { InferActionsTypes } from './redux-store';

type DialogType = {
    id: number,
    name: string
};

type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Andrey'},
        {id: 2, name: 'Miha'},
        {id: 3, name: 'Serg'},
        {id: 4, name: 'Tohich'},
        {id: 5, name: 'Dymuch'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'hello world'},
        {id: 2, message: 'hi'},
        {id: 3, message: 'how is your ITKamasutra'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'power'},
    ] as Array<MessageType>
};

export type InitialStateType = typeof initialState

const dialogReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
 
    switch (action.type) {
        case 'SN/DIALOG/SEND_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 16, message: body}]
            };           
        default:
            return state;
    }
};
//actionCreators
type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    sendMessageActionCreator: (newMessageBody:string) => ({type: 'SN/DIALOG/SEND_MESSAGE', newMessageBody} as const)
}

export default dialogReducer;