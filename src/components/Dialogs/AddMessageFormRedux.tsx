import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea } from "../Common/FormsControls/FormsControls";

const maxLength30 = maxLengthCreator(30);

type AddMessageFormValuesType = {
    newMessageBody: string
}

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormValuesType>> = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field component = {Textarea} 
                        validate = {[required, maxLength30]}
                        name = {'newMessageBody'} 
                        placeholder = {"enter your message"}/>
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<AddMessageFormValuesType>({form: 'dialog-add-message-form'})(AddMessageForm);

export default AddMessageFormRedux;