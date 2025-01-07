import { ref } from 'vue'
import { defineStore } from 'pinia'
import piniaPersistConfig from '@/stores/helper/persist'
export const useConfigStore = defineStore(
	'configStore',
	() => {
		const cacheList = ref<string[]>([])
		const theme = ref<ThemeProvider.ThemeType>('light')
		const changeTheme = () => {
			theme.value = theme.value === 'light' ? 'dark' : 'light'
		}
		return { theme, cacheList, changeTheme }
	},
	piniaPersistConfig('configStore', ['theme'])
)
