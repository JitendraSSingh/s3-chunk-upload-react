import React from 'react'
import { getUsers, deleteUser } from '../api/api'
import UserList from './UserList'
import Loading from './Loading'
import { ConfirmModal } from './ConfirmModal'

export default class UserListDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: null,
            deleteUserId: null
        }
        this.delUser = this.delUser.bind(this)
        this.delUserConfirm = this.delUserConfirm.bind(this)
        this.cancelUserDelete = this.cancelUserDelete.bind(this)
    }

    componentDidMount() {
        getUsers().then(response => this.setState({
            users: [...response.data]
        }))
    }

    delUser(e, id){
        this.setState({deleteUserId: id})
    }

    delUserConfirm(id){
        deleteUser(id).then(({userDeleted})=>{
            this.setState(({ users }) => (({
                users: users.filter(user => user.id !== id)
            })))
            this.setState({deleteUserId: null})
        })
    }

    cancelUserDelete(){
        this.setState({deleteUserId: null})
    }

    render() {
        return (
            <React.Fragment>
                {this.state.deleteUserId !== null && <ConfirmModal
                    onConfirm={() => this.delUserConfirm(this.state.deleteUserId)}
                    onCancel={this.cancelUserDelete} 
                    message="Are you sure you want to delete the user ?"/>}
                {!this.state.users && <Loading/>}
                {this.state.users && <UserList users={this.state.users} deleteuser={this.delUser} />}
            </React.Fragment>
        )
    }
}