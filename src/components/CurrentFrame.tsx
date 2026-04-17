import { Card } from '@heroui/react'
import { useContext } from 'react'
import { GuessrContext } from '../contexts/GuessrContext'

const CurrentFrame = () => {
  const { frame, score, highscore } = useContext(GuessrContext)

  const imgSrc = `/episodes/randomframes/${frame}`

  return (
    <Card
      className="dark"
      variant="secondary"
    >
      <Card.Header>
        <Card.Title>{score + " | " + highscore}</Card.Title>
      </Card.Header>
      <Card.Content>
        {!!frame ? <img alt="Frame from Avatar" src={imgSrc} /> : 'No frame'}
      </Card.Content>
    </Card>
  )
}

export default CurrentFrame
