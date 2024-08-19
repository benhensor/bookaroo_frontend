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
    --black: #000;
    --danger: #ff4d4d;
    --dangerDk: #cc0000;

    // Fonts

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
  }

  body {
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    line-height: 1.6;
    color: var(--blkGreen);
    overflow-x: hidden;
  }

  h1 {
    font-size: 3.2rem;
    font-weight: 700;
  }

  main {
    position: fixed;
    top: 5.8rem;
    width: 100%;
    outline: 1px solid red;
    height: 100%;
    overflow-y: auto;
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
    width: 40rem;
    overflow-x: hidden;
  }

  label {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: var(--sm);
		font-size: 1.2rem;
		margin-bottom: var(--xs);
    overflow: hidden;
	}

  input, select, textarea {
    width: 100%;
		padding: var(--sm);
		font-size: 1.4rem;
		border: 1px solid #ccc;
		border-radius: var(--xs);
    &:focus {
      outline: none;
      border-color: var(--accentGreen);
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
  @media only screen and (max-width: 450px) {
    section {
      padding: var(--sm);
    }
    form {
      width: 100%;
    }
  }
`

export const PageHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	position: relative;
  padding-top: var(--lg);
`

export const Content = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: var(--lg);
`

export default GlobalStyles
