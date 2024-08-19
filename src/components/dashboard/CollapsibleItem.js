import React from 'react'
import styled from 'styled-components'
import Envelope from '../../icons/Envelope'
import Arrow from '../../icons/Arrow'

export default function CollapsibleItem({ message, onClick, isActive, text, isRead, children }) {

  return (
    <Container>
      <Header onClick={onClick} $isActive={isActive}>
        <div>
          {message && <Envelope isRead={isRead} />}
          {text}
          <Arrow isActive={isActive} message={message} />
        </div>
      </Header>
      {isActive && <>{children}</>}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? 'var(--dkGreen)' : 'inherit')};
  div {
    display: flex;
    align-items: center;
    gap: var(--sm);
    position: relative;
  }
  &:hover {
    color: var(--dkGreen);
  }
`