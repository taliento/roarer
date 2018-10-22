
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MyLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // }
  {
    path: '/',
    component: () => import('layouts/Twitter.vue'),
    children: [
      {
        path: 'search/:query',
        component: () => import('pages/Statuses.vue'),
        props: true
      },
      {
        path: '',
        component: () => import('pages/Trends.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
