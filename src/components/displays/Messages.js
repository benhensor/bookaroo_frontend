import React from 'react'
import styled from 'styled-components'
import { useDashboard } from '../../context/DashboardContext'

export default function Messages() {

  const { activePage, handlePageChange } = useDashboard()
  return (
    <div>Messages</div>
  )
}
