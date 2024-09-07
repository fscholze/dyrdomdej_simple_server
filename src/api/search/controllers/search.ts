/**
 * A set of functions called "actions" for `search`
 */

import { isSimilar } from '../../../helper/parse-strings'

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
          ]
        },
        populate: ['keywords.title', 'categories.topic', 'categories.category', 'cover.*']
      })

      const songs = await strapi.entityService.findMany('api::song.song', {
        filters: {
          $and: [
            // {
            //   isLive: {$eq: true},
            // },
          ]
        },
        populate: ['keywords.title', 'categories.topic', 'categories.category', 'cover.*']
      })

      const videos = await strapi.entityService.findMany('api::video.video', {
        filters: {
          $and: [
            // {
            //   isLive: {$eq: true},
            // },
          ]
        },
        populate: ['keywords.title', 'categories.topic', 'categories.category', 'cover.*']
      })

      const wordingLists = await strapi.entityService.findMany('api::wording-list.wording-list', {
        filters: {
          $and: [
            // {
            //   isLive: {$eq: true},
            // },
          ]
        },
        populate: [
          'keywords.title',
          'categories.topic',
          'categories.category',
          'words.*',
          'cover.*'
        ]
      })

      const filteredMaterials = []

      for (let index = 0; index < materials.length; index++) {
        const material = materials[index]
        if (isSimilar(material.title, searchWord)) {
          filteredMaterials.push(material)
        } else if (isSimilar(material.text, searchWord)) {
          filteredMaterials.push(material)
        } else if (
          material.categories.find(
            (c) => isSimilar(c.topic?.title, searchWord) || isSimilar(c.category?.title, searchWord)
          )
        ) {
          filteredMaterials.push(material)
        } else if (material.keywords.find((c) => isSimilar(c.title, searchWord))) {
          filteredMaterials.push(material)
        }
      }

      const filteredSongs = []
      for (let index = 0; index < songs.length; index++) {
        const song = songs[index]
        if (isSimilar(song.title, searchWord)) {
          filteredSongs.push(song)
        } else if (isSimilar(song.text, searchWord)) {
          filteredSongs.push(song)
        } else if (
          song.categories.find(
            (c) => isSimilar(c.topic?.title, searchWord) || isSimilar(c.category?.title, searchWord)
          )
        ) {
          filteredSongs.push(song)
        } else if (song.keywords.find((c) => isSimilar(c.title, searchWord))) {
          filteredSongs.push(song)
        }
      }

      const filteredVideos = []
      for (let index = 0; index < videos.length; index++) {
        const video = videos[index]
        if (isSimilar(video.title, searchWord)) {
          filteredVideos.push(video)
        } else if (
          video.categories.find(
            (c) => isSimilar(c.topic?.title, searchWord) || isSimilar(c.category?.title, searchWord)
          )
        ) {
          filteredVideos.push(video)
        } else if (video.keywords.find((c) => isSimilar(c.title, searchWord))) {
          filteredVideos.push(video)
        }
      }

      const filteredWordingLists = []
      for (let index = 0; index < wordingLists.length; index++) {
        const wordingList = wordingLists[index]
        if (isSimilar(wordingList.title, searchWord)) {
          filteredWordingLists.push(wordingList)
        } else if (
          wordingList.categories.find(
            (c) => isSimilar(c.topic?.title, searchWord) || isSimilar(c.category?.title, searchWord)
          )
        ) {
          filteredWordingLists.push(wordingList)
        } else if (wordingList.keywords.find((c) => isSimilar(c.title, searchWord))) {
          filteredWordingLists.push(wordingList)
        }
      }

      console.log({ filteredWordingLists, wordingLists })
      ctx.body = {
        materials: filteredMaterials.map((s) => ({
          id: s.id,
          attributes: {
            ...s,
            cover: { data: { attributes: s.cover } },
            downloads: s.downloads
              ? s.downloads.map((d) => ({ data: { attributes: d } }))
              : { data: null }
          }
        })),
        songs: filteredSongs.map((s) => ({
          id: s.id,
          attributes: {
            ...s,
            cover: { data: { attributes: s.cover } },
            downloads: s.downloads
              ? s.downloads.map((d) => ({ data: { attributes: d } }))
              : { data: null }
          }
        })),
        videos: filteredVideos.map((s) => ({
          id: s.id,
          attributes: {
            ...s
          }
        })),
        wordingLists: filteredWordingLists.map((s) => ({
          id: s.id,
          attributes: {
            ...s,
            cover: { data: { attributes: s.cover } },
            words: s.words,
            downloads: s.downloads
              ? s.downloads.map((d) => ({ data: { attributes: d } }))
              : { data: null }
          }
        }))
      }
    } catch (err) {
      ctx.body = err
    }
  }
}
