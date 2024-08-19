import React from 'react'
import styled from 'styled-components'

export default function Search() {
	return (
		<SVG
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
				stroke="var(--greyGreen)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M20.9999 21L16.6499 16.65"
				stroke="var(--greyGreen)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</SVG>
	)
}

const SVG = styled.svg`
  position: absolute;
  right: 0.5rem; /* Adjusts the icon's position */
  color: var(--blkGreen); /* Adjust color as needed */
  pointer-events: none; /* Prevents the icon from blocking input */
  transition: var(--medium);
  z-index: 1000;
  &:hover {
    cursor: pointer;
    path {
      stroke: var(--accentGreen);
    }
    
  }
`