import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { objectToFormData, usePost } from "../utils/request";
import Input from "../Input";
import Loading from "../Loading";
import './style.scss'

const Register = () => {
    
    const { handleSubmit, control } = useForm();
    const { post, loading, result } = usePost()
    const { push } = useHistory();

    useEffect(() => {
      if (result && result.data.success) push('/')
    }, [result, push])

    const onSubmit = data => {
        const formData = objectToFormData(data)
        post('/register', formData, true);
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} id="register">
        <Loading loading={loading}>
          { result && !result.data.success &&
              <p>{result.data.message}</p>
          }

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange } }) => (
              <Input 
                name="name" 
                placeholder="Name"
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange } }) => (
              <Input 
                name="email" 
                placeholder="Email"
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input 
                name="password" 
                placeholder="Password"
                type="password"
                onChange={onChange}
              />
            )}
          />

          <button type="submit">Register</button>

          <Link to="/login">Already registered?</Link>
        </Loading>
      </form>
    );
  }

export default Register;