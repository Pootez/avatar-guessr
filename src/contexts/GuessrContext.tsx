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
  mode: number
  setMode: React.Dispatch<React.SetStateAction<number>>
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
  mode: 7,
  setMode: () => {},
})

const highScoreLocation = 'avatar_high_score_'

export const GuessrContextProvider = ({ children }: { children: any }) => {
  const [frame, setFrame] = useState('')
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState(0)
  const [previousEpisode, setPreviousEpisode] = useState('')
  const [previousGuess, setPreviousGuess] = useState('')
  const [mode, setMode] = useState(7)

  const modeHighScoreLocation = highScoreLocation + mode

  useEffect(() => {
    const storedHighscore = localStorage.getItem(modeHighScoreLocation)
    if (!storedHighscore) {
      localStorage.setItem(modeHighScoreLocation, JSON.stringify(highscore))
    }

    setScore(0)
    setHighscore(Number(storedHighscore))

    setFrame(getRandomFrame(mode))
  }, [mode])

  const guessEpisode = (episode: string) => {
    const currentEpisode = getEpisodeFromFrame(frame)
    const correct = episode == currentEpisode
    setPreviousEpisode(currentEpisode)
    setPreviousGuess(episode)

    setFrame(getRandomFrame(mode))

    if (correct) {
      const newScore = score + 1
      setScore(newScore)
      if (newScore > highscore) {
        setHighscore(newScore)
        localStorage.setItem(modeHighScoreLocation, JSON.stringify(newScore))
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
        mode,
        setMode,
      }}
    >
      {children}
    </GuessrContext.Provider>
  )
}
