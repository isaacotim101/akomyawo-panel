import React from 'react';
import Swal from 'sweetalert2'

export default function Notifications(props) {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  const route = queryParameters.get("route")
  fetch(`https://african-hearts-api.vercel.app/api/v1/${route}/${id}`, { method: 'DELETE' })
  .then(function (response) {

    Swal.fire(
      'Congragulations!',
      'Congragulations, Deleted successfuly !!',
      'success'
    )
    .then(function() {
      window.location = `/${route}`;
  });
     
    })
  
  return (
      <form >
            
      </form>
  );
}
