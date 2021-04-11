import { useEffect } from "react";
import { useHistory } from "react-router";
import Loading from "../Loading";
import { useRequest } from "../utils/request";

const ProtectedRoute = ({children}) => {
  const {loading, data} = useRequest('/user_is_authorized');
  const { push } = useHistory();

  useEffect(() => {
    if (data && !data.authorized) push('/login') 
  }, [data, push])

  return (
    <Loading loading={loading}>
      { children }
    </Loading>
    );
}

export default ProtectedRoute;