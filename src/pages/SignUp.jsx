import { Grid, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button'
import UserRoles from '../lib/constants/common'
import signUp from '../store/auth/auth.thunk'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async ({ email, name, password }) => {
        try {
            const data = {
                email,
                name,
                password,
                role: UserRoles.ADMIN,
            }
            await dispatch(signUp(data)).unwrap()
            navigate('/signin')
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: submitHandler,
    })

    const { values, handleChange, handleSubmit } = formik

    return (
        <MainGrid>
            <GridContainer>
                <form onSubmit={handleSubmit}>
                    <FormGrid>
                        <TextField
                            value={values.name}
                            onChange={handleChange}
                            label="Name"
                            name="name"
                            type="text"
                        />
                        <TextField
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                            label="Email"
                        />
                        <TextField
                            value={values.password}
                            onChange={handleChange}
                            name="password"
                            label="Password"
                        />
                        <TextField
                            value={values.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            label="Confirm Password"
                        />
                        <Button type="submit">Sign up</Button>
                        <Link to="/signin">Have an account</Link>
                    </FormGrid>
                </form>
            </GridContainer>
        </MainGrid>
    )
}

export default SignUp

const MainGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '200px',
}))

const GridContainer = styled(Grid)(() => ({
    background: '#f57927',
    borderRadius: '9px',
    width: '500px',
    padding: '20px',
}))

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
}))
