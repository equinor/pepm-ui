import { Typography } from '@equinor/eds-core-react'
import * as Styled from './About.styled'

export const About = () => {
  return (
    <Styled.About className="about-container">
      <Styled.InnerWrapper>
        <Typography variant="h1">About PEPM</Typography>
        <Typography variant="body_long">
          It began with the forging of the Great Rings. Three were given to{' '}
          <Typography link href="https://nr.no/">
            Norsk Regnesentral
          </Typography>
          , immortal, wisest and fairest of all beings. Seven to the
          Dwarf-Lords, great miners and craftsmen of the mountain halls. And
          nine, nine rings were gifted to the race of Men, who above all else
          desire power. For within these rings was bound the strength and the
          will to govern each race. But they were all of them deceived, for
          another ring was made. Deep in the land of Mordor, in the Fires of
          Mount Doom, the Dark Lord Sauron forged a master ring, and into this
          ring he poured his cruelty, his malice and his will to dominate all
          life.
        </Typography>
        <Typography variant="h3">One ring to rule them all.</Typography>
        <Typography variant="body_long">
          One by one, the free lands of Middle-Earth fell to the power of the
          Ring, but there were some who resisted. A last alliance of men and
          elves marched against the armies of Mordor, and on the very slopes of
          Mount Doom, they fought for the freedom of Middle-Earth. Victory was
          near, but the power of the ring could not be undone. It was in this
          moment, when all hope had faded, that Isildur, son of the king, took
          up his father’s sword.
        </Typography>
      </Styled.InnerWrapper>
    </Styled.About>
  )
}
