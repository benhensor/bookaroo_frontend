import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Check from '../../icons/Check'

export default function Genre({ name, isSelected, onSelect }) {
  const [isActive, setIsActive] = useState(isSelected)

  useEffect(() => {
    setIsActive(isSelected)
  }, [isSelected, setIsActive])


  const handleSelect = () => {
    setIsActive(!isActive)
    onSelect(name)
  }

  return (
    <>
      <GenreContainer
        onClick={handleSelect}
        $isActive={isActive}
      >
        <InnerContainer>
          <Name>
            {name}
          </Name>
          <Check isactive={isActive} />
        </InnerContainer>
      </GenreContainer>
    </>
  )
}


const GenreContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--sm);
  border-bottom: 1px solid var(--ltGreen);
  background-color: ${({ $isActive }) => $isActive ? 'var(--accentGreen)' : 'transparent'};
  transition: var(--fast);
  cursor: pointer;
  &:hover {
    background-color: var(--ltGreen);
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 25%;
`

const Name = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  text-transform: uppercase;
  color: var(--blkGreen);
`