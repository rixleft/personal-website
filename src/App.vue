<template>
	<config-provider :theme="theme" :theme-vars-scope="'global'">
		<router-view v-slot="{ Component }">
			<keep-alive :include="cacheList">
				<component :is="Component"></component>
			</keep-alive>
		</router-view>
	</config-provider>
</template>

<script setup lang="ts">
defineOptions({
	name: 'rix-app'
})
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/modules/configStore'
import ConfigProvider from '@/components/ConfigProvider'
const { cacheList, theme } = storeToRefs(useConfigStore())
</script>
