import { Card } from '@heroui/react'
import { useContext, useEffect, useState } from 'react'
import { GuessrContext } from '../contexts/GuessrContext'
import { getEpisodeFromFrame, getRandomFrame } from '../util/episodeData'

const CurrentFrame = () => {
  const { frame, setFrame } = useContext(GuessrContext)
  const [newFrame, setNewFrame] = useState(false)

  const imgSrc = `/episodes/randomframes/${frame}`

  useEffect(() => {
    setFrame(getRandomFrame())
  }, [newFrame])

  return (
    <Card
      className="dark"
      variant="secondary"
      onClick={() => setNewFrame(!newFrame)}
    >
      <Card.Header>
        <Card.Title>{getEpisodeFromFrame(frame)}</Card.Title>
      </Card.Header>
      <Card.Content>
        {!!frame ? <img alt="Frame from Avatar" src={imgSrc} /> : 'No frame'}
      </Card.Content>
    </Card>
  )
}

export default CurrentFrame
