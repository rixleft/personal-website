<template>
	<div class="carousel-container">
		<div class="carousel" :style="carouselStyle">
			<div v-for="(item, index) in items" :key="index" class="carousel-item" :class="{ active: index === activeIndex }" :style="getItemStyle(index)" @click="handleItemClick(index)">
				<div class="card">
					<div class="card-front">
						<img :src="item.image" alt="carousel-image" />
					</div>
					<div class="card-back">
						<h3>{{ item.title }}</h3>
						<p>{{ item.description }}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="indicators">
			<span v-for="(item, index) in items" :key="index" :class="{ active: index === activeIndex }" @click="setActiveIndex(index)"></span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

export default defineComponent({
	name: 'CreativeCarousel',
	props: {
		items: {
			type: Array as () => Array<{ image: string; title: string; description: string }>,
			required: true
		},
		interval: {
			type: Number,
			default: 3000
		}
	},
	setup(props) {
		const activeIndex = ref(0)

		const carouselStyle = computed(() => {
			return {
				transform: `translateX(-${activeIndex.value * 100}%)`
			}
		})

		const getItemStyle = (index: number) => {
			const offset = (index - activeIndex.value) * 100
			return {
				transform: `translateX(${offset}%) scale(${index === activeIndex.value ? 1 : 0.8})`,
				opacity: index === activeIndex.value ? 1 : 0.6
			}
		}

		const setActiveIndex = (index: number) => {
			activeIndex.value = index
		}

		const handleItemClick = (index: number) => {
			setActiveIndex(index)
		}

		const startAutoPlay = () => {
			setInterval(() => {
				activeIndex.value = (activeIndex.value + 1) % props.items.length
			}, props.interval)
		}

		onMounted(() => {
			startAutoPlay()
		})

		return {
			activeIndex,
			carouselStyle,
			getItemStyle,
			setActiveIndex,
			handleItemClick
		}
	}
})
</script>

<style scoped>
.carousel-container {
	position: relative;
	width: 100%;
	overflow: hidden;
}
.carousel {
	display: flex;
	transition: transform 0.5s ease-in-out;
}
.carousel-item {
	position: relative;
	flex: 0 0 100%;
	transition:
		transform 0.5s ease-in-out,
		opacity 0.5s ease-in-out;
}
.card {
	position: relative;
	width: 100%;
	height: 300px;
	transition: transform 0.5s;
	perspective: 1000px;
	transform-style: preserve-3d;
}
.card-front,
.card-back {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
	backface-visibility: hidden;
}
.card-front {
	background-color: #ffffff;
}
.card-back {
	color: #ffffff;
	background-color: #333333;
	transform: rotateY(180deg);
}
.card:hover {
	transform: rotateY(180deg);
}
.indicators {
	display: flex;
	justify-content: center;
	margin-top: 10px;
}
.indicators span {
	width: 10px;
	height: 10px;
	margin: 0 5px;
	cursor: pointer;
	background-color: #cccccc;
	border-radius: 50%;
}
.indicators span.active {
	background-color: #333333;
}
</style>
