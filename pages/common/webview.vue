<template>
	<web-view :src="currentUrl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				currentUrl: ''
			}
		},
		onLoad(item) {
			this.currentUrl = decodeURIComponent(item.url)
		}
	}
</script>

<style lang="scss">
</style>