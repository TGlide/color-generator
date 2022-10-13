<script lang="ts">
	import Flex, { type FlexProps } from '$lib/UI/Flex.svelte';
	import Link from '$lib/UI/Link.svelte';

	interface $$Props extends FlexProps {}
</script>

<Flex tag="nav" gap={16} {...$$restProps}>
	<Link href="/">🎨 Generate colors</Link>
</Flex>
