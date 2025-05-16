import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Hero from './Hero';

function PublicHome() {
 const authStatus = useSelector(state => state.auth.status);
 if (authStatus) {
  return <Navigate to='/home' replace />
 }
  return <Hero/>
}

export default PublicHome
