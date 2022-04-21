<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let iconHidden = true;
	let isDark = true;

	onMount(() => {
		const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
		isDark = currentTheme ? currentTheme === 'dark' : true;
		iconHidden = false;
	});

	function switchTheme() {
		const newValue = isDark ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', newValue);
		localStorage.setItem('theme', newValue);
		isDark = !isDark;
	}
</script>

<button on:click={switchTheme}>
	{#if !iconHidden}
		<div transition:fade>
			<span>{isDark ? 'dark' : 'light'}</span>
		</div>
	{/if}
</button>

<style>
	button {
		background-color: var(--palette-blue-60);
		border-radius: 0.25rem;
		cursor: pointer;
		font-size: 0.9rem;
		padding: 0.5rem 0.75rem;

		transition: 0.25s background-color ease;
	}

	button:hover {
		background-color: var(--palette-blue-70);
	}
</style>
