import React, { createContext, useState } from 'react'

export type GuessrContextType = {
  frame: string
  setFrame: React.Dispatch<React.SetStateAction<string>>
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  highscore: number
  setHighscore: React.Dispatch<React.SetStateAction<number>>
}

export const GuessrContext = createContext<GuessrContextType>({
  frame: '',
  setFrame: () => {},
  score: 0,
  setScore: () => {},
  highscore: 0,
  setHighscore: () => {},
})

export const GuessrContextProvider = ({ children }: { children: any }) => {
  const [frame, setFrame] = useState('')
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState(0)

  return (
    <GuessrContext.Provider
      value={{
        frame,
        setFrame,
        score,
        setScore,
        highscore,
        setHighscore,
      }}
    >
      {children}
    </GuessrContext.Provider>
  )
}
