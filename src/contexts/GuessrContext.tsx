import React, { createContext, useEffect, useState } from 'react'
import { getEpisodeFromFrame, getRandomFrame } from '../util/episodeData'

export type GuessrContextType = {
  frame: string
  setFrame: React.Dispatch<React.SetStateAction<string>>
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  highscore: number
  setHighscore: React.Dispatch<React.SetStateAction<number>>
  previousEpisode: string
  setPreviousEpisode: React.Dispatch<React.SetStateAction<string>>
  previousGuess: string
  setPreviousGuess: React.Dispatch<React.SetStateAction<string>>
  guessEpisode: (episode: string) => void
}

export const GuessrContext = createContext<GuessrContextType>({
  frame: '',
  setFrame: () => {},
  score: 0,
  setScore: () => {},
  highscore: 0,
  setHighscore: () => {},
  previousEpisode: '',
  setPreviousEpisode: () => {},
  previousGuess: '',
  setPreviousGuess: () => {},
  guessEpisode: () => {},
})

const highScoreLocation = 'avatar_high_score'

export const GuessrContextProvider = ({ children }: { children: any }) => {
  const [frame, setFrame] = useState('')
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState(0)
  const [previousEpisode, setPreviousEpisode] = useState('')
  const [previousGuess, setPreviousGuess] = useState('')

  useEffect(() => {
    const storedHighscore = localStorage.getItem(highScoreLocation)
    if (!storedHighscore) {
      localStorage.setItem(highScoreLocation, JSON.stringify(highscore))
    }

    setHighscore(Number(storedHighscore))

    if (!frame) setFrame(getRandomFrame())
  }, [])

  const guessEpisode = (episode: string) => {
    const currentEpisode = getEpisodeFromFrame(frame)
    const correct = episode == currentEpisode
    setPreviousEpisode(currentEpisode)
    setPreviousGuess(episode)

    setFrame(getRandomFrame())

    if (correct) {
      const newScore = score + 1
      setScore(newScore)
      if (newScore > highscore) {
        setHighscore(newScore)
        localStorage.setItem(highScoreLocation, JSON.stringify(newScore))
      }
    } else {
      setScore(0)
    }
  }

  return (
    <GuessrContext.Provider
      value={{
        frame,
        setFrame,
        score,
        setScore,
        highscore,
        setHighscore,
        previousEpisode,
        setPreviousEpisode,
        previousGuess,
        setPreviousGuess,
        guessEpisode,
      }}
    >
      {children}
    </GuessrContext.Provider>
  )
}
