'use client'

import React, { useState } from "react";

import { getUser } from "@componentes/services/users";
import { getLongNameUsers } from "@componentes/util/userUtils";

const getLongNamesPorcentage = (users) => {
    const longNamesUsers = getLongNameUsers(users, 5)
    const percentage = longNamesUsers.length / users.length * 100
    // To fixed sirve para transformar el decimal a (en este caso) solo dos.
    return percentage.toFixed(2)
}

const renderImage = (users) => {
    return users.map((user) => (
        <div>
            <img src={user.avatar} alt="not found avatar" />
        </div>
    ))
}

export default function User () {
    const [users, setUsers] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const prevPage = () => {
        setPage(page - 1)
        setUsers(null)
    }

    const nextPage = () => {
        setPage(page + 1)
        setUsers(null)
    }

    !users && getUser(page)
        .then((obj) => {
            setUsers(obj.data)
            setTotalPages(obj.total_pages)
        })
        .catch((e) => console.error(`${e.name}: ${e.message}`))

    return (
        <div className='grid gap-4 content-center items-center justify-center w-full h-full'>
            <div className='flex justify-center items-center content-center'>
                <button onClick={prevPage} className='p-2 bg-slate-100 hover:bg-gray-500 hover:text-white rounded' disabled={page <= 1}>Prev...</button>
                <span className='mx-2 text-center'>Page {page} of {totalPages}</span>
                <button onClick={nextPage} className='p-2 bg-slate-100 hover:bg-gray-500 hover:text-white rounded' disabled={page >= totalPages}>Next...</button>
            </div>
            <h2 className='text-center text-lg'>{users ? `Long name porcentage: ${getLongNamesPorcentage(users)}%` : 'Waiting for users...'}</h2>
            <h2 className='font-bold text-center'>Users Avatars</h2>
            {users && <div className='grid grid-cols-2 gap-3 h-full w-full justify-between border p-3 bg-white border-gray-300'>{renderImage(users)}</div>}
        </div>
    )
}