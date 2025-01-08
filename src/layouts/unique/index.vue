<script setup lang="ts">
defineOptions({ name: 'rix-unique' })
import { useConfigStore } from '@/stores/modules/configStore.ts'
const { changeLayout } = useConfigStore()
</script>
<template>
	<div class="container" @click="changeLayout">特色布局</div>
</template>

<style scoped></style>
