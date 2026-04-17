import episodes from '../resources/episodes.json'

export const getAllFrames = () => {
  return Object.values(episodes).flat()
}

export const getRandomFrame = () => {
  const allFrames = getAllFrames()
  const index = Math.floor(Math.random() * allFrames.length)
  return allFrames[index]
}

export const getEpisodeFromFrame = (frame: string) => {
  return Object.entries(episodes)
    .filter(([_, value]) => value.includes(frame))
    .map(([key, _]) => key)
}

export const getEpisodesBySeason = () => {
  return Object.keys(episodes).reduce(
    (seasons, episode) => {
      const seasonNr = Number(episode.slice(1, 3))
      return seasons.map((season, index) =>
        index + 1 !== seasonNr ? season : [...season, episode],
      )
    },
    [[], [], []] as string[][],
  )
}

export const getEpisodeInfo = (episode: string) => {
  const name = episode.slice(7)
  const seasonNr = Number(episode.slice(1, 3))
  const episodeNr = Number(episode.slice(4, 6))
  return { name, seasonNr, episodeNr }
}
