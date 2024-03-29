<script lang="ts">
	import type { TPostOrderByColumn } from '$lib/shared/types/posts';
	import PostGrid from '$lib/client/components/posts/container/PostGrid.svelte';
	import PostPaginator from '$lib/client/components/posts/container/PostPaginator.svelte';
	import PostPageSidebar from '$lib/client/components/posts/container/PostPageSidebar.svelte';
	import { getUniqueLabelsFromPosts } from '$lib/shared/helpers/labels';
	import NoPostsFound from './NoPostsFound.svelte';
	import { postsPageStore } from '$lib/client/stores/posts';

	export let postContainerTitle: string;
	export let pageNumber: number;
	export let orderBy: TPostOrderByColumn;
	export let ascending: boolean;

	const uniqueTags = getUniqueLabelsFromPosts($postsPageStore, 'tag');
	const uniqueArtists = getUniqueLabelsFromPosts($postsPageStore, 'artist');
</script>

{#if $postsPageStore.length > 0}
	<main id="post-container" class="mt-5">
		<div id="post-container-sidebar">
			<PostPageSidebar {orderBy} {ascending} {uniqueTags} {uniqueArtists} />
		</div>
		<div id="post-container-body" class="space-y-4 mb-5">
			<div id="post-container-title">
				<p class="text-4xl dark:text-white">{postContainerTitle}</p>
			</div>

			<PostGrid />
			<PostPaginator {pageNumber} {orderBy} />
		</div>
	</main>
{:else}
	<main class="flex flex-col justify-center mt-24">
		<NoPostsFound {pageNumber} />
		<PostPaginator noPostsLeft {pageNumber} />
	</main>
{/if}

<style>
	#post-container {
		display: grid;
		grid-template-columns: repeat(4.5, 1fr);
		grid-template-rows: 0fr repeat(4, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	#post-container-sidebar {
		grid-area: 1 / 1 / 6 / 2;
		align-self: start;
	}

	#post-container-body {
		grid-area: 2 / 2 / 6 / 5;
	}

	@media screen and (max-width: 767px) {
		#post-container {
			display: block;
		}

		#post-container-sidebar {
			position: static;
			top: auto;
		}

		#post-container-title {
			text-align: center;
		}
	}
</style>
