import styled, { createGlobalStyle } from 'styled-components'
import '../fonts/fonts.css'

const GlobalStyles = createGlobalStyle`

  :root {

    ::-webkit-scrollbar {display:none;}

    // Colors
    --accentGreen: #10f98f;
    --accentLtGreen: #4fffb0;
    --bgGreenA: #9ecda6;
    --bgGreenB: #586b64;
    --ltGreen: #d8e8d4;
    --ltGreenHover: #d8e8d450;
    --greyGreen: #bcc8b8;
    --dkGreen: #049660;
    --dkGreenA: #0d3b3d;
    --blkGreen: #02272A;
    --creamA: #fff3cd;
    --creamB: #ffeeba;
    --ltBrown: #9E866B;
    --mdBrown: #856404;
    --dkBrown: #5E493D;

    --white: #fff;
    --offWhite: #f8f9fa;
    --black: #000;
    --selected: #d0ba14;
    --danger: #ff4d4d;
    --dangerDk: #cc0000;
    --softRed: #cc000050;

    // Fonts

    // Font sizes
    --fs-xxs: 1.2rem;
    --fs-xs: 1.4rem;
    --fs-sm: 1.6rem;
    --fs-md: 2rem;
    --fs-lg: 2.4rem;
    --fs-xl: 3.2rem;
    --fs-xxl: 4.6rem;

    // Spacing
    --xxs: .2rem;
    --xs: .4rem;
    --sm: .8rem;
    --md: 1.6rem;
    --lg: 2.4rem;
    --xl: 3.2rem;
    --xxl: 4.6rem;

    // Transitions
    --fast: all .12s ease;
    --medium: all .24s ease;
    --slow: all .36s ease;
    --carousel: all .6s ease;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    user-select: none;
    font-size: 62.5%;
    height: -webkit-fill-available;
    scroll-behavior: smooth;
  }

  body {
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    line-height: 1.6;
    color: var(--blkGreen);
    background-color: var(--offWhite);
    height: -webkit-fill-available;
    height: 100svh;
    margin: 0 auto;
    overflow-x: hidden;
  }

  h1 {
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 700;
  }

  h2 {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700;
  }

  h3 {
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 700;
  }

  h4 {
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    font-weight: 700;
  }

  main {
    position: fixed;
    top: 5.8rem;
    width: 100%;
  }

  section {
    max-width: 100rem;
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--sm);
    margin: var(--sm) auto;
    overflow-x: hidden;
    width: 100%;
  }

  label {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: var(--sm);
		font-size: clamp(1rem, 2vw, 1.2rem);
		margin-bottom: var(--xs);
    overflow: hidden;
	}

  input, select, textarea {
  width: 100%;
  padding: var(--sm);
  font-size: clamp(1.4rem, 2vw, 1.6rem);
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

  select, option {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  textarea {
    resize: vertical;
    height: 150px;
  }

  img {
    max-width: 100%;
    height: auto;
  }
  

  @media only screen and (max-width: 999px) {
    section {
      padding: var(--sm) var(--md);
    }
  }
  @media only screen and (max-width: 768px) {
    
  }
  @media only screen and (max-width: 450px) {
    section {
      padding: var(--sm);
    }
  }
`

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: var(--sm);
	margin: var(--sm) auto;
	overflow-x: hidden;
	width: 100%;
`

export const InputGroup = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin-bottom: var(--sm);
	&:last-of-type {
		margin-bottom: var(--lg);
	}
`

export const CheckContainer = styled.div`
	position: absolute;
	right: var(--sm);
	top: calc(50% + 0.25rem);
	display: flex;
	align-items: center;
	justify-content: center;
`

export const Label = styled.label`
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: var(--sm);
	font-size: clamp(1rem, 2vw, 1.2rem);
	margin-bottom: var(--xs);
	overflow: hidden;
`

export const Input = styled.input`
	width: 100%;
	padding: var(--sm) 0;
	font-size: clamp(1.4rem, 2vw, 1.6rem);
	border: none;
	border-bottom: 3px solid var(--dkGreen);
	transition: var(--fast);
	&:focus {
		outline: none;
		border-bottom: 3px solid var(--selected);
	}
	&.valid {
		border-bottom: 3px solid var(--accentGreen);
	}
	&.error {
		border-bottom: 3px solid var(--softRed);
	}
	&.error::placeholder {
		color: var(--softRed);
	}
`

export default GlobalStyles
