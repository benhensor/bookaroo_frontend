import React from 'react'
import styled from 'styled-components'
import { useWindowWidth } from '../../utils/useWindowWidth'

export default function ActionButton({ text, onClick }) {
  const mobile = useWindowWidth() < 768

	const handleClick = (event) => {
		if (onClick) {
			onClick(event)
		}
	}
  const deleteBtn = text === 'Delete' || text === 'Delete this listing'
  return (
    <Button
      type='submit'
      onClick={handleClick}
      $mobile={mobile}
      $deleteBtn={deleteBtn}
    >
      {text}
    </Button>
  )
}

const Button = styled.button`
  background-color: var(--accentGreen);
  color: var(--blkGreen);
  width: 100%;
  padding: calc(var(--sm) + .2rem) var(--md);
  font-size: 1.2rem;
  border: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border-radius: var(--xs);
  &:hover {
    background-color: var(--accentLtGreen);
  }
`