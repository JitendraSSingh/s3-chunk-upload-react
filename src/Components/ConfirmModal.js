import React from 'react'

export function ConfirmModal(props) {
    const { message, onConfirm, onCancel } = props
    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='message'>{message}</div>
                <div className='row content-center'>
                    <button onClick={onConfirm} className='btn btn-strech bg-gradient-danger btn-flat'>Yes</button>
                    <button onClick={onCancel} className='btn btn-strech bg-gradient-success btn-flat'>No</button>
                </div>
            </div>
        </div>
    )
}