<script setup lang="ts">
defineOptions({ name: 'rix-classic' })
import { useConfigStore } from '@/stores/modules/configStore.ts'
const { changeLayout } = useConfigStore()
</script>
<template>
	<div class="container" @click="changeLayout">经典布局</div>
</template>

<style scoped></style>
