import { watch, provide, computed, onActivated, onDeactivated, onBeforeUnmount, defineComponent, type InjectionKey, type CSSProperties, type ExtractPropTypes } from 'vue'
import { makeStringProp } from '@/utils/helper'

const name = 'rix-config-provider'

/**
 * 将输入的字符串转换为短横线风格的小写字符串
 * 这种风格常用于URL、CSS属性名等场景中
 * "userName" → "-userName" → "-user-name" → "user-name"
 *
 * @param str 待转换的字符串
 * @returns 转换后的短横线风格的小写字符串
 */
function kebabCase(str: string) {
	// 将所有大写字母前面添加短横线，并将其转换为小写
	return (
		str
			.replace(/([A-Z])/g, '-$1')
			.toLowerCase()
			// 移除字符串开头可能的短横线
			.replace(/^-/, '')
	)
}
export type ConfigProviderProvide = {
	iconPrefix?: string
}

export const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderProvide> = Symbol(name)

export const configProviderProps = {
	tag: makeStringProp<keyof HTMLElementTagNameMap>('div'),
	theme: makeStringProp<ThemeProvider.ThemeType>('light'),
	themeVars: Object as ThemeProvider.ThemeVars,
	themeVarsDark: Object as ThemeProvider.ThemeVars,
	themeVarsLight: Object as ThemeProvider.ThemeVars,
	themeVarsScope: makeStringProp<ThemeProvider.ThemeVarsScope>('local'),
	iconPrefix: String
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

/**
 * 在字符串中的字母和数字之间插入短横线
 *
 * 此函数旨在处理特定格式的字符串，即在字母和数字相邻的情况下，在它们之间插入短横线
 * 它通过正则表达式匹配字母和数字相邻的情况，并在它们之间插入短横线，以提高字符串的可读性或满足特定的格式需求
 *  `gray1` → `gray-1`
 *
 * @param str 需要处理的字符串，预期包含字母和数字
 * @returns 返回处理后的字符串，字母和数字之间插入了短横线
 */
function insertDash(str: string) {
	return str.replace(/([a-zA-Z])(\d)/g, '$1-$2')
}

/**
 * 将主题变量映射到CSS变量
 *
 * 此函数接收一个对象themeVars作为参数，该对象包含一系列主题变量作为键值对
 * 它的作用是将这些变量转换为CSS自定义属性（CSS Variables），并以新的格式返回
 *
 * @param themeVars 一个包含主题变量的对象，其中键是变量名，值是变量的数值
 * @returns 返回一个包含CSS自定义属性的对象，键是以'--rix-'为前缀的变量名，值与输入相同
 */
function mapThemeVarsToCSSVars(themeVars: Record<string, Numeric>) {
	// 初始化一个空对象，用于存储转换后的CSS变量
	const cssVars: Record<string, Numeric> = {}

	// 遍历输入的主题变量对象的每个键
	Object.keys(themeVars).forEach(key => {
		// 将键（变量名）转换为CSS变量的格式，包括插入中划线和使用小写字母
		const formattedKey = insertDash(kebabCase(key))

		// 在CSS变量对象中添加新的键值对，键以'--rix-'为前缀，值为原始主题变量的值
		cssVars[`--rix-${formattedKey}`] = themeVars[key]
	})
	// 返回包含所有转换后的CSS变量的对象
	return cssVars
}

/**
 * 在根元素上同步主题变量
 * 该函数用于更新或移除浏览器根元素上的CSS变量，以实现主题变量的同步
 * 它会比较新旧样式对象中的属性值，更新发生变化的属性，并移除新样式中不存在的属性
 *
 * @param newStyle 一个包含新样式变量的对象，键为变量名，值为变量的数值
 * @param oldStyle 一个包含旧样式变量的对象，结构与newStyle相同
 */
function syncThemeVarsOnRoot(newStyle: Record<string, Numeric> = {}, oldStyle: Record<string, Numeric> = {}) {
	// 遍历新样式对象，更新或添加根元素上的CSS变量
	Object.keys(newStyle).forEach(key => {
		// 当新旧样式的值不相同时，更新根元素上的CSS变量
		if (newStyle[key] !== oldStyle[key]) {
			document.documentElement.style.setProperty(key, newStyle[key] as string)
		}
	})
	// 遍历旧样式对象，移除新样式中不存在的CSS变量
	Object.keys(oldStyle).forEach(key => {
		// 当新样式对象中不存在某个属性时，从根元素上移除该CSS变量
		if (!newStyle[key]) {
			document.documentElement.style.removeProperty(key)
		}
	})
}

export default defineComponent({
	name,

	props: configProviderProps,

	setup(props, { slots }) {
		const style = computed<CSSProperties | undefined>(() => mapThemeVarsToCSSVars(Object.assign({}, props.themeVars, props.theme === 'dark' ? props.themeVarsDark : props.themeVarsLight)))

		if (typeof window !== 'undefined') {
			const addTheme = () => {
				document.documentElement.classList.add(`rix-theme-${props.theme}`)
			}
			const removeTheme = (theme = props.theme) => {
				document.documentElement.classList.remove(`rix-theme-${theme}`)
			}

			watch(
				() => props.theme,
				(newVal, oldVal) => {
					if (oldVal) {
						removeTheme(oldVal)
					}
					addTheme()
				},
				{ immediate: true }
			)

			onActivated(addTheme)
			onDeactivated(removeTheme)
			onBeforeUnmount(removeTheme)

			watch(style, (newStyle, oldStyle) => {
				if (props.themeVarsScope === 'global') {
					syncThemeVarsOnRoot(newStyle as Record<string, Numeric>, oldStyle as Record<string, Numeric>)
				}
			})

			watch(
				() => props.themeVarsScope,
				(newScope, oldScope) => {
					if (oldScope === 'global') {
						// remove on Root
						syncThemeVarsOnRoot({}, style.value as Record<string, Numeric>)
					}
					if (newScope === 'global') {
						// add on root
						syncThemeVarsOnRoot(style.value as Record<string, Numeric>, {})
					}
				}
			)

			if (props.themeVarsScope === 'global') {
				// add on root
				syncThemeVarsOnRoot(style.value as Record<string, Numeric>, {})
			}
		}
		provide(CONFIG_PROVIDER_KEY, props)

		return () => <props.tag style={props.themeVarsScope === 'local' ? style.value : undefined}>{slots.default?.()}</props.tag>
	}
})
