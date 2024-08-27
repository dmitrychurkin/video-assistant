<script lang="ts">
	import type { Snippet } from "svelte";

    const { children }: {
        readonly children: Snippet;
    } = $props();
</script>

<div
    class="container"
>
    {@render children()}
</div>

<style>
    .container {
        display: grid;
        place-content: center;
        height: 100%;
    }
</style>
