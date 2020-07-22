import React from 'react'

export default function Friend({user}){
    return (
        <div className='friend container'>
            <h2>{user.name}{user.first_name}</h2>
            <h3>{user.email}</h3>
            <h3>Secret Password: {user.password}</h3>
        </div>
    )
}