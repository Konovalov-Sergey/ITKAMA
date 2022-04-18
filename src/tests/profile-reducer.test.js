import React from "react";
import profileReducer, {actions} from "../Redux/profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'It`s my first post', likesCount: 0},
        {id: 2, message: 'How are you IT?', likesCount: 5},
        {id: 3, message: 'Thanks I am fine', likesCount: 10},
    ]
}

it('length of posts should be incremented', ()=> {
    //1.test data
    let action = actions.addPostActionCreator('addNewPost');

    //2.action
    let newState = profileReducer(state, action);

    //3.expectation
    expect(newState.posts.length).toBe(4)
})

it('text of posts should be correct', ()=> {
    //1.test data
    let action = actions.addPostActionCreator('addNewPost');
        
    //2.action
    let newState = profileReducer(state, action);

    //3.expectation
    expect(newState.posts[3].message).toBe('addNewPost')
})

