import _ from 'lodash'

const addIdToArray = (id: any, collection: any[]) => {
  return _.uniq([...collection, id])
}

export default {
  topics: async (ctx, next) => {
    try {
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
        populate: 'categories.topic,categories.category,categories.sub_category'
      })

      const wordingLists = await strapi.entityService.findMany('api::wording-list.wording-list', {
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
        populate: 'categories.topic,categories.category,categories.sub_category'
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
        populate: 'categories.topic,categories.category,categories.sub_category'
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
        populate: 'categories.topic,categories.category,categories.sub_category'
      })

      const audioImages = await strapi.entityService.findMany('api::audio-image.audio-image')

      const mappedTopics = new Map()
      const collectionTopics = new Map()
      const collectionCategories = new Map()
      const collectionSubCategories = new Map()

      const collection = [...materials, ...wordingLists, ...songs, ...videos]

      await collection.forEach((material) => {
        const categories = material.categories
        //      |-cat1
        //        |-cat2
        //          |-cat3
        categories.forEach((item) => {
          if (item.topic && item.category) {
            const topicId = item.topic.id
            const categoryId = item.category.id
            const subCategoryId = item.sub_category?.id || null

            collectionTopics.set(topicId, item.topic)
            collectionCategories.set(categoryId, item.category)
            collectionSubCategories.set(subCategoryId, item.sub_category)

            if (mappedTopics.has(topicId)) {
              const oldTopicMap = mappedTopics.get(topicId)
              if (oldTopicMap.has(categoryId)) {
                const oldCategoryArray = oldTopicMap.get(categoryId)
                const newCategoryArray = subCategoryId
                  ? addIdToArray(subCategoryId, oldCategoryArray)
                  : oldCategoryArray
                oldTopicMap.set(categoryId, newCategoryArray)
              } else {
                oldTopicMap.set(categoryId, subCategoryId ? [subCategoryId] : [])
              }
              mappedTopics.set(topicId, oldTopicMap)
            } else {
              const newCatSubMap = new Map()
              newCatSubMap.set(categoryId, subCategoryId ? [subCategoryId] : [])
              mappedTopics.set(topicId, newCatSubMap)
            }
          }
        })
      })

      const slownikTopic = await strapi.entityService.findOne('api::topic.topic', 54)

      const jsonResult = []
      mappedTopics.forEach((value, key) => {
        const mappedTopic = {}
        mappedTopic['id'] = key
        mappedTopic['title'] = collectionTopics.get(key).title
        mappedTopic['sortingKey'] = collectionTopics.get(key).sortingKey
        mappedTopic['color'] = collectionTopics.get(key).color

        const mappedCategories = []
        value.forEach((subValue, subKey) => {
          const mappedCategory = {}
          mappedCategory['id'] = subKey
          mappedCategory['title'] = collectionCategories.get(subKey).title
          mappedCategory['subCategories'] = subValue.map((subCategoryId) => {
            return {
              id: subCategoryId,
              title: collectionSubCategories.get(subCategoryId).title
            }
          })
          mappedCategories.push(mappedCategory)
        })
        mappedTopic['categories'] = mappedCategories
        jsonResult.push(mappedTopic)
      })
      const result = {
        topics: [...jsonResult]
      }

      if (slownikTopic)
        result.topics.push({
          id: slownikTopic.id,
          title: slownikTopic.title,
          sortingKey: slownikTopic.sortingKey,
          color: slownikTopic.color,
          categories: []
        })

      // Add Wimmelbilder menu point
      result.topics.push({
        id: 'WIMMELWOBRAZY',
        title: 'Wimmelbilder',
        sortingKey: 999, // Place at the end of the menu
        categories: audioImages.map((image) => ({
          id: image.id,
          title: image.title || `Wimmelbild ${image.id}`
        }))
      })

      ctx.body = result
    } catch (err) {
      ctx.body = err
    }
  }
}
