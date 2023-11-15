import { createRouter, createWebHistory } from 'vue-router'
import HomeAdminView from '../views/HomeAdminView.vue'
import Login from '../views/LoginView.vue'
import HomeEmployView from '../views/HomeEmployView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/empleado',
      name: 'empleado',
      component: HomeEmployView,
      meta: { requiresAuth: true, roles: ['empleado'] }
    },
    {
      path: '/admin',
      name: 'admin',
      component: HomeAdminView,
      meta: { requiresAuth: true, roles: ['Administrador'] }
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