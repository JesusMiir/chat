// @ts-check
import React, { useState, useTransition } from 'react'

/**
 * @typedef ZodFormInit
 * @property {import('zod').Schema} zodSchema
 * @property {(data: any) => void | Promise<void>} onSubmit
 */

/**
 * @param {ZodFormInit} init
 */
export default function useZodForm(init) {

    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, startSubmission] = useTransition()
    const hasErrors = Object.keys(formErrors).length > 0;

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

    async function handleSubmit(e) {
        e.preventDefault()
        if (isSubmitting) return

        startSubmission(async () => {
            // reset errors
            setFormErrors({})

            const formData = {
                username: e.currentTarget.username.value,
                password: e.currentTarget.password.value
            }

            const result = init.zodSchema.safeParse(formData)


            if (!result.success) {
                console.dir(result.error)
                handleZodErrors(result.error.issues)
                return
            }

            init.onSubmit(result.data)
        })
    }

    const Form = ({ children }) => {
        return <form onSubmit={handleSubmit}>
            {children}
        </form>
    }

    return {
        Form,
        errors: formErrors,
        hasErrors,
        isSubmitting
    }
}
