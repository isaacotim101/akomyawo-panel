import React from 'react';
import toast from 'react-hot-toast'

export default function Notifications(props) {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  const route = queryParameters.get("route")

  fetch(`https://african-hearts-api.vercel.app/api/v1/${route}/${id}`, { method: 'DELETE' })
  .then(function (response) {

    toast.success('Deleted successfully')
    window.location = "/";

    })
  
  return (
      <form >
            
      </form>
  );
}
