import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Full from '@/layout/Full'
// import Full2 from '@/layout/Full2'
// const _import = require('./_import_' + process.env.NODE_ENV)
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/retrieve',
    component: () => import('@/views/retrieve/index'),
    hidden: true
  },
  {
    path: '/password',
    component: () => import('@/views/password/index'),
    hidden: true
  },
  {
    path: '/complete',
    component: () => import('@/views/complete/index'),
    hidden: true
  },
  {
    path: '/',
    component: Full,
    redirect: '/dashboard',
    hidden: false,
    children: [{
      path: '',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'sy' }
    }]
  },
  {
    path: '/table',
    component: Full,
    redirect: 'table',
    // hidden: false,
    // name: 'Example',
    // meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: '',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '培训记录', icon: 'table' }
      }
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/index',
    component: Full,
    // hidden:false,
    children: [
      {
        path: '',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '使用手册', icon: 'form' }
      }
    ]
  },
  {
    path: '/information',
    component: Full,
    children: [
      {
        path: '',
        // name: 'Form',
        component: () => import('@/views/information/index')
        // meta: { title: '账号信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/modify',
    component: Full,
    children: [
      {
        path: '',
        // name: 'Form',
        component: () => import('@/views/modify/index')
        // meta: { title: '更改密码', icon: 'form' }
      }
    ]
  },
  {
    path: '/home1/trainingTheme_1',
    component: Full,
    redirect: '/home1/trainingTheme_1',
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/trainingTheme_1/trainingTheme_1')
    }]
  },
  {
    path: '/home1/trainingTheme_2/knowledgePoints',
    component: Full,
    redirect: '/home1/knowledgePoints',
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/trainingTheme_2/knowledgePoints')
    }]
  },
  {
    path: '/home1/trainingTheme_2/chapterExercises',
    component: Full,
    redirect: '/home1/chapterExercises',
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/trainingTheme_2/chapterExercises')
    }]
  },
  {
    path: '/home1/trainingTheme_2/chapterEvaluation',
    component: Full,
    redirect: '/home1/chapterEvaluation',
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/trainingTheme_2/chapterEvaluation')
    }]
  },
  {
    path: '/home1/trainingTheme_3',
    component: Full,
    redirect: '/home1/trainingTheme_3',
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/trainingTheme_3/trainingTheme_3')
    }]
  },
  {
    path: '/home1/trainingTheme_4',
    component: Full,
    redirect: '/home1/trainingTheme_4',
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/trainingTheme_4/trainingTheme_4')
    }]
  },
  {
    path: '/home1/trainingTheme_5',
    component: Full,
    redirect: '/home1/trainingTheme_5',
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/trainingTheme_5/trainingTheme_5')
    }]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
