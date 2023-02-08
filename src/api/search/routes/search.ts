export default {
  routes: [
    {
     method: 'GET',
     path: '/search',
     handler: 'search.findAll',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
