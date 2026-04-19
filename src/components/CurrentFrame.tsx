import { Card } from '@heroui/react'
import { useContext } from 'react'
import { GuessrContext } from '../contexts/GuessrContext'
import { getEpisodeFromFrame, getEpisodeInfo } from '../util/episodeData'

const CurrentFrame = () => {
  const { frame } = useContext(GuessrContext)
  const episode = getEpisodeFromFrame(frame)
  const { show } = getEpisodeInfo(episode)

  const imgSrc = `${import.meta.env.BASE_URL}episodes/${show == 'A' ? 'aang' : 'korra'}/${frame}`

  return (
    <Card
      className="dark"
      variant="secondary"
    >
      <Card.Content>
        {!!frame ? <img alt="Frame from Avatar" src={imgSrc} className='rounded-3xl' /> : 'No frame'}
      </Card.Content>
    </Card>
  )
}

export default CurrentFrame
