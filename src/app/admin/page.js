"use client"
import React, { useState } from 'react'
import { sendNotificationToAll, sendNotificationToUser } from '../actions';

function AdminPage() {
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    });
    const [sending, setSending] = useState(false);

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function sendTestNotification(e) {
        e.preventDefault();
        setSending(true);
        const data = await sendNotificationToAll(formData);
        setSending(false);
        if (data.success) {
            setFormData({
                title: '',
                body: ''
            });
            alert(JSON.stringify(data))
        } else {
            alert("Error!")
        }
    }
    async function sendTestNotification2(e) {
        e.preventDefault();
        setSending(true);
        const data = await sendNotificationToUser(formData, localStorage.getItem('push-id'));
        setSending(false);
        if (data.success) {
            setFormData({
                title: '',
                body: ''
            });
            alert(JSON.stringify(data))
        } else {
            alert("Error!")
        }
    }

    return (
        <div className='min-h-screen m-10'>
            <h1 className='text-3xl text-center mb-10 '>Admin Panel</h1>
            <div className='rounded-lg shadow-lg shadow-slate-600 md:mx-36 p-5'>
                <h2 className='text-3xl text-center'>Send Notifications</h2>
                <form className='flex flex-col justify-center items-center my-10 gap-5'>
                    <div>
                        <label className='text-xl'>Title</label>
                        <input type='text' name='title' value={formData.title} onChange={handleInput} className='text-xl bg-transparent text-white outline-none border-b-2 border-white p-2 mx-4'></input>
                    </div>
                    <div>
                        <label className='text-xl'>Body</label>
                        <input type='text' name='body' value={formData.body} onChange={handleInput} className='text-xl bg-transparent text-white outline-none border-b-2 border-white p-2 mx-4'></input>
                    </div>
                    <div>
                        <button disabled={sending} onClick={sendTestNotification} className='bg-slate-900 hover:bg-slate-800 rounded-md m-2 p-2'>
                            {
                                sending ? 'Sending...' : 'Send Notification'
                            }
                        </button>
                        <button disabled={sending} onClick={sendTestNotification2} className='bg-slate-900 hover:bg-slate-800 rounded-md m-2 p-2'>
                            {
                                sending ? 'Sending...' : 'Send Notification'
                            }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AdminPage