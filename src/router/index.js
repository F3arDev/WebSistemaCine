import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/LoginView.vue'


import HomeAdmin from '../views/AdminViews/Home.vue'

import adminhomeView from '../views/AdminViews/HomeView.vue'
import adminCartelerasView from '../views/AdminViews/CartelerasView.vue'
import adminPeliculas from '../views/AdminViews/PeliculasView.vue'
import adminSalaCine from '../views/AdminViews/SalaCine.vue'




import HomeEmploy from '../views/EmployViews/Home.vue'
import HomeEmployView from '../views/EmployViews/HomeEmployView.vue'
import employBoletosView from '../views/EmployViews/BoletosView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Login path
    {
      path: '/',
      name: 'login',
      component: Login
    },
    //admin path
    {
      path: '/admin',
      name: 'admin',
      component: HomeAdmin,
      redirect: '/admin/home',
      children: [
        { path: 'home', name: 'AdminHome', component: adminhomeView },
        { path: 'carteleras', name: 'AdminCarteleras', component: adminCartelerasView },
        { path: 'peliculas', name: 'AdminPeliculas', component: adminPeliculas },
        { path: 'salaCine', name: 'AdminSalaCine', component: adminSalaCine }
      ]
      // meta: { requiresAuth: true, roles: ['Administrador'] }
    },
    //employs path
    {
      path: '/employ',
      name: 'employ',
      component: HomeEmploy,
      redirect: '/employ/home',
      children: [
        { path: 'home', name: 'Employhome', component: HomeEmployView },
        { path: 'boletos', name: 'EmployBoletos', component: employBoletosView }
      ]
      // meta: { requiresAuth: true, roles: ['Administrador'] }
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verifica si el usuario tiene un token válido
    const userToken = getUserToken();

    if (userToken) {
      // El usuario tiene un token válido, ahora verifica el rol
      const userRole = getUserRole();

      // Compara el rol con los roles permitidos para la ruta
      if (to.meta.roles.includes(userRole)) {
        // El usuario tiene el rol adecuado, permite el acceso
        next();
      } else {
        // El usuario no tiene el rol necesario, redirige a una página de acceso denegado
        next('/access-denied');
      }
    } else {
      // El usuario no tiene un token válido, redirige a la página de inicio de sesión
      next('/login');
    }
  } else {
    // La ruta no requiere autenticación, permite el acceso
    next();
  }
});