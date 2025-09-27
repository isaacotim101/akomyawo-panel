import React from 'react';
import toast from 'react-hot-toast'

export default function Notifications(props) {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  const route = queryParameters.get("route")

  fetch(`https://ako-api.vercel.app/${route}/${id}`, { method: 'DELETE' })
  .then(function (response) {

    toast.success('Deleted successfully')
    window.location = "/dashboard/home";

    })
  
  return (
      <form >
            
      </form>
  );
}
