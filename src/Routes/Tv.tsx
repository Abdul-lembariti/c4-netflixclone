import { useQuery } from 'react-query'
import {
  TMDBdata,
  getAiringTodayTV,
  getLatestTV,
  getPopularTV,
  getTopRatedTV,
} from '../api'
import { useRouteMatch } from 'react-router-dom'
import {
  Banner,
  Latest,
  Loader,
  OnAir,
  Overview,
  SectionHeader,
  Title,
  Toprated,
  Upcoming,
  Wrapper,
} from './Home'
import { makeImage } from '../utilitis'
import Slides from '../Components/Slides'
import Overlaid from '../Components/overlaid'

export default function Tv() {
  const MultQuery = () => {
    const AiringToday = useQuery<TMDBdata>(['Air', 'TV'], getAiringTodayTV)
    const Popular = useQuery<TMDBdata>(['Popularity', 'TV'], getPopularTV)
    const TopRated = useQuery<TMDBdata>(['TopRated', 'TV'], getTopRatedTV)
    const LatestTv = useQuery<TMDBdata>(['LatestTV', 'TV'], getLatestTV)
    return [AiringToday, Popular, TopRated, LatestTv]
  }
  const [
    { isLoading: loadingTopRatedTv, data: topratedTvData },
    { isLoading: loadingPopularTv, data: popularTvData },
    { isLoading: loadingTopAirTv, data: airTvData },
    { isLoading: loadingLatestTv, data: latestTvData },
  ] = MultQuery()

  const slideIn = useRouteMatch<{ tvId: string }>('/tv/:tvId')
  const focusedTv =
    (slideIn?.params.tvId &&
      topratedTvData?.results.find(
        (tv) => tv.id + '' === slideIn?.params.tvId
      )) ||
    popularTvData?.results.find((tv) => tv.id + '' === slideIn?.params.tvId) ||
    airTvData?.results.find((tv) => tv.id + '' === slideIn?.params.tvId)

  return (
    <Wrapper>
      {loadingTopRatedTv ||
      loadingLatestTv ||
      loadingPopularTv ||
      loadingTopAirTv ? (
        <Loader>Loading Data..</Loader>
      ) : topratedTvData || latestTvData || popularTvData || airTvData ? (
        <>
          <Banner
            bgPhoto={makeImage(latestTvData?.results[0].backdrop_path || '')}>
            <Title>{latestTvData?.results[0].title}</Title>
            <Overview>{latestTvData?.results[0].overview}</Overview>
          </Banner>
          <Latest>
            <SectionHeader>Latest Tv</SectionHeader>
            <Slides object={latestTvData} objectPath="tv" />
          </Latest>
          <Upcoming>
            <SectionHeader>Popular Tv</SectionHeader>
            <Slides object={popularTvData} objectPath="tv" />
          </Upcoming>
          <Toprated>
            <SectionHeader>Toprated Tv</SectionHeader>
            <Slides object={topratedTvData} objectPath="tv" />
          </Toprated>
          <OnAir>
            <SectionHeader>OnAir Tv</SectionHeader>
            <Slides object={airTvData} objectPath="tv" />
          </OnAir>
          <Overlaid slideIn={slideIn} slideDetails={focusedTv} goBack="/tv" />
        </>
      ) : (
        ''
      )}
    </Wrapper>
  )
}
