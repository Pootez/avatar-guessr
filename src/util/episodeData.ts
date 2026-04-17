import episodes from '../resources/episodes.json'

export const getAllFrames = () => {
  return Object.values(episodes).flat()
}

export const getRandomFrame = () => {
  const allFrames = getAllFrames()
  const index = Math.floor(Math.random() * allFrames.length)
  return allFrames[index]
}

export const getEpisodeName = (frame: string) => {
  return Object.entries(episodes)
    .filter(([_, value]) => value.includes(frame))
    .map(([key, _]) => key)
}
