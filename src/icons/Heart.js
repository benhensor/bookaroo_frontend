import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useUser } from '../context/UserContext'

export default function Heart({ bookId, onClick }) {
	const { likedBooks, likeBook, unlikeBook, likedBooksLoading } = useUser()
	const [isLiked, setIsLiked] = useState(false)

	useEffect(() => {
		if (likedBooks && likedBooks.length > 0) {
			// console.log('likedBooks:', likedBooks);

			// Extract the IDs from the likedBooks array
			const likedBookIds = likedBooks.map((book) => book.id)

			// Check if the bookId is included in the likedBookIds array
			setIsLiked(likedBookIds.includes(bookId))
		}
	}, [likedBooks, bookId])

	const handleToggleLike = async (e) => {
		e.stopPropagation() // Prevent the click event from bubbling up to the parent element
		try {
			if (isLiked) {
				await unlikeBook(bookId)
				setIsLiked(false)
			} else {
				await likeBook(bookId)
				setIsLiked(true)
			}
			if (onClick) onClick(e) // Call the onClick function passed as a prop
		} catch (error) {
			console.error('Error toggling like:', error)
		}
	}

	if (likedBooksLoading) {
		return null // Or a loading spinner
	}

	return (
		<HeartSVG
			onClick={handleToggleLike}
			x="0"
			y="0"
			version="1.1"
			viewBox="0 0 29 29"
			fill={isLiked ? 'var(--dangerDk)' : 'var(--white)'}
		>
			<path
				d="m14.854 6.083-.354.353-.354-.354a6.5 6.5 0 0 0-9.192 9.192l.354.354L14.5 24.82l9.192-9.192.354-.354a6.5 6.5 0 0 0-9.192-9.191z"
				stroke={isLiked ? 'var(--white)' : 'var(--blkGreen)'}
				strokeWidth="1"
			></path>
			<path
				d="m14.854 6.083-.354.353-.354-.354a6.5 6.5 0 0 0-9.192 9.192l.354.354L14.5 24.82l9.192-9.192.354-.354a6.5 6.5 0 0 0-9.192-9.191z"
				stroke={isLiked ? 'var(--white)' : 'var(--blkGreen)'}
				strokeWidth="1px"
			></path>
		</HeartSVG>
	)
}

const HeartSVG = styled.svg`
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	width: 2.5rem;
	height: 2.5rem;
	transition: var(--medium);
	z-index: 10000000;
	&:hover {
		cursor: pointer;
		animation: heartbeat 1.2s infinite;
	}
	@keyframes heartbeat {
		0% {
			transform: scale(1);
		}
		15% {
			transform: scale(1.2);
		}
		30% {
			transform: scale(1);
		}
		45% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}
`
