<template>
	<div class="rix-home">
		<component :is="LayoutComponents[layout]" />
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'rix-home'
})
import type { Component } from 'vue'
import { storeToRefs } from 'pinia'
import Unique from '@/layouts/unique/index.vue'
import Classic from '@/layouts/classic/index.vue'
import { useConfigStore } from '@/stores/modules/configStore.ts'
const { layout } = storeToRefs(useConfigStore())
const LayoutComponents: Record<Layout.LayoutType, Component> = {
	classic: Classic,
	unique: Unique
}
</script>
<style scoped lang="scss">
@use './index.scss';
</style>
