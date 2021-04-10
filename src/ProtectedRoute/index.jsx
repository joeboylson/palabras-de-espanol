import { Redirect } from "react-router";
import { useRequest } from "../utils/request";

const ProtectedRoute = ({children}) => {
  const {loading, data} = useRequest('/user_is_authorized');

  if (loading) return <p>Loading . . .</p>;
  return (data && data.authorized) ? children : <Redirect to="/login"/>;
}

export default ProtectedRoute;