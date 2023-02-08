/**
 * A set of functions called "actions" for `search`
 */

export default {
  findAll: async (ctx, next) => {
    try {
      const { query } = ctx;
const searchWord = query.word.toLowerCase()

          const materials = await strapi.entityService.findMany(
        "api::material.material",
        {
          filters:{
          $and: [
            // {
            //   isLive: {$eq: true},
            // },
            // {
            //   topics:  {$gt:0}
            // },
          ]},
          populate: '*',
        }
      );

      const songs = await strapi.entityService.findMany(
        "api::song.song",
        {
          filters:{
          $and: [
            // {
            //   isLive: {$eq: true},
            // },
            // {
            //   topics:  {$gt:0}
            // },
          ]},
          populate: '*',
        }
      );
const filteredMaterials = []
        for (let index = 0; index < materials.length; index++) {
          const material = materials[index];
          if (material.title.toLowerCase().includes(searchWord)) {
            filteredMaterials.push(material)
          }
        }

        const filteredSongs = []
        for (let index = 0; index < songs.length; index++) {
          const song = songs[index];
          if (song.title.toLowerCase().includes(searchWord)) {
            filteredSongs.push(song)
          }
        }

    ctx.body = {filteredMaterials, filteredSongs};

    } catch (err) {
      ctx.body = err;
    }
  }
};
