import { Card } from '@heroui/react'
import { useContext } from 'react'
import { GuessrContext } from '../contexts/GuessrContext'

const CurrentFrame = () => {
  const { frame } = useContext(GuessrContext)

  const imgSrc = `${import.meta.env.BASE_URL}episodes/randomframes/${frame}`

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
