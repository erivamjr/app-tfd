import React from 'react'

interface DisplayMessageProps {
  message: string
  color?: string
  text?: string
}

const DisplayMessage: React.FC<DisplayMessageProps> = ({
  message,
  color,
  text
}) => {
  return (
    <div
      className={`mt-5 rounded border bg-${color}-600 hover:bg-${color}-700 text-${text} p-3 text-1xl`}
    >
      {message}
    </div>
  )
}

export default DisplayMessage
