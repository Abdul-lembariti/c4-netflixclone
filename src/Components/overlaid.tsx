import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { TMDBRESULTS } from '../api'
import { makeImage } from '../utilitis'

const Overlay = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1px;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`

const PopUpMovieComp = styled(motion.div)`
  border-radius: 25px !important;
  margin: auto;
  width: 37vw;
  height: 73vh;
  min-width: 450px;
  min-height: 670px;
  overflow: hidden;
  background-color: #2f2f2f;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`
const PopUpMovieCover = styled.div`
  height: 50%;
  background-size: cover;
`
const PopUpMovieTitle = styled.h3`
  margin-top: -7%;
  margin-bottom: 3%;
  font-size: 35px;
  font-weight: bold;
  padding: 0 3%;
`

const PopUpMovieOverview = styled.p`
  color: #fff;
  padding: 20px;
  position: relative;
  font-size: 20px;
`

const PopUpMovieReleaseDate = styled.div`
  color: #fff;
  padding: 15px 20px;
  font-size: 20px;
  margin-bottom: -10px;
`

const PopUpMoviePopularity = styled.div`
  color: #fff;
  padding: 20px;
  font-size: 20px;
  margin-bottom: -10px;
`

const PopUpMovieOrigin = styled.div`
  color: #fff;
  padding: 20px;
  font-size: 20px;
  margin-bottom: -10px;
`
const PopUpMovieVoteAverage = styled.div`
  color: #fff;
  padding: 20px;
  font-size: 20px;
`

interface OverlayProps {
  //@ts-ignore
  slideIn?: PathMatch<'movieId'> | null
  //@ts-ignore

  inputId?: PathMatch<'inputId'> | null
  slideDetails: TMDBRESULTS | undefined
  goBack: string
}

const Overlaid = ({ slideIn, inputId, slideDetails, goBack }: OverlayProps) => {
  const history = useHistory()
  return (
    <AnimatePresence>
      {slideIn ? (
        <>
          <Overlay
            onClick={() => history.push(goBack)}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <PopUpMovieComp layoutId={slideIn?.params.movieId}>
            {slideDetails && (
              <>
                <PopUpMovieCover
                  style={{
                    backgroundImage: ` linear-gradient(to top, transparent,transparent), url(${makeImage(
                      slideDetails.backdrop_path || slideDetails.poster_path
                    )})`,
                  }}
                />
                <PopUpMovieTitle>{slideDetails.title}</PopUpMovieTitle>
                <PopUpMovieOverview>
                  {slideDetails.overview !== '' &&
                  slideDetails.overview.length > 150
                    ? `${slideDetails.overview.slice(0, 150)}...`
                    : slideDetails.overview}
                </PopUpMovieOverview>
                <PopUpMovieReleaseDate>
                  Date Of Release : {slideDetails.release_date}
                </PopUpMovieReleaseDate>
                <PopUpMoviePopularity>
                  Popularity : {Math.round(slideDetails.popularity)}
                </PopUpMoviePopularity>
                <PopUpMovieOrigin>
                  Movie Language : {slideDetails.original_language}
                </PopUpMovieOrigin>
                <PopUpMovieVoteAverage>
                  Movie Votes : {slideDetails.vote_average}
                </PopUpMovieVoteAverage>
              </>
            )}
          </PopUpMovieComp>
        </>
      ) : (
        'Sorry we have no data for this'
      )}
    </AnimatePresence>
  )
}

export default Overlaid
