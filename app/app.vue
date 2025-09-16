<template>
  <div style="padding:16px; display:flex; flex-direction:column; gap:12px">
    <div style="display:flex; gap:8px; flex-wrap:wrap">
      <button @click="call('GET')">GET /api/test</button>
      <button @click="call('POST')">POST /api/test</button>
      <button @click="call('PUT')">PUT /api/test</button>
      <button @click="call('PATCH')">PATCH /api/test</button>
      <button @click="call('DELETE')">DELETE /api/test</button>
    </div>

    <div v-if="error" style="color:#b00020">Error: {{ error }}</div>

    <pre v-if="result" style="background:#111; color:#0f0; padding:12px; border-radius:6px; overflow:auto; max-height:50vh">{{ formatted }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const result = ref<any>(null)
const error = ref<string | null>(null)

async function call(method: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE') {
  error.value = null
  result.value = null
  try {
    const { $csrfFetch } = useNuxtApp()
    const data = await $csrfFetch('/api/test', { method })
    result.value = data
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Request failed'
  }
}

const formatted = computed(() => result.value ? JSON.stringify(result.value, null, 2) : '')
</script>
