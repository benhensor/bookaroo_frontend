import React from 'react'
import styled from 'styled-components'

export default function Add() {
	return (
		<SVG
			id="Layer_1"
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 122.88 122.88"
		>
			<title>add</title>
			<path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z" />
		</SVG>
	)
}

const SVG = styled.svg`
	position: absolute;
	top: 0;
	left: 0;
  width: 100%;
  height: 100%;
  fill: var(--dkGreen);
  transition: var(--fast);
  &:hover {
    fill: var(--accentGreen);
  }
`