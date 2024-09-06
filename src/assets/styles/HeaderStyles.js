import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Head = styled.header`
	background-color: #fff;
	border-bottom: 1px solid var(--greyGreen);
	position: fixed;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 5.8rem;
	z-index: 1000;
	`

export const Container = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	position: relative;
`

export const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	width: fit-content;
	p {
		font-size: clamp(2.5rem, 5vw, 4.5rem);
		letter-spacing: .1rem;
		line-height: 1em;
		font-weight: 700;
		color: var(--blkGreen);
		font-family: 'HaveHeartOne', sans-serif;
	}
`

export const LogoBackground = styled.div`
	background-color: var(--accentGreen);
	border-radius: 50%;
	border: 1px solid var(--blkGreen);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3.5rem;
	height: 3.5rem;
	margin-right: var(--md);
	position: relative;
	img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 4rem;
	}
`

export const UserControls = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: var(--lg);
	cursor: pointer;
`

export const NavItem = styled.div`
	display: flex;
	align-items: center;
`

export const UserMenu = styled.div`
	outline: 1px solid var(--greyGreen);
	position: absolute;
	top: 5.8rem;
	right: calc((100vw - 100rem) / 2);
	height: auto;
  width: 15rem;
	border-bottom-left-radius: var(--xs);
	background-color: #fff;
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0')};
	transition: all 2s ease-in-out;
	padding: var(--sm);
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: var(--sm);
	overflow-y: auto;
	z-index: 1001;
	@media only screen and (max-width: 999px) {
		right: 0;
	}
`

export const MenuItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	&:first-child {
		margin-bottom: ${({ $mobile }) => ($mobile ? 'var(--sm)' : '0')};
	}
`

export const SignInButton = styled(Link)`
	background-color: var(--dkGreen);
	color: var(--white);
	padding: var(--xs) var(--md);
	border-radius: var(--xs);
	text-decoration: none;
	font-size: clamp(1.4rem, 2vw, 1.6rem);
	transition: var(--fast);
	&:hover {
		background-color: var(--accentGreen);
		color: var(--blkGreen);
	}
`

export const SignOutButton = styled.button`
	background-color: transparent;
	color: var(--dangerDk);
	font-size: clamp(1.4rem, 2vw, 1.6rem);
	border: none;
	cursor: pointer;
	transition: var(--fast);
	&:hover {
		color: var(--danger);
	}
`