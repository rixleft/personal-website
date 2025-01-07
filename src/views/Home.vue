<template>
	<div class="rix-home" @click="changeTheme">点我切换主题</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'rix-home'
})
import { useConfigStore } from '@/stores/modules/configStore'
const { changeTheme } = useConfigStore()
</script>
<style scoped lang="scss">
@media (--phone) {
	.rix-home {
		width: 100vw;
		height: 100vh;
		font-size: 24px;
		color: var(--rix-primary-100);
		background-color: var(--rix-bg-100);
	}
}

@media (--tablet) {
	.rix-home {
		width: 100vw;
		height: 100vh;
		font-size: 24px;
		color: var(--rix-primary-200);
		background-color: var(--rix-bg-200);
	}
}

@media (--desktop) {
	.rix-home {
		width: 100vw;
		height: 100vh;
		font-size: 24px;
		color: var(--rix-primary-300);
		background-color: var(--rix-bg-300);
	}
}
</style>
