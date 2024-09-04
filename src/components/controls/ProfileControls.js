import React from 'react'
import { useAuth } from '../../context/AuthContext'

export default function ProfileControls() {

  const { user } = useAuth()

  return (
    <section>
      <p>Welcome {user.username}!</p>
      <p>What would you like to do?</p>
    </section>
  )
}