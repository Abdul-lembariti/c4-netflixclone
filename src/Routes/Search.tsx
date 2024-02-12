import { useQuery } from 'react-query'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { TMDBdata, searchForMovies, searchForTvs } from '../api'
import { inputedKeyword } from '../utilitis'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Loader } from './Home'
import Slides from '../Components/Slides'
import Overlaid from '../Components/overlaid'

const SearchContainer = styled.main`
  margin-top: 100px;
`
const SearchedMovies = styled.section`
  position: relative;
  bottom: -270px;
`
const SearchedTVShows = styled(SearchedMovies)`
  bottom: -500px;
`
const SearchedTitle = styled.h2`
  position: absolute;
  top: -80%;
  font-size: 45px;
  margin-left: 15px;
  font-weight: 700;
`
const Span = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.red};
  font-size: 28px;
  animation: bounce 2s ease infinite;

  @keyframes bounce {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(0.8);
    }
  }
`

export default function Search() {
  const { search } = useLocation()
  const [keyword, setKeyword] = useRecoilState(inputedKeyword)
  setKeyword(new URLSearchParams(search).get('keyword') || '')

  const useMultipleQueries = () => {
    const movie = useQuery<TMDBdata>(['Input', 'Movie'], () =>
      searchForMovies(keyword!)
    )
    const tv = useQuery<TMDBdata>(['Input', 'Tv'], () => searchForTvs(keyword!))
    return [movie, tv]
  }
  const [
    { isLoading: loadingSearchedMovies, data: searchedMovies },
    { isLoading: loadingSearchedTV, data: searchedTvs },
  ] = useMultipleQueries()

  const slideIn = useRouteMatch<{ inputId: string }>('search/output/:inputId')

  const focusedObject =
    (slideIn?.params.inputId &&
      searchedMovies?.results.find(
        (movies) => movies.id + '' === slideIn?.params.inputId
      )) ||
    searchedTvs?.results.find((tvs) => tvs.id + '' === slideIn?.params.inputId)

  return (
    <SearchContainer>
      {loadingSearchedMovies || loadingSearchedTV ? (
        <Loader>Loading Results....</Loader>
      ) : (
        <>
          {searchedMovies?.results.length === 0 ? (
            <Span>No matched results</Span>
          ) : (
            <SearchedMovies>
              <SearchedTitle>Movies</SearchedTitle>
              <Slides object={searchedMovies} objectPath={'search/output/'} />
            </SearchedMovies>
          )}

          {searchedTvs?.results.length === 0 ? (
            <Span>No matched results</Span>
          ) : (
            <SearchedTVShows>
              <SearchedTitle>Tv Shows</SearchedTitle>
              <Slides object={searchedTvs} objectPath={'search/output/'} />
            </SearchedTVShows>
          )}
          <Overlaid
            inputId={slideIn}
            slideDetails={focusedObject}
            goBack={`/search?keyword=${keyword}`}
          />
        </>
      )}
    </SearchContainer>
  )
}
