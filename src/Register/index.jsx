import { useForm } from "react-hook-form";
import { usePost } from "../utils/request";

const objectToFormData = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}

const Register = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { post, loading, result } = usePost()

    const onSubmit = data => {
        const formData = objectToFormData(data)
        post('/register', formData, true);
    }

    if (loading) return <p>loading . . .</p>
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>

        { result && !result.data.success &&
            <p>{result.data.message}</p>
        }

        <input placeholder="name" {...register("name")} />
        <input placeholder="email" {...register("email")} />
        <input placeholder="password" {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
    );
  }

export default Register;