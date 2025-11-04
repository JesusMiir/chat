import { useEffect, useState } from "react"
import useBackendFetch from "../hooks/useBackendFetch";

function UsersList() {
    const usersFetch = useBackendFetch({
        url: "/api/user",
        initialData: []
    })

    if (usersFetch.isLoading) return <p>Loading...</p>

    if (usersFetch.error) return <p>Error: {error}</p>

    return (
        <div>
            <ul>
                {users.map((u) => {
                    return <li key={u.username}>{u.username}</li>
                })}
            </ul>
        </div>
    )
}

export default UsersList
