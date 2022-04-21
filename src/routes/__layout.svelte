<script lang="ts">
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import '../app.css';
</script>

<main>
	<ThemeSwitch />

	<slot />
</main>
