export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useOauth();
  console.log('auth', auth.value)
  if (!auth.value) {
    return navigateTo('/login')
  }
})