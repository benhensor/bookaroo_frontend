import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function LinkButton({ text, to, onClick}) {

  const noBackgroundTypes = ['Sign In', 'Register', 'Return', 'Browse', 'New Listing', 'Done', 'Sign Out', 'Back', 'Add New', 'View All']
  const noBackground = noBackgroundTypes.includes(text)
  const dashboardButtons = text === 'BROWSE' || text === 'NEW LISTING'
  const signOut = text === 'Sign Out'

  const handleClick = (event) => {
		if (onClick) {
			onClick(event)
		}
	}

  return (
    <StyledLink
      to={to}
      onClick={handleClick}
      $noBackground={noBackground}
      $dashboardButtons={dashboardButtons}
      $signOut={signOut}
    >
      {text}
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  background-color: ${props => props.$noBackground ? 'transparent' : 'var(--accentGreen)'};
  color: ${props => props.$signOut ? 'var(--dangerDk)' : (props.$dashboardButtons ? 'var(--blkGreen)' : 'var(--dkGreen)')};
  font-size: inherit;
  border: none;
  display: block;
  text-align: center;
  padding: ${props => props.$noBackground ? '0' : 'var(--xs) var(--md)'};
  cursor: pointer;
  border-radius: var(--xs);
  text-decoration: none;
  position: relative;
  &:hover {
    background-color: ${props => props.$dashboardButtons ? 'var(--accentLtGreen)' : 'none'};
    color: ${props => props.$signOut ? 'var(--danger)' : (props.$dashboardButtons ? 'var(--blkGreen)' : 'var(--accentGreen)')};
  }
`