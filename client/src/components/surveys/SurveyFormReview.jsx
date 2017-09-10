import React from 'react';
import {connect} from 'react-redux';
import formFields from'./FormFields'
import {submitSurvey} from '../../actions'
import {withRouter} from 'react-router-dom'

const SurveyFormReview = ({onCancel,formValues,submitSurvey,history})=>{

    function renderField(){
        return(
            <div>
                {formFields.map(({label,name})=>{
                return(
                        <div key={name}>
                            <label>{label}</label>
                            <h5>{formValues[name]}</h5>
                        </div>
                    )
                })}
            </div>
        )
    }
   
    return(
        <div>
            <h3>Please Confirm Your Entires</h3>
            {renderField()}
            <button className="yellow darken-3 btn-flat white-text " onClick={onCancel}>Cancel</button>
            <button onClick={()=>{submitSurvey(formValues,history)}} className="btn-flat white-text teal right">Send Survey <i className="material-icons right">email</i></button>
        </div>
    )
}

function mapStateToProps(state){
    return{formValues:state.form.surveyForm.values} 
}

export default connect(mapStateToProps,{submitSurvey})(withRouter(SurveyFormReview));