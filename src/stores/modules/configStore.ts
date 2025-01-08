import { ref } from 'vue'
import { defineStore } from 'pinia'
import piniaPersistConfig from '@/stores/helper/persist'
export const useConfigStore = defineStore(
	'configStore',
	() => {
		const cacheList = ref<string[]>([])
		const theme = ref<ThemeProvider.ThemeType>('light')
		const layout = ref<Layout.LayoutType>('classic')
		const changeTheme = () => {
			theme.value = theme.value === 'light' ? 'dark' : 'light'
		}
		const changeLayout = () => {
			layout.value = layout.value === 'classic' ? 'unique' : 'classic'
		}
		return { theme, cacheList, layout, changeTheme, changeLayout }
	},
	piniaPersistConfig('configStore', ['theme', 'layout'])
)
