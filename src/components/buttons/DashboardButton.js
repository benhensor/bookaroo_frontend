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
  background: var(--dkGreen);
  color: var(--white);
  padding: var(--sm) var(--md);
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  text-align: center;
  width: fit-content;
  margin-top: var(--sm);
  cursor: pointer;
  border-radius: var(--xs);
  &:hover {
    background: var(--accentGreen);
    color: var(--blkGreen);
  }
`