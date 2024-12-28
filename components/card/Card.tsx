import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const HeroCard = ({text}:{text:any}) => {
  return (
    <h2 className="bg-white text-black p-2 rounded-md font-semibold">{text}</h2>
  )
}

export default HeroCard