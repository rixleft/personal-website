module.exports = {
	map: true,
	plugins: {
		'@csstools/postcss-global-data': {
			files: ['./src/styles/custom-media.css']
		},
		'postcss-preset-env': {
			stage: 2
		},
		cssnano: {
			preset: 'default'
		},
		'postcss-pxtorem': {
			rootValue: 37.5, // 设计稿尺寸375px
			propList: ['*'],
			mediaQuery: true
		}
	}
}
