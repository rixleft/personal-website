import { DEVICE_CONFIG } from '@/config/index'
;(function flexible(window, document) {
	const docEl = document.documentElement
	const dpr = window.devicePixelRatio || 1

	// adjust body font size
	function setBodyFontSize() {
		if (document.body) {
			document.body.style.fontSize = 12 * dpr + 'px'
		} else {
			document.addEventListener('DOMContentLoaded', setBodyFontSize)
		}
	}
	setBodyFontSize()

	// set 1rem = viewWidth / 10
	function setRemUnit() {
		for (const device in DEVICE_CONFIG) {
			if (docEl.clientWidth < DEVICE_CONFIG[device as Device.DeviceType].thresholdWidth) {
				docEl.style.fontSize = DEVICE_CONFIG[device as Device.DeviceType].fontSize === 'auto' ? docEl.clientWidth / 10 + 'px' : DEVICE_CONFIG[device as Device.DeviceType].fontSize
				break
			}
		}
	}

	setRemUnit()

	// reset rem unit on page resize
	window.addEventListener('resize', setRemUnit)
	window.addEventListener('pageshow', function (e) {
		if (e.persisted) {
			setRemUnit()
		}
	})

	// detect 0.5px supports
	if (dpr >= 2) {
		const fakeBody = document.createElement('body')
		const testElement = document.createElement('div')
		testElement.style.border = '.5px solid transparent'
		fakeBody.appendChild(testElement)
		docEl.appendChild(fakeBody)
		if (testElement.offsetHeight === 1) {
			docEl.classList.add('hairlines')
		}
		docEl.removeChild(fakeBody)
	}
})(window, document)
