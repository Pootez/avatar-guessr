import './App.css'
import CurrentFrame from './components/CurrentFrame'
import SeasonDropdown from './components/SeasonDropdown'
import { getEpisodesBySeason } from './util/episodeData'
import { Alert, ButtonGroup, Card, Chip, Label } from '@heroui/react'
import { useContext } from 'react'
import { GuessrContext } from './contexts/GuessrContext'
import ModeSelect from './components/ModeSelect'

function App() {
  const { score, highscore, previousGuess, previousEpisode, mode } =
    useContext(GuessrContext)

  const episodesBySeason = getEpisodesBySeason()

  return (
    <>
      <section id="center">
        <ButtonGroup className="flex items-stretch gap-5 w-full px-16">
          <SeasonDropdown
            name="Book One: Air"
            episodes={episodesBySeason[3]}
            color={'text-cyan-500'}
            disabled={(mode & (2 ** 3)) == 0}
          />
          <SeasonDropdown
            name="Book Two: Spirits"
            episodes={episodesBySeason[4]}
            color={'text-orange-300'}
            disabled={(mode & (2 ** 4)) == 0}
          />
          <SeasonDropdown
            name="Book Three: Change"
            episodes={episodesBySeason[5]}
            color={'text-indigo-400'}
            disabled={(mode & (2 ** 5)) == 0}
          />
          <SeasonDropdown
            name="Book Three: Balance"
            episodes={episodesBySeason[6]}
            color={'text-emerald-600'}
            disabled={(mode & (2 ** 6)) == 0}
          />
        </ButtonGroup>
        <ButtonGroup className="flex items-stretch gap-5 w-full px-16">
          <SeasonDropdown
            name="Book One: Water"
            episodes={episodesBySeason[0]}
            color={'text-blue-500'}
            disabled={(mode & (2 ** 0)) == 0}
          />
          <SeasonDropdown
            name="Book Two: Earth"
            episodes={episodesBySeason[1]}
            color={'text-green-500'}
            disabled={(mode & (2 ** 1)) == 0}
          />
          <SeasonDropdown
            name="Book Three: Fire"
            episodes={episodesBySeason[2]}
            color={'text-red-400'}
            disabled={(mode & (2 ** 2)) == 0}
          />
        </ButtonGroup>
        <CurrentFrame />
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs" className="flex justify-stretch items-stretch">
          <div className="flex flex-grow gap-4">
            <Card className="flex-grow flex-1">
              <Card.Header>
                <Chip
                  color="success"
                  variant="primary"
                  className="flex justify-center text-lg"
                >
                  Score
                </Chip>
              </Card.Header>
              <Card.Content className="flex flex-row justify-center items-center">
                <Label className="flex-grow text-center text-4xl">
                  {score}
                </Label>
              </Card.Content>
            </Card>

            <Card className="flex-grow flex-1">
              <Card.Header>
                <Chip
                  color="warning"
                  variant="primary"
                  className="flex justify-center text-lg"
                >
                  Highscore
                </Chip>
              </Card.Header>
              <Card.Content className="flex flex-row justify-center items-center">
                <Label className="flex-grow text-center text-4xl">
                  {highscore}
                </Label>
              </Card.Content>
            </Card>

            <ModeSelect />
          </div>
        </div>
        <div id="social">
          {!previousGuess ? (
            <></>
          ) : previousGuess == previousEpisode ? (
            <Alert status="success">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Correct!</Alert.Title>
                <Alert.Description>
                  You guessed:
                  <br />
                  <Label>{previousGuess}</Label>
                  <br />
                  The episode was:
                  <br />
                  <Label>{previousEpisode}</Label>
                </Alert.Description>
              </Alert.Content>
            </Alert>
          ) : (
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>That's rough buddy...</Alert.Title>
                <Alert.Description>
                  You guessed:
                  <br />
                  <Label>{previousGuess}</Label>
                  <br />
                  The episode was:
                  <br />
                  <Label>{previousEpisode}</Label>
                </Alert.Description>
              </Alert.Content>
            </Alert>
          )}
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
