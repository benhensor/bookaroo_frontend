import React from 'react'
import styled from 'styled-components'

export default function MenuIcon({ onClick, isOpen }) {
  return (
    <MenuBars onClick={onClick}>
      {Array.from({ length: isOpen ? 6 : 3 }).map((_, index) => (
        <Bar key={index} $isActive={isOpen} $index={index} />
      ))}
    </MenuBars>
  )
}

const MenuBars = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  cursor: pointer;
  position: relative;
`

const Bar = styled.div`
  width: 24px;
  height: 2px;
  background-color: var(--dkGreen);
  border-radius: 1px;
  transition: all 0.12s ease-in-out;
  transform-origin: center;
  
  top: ${({ $index }) => ($index % 3) * 6}px; /* Positioning based on index */

  ${({ $isActive, $index }) =>
    $isActive &&
    $index < 3 &&
    `
    background-color: var(--accentGreen);

    &:nth-child(1) {
      width: 14px;
      transform: translateY(14px) rotate(40deg);
    }

    &:nth-child(2) {
      opacity: 0;
    }

    &:nth-child(3) {
      width: 14px;
      transform: translateY(-2px) rotate(40deg);
    }
  `}

  ${({ $isActive, $index }) =>
    $isActive &&
    $index >= 3 &&
    `
    background-color: var(--accentGreen);
    transform-origin: center;

    &:nth-child(4) {
      width: 16px;
      transform: translateY(4px) translateX(10px) rotate(-40deg);
    }

    &:nth-child(5) {
      opacity: 0;
    }

    &:nth-child(6) {
      width: 16px;
      transform: translateY(-12px) translateX(10px) rotate(-40deg);
    }
  `}
`