import React from 'react'

interface DisplayMessageProps {
  isLoading?: boolean
  message: string
  color?: string
  text?: string
}

const DisplayMessage: React.FC<DisplayMessageProps> = ({
  isLoading,
  message,
  color,
  text,
}) => {
  return (
    <div
      style={{
        backgroundColor: color,
        color: text,
      }}
      className={`mt-5 rounded border opacity-75 p-3 text-1xl`}
    >
      {isLoading}
      {message}
    </div>
  )
}

export default DisplayMessage
