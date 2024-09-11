import React, { useState } from 'react'
import styled from 'styled-components'

export default function Instructions({ instructionType }) {
  const [isVisible, setIsVisible] = useState(false)

  
  const registration = [
    'To try Bookaroo, you\'ll need to create an account.',
    'As this app is for demonstration purposes only, you can provide any email address and password you like.',
    'A real UK postcode is required to create listings.'
  ]

  const login = [
    'To login, use the email and password you provided when registering.'
  ]


  const dashboard = [
    'The dashboard is where you can view and manage your listings, messages, and profile.',
    'You can update your details, set your reading preferences and see new messages from other users.',
    'Use the nav bar at the bottom to change pages.'
  ]

  const browse = [
    'Browse through the available books and find something you like.',
    'You can search for books by title, author, or genre.',
    'Click on a book to view more details or message the owner.'
  ]

  const listings = [
    'View all the books you have listed for sharing.',
    'You can edit or delete listings from this page.'
  ]

  // Switch case to choose instructions based on the passed 'instructionType'
  let instruction;
  switch (instructionType) {
    case 'registration':
      instruction = registration;
      break;
    case 'login':
      instruction = login;
      break;
    case 'dashboard':
      instruction = dashboard;
      break;
    case 'browse':
      instruction = browse;
      break;
    case 'listings':
      instruction = listings;
      break;
    default:
      instruction = registration;
  }


  return (
    <Instruction
      $isVisible={isVisible}
      onClick={() => setIsVisible(!isVisible)}
    >
      <InstructionHeading $isVisible={isVisible}>
        Instructions
      </InstructionHeading>
      <InstructionContent $isVisible={isVisible}>
        <ContentPanel>
          <ul>
            {instruction.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </ContentPanel>
      </InstructionContent>
    </Instruction>
  )
}

export const Instruction = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 40rem;
  z-index: 1000;
	overflow: hidden;
	margin-bottom: var(--sm);
	transition: var(--fast);
`

export const InstructionHeading = styled.button`
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

export const InstructionContent = styled.div`
	width: 100%;
	max-height: ${({ $isVisible }) => ($isVisible ? 'fit-content' : '0')};
	opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
	overflow: hidden;
	padding: ${({ $isVisible }) => ($isVisible ? '3rem 0' : '0 0 1rem 0')};
	line-height: 1.6;
	color: var(--mdBrown);
	transition: all 0.3s;
`

export const ContentPanel = styled.div`
  position: relative;
	border: 1px solid var(--ltGreen);
	padding: var(--lg);
	background-color: var(--white);
  border-radius: var(--sm);
  ul {
    
  }
  li {
    font-size: 1.4rem;
    text-align: justify;
    margin-bottom: var(--sm);
  }
	@media only screen and (max-width: 768px) {
		padding: var(--md);
	}
`