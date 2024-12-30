export const animeQueries = {
	homePage: `
        query($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextYear: Int) {
          trending: Page(page: 1, perPage: 6) {
            media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
              ...media
            }
          }
          season: Page(page: 1, perPage: 6) {
            media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
              ...media
            }
          }
          nextSeason: Page(page: 1, perPage: 6) {
            media(season: $nextSeason, seasonYear: $nextYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
              ...media
            }
          }
          popular: Page(page: 1, perPage: 6) {
            media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
              ...media
            }
          }
          top: Page(page: 1, perPage: 6) {
            media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
              ...media
            }
          }
        }

        fragment media on Media {
          id
          title {
            userPreferred
          }
          coverImage {
            extraLarge
            large
            color
          }
        }
    `,
	animeDetails: `
        query media($id: Int, $type: MediaType, $isAdult: Boolean) {
            Media(id: $id, type: $type, isAdult: $isAdult) {
                id
                title {
                  english
                }
                coverImage {
                  extraLarge
                }
                bannerImage
                startDate {
                  year
                  month
                  day
                }
                endDate {
                  year
                  month
                  day
                }
                description
                season
                seasonYear
                type
                format
                episodes
                duration
                status
                source
                genres
                meanScore
            }
        }
    `,
};
