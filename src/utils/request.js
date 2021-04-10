import axios from 'axios';
import { useEffect, useState } from 'react';

export const objectToFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

export const useRequest = (url) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  const doFetch = () => {
    setLoading(true);
    axios.get(url)
    .then(result => {
      setResult(result)
    })
    .finally(() => {
      setLoading(false);
    })
  }
  
  useEffect(doFetch, [url])

  const _result = result ? {
    data: result.data,
    code: result.status
  } : null;

  return {loading, ..._result, refetch: doFetch}
};

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const post = (url, data, asFormData=false) => {

    const headers = asFormData ? { "Content-Type": "multipart/form-data" } : null;
    setLoading(true);
    
    axios({
      method: 'POST',
      url, 
      data,
      headers
    })
    .then(result => {
      setResult(result)
    })
    .finally(() => {
      setLoading(false);
    })
  };

  const _result = result ? {
    data: result.data,
    code: result.status
  } : null;

  return {post, loading, result: _result}
}

