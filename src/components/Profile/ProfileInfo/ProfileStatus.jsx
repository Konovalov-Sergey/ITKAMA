import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode:false,
        status: this.props.status
    }

    activateEditMode = () => {
       this.setState({editMode:true})
    }

    deactivatedEditMode = () => {
        this.setState({editMode:false});
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState ({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.editMode
                    ?<div>
                        <input onBlur = {this.deactivatedEditMode}
                               value = {this.state.status} type="text"
                               autoFocus = {true}
                               onChange = {this.onStatusChange}
                        />
                    </div>
                    :<div> 
                        <span onDoubleClick = {this.activateEditMode}> {this.props.status} </span>
                    </div>
                }             
            </div>        
        )
    }
    
}

export default ProfileStatus;