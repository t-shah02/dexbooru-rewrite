<script lang="ts">
	import { page } from '$app/stores';
	import { deletePost, likePost } from '$lib/client/api/posts';
	import { REPORT_MODAL_NAME } from '$lib/client/constants/layout';
	import { FAILURE_TOAST_OPTIONS, SUCCESS_TOAST_OPTIONS } from '$lib/client/constants/toasts';
	import { normalizeLikes } from '$lib/client/helpers/posts';
	import { modalStore } from '$lib/client/stores/layout';
	import { postsPageStore } from '$lib/client/stores/posts';
	import { toast } from '@zerodevx/svelte-toast';
	import { Button } from 'flowbite-svelte';
	import {
		ArrowRightToBracketSolid,
		ExclamationCircleSolid,
		HeartSolid,
		TrashBinSolid
	} from 'flowbite-svelte-icons';
	import PostCardReportModal from './PostCardReportModal.svelte';

	export let postId: string;
	export let likes: number;
	export let author: {
		id: string;
		username: string;
		profilePictureUrl: string;
	};

	let postLikeLoading = false;
	let postDeletionLoading = false;
	let hasLikedPost = $page.data.user?.likedPosts.map((post) => post.id).includes(postId);
	const isPostAuthor = $page.data.user && $page.data.user.id === author.id;

	const handleModalOpen = () => {
		modalStore.set({
			isOpen: true,
			focusedModalName: REPORT_MODAL_NAME
		});
	};

	const handleLikePost = async () => {
		postLikeLoading = true;
		const response = await likePost({ postId, action: hasLikedPost ? 'dislike' : 'like' });
		postLikeLoading = false;

		if (response.ok) {
			toast.push(
				`${hasLikedPost ? 'Disliked' : 'Liked'} the post successfully!`,
				SUCCESS_TOAST_OPTIONS
			);
			likes = hasLikedPost ? likes - 1 : likes + 1;
			hasLikedPost = !hasLikedPost;
		} else {
			toast.push(
				`There was an error while ${hasLikedPost ? 'disliking' : 'liking'}  the post!`,
				FAILURE_TOAST_OPTIONS
			);
		}
	};

	const handleDeletePost = async () => {
		postDeletionLoading = true;
		const response = await deletePost({ postId, authorId: author.id });
		postDeletionLoading = false;

		if (response.ok) {
			postsPageStore.update((previousPosts) => previousPosts.filter((post) => post.id !== postId));
			toast.push('The post was deleted successfully!', SUCCESS_TOAST_OPTIONS);
		} else {
			toast.push('There was an error while deleting the post!', FAILURE_TOAST_OPTIONS);
		}
	};
</script>

<div class="flex flex-col space-y-3">
	{#if $page.data.user}
		<Button
			disabled={postLikeLoading}
			on:click={handleLikePost}
			color="alternative"
			class="flex space-x-3"
		>
			<HeartSolid color={hasLikedPost ? 'red' : 'inherit'} role="icon" style="bg-red" />
			<span>{normalizeLikes(likes)} - Like post</span>
		</Button>
	{/if}
	<Button class="space-x-2" href="/posts/{postId}" color="blue">
		<span>View full post</span>
		<ArrowRightToBracketSolid />
	</Button>
	<Button on:click={handleModalOpen} class="space-x-2" color="yellow">
		<span>Report post</span>
		<ExclamationCircleSolid />
	</Button>
	{#if isPostAuthor}
		<Button
			class="space-x-2"
			disabled={postDeletionLoading}
			on:click={handleDeletePost}
			color="red"
		>
			<span>Delete post</span>
			<TrashBinSolid />
		</Button>
	{/if}
</div>

<PostCardReportModal {postId} />
