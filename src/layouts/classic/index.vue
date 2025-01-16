<script setup lang="ts">
defineOptions({ name: 'rix-classic' })
import { useConfigStore } from '@/stores/modules/configStore.ts'
const { changeTheme } = useConfigStore()
</script>
<template>
	<div class="container" @click="changeTheme">经典布局</div>
</template>

<style scoped></style>
