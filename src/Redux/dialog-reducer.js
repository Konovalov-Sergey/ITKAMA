const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Andrey'},
        {id: 2, name: 'Miha'},
        {id: 3, name: 'Serg'},
        {id: 4, name: 'Tohich'},
        {id: 5, name: 'Dymuch'},
    ],
    messages: [
        {id: 1, message: 'hello world'},
        {id: 2, message: 'hi'},
        {id: 3, message: 'how is your ITKamasutra'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'power'},
    ]
}

const dialogReducer = (state = initialState, action) => {
 
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

export const sendMessageActionCreator = (newMessageBody) => {
    return {type: SEND_MESSAGE, newMessageBody}
};


export default dialogReducer;