import { useQuery } from 'react-query'
import styled from 'styled-components'
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  TMDBdata,
} from '../api'
import { makeImage } from '../utilitis'
import { useRouteMatch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Slides from '../Components/Slides'
import Overlaid from '../Components/overlaid'

export const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`

export const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(170, 2, 2, 0.432), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`

export const Title = styled.h2`
  font-size: 58px;
  margin-bottom: 20px;
`

export const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`
export const Container = styled.main``

export const Toprated = styled.section`
  position: relative;
  margin-bottom: 25px;
  bottom: -400px;
`
export const Upcoming = styled.section`
  position: relative;
  bottom: -200px;
  margin-bottom: 25px;
`
export const Latest = styled.section`
  position: relative;
  margin-bottom: 25px;
  bottom: -600;
`
export const OnAir = styled.section`
  position: relative;
  margin-bottom: 25px;
  margin-top: 600px;
`

export const SectionHeader = styled.h2`
  position: absolute;
  top: -60%;
  margin-left: 35px;
  font-size: 45px;
  font-weight: 700;
  color: red;
`

const Svg = styled(motion.svg)`
  width: 100px;
  height: 100px;
`

const svg = {
  start: { pathLength: 0, fill: 'rgba(255, 255, 255, 0)' },
  end: {
    fill: 'rgba(255, 255, 255, 1)',
    pathLength: 1,
  },
}

function Home() {
  const DoubleQueries = () => {
    const popular = useQuery<TMDBdata>(['Popular', 'Movies'], getPopularMovies)
    const upComing = useQuery<TMDBdata>(
      ['Upcoming', 'Movies'],
      getUpcomingMovies
    )
    const topRated = useQuery<TMDBdata>(
      ['TopRated', 'Movies'],
      getTopRatedMovies
    )
    return [popular, upComing, topRated]
  }

  const [
    { isLoading: loadingLatestData, data: latestMovieData },
    { isLoading: loadingUpcomingData, data: upcomingMoviesData },
    { isLoading: loadingTopratedData, data: topratedMoviesData },
  ] = DoubleQueries()

  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loadingLatestData || loadingUpcomingData || loadingTopratedData) {
        setShowLoader(true)
      }
    }, 120000)

    return () => clearTimeout(timeout)
  }, [loadingLatestData, loadingUpcomingData, loadingTopratedData])

  const slideIn = useRouteMatch<{ movieId: string }>('/movie/:movieId')

  const focusedMovie =
    (slideIn?.params.movieId &&
      latestMovieData?.results.find(
        (movie) => movie.id + '' === slideIn?.params.movieId
      )) ||
    topratedMoviesData?.results.find(
      (movie) => movie.id + '' === slideIn?.params.movieId
    ) ||
    upcomingMoviesData?.results.find(
      (movie) => movie.id + '' === slideIn?.params.movieId
    )

  return (
    <Wrapper>
      {loadingLatestData || loadingUpcomingData || loadingTopratedData ? (
        showLoader && (
          <Loader>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="612"
              height="512">
              <motion.path
                variants={svg}
                initial="start"
                animate="end"
                transition={{
                  default: { duration: 5 },
                  fill: { duration: 1, delay: 3 },
                }}
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="#C5001A"
                d="M494.508 176c0 8.844-7.18 16-16 16-8.047 0-14.641-5.953-15.766-13.691C457.93 158.719 438.867 144 416 144c-26.516 0-48 19.703-48 44.004 0 17.766 11.562 32.969 28.086 39.914l-.078.215 47.18 15.516C482.969 254.391 512 288.078 512 328.008 512 376.594 469.023 416 416 416c-39 0-72.281-21.43-87.312-52.031-.836-1.086-1.586-2.25-2.133-3.57l-64.117-154.766-.094.039C244.016 160.02 201.523 128 151.992 128 85.723 128 32 185.309 32 256c0 70.688 53.723 128 119.992 128 20.496 0 39.773-5.508 56.648-15.164l.02.016c2.211-1.141 4.672-1.859 7.332-1.859 8.844 0 15.996 7.172 15.996 16 0 5.82-3.141 10.82-7.754 13.633l.074.133C202.801 409.039 178.172 416 151.992 416 68.055 416 0 344.359 0 256S68.055 96 151.992 96c62.176 0 115.586 39.352 139.109 95.613.234.445.523.852.719 1.316l64.133 154.844.195-.078C365.266 368.891 388.578 384 416 384c35.352 0 64-25.078 64-55.992 0-24.062-17.414-44.445-41.758-52.383-.211-.055-.422-.055-.641-.133l-45.789-15.055c-.031-.016-.055 0-.094-.016l-7.312-2.406c-1.32-.422-2.5-1.047-3.609-1.766a81.805 81.805 0 0 1-10.258-5.742c.062-.016.102-.07.156-.094-12.977-8.516-23.195-20.52-29.094-34.598-.133-.293-.227-.602-.344-.895a69.008 69.008 0 0 1-2.406-7.078c-.211-.734-.391-1.434-.586-2.172a76.83 76.83 0 0 1-1.336-6.633c-.117-.68-.25-1.375-.328-2.074-.367-2.949-.602-5.914-.602-8.961C336 146.016 371.82 112 416 112c39.023 0 71.445 26.551 78.523 61.672l-.25.039c.118.758.235 1.512.235 2.289zM272 336c8.844 0 16 7.156 16 16s-7.156 16-16 16-16-7.156-16-16 7.156-16 16-16z"
              />
            </Svg>
          </Loader>
        )
      ) : upcomingMoviesData || latestMovieData || topratedMoviesData ? (
        <>
          <Banner
            bgPhoto={makeImage(
              latestMovieData?.results[0].backdrop_path || ''
            )}>
            <Title>{latestMovieData?.results[0].title}</Title>
            <Overview>{latestMovieData?.results[0].overview}</Overview>
          </Banner>

          <Latest>
            <SectionHeader>Latest Movies</SectionHeader>
            <Slides object={latestMovieData} objectPath="movie" />
          </Latest>

          <Upcoming>
            <SectionHeader>Upcoming Movies</SectionHeader>
            <Slides object={upcomingMoviesData} objectPath="movie" />
          </Upcoming>

          <Toprated>
            <SectionHeader>Top Rated Movies</SectionHeader>
            <Slides object={topratedMoviesData} objectPath="movie" />
          </Toprated>

          <Overlaid slideIn={slideIn} slideDetails={focusedMovie} goBack="/" />
        </>
      ) : (
        ''
      )}
    </Wrapper>
  )
}

export default Home
