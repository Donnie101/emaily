import React,{Component} from 'react';
import {reduxForm,Field} from 'redux-form';
import SurveyField from './SurveyField';
import {Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import FIELDS from'./FormFields'

class SurveyForm extends Component{

    renderFields(){
        return(
            <div>
                {FIELDS.map(({name,label})=>{
                    return <Field key={name} label={label} type="text" name={name} component={SurveyField}/>
                })}                
            </div>
        )
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <button  className=" btn-flat white-text teal right" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                    <Link to="/surveys" className="red btn-flat white-text " type="submit">Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate(values){
    
    const errors = {};

    if(values.recipients)
        errors.recipients = validateEmails(values.recipients || '');

    FIELDS.forEach(({name})=>{
        if(!values[name])
            errors[name] = `You must provide the ${name}`
    });
    
    return errors;
}

export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount:false
})(SurveyForm);
