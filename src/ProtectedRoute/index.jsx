import { Redirect } from "react-router";
import { useRequest } from "../utils/request";

const ProtectedRoute = ({children}) => {
  const {loading, result} = useRequest('/user_is_authorized');
  if (loading) return <p>Loading . . .</p>;
  return result.data.authorized ? children : <Redirect to="/login"/>;
}

export default ProtectedRoute;