import styled from 'styled-components'

export const ListingsContainer = styled.div`
	height: calc(-5.6rem + 100svh);
	overflow-y: auto;
`

export const ListingsHeader = styled.div`
	padding: var(--lg) 0;
	@media only screen and (max-width: 999px) {
		padding: var(--md) 0;
	}
	@media only screen and (max-width: 450px) {
		padding: var(--sm) 0;
	}
`

export const Block = styled.div`
	display: flex;
	border: 1px solid var(--greyGreen);
	padding: var(--lg);
	margin-bottom: var(--sm);
	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: var(--sm);
	width: 40rem;
	overflow-x: hidden;
	label {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: var(--sm);
		font-size: clamp(1rem, 2vw, 1.4rem);
		margin-bottom: var(--xs);
		overflow: hidden;
	}
	input,
	select,
	textarea {
		width: 100%;
		padding: var(--sm);
		font-size: clamp(1.2rem, 2vw, 1.4rem);
		border: 1px solid #ccc;
		border-radius: var(--xs);
		transition: border-color 0.3s ease; /* Smooth transition for border color */

		&:focus {
			outline: none;
			border-color: var(--accentGreen); /* Default focus state color */
		}

		&.valid {
			border-color: var(--accentGreen); /* Valid state */
		}

		&.error {
			border-color: var(--softRed); /* Error state */
		}

		&.error::placeholder {
			color: var(--softRed); /* Error state placeholder color */
		}
	}

	select,
	option {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	textarea {
		resize: vertical;
		height: 150px;
	}
	@media only screen and (max-width: 768px) {
		width: 100%;
	}
`

export const ListingInput = styled.input`
	border: none;
	width: 100%;
	background: #313131;
	padding: var(--sm);
	font-size: clamp(1.2rem, 2vw, 1.4rem);
	color: var(--mdBrown);
	border-bottom: 3px solid var(--ltGreen);
	margin-bottom: var(--sm);
	transition: var(--fast);
	&::placeholder {
		color: var(--mdBrown);
	}
	&:focus {
		outline: none;
		border-bottom: 3px solid var(--accentGreen);
	}
`

export const ListingMenuItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	overflow: hidden;
	border-bottom: ${({ $isVisible }) =>
		$isVisible ? 'none' : '1px solid var(--ltGreen)'};
	margin-bottom: var(--sm);
	transition: var(--fast);
`

export const ListingMenuItemHeading = styled.button`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: none;
	border: none;
	outline: none;
	font-family: 'Poppins', sans-serif;
	text-align: left;
	color: ${({ $isVisible }) =>
		$isVisible ? 'var(--dkGreen)' : 'var(--mdBrown)'};
	overflow: hidden;
	position: relative;
	cursor: pointer;
`

export const ListingMenuItemContent = styled.div`
	width: 100%;
	max-height: ${({ $isVisible }) => ($isVisible ? 'fit-content' : '0')};
	opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
	overflow: hidden;
	padding: ${({ $isVisible }) => ($isVisible ? '2rem 0' : '0 0 1rem 0')};
	line-height: 1.6;
	color: var(--mdBrown);
	transition: all 0.3s;
`

export const MenuContentPanel = styled.div`
	border: 1px solid var(--ltGreen);
	padding: var(--lg);
	background: var(--white);
	@media only screen and (max-width: 768px) {
		padding: var(--md);
	}
`

export const ErrorMessage = styled.p`
	color: red;
	font-weight: bold;
	margin-top: 10px;
`

export const SuccessMessage = styled.div`
	max-width: 100rem;
	margin: var(--sm) auto;
	padding: var(--sm);
	background-color: var(--creamA);
	color: var(--mdBrown);
	border: 1px solid var(--creamB);
	border-radius: var(--xs);
	text-align: center;
`

export const ListOfListings = styled.div`
	margin-top: var(--lg);
	display: flex;
	flex-direction: column;
	width: 100%;
	li {
		position: relative;
		display: flex;
		justify-content: flex-start;
		height: 100%;
		padding: var(--sm) 0;
		border-bottom: 1px solid var(--ltGreen);
		transition: var(--fast);
		&:last-child {
			border-bottom: none;
		}
		&:hover {
			background-color: var(--ltGreenHover);
		}
		img {
			width: 6rem;
			height: auto;
			object-fit: cover;
			margin-right: var(--md);
		}
    .outer {
      display: flex;
      flex-direction: column;
			justify-content: space-around;
			.inner {
				display: flex;
				flex-direction: column;
			}
      p {
        font-size: clamp(1.2rem, 2vw, 1.4rem);
        color: var(--blkGreen);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      span {
        font-size: clamp(1rem, 2vw, 1.2rem);
        color: var(--mdBrown);
      }
    }
    button {
			display: flex;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--danger);
      font-size: clamp(1rem, 2vw, 1.2rem);
      &:hover {
        color: var(--dangerDk);
      }
    }
	}
`
