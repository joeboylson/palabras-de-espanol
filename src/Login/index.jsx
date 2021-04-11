import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Input from "../Input";
import Loading from "../Loading";

// utils
import { objectToFormData, usePost } from "../utils/request";

// styles
import './style.scss'

const Login = () => {
    
  const { handleSubmit, control } = useForm();
  const { post, loading, result } = usePost();
  const { push } = useHistory();

  useEffect(() => {
    if (result && result.data.success) push('/');
  }, [result, push])

  const onSubmit = data => {
    const formData = objectToFormData(data)
    post('/login', formData, true);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="login">
      <Loading loading={loading}>
        { result && !result.data.success &&
          <p>{result.data.message}</p>
        }

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

        <button>Login</button>

        <Link to="/register">Register</Link>
      </Loading>
    </form>
  );
}

export default Login;