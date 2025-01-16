<script setup lang="ts">
defineOptions({ name: 'rix-unique' })
import { useConfigStore } from '@/stores/modules/configStore.ts'
const { changeTheme } = useConfigStore()
</script>
<template>
	<div class="container" @click="changeTheme">特色布局</div>
</template>

<style scoped></style>
