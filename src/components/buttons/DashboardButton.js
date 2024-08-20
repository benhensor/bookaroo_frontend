import React from 'react'
import styled from 'styled-components'
import { useWindowWidth } from '../../utils/useWindowWidth'

export default function DashboardButton({ text, onClick }) {
  const mobile = useWindowWidth() < 768

	const handleClick = (event) => {
		if (onClick) {
			onClick(event)
		}
	}
  const deleteBtn = text === 'Delete'
  return (
    <Button
      type='button'
      onClick={handleClick}
      $mobile={mobile}
      $deleteBtn={deleteBtn}
    >
      {text}
    </Button>
  )
}

const Button = styled.button`
  border: none;
  background: none;
  color: var(--dkGreen);
  padding: 0;
  font-size: 1.6rem;
  text-align: center;
  cursor: pointer;
  border-radius: var(--xs);
  &:hover {
    color: var(--accentGreen);
  }
`