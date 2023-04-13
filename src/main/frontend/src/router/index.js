import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/authStore.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginView
    },

    {
      path: "/session",
      name: "LayoutSession",
      component: () => import('../layouts/LayoutSession.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('../layouts/userLayout/UserLayout.vue'),
          meta: { requiresAuth: true },
          children: [
            // aqui es donde deben ir todas las vistas que tiene el usuario
            {
              path: 'MyRequests',
              name: 'myRequests',
              component: () => import('../views/EmployeView.vue'),
              meta: { requiresAuth: true },
            }
          ]
        },
        {
          path: 'responsable',
          name: 'responsable',
          component: () => import('../layouts/ResponsableLayout/ResponsableLayout.vue'),
          meta: { requiresAuth: true },
          children: [
            // aqui es donde deben ir todas las vistas que tiene el responsable
            {
              path: 'requestlist',
              name: 'requestListView',
              component: () => import('../views/HeadOfSchool/RequestListView.vue'),
              meta: { requiresAuth: true }
            },
            {
              path: 'requestDetails',
              name: 'requestDetailsView',
              component: () => import('../views/HeadOfSchool/RequestDetailsView.vue'),
              meta: { requiresAuth: true }
            },
            {
              path: 'employeSection',
              name: 'employeResponsableView',
              component: () => import('../views/EmployeView.vue'),
              meta: { requiresAuth: true }
            }
          ]
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('../layouts/superAdminLayout/SuperAdminLayout.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: 'createUser',
              name: 'createUserView',
              component: () => import('../views/Admin/CreateUserView.vue'),
              meta: { requiresAuth: true }
            },
            {
              path: 'requestList',
              name: 'requestListViewAdmin',
              component: () => import('../views/Admin/RequestListViewAdmin.vue'),
              meta: { requiresAuth: true }
            },
            {
              path: 'stadistic',
              name: 'stadisticsView',
              component: () => import('../views/Admin/StatisticsView.vue'),
              meta: { requiresAuth: true }
            },
            {
              path: 'usersList',
              name: 'userListView',
              component: () => import('../views/Admin/UserListView.vue'),
              meta: { requiresAuth: true }
            },
            {
              path: 'usersDetails',
              name: 'userDetailsView',
              component: () => import('../views/Admin/UserInfoView.vue'),
              meta: { requiresAuth: true }
            },
            {
              path:'infoSolicitud',
              name: 'infoSolicitudView',
              component: () => import('../views/Admin/InfoSolicitudView.vue'),
              meta: { requiresAuth: true }
            },
            {
              path: 'createTeams',
              name: 'createTeamsView',
              component: () => import('../views/Admin/CreateTeamsView.vue'),
              meta: {requiresAuth: true}
            }
          ]
        }
      ]
    }
  ]
});
router.beforeEach((to, from) => {
  const loginStore = useAuthStore()

  if(to.meta.requiresAuth && !loginStore.isAuthenticated) return {name: 'login'}
  if(to.name == 'LayoutSession' && loginStore.roleLogin == 'ROLE_USER') router.push({name:'myRequests'})
  if(to.name == 'LayoutSession' && loginStore.roleLogin == 'ROLE_RESPONSABLE') router.push({name:'requestListView'})
  if(to.name == 'LayoutSession' && loginStore.roleLogin == 'ROLE_ADMIN') {
    console.log('admin');
    router.push({name:'createUserView'})
  }
})

export default router
