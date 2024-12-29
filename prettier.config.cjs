module.exports = {
  // 指定 JSON 架构文件的 URL，用于验证此配置文件的格式。这里使用的是 Prettier 的官方 JSON 架构。
	$schema: 'https: //json.schemastore.org/prettierrc',
  // 是否在每行末尾添加分号。false 表示不添加分号。
	semi: false,
  // 是否使用单引号代替双引号。true 表示使用单引号。
	singleQuote: true,
  // 每行代码的最大长度。超过这个长度的代码会被自动换行。这里设置为 200 个字符。
	printWidth: 200,
  // 一个 Tab 键等于多少个空格。这里设置为 2 个空格。
	tabWidth: 2,
  // 是否使用 Tab 键缩进。false 表示使用空格缩进。
	useTabs: true,
  // (x) => {} 箭头函数参数只有一个时是否要有小括号 (avoid：省略括号，always：不省略括号)
	arrowParens: 'avoid',
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }" (true：有，false：没有)
	bracketSpacing: true,
  // 行尾序列的格式。auto 表示自动检测行尾序列（LF 或 CRLF）。
	endOfLine: 'auto',
  // 用于覆盖特定文件类型的格式化规则。这里定义了对 Markdown 文件（*.md）的格式化规则，将 printWidth 设置为 1000 个字符。
	overrides: [
    {
			files: '*.md',
			options: {
				printWidth: 1000
      }
    }
  ],
  // 在对象字面量中决定是否将属性名用引号括起来 可选值 "<as-needed|consistent|preserve>"
	quoteProps: 'as-needed',
  // 在JSX中使用单引号而不是双引号 (true：单引号，false：双引号)
	jsxSingleQuote: false,
  // 多行时尽可能打印尾随逗号 可选值"<none|es5|all>"
	trailingComma: 'none',
  // 将 > 多行元素放在最后一行的末尾，而不是单独放在下一行 (true：放末尾，false：单独一行)
	bracketSameLine: true,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
	requirePragma: false,
  // 可以在文件顶部插入一个特殊标记，指定该文件已使用 Prettier 格式化
	insertPragma: false,
  // 用于控制文本是否应该被换行以及如何进行换行
	proseWrap: 'preserve',
  // 在html中空格是否是敏感的 "css" - 遵守 CSS 显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
	htmlWhitespaceSensitivity: 'css',
  // 控制在 Vue 单文件组件中 <script> 和 <style> 标签内的代码缩进方式
	vueIndentScriptAndStyle: false,
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码 (rangeStart：开始，rangeEnd：结束)
	rangeStart: 0,
	rangeEnd: Infinity
}
