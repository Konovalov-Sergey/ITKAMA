const SEND_MESSAGE = 'SEND-MESSAGE';

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

type ActionTypes = SendMessageActionCreatorType

const dialogReducer = (state = initialState, action:ActionTypes):InitialStateType => {
 
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 16, message: body}]
            };           
        default:
            return state;
    }
};

type SendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageActionCreator = (newMessageBody:string):SendMessageActionCreatorType => {
    return {type: SEND_MESSAGE, newMessageBody}
};


export default dialogReducer;