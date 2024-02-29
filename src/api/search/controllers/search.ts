/**
 * A set of functions called "actions" for `search`
 */

export default {
  findAll: async (ctx, next) => {
    try {
      const { query } = ctx
      const searchWord = query.word.toLowerCase()

      const materials = await strapi.entityService.findMany('api::material.material', {
        filters: {
          $and: [
            // {
            //   isLive: {$eq: true},
            // },
            // {
            //   topics:  {$gt:0}
            // },
          ]
        },
        populate: '*'
      })

      const songs = await strapi.entityService.findMany('api::song.song', {
        filters: {
          $and: [
            // {
            //   isLive: {$eq: true},
            // },
            // {
            //   topics:  {$gt:0}
            // },
          ]
        },
        populate: '*'
      })

      const videos = await strapi.entityService.findMany('api::video.video', {
        filters: {
          $and: [
            // {
            //   isLive: {$eq: true},
            // },
            // {
            //   topics:  {$gt:0}
            // },
          ]
        },
        populate: '*'
      })

      const filteredMaterials = []

      for (let index = 0; index < ((materials as any[]).length as number); index++) {
        const material = materials[index]

        if (material.title?.toLowerCase().includes(searchWord)) {
          filteredMaterials.push(material)
        } else if (material.text?.toLowerCase().includes(searchWord)) {
          filteredMaterials.push(material)
        } else if (material.topics?.find((t) => t.title?.toLowerCase().includes(searchWord))) {
          filteredMaterials.push(material)
        }
      }

      const filteredSongs = []
      for (let index = 0; index < (songs.length as number); index++) {
        const song = songs[index]
        if (song.title?.toLowerCase().includes(searchWord)) {
          filteredSongs.push(song)
        } else if (song.text?.toLowerCase().includes(searchWord)) {
          filteredSongs.push(song)
        } else if (song.topics?.find((t) => t.title?.toLowerCase().includes(searchWord))) {
          filteredSongs.push(song)
        }
      }

      const filteredVideos = []
      for (let index = 0; index < (videos.length as number); index++) {
        const video = videos[index]
        if (video.title?.toLowerCase().includes(searchWord)) {
          filteredVideos.push(video)
        } else if (video.topics?.find((t) => t.title?.toLowerCase().includes(searchWord))) {
          filteredVideos.push(video)
        }
      }

      ctx.body = { materials: filteredMaterials, songs: filteredSongs, videos: filteredVideos }
    } catch (err) {
      ctx.body = err
    }
  }
}
