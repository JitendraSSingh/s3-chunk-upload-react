import React from 'react'
import { getUser, updateUser, addUser } from '../api/api'
import { isEmpty } from '../helper/helper'
import UserEdit from './UserEdit'
import Loading from './Loading'

const validationRules = {
    0:{
        firstName: ['required'],
        email: ['required'],
        lastName: ['required']
    },
    1:{
        preferences: ['required']
    }
}

export default class UserEditDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                preferences: ''
            },
            loading: true,
            currentStep: 0,
            errors:{
                0: null,
                1: null,
                2: null
            },
            displayForms:{
                0:true,
                1:false,
                2:false
            }
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.moveToStep = this.moveToStep.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.validateFormStep0 = this.validateFormStep0.bind(this)
        this.validateFormStep1 = this.validateFormStep1.bind(this)
        this.validateFormStep2 = this.validateFormStep2.bind(this)
    }

    moveToStep(stepNumber){
        if(stepNumber > this.state.currentStep){
            //validate the Last step form
            console.log('validate form', 'To step : ' + stepNumber, 'Last step : ' + this.state.currentStep)
            
            this.validateForm(stepNumber)
        } else if(stepNumber < this.state.currentStep){
            console.log('not-validate form', 'To step : ' + stepNumber, 'Last step : ' + this.state.currentStep)
            this.setState({
                currentStep: stepNumber
            })
            this.switchForm(stepNumber)
        }
    }

    validateForm(stepNumber){
        
        switch(stepNumber){
            case 0:
                this.validateFormStep0(stepNumber)
                break
            case 1:
                this.validateFormStep1(stepNumber)
                break
            case 2:
                this.validateFormStep2(stepNumber)
                break
            default:
                this.validateFormStep0(0)
        }
    }

    switchForm(stepNumber){
        this.setState((prevState, props) => {
            let displayForms = prevState.displayForms
            for(var key in displayForms ){
                console.log(key)
                if(displayForms.hasOwnProperty(key)){
                    console.log( typeof key)
                    parseInt(key) === stepNumber ? displayForms[key] = true : displayForms[key] = false
                }
            }
            return {
                displayForms: displayForms
            }
        })
    }

    componentDidMount() {
        const { id } = this.props.match.params
        if (id) {
            getUser(id).then(response => this.setState({
                user: response.data,
                loading: false
            })).catch(e => console.log(e))
        } else {
            this.setState({
                loading: false
            })
        }
    }

    onChange(e) {
        let name = e.target.name
        let value = e.target.value
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }))
    }

    validateFormStep0(stepNumber){
        console.log(stepNumber)
        this.setState({
            currentStep: stepNumber
        })
    }

    validateFormStep1(stepNumber){
        console.log(stepNumber)
        let validationErrorObj = {}

        if(validationRules[0].firstName.indexOf('required') !== -1){
            if(this.state.user.firstName === ''){
                validationErrorObj.firstName = 'First Name is Required'
            }
        }
        if(validationRules[0].lastName.indexOf('required') !== -1){
            if(this.state.user.lastName === ''){
                validationErrorObj.lastName = 'Last Name is Required'
            }
        }
        if(validationRules[0].email.indexOf('required') !== -1){
            if(this.state.user.email === ''){
                validationErrorObj.email = 'Email is Required'
            }
        }
        console.log(validationErrorObj)
        if(!isEmpty(validationErrorObj)){
            this.setState((state, props) => ({
                errors: {
                    0: validationErrorObj
                }
            }))
            
        } else {
            this.setState({
                currentStep: stepNumber,
                errors: {
                    0: null
                }
            })
            this.switchForm(stepNumber)
        }
    }

    validateFormStep2(stepNumber){
        console.log(stepNumber)
        this.validateFormStep1(1)
        let validationErrorObj = {}

        if(validationRules[1].preferences.indexOf('required') !== -1){
            if(this.state.user.preferences === ''){
                validationErrorObj.preferences = 'Preferences is Required'
            }
        }
        
        console.log(validationErrorObj)
        if(!isEmpty(validationErrorObj) || !isEmpty(this.state.errors)){
            this.setState((state, props) => ({
                errors: {
                    0: state.errors[0],
                    1: validationErrorObj
                }
            }))
            
        } else {
            this.setState({
                currentStep: stepNumber,
                errors: {
                    0: null,
                    1: null
                }
            })
            this.switchForm(stepNumber)
        }
    }

    onSubmit(e) {
        e.preventDefault()
        
        if (this.state.user.id !== '') {
            updateUser(this.state.user)
        } else {
            addUser(this.state.user).then((response) => {
                this.setState((prevState, props) => {
                    let user = prevState.user
                    user.id = response.id
                    return {
                        user: user
                    }
                })
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading && <Loading/>}
                {!this.state.loading &&<UserEdit
                    displayForms={this.state.displayForms}
                    moveToStep={this.moveToStep}
                    onChange={(e) => this.onChange(e)} user={this.state.user}
                    onSubmit={(e) => this.onSubmit(e)}
                    errors={this.state.errors}
                />}
            </React.Fragment>
        )
    }
}