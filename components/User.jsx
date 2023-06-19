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
        <div className=''>
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
        <div>
            <div>
                <button onClick={prevPage} className='border border-purple-500 p-2' disabled={page <= 1}>Prev...</button>
                <span className='mx-2'>Page {page} of {totalPages}</span>
                <button onClick={nextPage} className='border border-purple-500 p-2' disabled={page >= totalPages}>Next...</button>
            </div>
            <h2>{users ? `Long name porcentage: ${getLongNamesPorcentage(users)}%` : 'Waiting for users...'}</h2>
            <h2 className='font-bold'>Users Avatars</h2>
            {users && <div>{renderImage(users)}</div>}
        </div>
    )
}