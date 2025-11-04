import { useState } from "react";
import registerUserFormSchema from "../model/registerUserFormSchema";

function RegisterForm() {

    const [formErrors, setFormErrors] = useState({
        /* username: "Username is too short" */
    })

    const handleZodErrors = (zodErrors) => {
        for (const err of zodErrors) { // looping through issues
            for (const path of err.path) { // looping through path (["username"])
                setFormErrors(current => {
                    current[path] = err.message
                    return current
                })
            }
        }
    }

    async function registerUser(e) {
        e.preventDefault()
        // reset errors
        setFormErrors({})

        const formData = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value
        }

        const result = registerUserFormSchema.safeParse(formData)


        if (!result.success) {
            console.dir(result.error)
            handleZodErrors(result.error.issues)
            return
        }

        const res = await fetch("http://localhost:8800/api/user", {
            method: "POST",
            body: JSON.stringify(formData)
        });

        if (!res.ok) {
            console.log("Something went wrong")
            return
        }

        console.log("Success")
    }

    return (
        <div>
            <form onSubmit={registerUser} action="">
                <div>
                    <label htmlFor="">Username</label>
                    <input type="text" name="username" />
                    {formErrors.username && <span className="error">{formErrors.username}</span>}
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" />
                    {/* Password doesn't match */}
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div >
    )
}

export default RegisterForm;
