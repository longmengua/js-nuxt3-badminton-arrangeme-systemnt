<script setup lang="ts">
  import { useOauth } from '~/composables/auth';
  const auth = useOauth();

  const handleLoginClick = async () => {
    auth.value = !auth.value;
    await navigateTo({
      path: '/dashboard',
      query: {
        page: 1,
        sort: 'asc'
      }
    });
  };
</script>

<template>
  <div class="p-4">
    <h1>Login State: {{ auth }}</h1>
    <br />
    <div 
      @click="handleLoginClick"
      class="bg-sky-500 rounded-[5px] inline-block px-[7px] cursor-pointer active:bg-sky-400 text-white active:text-sky-800"
    >Login</div>
  </div>
</template>
