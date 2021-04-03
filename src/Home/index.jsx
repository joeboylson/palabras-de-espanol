import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { usePost, useRequest } from "../utils/request";

const objectToFormData = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}

const Home = () => {

    const {loading, data} = useRequest('/profile')

    if (loading) return <p>loading . . .</p>
  
    return (
      <div>
          { JSON.stringify(data.profile) }
      </div>
    );
  }

export default Home;