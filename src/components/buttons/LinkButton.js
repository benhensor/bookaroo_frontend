import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function LinkButton({ text, to, onClick}) {

  const types = ['Sign In', 'Register', 'Return', 'Browse', 'New Listing', 'Done', 'Sign Out']

  const noBackground = types.includes(text)
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
      $signOut={signOut}
    >
      {text}
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  background-color: ${props => props.$noBackground ? 'transparent' : 'var(--accentGreen)'};
  color: ${props => props.$signOut ? 'var(--dangerDk)' : 'var(--dkGreen)'};
  font-size: inherit;
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  border-radius: var(--xs);
  text-decoration: none;
  &:hover {
    color: ${props => props.$signOut ? 'var(--danger)' : 'var(--accentGreen)'};
  }
`