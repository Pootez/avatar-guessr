import { Card } from '@heroui/react'
import { useContext, useEffect, useState } from 'react'
import { GuessrContext } from '../contexts/GuessrContext'
import { getEpisodeName, getRandomFrame } from '../util/episodeData'

const CurrentFrame = () => {
  const { frame, setFrame } = useContext(GuessrContext)
  const [newFrame, setNewFrame] = useState(false)

  const images = import.meta.glob('../resources/randomframes/*.jpg', {
    eager: true,
    import: 'default',
  }) as Record<string, string>

  const imgSrc = frame ? images[`../resources/randomframes/${frame}`] : null

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
        <Card.Title>{getEpisodeName(frame)}</Card.Title>
      </Card.Header>
      <Card.Content>
        {!!frame ? <img alt="Frame from Avatar" src={imgSrc} /> : 'No frame'}
      </Card.Content>
    </Card>
  )
}

export default CurrentFrame
