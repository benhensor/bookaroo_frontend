import React from 'react'
import styled from 'styled-components'

export default function MessageButton({ text, to, onClick}) {

  const handleClick = (event) => {
		if (onClick) {
			onClick(event)
		}
	}

  return (
    <StyledLink
      to={to}
      onClick={handleClick}
    >
      {text}
    </StyledLink>
  )
}

const StyledLink = styled.button`
  text-decoration: none;
  background: none;
  border: none;
  color: var(--white);
  padding: var(--sm) 0;
  font-size: 1.4rem;
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: var(--accentGreen);
  }
`