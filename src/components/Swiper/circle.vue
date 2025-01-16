<!--
 * @author: rixleft
 * @since: 2025-01-14 10:59:52
 * index.vue
-->
<script setup lang="ts">
defineOptions({ name: 'rix-circle-head' })
import { reactive } from 'vue'
const headers = reactive(['首页', '图片', '视频', '技术栈', '项目', '关于', '联系我'])
</script>
<template>
	<div class="circle-head">
		<div class="inner">
			<div v-for="(item, index) in headers" :key="index">{{ item }}</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'sass:math';

$size: 100px;
$num: 7;
$deg: math.div(360deg, $num);
$r: math.div($size, 2);
$rr: math.div($r, math.sin(math.div($deg, 2)));
$inner-size: $rr * 2;
$u: math.div(1, $num) * 100%;
$stop: 0.6 * $u;
.circle-head {
	display: flex;
	justify-content: center;
	width: $size;
	height: $size;
	margin: 0 auto 50px;
	overflow: hidden;
	border-radius: 50%;
	outline: 1px solid #ffffff;
	.inner {
		position: relative;
		flex-shrink: 0;
		width: $inner-size;
		height: $inner-size;
		margin-top: $r;
		border-radius: 50%;
		animation: moving 10s infinite;
		div {
			position: absolute;
			top: -$r;
			left: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: $size;
			height: $size;
			margin: 0 auto;
			margin-left: math.div(-$size, 2);
			border-radius: 50%;
			transform-origin: center #{$rr + $r};

			@for $i from 1 through $num {
				&:nth-child(#{$i}) {
					transform: rotate($deg * ($i - 1));
				}
			}
		}
	}
}

@keyframes moving {
	@for $i from 1 through $num {
		$p: $u * $i;
		$cdeg: $deg * $i;
		#{$p - $stop},
		#{$p} {
			transform: rotate(-$cdeg);
		}
	}
}
</style>
