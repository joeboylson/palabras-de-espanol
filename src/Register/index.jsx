import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { objectToFormData, usePost } from "../utils/request";
import './style.scss'

const Register = () => {
    
    const { register, handleSubmit } = useForm();
    const { post, loading, result } = usePost()

    const onSubmit = data => {
        const formData = objectToFormData(data)
        post('/register', formData, true);
    }

    if (loading) return <p>loading . . .</p>

    if (result && result.data.success) return <Redirect to={'/'}/>
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} id="register">

        { result && !result.data.success &&
            <p>{result.data.message}</p>
        }

        <div className='register-input-wrapper'>
          <label htmlFor="name">Name</label>
          <input name="name" {...register("name", { required: true })} />
        </div>

        <div className='register-input-wrapper'>
          <label htmlFor="email">Email</label>
          <input name="email" {...register("email", { required: true })} />
        </div>

        <div className='register-input-wrapper'>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" {...register("password", { required: true })} />
        </div>

        <div className='register-input-wrapper'>
          <input type="submit" />
        </div>

        <Link to="/login">Already registered?</Link>

      </form>
    );
  }

export default Register;