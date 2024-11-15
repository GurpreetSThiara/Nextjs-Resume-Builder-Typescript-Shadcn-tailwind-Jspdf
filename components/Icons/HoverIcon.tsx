import { Info } from 'lucide-react'
import React from 'react'

const HoverIcon = ({
    text
}:{
    text:string
}) => {
  return (
    <div>
      {text}
        <Info/>
    </div>
  )
}

export default HoverIcon