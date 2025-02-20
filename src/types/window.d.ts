declare global {
	interface Navigator {
		msSaveOrOpenBlob: (blob: Blob, fileName: string) => void
		browserLanguage: string
	}
	interface Window {
		SpeechRecognition: typeof SpeechRecognition
		webkitSpeechRecognition: typeof webkitSpeechRecognition
	}
	interface SpeechRecognition {
		start(): void
		stop(): void
		// 添加其他方法和属性
		onresult: (event: SpeechRecognitionEvent) => void
		onerror: (event: SpeechRecognitionError) => void
		onend: () => void
		lang: string
		continuous: boolean
		interimResults: boolean
	}

	// 为 webkitSpeechRecognition 添加特定属性
	interface webkitSpeechRecognition extends SpeechRecognition {
		// 例如，添加一个特定的方法
		someWebkitSpecificMethod(): void
	}

	interface SpeechRecognitionEvent {
		resultIndex: number
		results: SpeechRecognitionResultList
	}

	interface SpeechRecognitionResultList {
		[index: number]: SpeechRecognitionResult
	}

	interface SpeechRecognitionResult {
		isFinal: boolean
		[0]: SpeechRecognitionAlternative
	}

	interface SpeechRecognitionAlternative {
		transcript: string
		confidence: number
	}

	interface SpeechRecognitionError {
		error: string // 错误类型
		message: string // 错误信息
	}
}

export {}
