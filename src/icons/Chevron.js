import React from 'react'
import styled from 'styled-components'

export default function Chevron({ isVisible, boolean, onClick }) {
	return (
		<Wrapper
			$isVisible={isVisible}
      $boolean={boolean}
			onClick={onClick}
    >
			<SVG
				viewBox="0 0 8 12"
				fill="none"
			>
				<path d="M7 1L2 6L7 11" />
			</SVG>
		</Wrapper>
	)
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $boolean }) =>
    $boolean ? 'rotate(0deg)' : 'rotate(180deg)'};
	opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
	transition: var(--carousel);
	margin-bottom: var(--xxl);
`

const SVG = styled.svg`
	width: 2rem;
	height: 100%;
	transition: var(--carousel);
  path {
    stroke: var(--dkGreenA);
    stroke-width: 1;
  }
	&:hover {
		path {
			stroke: var(--accentGreen);
		}
	}
`