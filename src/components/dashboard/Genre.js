import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Genre = ({ name, isSelected, onSelect }) => {
  const [isActive, setIsActive] = useState(isSelected)

  useEffect(() => {
    setIsActive(isSelected)
  }, [isSelected, setIsActive])


  const handleSelect = () => {
    setIsActive(!isActive)
    onSelect(name)
  }

  return (
    <Container
      onClick={handleSelect}
      $isActive={isActive}
    >
      <Name>
        {name}
      </Name>
    </Container>
  )
}

export default Genre

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;
  padding: var(--sm);
  border-bottom: 1px solid var(--ltGreen);
  cursor: pointer;
  background-color: ${({ $isActive }) => $isActive ? 'var(--accentGreen)' : 'transparent'};
  transition: var(--fast);
  &:hover {
    background-color: var(--ltGreen);
  }
`

const Name = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  text-transform: uppercase;
  color: var(--blkGreen);
`