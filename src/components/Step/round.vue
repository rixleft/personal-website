<template>
	<div class="custom-step">
		<div v-for="(item, index) in stepList" :key="index" class="step-item">
			<div class="item-content">
				<div class="step-title" @click="handleStepClick(index)">
					<div class="step-num" :class="{ 'step-num-finished': item.status === 'finished' }">{{ index + 1 }}</div>
					<div class="setp-txt" :class="{ 'step-txt-finished': item.status === 'finished' }">{{ item.title }}</div>
				</div>
				<div class="split-line" v-if="!item.isLast" :class="{ 'split-line-finished': isFinished(index) }"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'rix-step-round'
})
import { computed } from 'vue'
// 定义步骤项的类型
export interface StepRoundItem {
	title: string
	status: 'finished' | 'unfinished'
	isLast: boolean
}
// 定义 props 的类型
const props = defineProps<{
	stepList: StepRoundItem[] // 使用 StepItem 数组作为 stepList 的类型
}>()
const emit = defineEmits(['stepClick'])
const handleStepClick = (index: number) => {
	emit('stepClick', index)
}
// 步骤列表
// const stepList = ref([
//     { title: '确定意向', status: 'finished', isLast: false },
//     { title: '对接洽谈', status: 'finished', isLast: false },
//     { title: '项目报价', status: 'unfinished', isLast: false },
//     { title: '投标对比', status: 'unfinished', isLast: false },
//     { title: '合同拟定', status: 'unfinished', isLast: false },
//     { title: '转化完成', status: 'finished', isLast: false },
//     { title: '转化完成1', status: 'finished', isLast: false },
//     { title: '转化完成2', status: 'finished', isLast: true },
// ])

const isFinished = computed(() => (index: number) => {
	const prevStep = props.stepList[index]
	const nextStep = props.stepList[index + 1]
	return prevStep.status === 'finished' && nextStep.status === 'finished'
})
</script>

<style lang="scss" scoped>
.custom-step {
	display: flex;
	flex-wrap: wrap;
	row-gap: 20px;
	align-items: center;
	width: 100%;
	padding: 0 30px;
	.step-item {
		width: calc(100% / 6);
		.item-content {
			box-sizing: border-box;
			display: flex;
			align-items: center;
		}
		.step-title {
			width: 80px;
			font-weight: 600;
			color: rgb(153 153 166);
			text-align: center;
			cursor: pointer;
			.step-num {
				box-sizing: content-box;
				width: 35px;
				margin: 0 auto;
				font-size: 16px;
				line-height: 35px;
				border: 3px solid #e3e8ec;
				border-radius: 100%;
			}
			.setp-txt {
				margin-top: 10px;
			}
			.step-num-finished {
				color: rgb(26 188 156);
				border: 3px solid rgb(26 188 156);
			}
			.step-txt-finished {
				color: rgb(26 188 156);
			}
		}
		.split-line {
			width: calc(100% - 80px);
			height: 3px;
			margin-top: -25px;
			background-color: #e3e8ec;
			border-radius: 5px;
		}
		.split-line-finished {
			background-color: rgb(26 188 156);
		}
	}
}
</style>
