import { Button, Dropdown, Label, Separator } from '@heroui/react'
import { getEpisodeInfo } from '../util/episodeData'
import { useContext, useState, type JSX } from 'react'
import { GuessrContext } from '../contexts/GuessrContext'

const SeasonDropdown = ({
  name,
  episodes,
  color,
  disabled = false,
}: {
  name: string
  episodes: string[]
  color: string
  disabled?: boolean
}) => {
  const { guessEpisode } = useContext(GuessrContext)
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="flex-grow flex items-stretch">
      <Dropdown isOpen={isOpen} onOpenChange={setOpen}>
        <Dropdown.Trigger className="flex-grow flex">
          <Button
            isDisabled={disabled}
            variant="secondary"
            className={'flex-grow' + ' ' + color}
          >
            {name}
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Popover
          placement="bottom"
          // onMouseLeave={() => setOpen(false)}
        >
          <Dropdown.Menu
            disabledKeys={disabled ? episodes : []}
            aria-label="Episodes"
            onAction={(key) => guessEpisode(key.toString())}
          >
            {episodes
              .map((episode, index) => {
                const { name, episodeNr } = getEpisodeInfo(episode)
                return (
                  <Dropdown.Item key={index} id={episode}>
                    <Label className={color}>{episodeNr}</Label>
                    <Label>{name}</Label>
                  </Dropdown.Item>
                )
              })
              .reduce<JSX.Element[]>(
                (acc, item, index, arr) =>
                  index < arr.length - 1
                    ? [...acc, item, <Separator variant="tertiary" />]
                    : [...acc, item],
                [],
              )}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  )
}

export default SeasonDropdown
