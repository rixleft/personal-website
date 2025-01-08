declare type Numeric = string | number

declare namespace Device {
	type DeviceType = 'phone' | 'tablet' | 'desktop'
	type Config = {
		[key in DeviceType]: {
			thresholdWidth: number
			fontSize: string
		}
	}
}
declare namespace ThemeProvider {
	type ThemeType = 'light' | 'dark'
	type ThemeVarsScope = 'local' | 'global'
	type ThemeVars = PropType<Record<string, Numeric>>
}

declare namespace Layout {
	type LayoutType = 'classic' | 'unique'
}
