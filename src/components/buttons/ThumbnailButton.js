import React from 'react'
import styled from 'styled-components'
import { useWindowWidth } from '../../utils/useWindowWidth'

export default function ThumbnailButton({ text, onClick }) {
  
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
  background-color: ${({ $deleteBtn }) => $deleteBtn ? 'var(--dangerDk)' : 'var(--dkGreen)'};
  color: var(--white);
  width: ${({ $mobile }) => $mobile ? '130px' : '150px'};
  padding: .6rem var(--md);
  font-size: 1.2rem;
  border: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border-radius: var(--xs);
  &:hover {
    background-color: ${({ $deleteBtn }) => $deleteBtn ? 'var(--danger)' : 'var(--accentLtGreen)'};
    color: ${({ $deleteBtn }) => $deleteBtn ? 'var(--white)' : 'var(--blkGreen)'};
  }
`;
