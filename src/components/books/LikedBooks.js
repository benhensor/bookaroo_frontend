import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import Carousel from '../carousel/Carousel'

export default function LikedBooks() {
  const { likedBooks, likedBooksLoading } = useUser()
  const [trigger, setTrigger] = useState(false);

// Toggle trigger to force rerender
const forceRerender = () => setTrigger((prev) => !prev);


  useEffect(() => {
    console.log('liked books:', likedBooks)
    forceRerender()
  }, [likedBooks])

  if (likedBooksLoading) {
    return null
  }

  return (
      <Carousel title="Liked Books" books={likedBooks} />
  )
}
