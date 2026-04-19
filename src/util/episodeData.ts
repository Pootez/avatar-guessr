import aang from '../episodes/aang.json'
import korra from '../episodes/korra.json'

const aangEpisodes = Object.entries(aang).map(
  ([title, frames]) =>
    true && {
      title: 'A' + title,
      frames: frames,
    },
)
const korraEpisodes = Object.entries(korra).map(
  ([title, frames]) =>
    true && {
      title: 'K' + title,
      frames: frames,
    },
)
const episodes = [...aangEpisodes, ...korraEpisodes]

export const getAllFrames = () => {
  return episodes.map(({ frames }) => frames).flat()
}

export const getRandomFrame = () => {
  const allFrames = getAllFrames()
  const index = Math.floor(Math.random() * allFrames.length)
  return allFrames[index]
}

export const getEpisodeFromFrame = (frame: string) => {
  if (!frame) return 'N/A'
  return episodes
    .filter(({ frames }) => frames.includes(frame))
    .map(({ title }) => title)[0]
}

export const getEpisodesBySeason = () => {
  return episodes.reduce(
    (seasons, episode) => {
      const { show, seasonNr } = getEpisodeInfo(episode.title)
      const seasonIndex = show == 'A' ? seasonNr : seasonNr + 3
      return seasons.map((season, index) =>
        index + 1 !== seasonIndex ? season : [...season, episode.title],
      )
    },
    [[], [], [], [], [], [], []] as string[][],
  )
}

export const getEpisodeInfo = (episode: string) => {
  const show = episode.slice(0, 1)
  const name = episode.slice(8)
  const seasonNr = Number(episode.slice(2, 4))
  const episodeNr = Number(episode.slice(5, 7))
  return { show, name, seasonNr, episodeNr }
}
