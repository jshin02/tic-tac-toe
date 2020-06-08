// This page contains all api calls and database interactions
'use strict'
const config = require('./config')
const store = require('./store')
const signUp = formData => {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl+'/sign-up',
    data: formData
    // {
    //   credentials:{
    //     email: formData.credentials.email,
    //     password: formData.credentials.password,
    //     password_confirmation: formData.credentials.password_confirmation
    //   }
    // }
  })
}

const signIn = formData => {
  console.log(formData);
  return $.ajax({
    method: 'POST',
    url: config.apiUrl+'/sign-in',
    data: formData
    // {
    //   credentials:{
    //     email: formData.credentials.email,
    //     password: formData.credentials.password
    //   }
    // }
  })
}

const pwChange = formData => {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl+'/change-password',
    headers:{
      Authorization: "Token token="+store.user.token
    },
    data: formData
    // {
    //   passwords:{
    //     old: formData.passwords.old,
    //     new: formData.passwords.new
    //   }
    // }
  })
}

const signOut = () => {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl+'/sign-out',
    headers:{
      Authorization: "Token token="+store.user.token
    }
  })
}
module.exports = {
  signUp,
  signIn,
  pwChange,
  signOut
}
