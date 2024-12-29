import { TABLET_MIN_WIDTH, TABLET_MAX_WIDTH } from '@/constants/base-constant.js'
;(function flexible(window, document) {
	let docEl = document.documentElement
	let dpr = window.devicePixelRatio || 1

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
		if (docEl.clientWidth > TABLET_MAX_WIDTH) {
			docEl.style.fontSize = '64px'
			return
		}
		if (docEl.clientWidth > TABLET_MIN_WIDTH) {
			docEl.style.fontSize = '50px'
			return
		}
		let rem = docEl.clientWidth / 10
		docEl.style.fontSize = rem + 'px'
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
		let fakeBody = document.createElement('body')
		let testElement = document.createElement('div')
		testElement.style.border = '.5px solid transparent'
		fakeBody.appendChild(testElement)
		docEl.appendChild(fakeBody)
		if (testElement.offsetHeight === 1) {
			docEl.classList.add('hairlines')
		}
		docEl.removeChild(fakeBody)
	}
})(window, document)
