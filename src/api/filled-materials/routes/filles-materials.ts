export default {
  routes: [
    {
      method: 'GET',
      path: '/filled-materials',
      handler: 'filled-materials.topics',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    }
  ]
}
