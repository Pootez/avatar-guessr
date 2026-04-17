import { Card } from '@heroui/react'
import { useContext, useEffect } from 'react'
import { GuessrContext } from '../contexts/GuessrContext'

const CurrentFrame = () => {
  const { frame, setFrame } = useContext(GuessrContext)
  const images = import.meta.glob('../resources/randomframes/*.jpg', {
    eager: true,
    import: 'default',
  }) as Record<string, string>

  const imgSrc = frame ? images[`../resources/randomframes/${frame}`] : null

  useEffect(() => {
    setFrame('26QOXzwTaO.jpg')
  }, [])

  return (
    <Card className='dark'>
      <Card.Content>
        {!!frame ? <img alt="Frame from Avatar" src={imgSrc} /> : 'No frame'}
      </Card.Content>
    </Card>
  )
}

export default CurrentFrame
