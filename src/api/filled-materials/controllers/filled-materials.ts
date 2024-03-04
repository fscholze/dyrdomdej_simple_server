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

      const mappedTopics = new Map()
      const collectionTopics = new Map()
      const collectionCategories = new Map()
      const collectionSubCategories = new Map()

      await materials.forEach((material) => {
        const categories = material.categories
        //      |-cat1
        //        |-cat2
        //          |-cat3
        categories.forEach((item) => {
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
        })
      })

      const jsonResult = []
      mappedTopics.forEach((value, key) => {
        const mappedTopic = {}
        mappedTopic['id'] = key
        mappedTopic['title'] = collectionTopics.get(key).title

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
      ctx.body = { topics: jsonResult }
    } catch (err) {
      ctx.body = err
    }
  }
}
