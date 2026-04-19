import aang from '../episodes/aang.json'
import korra from '../episodes/korra.json'

const aangEpisodes = Object.entries(aang).map(
  ([title, frames]) =>
    true && {
      title: 'A' + title.slice(0, 1) + title.slice(2),
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

export const getAllFrames = (mode: number) => {
  return episodes.filter(({ title }) => {
    const { show, seasonNr } = getEpisodeInfo(title)
    const modeNr = (show == 'A' ? seasonNr - 1 : seasonNr + 2)
    return mode & (2 ** modeNr)
  }).map(({ frames }) => frames).flat()
}

export const getRandomFrame = (mode: number) => {
  const allFrames = getAllFrames(mode)
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
  const name = episode.slice(7)
  const seasonNr = Number(episode.slice(2, 3))
  const episodeNr = Number(episode.slice(4, 6))
  return { show, name, seasonNr, episodeNr }
}
