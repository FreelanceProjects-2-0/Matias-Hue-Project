import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const TITLE_PREFIX = 'Matias Hue';
const DEFAULT_TITLE = 'System';

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/FrontPage.vue'),
      },
      {
        path: '/lights',
        name: 'Lights',
        component: () => import('@/views/LightsVue.vue'),
      },
      {
        path: '/rooms',
        name: 'Rooms',
        component: () => import('@/views/RoomsVue.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title ? `${TITLE_PREFIX} - ${to.meta.title}` : `${TITLE_PREFIX} - ${DEFAULT_TITLE}`;
  });
});

// Tests to prevent redundant routing

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return new Promise((resolve, reject) => {
    originalPush.call(
      this,
      location,
      () => {
        // on complete

        resolve(this.currentRoute);
      },
      (error) => {
        // only ignore NavigationDuplicated error
        if (error.name === 'NavigationDuplicated') {
          resolve(this.currentRoute);
        } else {
          reject(error);
        }
      }
    );
  });
};

export default router;
