import React from 'react';
import Swal from 'sweetalert2'

export default function Notifications(props) {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  fetch(`https://african-hearts-api.vercel.app/api/v1/products/${id}`, { method: 'DELETE' })
  .then(function (response) {

    Swal.fire(
      'Congragulations!',
      'Congragulations, Product Deleted successfuly !!',
      'success'
    )
    .then(function() {
      window.location = "/stock";
  });
     
    })
  
  return (
      <form >
            
      </form>
  );
}
