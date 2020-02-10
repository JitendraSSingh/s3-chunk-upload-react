import React from 'react'
import { Link } from "react-router-dom"


function Error(props){
    return(
        <div className='text-danger mb-8 mt--12'>{props.children}</div>
    )
}

export default class UserEdit extends React.Component {

    render() {
        let { user, onChange, onSubmit, moveToStep, errors, displayForms } = this.props

        return (
            <div className='user-edit'>
                
                <form className='user-edit-form card' onSubmit={onSubmit}>
                <div className="steps-container">
                    <button type="button" className="step" onClick={() => moveToStep(0)}>
                        Details
                    </button>
                    <button type="button" className="step" onClick={() => moveToStep(1)}>
                        Preferences
                    </button>
                    <button type="button" className="step" onClick={() => moveToStep(2)}>
                        Payment Details
                    </button>
                </div>
                    <div className={displayForms[0] ? 'show' : 'hide'}>
                        <h1 className='form-heading mb-8'>Details</h1>
                        <div className='form-input-container'>
                            <label htmlFor='firstName' className='form-label'>
                                First Name
                        </label>
                            <input
                                className='form-input'
                                onChange={onChange}
                                type='text'
                                name='firstName'
                                id='firstName'
                                value={user.firstName} />
                        {errors[0] && errors[0].firstName && <Error>{errors[0].firstName}</Error> }
                        </div>
                        <div className='form-input-container'>
                            <label htmlFor='lastName' className='form-label'>
                                Last Name
                        </label>
                            <input
                                className='form-input'
                                onChange={onChange}
                                type='text'
                                name='lastName'
                                id='lastName'
                                value={user.lastName} />
                        {errors[0] && errors[0].lastName && <Error>{errors[0].lastName}</Error> }
                        </div>
                        <div className='form-input-container'>
                            <label htmlFor='email' className='form-label'>
                                Email
                        </label>
                            <input
                                className='form-input'
                                onChange={onChange}
                                type='email'
                                name='email'
                                id='email'
                                value={user.email} />
                        {errors[0] && errors[0].email && <Error>{errors[0].email}</Error> }
                        </div>
                        <div className='form-input-container'>
                            <label htmlFor='phone' className='form-label'>
                                Phone
                        </label>
                            <input
                                className='form-input'
                                onChange={onChange}
                                type='text'
                                name='phone'
                                id='phone'
                                value={user.phone} />
                        </div>
                        <div>
                            <button className='btn bg-gradient-primary mr-8'>{user.id ? 'Update' : 'Add'}</button>
                            <Link
                                to={`/users`}
                                className='btn bg-gradient-secondary'>
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className={displayForms[1] ? 'show' : 'hide'}>
                        <h1 className='form-heading mb-8'>Preferences</h1>
                        <div className='form-input-container'>
                            <label htmlFor='firstName' className='form-label'>
                                Preferences
                        </label>
                            <input
                                className='form-input'
                                onChange={onChange}
                                type='text'
                                name='preferences'
                                id='preferences'
                                value={user.preferences} />
                            {errors[1] && errors[1].preferences && <Error>{errors[1].preferences}</Error> }
                        </div>
                    </div>
                    <div className={displayForms[2] ? 'show' : 'hide'}>
                    <h1 className='form-heading mb-8'>Payment Details</h1>
                    </div>
                </form>
            </div>
        )
    }
}