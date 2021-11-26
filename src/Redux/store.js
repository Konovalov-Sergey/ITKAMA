import dialogReducer from "./dialog-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'It`s my first post', likesCount: 0},
                {id: 2, message: 'How are you IT?', likesCount: 5},
                {id: 3, message: 'Thanks I am fine', likesCount: 10},
            ],
            newPostText: "IT-Kamasutra",   
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Andrey'},
                {id: 2, name: 'Miha'},
                {id: 3, name: 'Serg'},
                {id: 4, name: 'Tohich'},
                {id: 5, name: 'Dymuch'},
            ],
            messages: [
                {id: 1, text: 'hello world'},
                {id: 2, text: 'hi'},
                {id: 3, text: 'how is your ITKamasutra'},
                {id: 4, text: 'yo'},
                {id: 5, text: 'power'},
            ],
            newMessageBody: '',  
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('state was changed');
    },
    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber();
    }
};

export default store;

window.store = store;