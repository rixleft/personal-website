import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCacheStore = defineStore('cacheStore', () => {
	const cacheList = ref<string[]>([])
	return { cacheList }
})
