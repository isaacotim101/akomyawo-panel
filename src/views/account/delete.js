import React from 'react';

export default function Notifications(props) {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  fetch(`https://african-hearts-api.vercel.app/api/v1/users/${id}`, { method: 'DELETE' })
  .then(function (response) {

        window.location.href = "/";
     
    })
  
  return (
      <form >
            
          </form>
  );
}
