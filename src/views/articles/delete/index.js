import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Notifications() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get('id');
    const route = queryParameters.get('route');

    if (!id || !route) {
      toast.error('Missing delete parameters');
      navigate('/articles');
      return;
    }

    fetch(`https://ako-api.vercel.app/${route}/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        toast.success('Deleted successfully');
        navigate('/articles');
      })
      .catch(error => {
        console.error('Delete error:', error);
        toast.error('Unable to delete article');
        navigate('/articles');
      });
  }, [navigate]);

  return null;
}
