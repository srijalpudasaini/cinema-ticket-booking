import React, { useState } from 'react'
import Modal from '../../components/Modal';
import axios from 'axios';
import Scanner from '../../components/Scanner';
import Cookies from 'js-cookie'

const Scan = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [message, setMessage] = useState('')
    const handleScanSuccess = async (decodedText) => {
        try {
            const res = await axios.post('http://localhost:8000/api/verify-ticket', { qr_token: decodedText },{
                headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }
            });
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Verification failed");
        }
        finally{
            setModalOpen(true)
        }
    };
    return (
        <>
            {modalOpen &&
                <Modal setOpen={setModalOpen} message={message} />
            }
            <Scanner onScanSuccess={handleScanSuccess}/>
        </>
    )
}

export default Scan