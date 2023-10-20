<script setup lang="ts">
  const route = useRoute()
</script>
<template>
  <h1>Welcome to post {{ route?.params?.id }}</h1>
</template>