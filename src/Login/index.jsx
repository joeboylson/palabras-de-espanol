import { useForm } from "react-hook-form";

// components
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

// utils
import { objectToFormData, usePost } from "../utils/request";

// styles
import './style.scss'

const Login = () => {
    
  const { register, handleSubmit } = useForm();
  const { post, loading, result } = usePost()

  const onSubmit = data => {
    const formData = objectToFormData(data)
    post('/login', formData, true);
  }

  if (loading) return <p>loading . . .</p>

  if (result && result.data.success) return <Redirect to={'/'}/>
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="login">

      { result && !result.data.success &&
        <p>{result.data.message}</p>
      }

      <div className='login-input-wrapper'>
        <label htmlFor="email">Email</label>
        <input name="email" {...register("email", { required: true })} />
      </div>

      <div className='login-input-wrapper'>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" {...register("password", { required: true })} />
      </div>

      <div className='login-input-wrapper'>
        <input type="submit" />
      </div>

      <Link to="/register">Register</Link>
    </form>
  );
}

export default Login;