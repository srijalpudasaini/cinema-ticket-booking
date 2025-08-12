import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Loader from '../../../components/Loader'
import Cookies from 'js-cookie'
import DeleteModal from '../../../components/DeleteModal'


const Users = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const token = Cookies.get('token')

    useEffect(() => {
        axios.get('http://localhost:8000/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setUsers(res.data.users)
                setLoading(false)
            })
    }, [])
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [id, setId] = useState(null)
    const handleDelete = (id) => {
        setId(id)
        setDeleteModalOpen(true)
    }
    return (
        <>
            {deleteModalOpen &&
                <DeleteModal model={'user'} id={id} setOpen={setDeleteModalOpen} setData={setUsers} />
            }
            <h2 className='text-2xl font-medium text-center mb-3'>Users</h2>
            <div className="text-end mb-4">
                <Link to='/admin/user/add' className='py-1 px-2 text-black bg-main'> + Add User</Link>
            </div>
            <div className="overflow-auto p-8 mx-auto rounded-lg shadow-sm shadow-current text-sm text-gray-300">
                <table className='table-striped w-full text-nowrap'>
                    <tr className='bg-main text-black'>
                        <td>S.N.</td>
                        <td>User Name</td>
                        <td>Email</td>
                        <td>Contact</td>
                        <td>Action</td>
                    </tr>
                    {
                        loading ? <Loader /> :
                            users && users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td className='flex gap-4 justify-center'>
                                        <Link to={`/admin/user/view/${user.id}`}>
                                            <FontAwesomeIcon icon={faEye} className='text-blue-600' size='xl' />
                                        </Link>
                                        <Link to={`/admin/user/delete/${user.id}`}>
                                            <FontAwesomeIcon icon={faTrash} className='text-red-600 cursor-pointer' size='xl' onClick={() => handleDelete(user.id)} />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                    }
                </table>
            </div >
        </>
    )
}

export default Users