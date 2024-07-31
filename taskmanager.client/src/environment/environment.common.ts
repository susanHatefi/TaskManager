export const commonEnvironment = {
  production: false,
  host: 'https://localhost:7037',
  api: '/api',
  composite: {
    feature: {
      mainUrl: '/Feature',
      create: '/create',
    },
    bug: {
      mainUrl: '/Bug',
      create: '/create',
    },
    todoTask: {
      mainUrl: '/TodoTask',
      create: '/create',
    },
    todos: {
      mainUrl: '/Todos',
      getAll: '/all',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
