import React from 'react'
import {
	BookContainer,
	BookCover,
	BookDetails,
} from '../../assets/styles/ExchangePreviewStyles'

export default function Thumbnail({ book }) {

	// console.log('book:', book)

	return (
    <div>
			<BookContainer>
						<BookCover>
							<img src={book?.coverImg} alt={book?.title} />
						</BookCover>
				<BookDetails>
					<h3>{book?.title}</h3>
					<p>{book?.author}</p>
				</BookDetails>
			</BookContainer>
		</div>
	)
}