import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { usePost } from "../utils/request";

const objectToFormData = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}

const Login = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { post, loading, result } = usePost()

    const onSubmit = data => {
        const formData = objectToFormData(data)
        post('/login', formData, true);
    }

    if (loading) return <p>loading . . .</p>

    if (result && result.data.success) return <Redirect to={'/'}/>
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>

        { result && !result.data.success &&
            <p>{result.data.message}</p>
        }

        <input {...register("email")} />
        <input {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
    );
  }

export default Login;