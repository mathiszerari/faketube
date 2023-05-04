<template>
	<main id="Home-page">
		<div class="p-6">
			<TheTimeline></TheTimeline>
			<TheAdvancedTimeline></TheAdvancedTimeline>
		</div>
	</main>
</template>

<script setup>
import TheAdvancedTimeline from '../components/Timeline/TheAdvancedTimeline.vue';
import TheTimeline from '../components/Timeline/TheTimeline.vue';
import SearchBar from '../components/recherche/SearchBar.vue';
</script>

<style scoped>
main{
	padding: 0;
}
</style>

