<script setup lang="ts">
defineOptions({ name: 'rix-classic' })
import { useConfigStore } from '@/stores/modules/configStore.ts'
const { changeTheme } = useConfigStore()
import { ref } from 'vue'

// 定义响应式变量
const isRecording = ref(false)
const transcript = ref('')
const isSupported = ref(false)
let recognition: Window['SpeechRecognition'] | Window['webkitSpeechRecognition'] | undefined

// 检查浏览器是否支持语音识别
if ('webkitSpeechRecognition' in window) {
	recognition = new (window as Window)['webkitSpeechRecognition']() as Window['webkitSpeechRecognition']
	isSupported.value = true
} else if ('SpeechRecognition' in window) {
	recognition = new (window as Window)['SpeechRecognition']() as Window['SpeechRecognition']
	isSupported.value = true
}

if (isSupported.value) {
	// 设置识别语言为中文
	recognition.lang = 'zh-CN'
	// 连续识别，直到手动停止
	recognition.continuous = true
	// 即时返回识别结果
	recognition.interimResults = false

	// 监听语音识别结果事件
	recognition.onresult = (event: SpeechRecognitionEvent) => {
		let finalTranscript = ''
		for (let i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				finalTranscript += event.results[i][0].transcript
			}
		}

		transcript.value = finalTranscript
	}

	// 监听语音识别错误事件
	recognition.onerror = (event: SpeechRecognitionError) => {
		console.error('语音识别发生错误:', event.error)
		isRecording.value = false
	}

	// 监听语音识别结束事件
	recognition.onend = () => {
		isRecording.value = false
	}
}

// 切换录制状态的函数
const toggleRecording = () => {
	if (!isSupported.value) return

	if (isRecording.value) {
		// 停止录制
		recognition.stop()
		isRecording.value = false
	} else {
		// 开始录制
		transcript.value = ''
		recognition.start()
		isRecording.value = true
	}
}
</script>
<template>
	<div class="container" @click="changeTheme">经典布局</div>
	<div>
		<button @click="toggleRecording" :disabled="!isSupported">
			{{ isRecording ? '停止录制' : '开始录制' }}
		</button>
		<div v-if="transcript">{{ transcript }}</div>
		<div v-if="!isSupported" style="color: red">您的浏览器不支持语音识别功能，请更换浏览器重试。</div>
	</div>
</template>
