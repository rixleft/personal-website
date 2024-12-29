<template>
	<div>
		<router-view v-slot="{ Component }">
			<keep-alive :include="cacheList">
				<component :is="Component"></component>
			</keep-alive>
		</router-view>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'rix-app'
})
import { useCacheStore } from '@/stores/cacheStore'
const { cacheList } = useCacheStore()
</script>
<style scoped></style>
