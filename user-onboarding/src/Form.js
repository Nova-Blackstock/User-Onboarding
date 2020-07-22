import React from 'react'

export default function Form(props){
    const {
        values,
        submit,
        inputChange,
        checkboxChange,
        disabled,
        errors,
    } = props

    const onSubmit = evt =>{
        evt.preventDefault()
        submit()
    }

    const onCheckboxChange = evt =>{
        const { name, checked } = evt.target
        checkboxChange(name, checked)
    }

    const onInputChange = evt => {
        const { name, value } = evt.target
        inputChange(name, value)
    }

    return (
        <form className='form-container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Join our Team!</h2>
                <button disabled={disabled}
                    >Submit
                </button>

                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.term}</div>
                    
                </div>

                <div className='form-group inputs'>
                    <h4>Tell us about yourself!</h4>

                    <label className='username input'>Username
                        <input
                            type='text'
                            onChange={onInputChange}
                            name='name'
                            value={values.name}
                        />
                    </label>
                    <label className='email input'>Email
                        <input
                            type='email'
                            onChange={onInputChange}
                            name='email'
                            value={values.email}
                        />
                    </label>
                    <label className='password input'>Password
                        <input
                            type='password'
                            onChange={onInputChange}
                            name='password'
                            value={values.password}
                        />
                    </label>
                    <label className='term of service input'>Do you accept our Terms of Service?
                        <input
                            type='checkbox'
                            name='accept'
                            checked={values.term.accept === true}
                            onChange={onCheckboxChange}
                        />
                    </label>
                </div>
            </div>
        </form>
    )
}