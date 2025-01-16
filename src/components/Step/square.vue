<template>
	<div class="container">
		<div v-for="(item, index) in stepList" class="grid-item" :key="index">
			<div class="step" :class="{ 'step-finished': item.status === 'finished' }" @click="handleStepClick(index)">
				{{ item.title }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'rix-step-square'
})
// 定义步骤项的类型
export interface StepSquareItem {
	title: string
	status: 'finished' | 'unfinished'
}
// 定义 props 的类型
defineProps<{
	stepList: StepSquareItem[] // 使用 StepItem 数组作为 stepList 的类型
}>()

// 步骤列表
// const stepList = ref([
//     { title: '确定意向', status: 'finished' },
//     { title: '对接洽谈', status: 'finished' },
//     { title: '项目报价', status: 'unfinished' },
//     { title: '投标对比', status: 'unfinished' },
//     { title: '合同拟定', status: 'unfinished' },
//     { title: '转化完成', status: 'finished' },
//     { title: '制定方案', status: 'unfinished' },
//     { title: '合同签订', status: 'finished' },
//     { title: '合同跟踪', status: 'finished' },
//     { title: '合同回款', status: 'unfinished' },
//     { title: '项目交付', status: 'unfinished' },
//     { title: '项目验收', status: 'unfinished' },
//     { title: '项目结束', status: 'unfinished' },
// ])

const emit = defineEmits(['stepClick'])
const handleStepClick = (index: number) => {
	emit('stepClick', index)
}
</script>

<style lang="scss" scoped>
@use 'sass:math';

$col-num: 6; // 单行排列的步骤项个数
$col-even: $col-num * 2; // 两行元素数
$line-width: 35px; // 步骤间连线长度
$row-distance: 50px; // 行间距
$col-distance: $line-width; // 列间距
$arrow-size: 6px; // 箭头大小
$step-color: #9e9e9e; // 步骤颜色
.container {
	display: grid;
	grid-template-columns: repeat($col-num, 1fr);
	gap: $row-distance $col-distance;
	width: 100%;
	padding: 30px 0;
	.grid-item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		&::before {
			position: absolute;
			right: -$line-width;
			width: $line-width;
			height: 0;
			content: '';
			border-top: 1px dashed $step-color;
		}
		&::after {
			position: absolute;
			right: math.div(-$col-distance, 2);
			content: '';
			border-top: math.div($arrow-size, 1.4) solid transparent;
			border-bottom: math.div($arrow-size, 1.4) solid transparent;
			border-left: $arrow-size solid $step-color;
			transform: translateX(50%);
		}

		// 给每行最后一个步骤（除最后一行）添加向下的连接箭头
		&:nth-child(#{$col-num}n) {
			&:not(:last-child) {
				.step {
					&::before {
						position: absolute;
						bottom: math.div(-$row-distance, 2);
						left: 50%;
						height: $line-width;
						content: '';
						border-left: 1px dashed $step-color;
						transform: translate(-50%, 50%);
					}
					&::after {
						position: absolute;
						bottom: math.div(-$row-distance, 2);
						left: 50%;
						content: '';
						border-top: $arrow-size solid $step-color;
						border-right: math.div($arrow-size, 1.4) solid transparent;
						border-left: math.div($arrow-size, 1.4) solid transparent;
						transform: translate(-50%, 50%);
					}
				}
			}
		}

		@for $value from 1 through $col-even {
			&:nth-child(#{$col-even}n + #{$value}) {
				$is-even-line: if($value > $col-num, true, false);
				$mod-num: $value % $col-even; // 余数 1、2、3、4、5、0

				/** 偶数行旋转箭头，步骤倒序排列（使用transform交换位置） */
				@if $is-even-line {
					$trans-n: ($col-num + 1 + $col-even - $value - $value);

					transform: translateX(calc(#{$trans-n} * 100% + #{$trans-n} * $col-distance));
					&::after {
						transform: translateX(50%) rotate(180deg) !important; // 旋转箭头
					}
				}

				// 最右排(n & n + 1 位)隐藏多余的箭头（如果container设置了overflow:hidden 则不用处理）
				@if $mod-num == $col-num or $mod-num == $col-num + 1 {
					&::before,
					&::after {
						display: none;
					}
				}

				// 最后一个步骤在奇数行 需要隐藏连线箭头
				@if not $is-even-line {
					&:last-child {
						&::before,
						&::after {
							display: none;
						}
					}
				}
			}
		}
	}
}
.step {
	position: relative;
	width: 60px;
	font-size: 10px;
	line-height: 30px;
	color: #9e9e9e;
	text-align: center;
	border: 1px solid #9e9e9e;
	border-radius: 5px;
	&.step-finished {
		color: #ffffff;
		background-color: #4caf50;
		border: 2px solid #4caf50;
	}
}
</style>
