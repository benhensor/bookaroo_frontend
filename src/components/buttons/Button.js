import React from 'react'
import styled from 'styled-components'
import { useWindowWidth } from '../../utils/useWindowWidth'
import { Link } from 'react-router-dom'

export default function Button({ type, text, onClick, to, state }) {

	const mobile = useWindowWidth() < 768

	const handleClick = (event) => {
		if (onClick) {
			onClick(event)
		}
	}

	// Define styles and props for different button types
	const getButtonStyles = (type) => {
		switch (type) {
			case 'action':
				return {
					as: 'button',
					backgroundColor: 'var(--accentGreen)',
					backgroundHoverColor: 'var(--accentLtGreen)',
					color: 'var(--blkGreen)',
					width: '100%',
          fontSize: '1.2rem',
				}
			case 'link':
				return {
					as: Link,
					backgroundColor: 'var(--accentGreen)',
					backgroundHoverColor: 'var(--accentLtGreen)',
					color: 'var(--blkGreen)',
					textDecoration: 'none',
					padding: '.6rem var(--md)',
          fontSize: '1.2rem',
					to,
				}
			case 'thumbnail':
				return {
					as: 'button',
					backgroundColor: text === 'Delete' ? 'var(--dangerDk)' : 'var(--accentGreen)',
					backgroundHoverColor: text === 'Delete' ? 'var(--danger)' : 'var(--accentLtGreen)',
					color: text === 'Delete' ? 'var(--white)' : 'var(--blkGreen)',
					width: mobile ? '130px' : '150px',
					padding: '.6rem var(--md)',
					fontSize: '1.2rem',
				}
			case 'delete':
				return {
					as: 'button',
					backgroundColor: 'var(--dangerDk)',
					backgroundHoverColor: 'var(--danger)',
					color: 'white',
					width: '100%',
					fontSize: '1.2rem',
				}
			case 'word':
				return {
					as: Link,
					backgroundColor: 'none',
					backgroundHoverColor: 'transparent',
					color: text === 'Sign Out' ? 'var(--dangerDk)' : 'var(--dkGreen)',
					fontSize: '1.6rem',
          padding: '0',
          colorHover: text === 'Sign Out' ? 'var(--danger)' : 'var(--accentGreen)',
          to,
				}
			case 'message':
				return {
					as: Link,
					backgroundColor: 'none',
					backgroundHoverColor: 'transparent',
					color: 'var(--white)',
					colorHover: 'var(--accentGreen)',
					fontSize: '1.4rem',
					padding: 'var(--sm) 0',
					to,
					state,
				}
			case 'dashboard':
				return {
					as: Link,
					backgroundColor: 'none',
					backgroundHoverColor: 'transparent',
					color: 'var(--blkGreen)',
					fontSize: '1.6rem',
					width: 'fit-content',
          padding: '0',
          colorHover:  'var(--dkGreen)',
          to,
				}
			default:
				return {
					as: 'button',
					backgroundColor: 'grey',
					backgroundHoverColor: 'darkgrey',
					color: 'white',
				}
		}
	}

	// Get styles based on the type
	const {
		as,
		backgroundColor,
		backgroundHoverColor,
		color,
    colorHover,
		fontSize,
		width,
		padding,
		textDecoration,
	} = getButtonStyles(type)

	// Return the button or link with appropriate styles
	return (
		<StyledButton
			as={as}
			onClick={handleClick}
			$backgroundColor={backgroundColor}
			$backgroundHoverColor={backgroundHoverColor}
			$color={color}
      $colorHover={colorHover}
      $fontSize={fontSize}
			$width={width}
			$textDecoration={textDecoration}
			$padding={padding}
			{...as === Link && { to }}
			{...as === Link && { state }}	

		>
			{text}
		</StyledButton>
	)
}

const StyledButton = styled.button`
	background-color: ${({ $backgroundColor }) => $backgroundColor};
	color: ${({ $color }) => $color};
	font-size: ${({ $fontSize }) => $fontSize || '1.2rem'};
	cursor: pointer;
	transition: var(--fast);
	width: ${({ $width }) => $width || 'auto'};
	border: none;
	padding: ${({ $padding }) => $padding || 'var(--sm) var(--md)'};
	text-decoration: ${({ $textDecoration }) => $textDecoration || 'none'};
	display: inline-block;
	text-align: center;
	border: none;
	border-radius: var(--xs);
	cursor: pointer;
	transition: var(--fast);
	&:hover {
		background-color: ${({ $backgroundHoverColor }) =>
			$backgroundHoverColor};
		color: ${({ $colorHover }) => $colorHover};
	}
`
