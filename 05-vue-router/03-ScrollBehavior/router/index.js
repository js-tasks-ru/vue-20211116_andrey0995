import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/03-ScrollBehavior'),

  scrollBehavior(to, from, savedPosition) {
/*
- При переходе по умолчанию положение должно быть в начале страницы
- При переходе назад/вперёд с `savedPosition` положение на странице должно оставаться на `savedPosition`;
- При переходе на маршрут с `hash` положение на странице должно определяться блоком с идентификатором `hash`;
- При переходе между маршрутами c истинными meta свойствами saveScrollPosition у обоих маршрутов положение на странице
  не должно изменяться.
*/ 
   
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
      }
    } else if (to.meta.saveScrollPosition && from.meta.saveScrollPosition ) {
      return false;
    } else {
      return {
        left: 0, top: 0
      }
    }
  },    
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageMeetups'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      component: () => import('../views/PageMeetup'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/PageMeetupDescription'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/PageMeetupAgenda'),
        },
      ],
    },
  ],
});
