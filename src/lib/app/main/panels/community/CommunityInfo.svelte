<script lang="ts">
    import Expand from '$lib/svgs/Expand.svelte';
    import { communityData } from 'stores/community';
    import { DropdownTypes, dropdownVisible } from 'stores/dropdowns';
    import { dataSaver } from 'stores/main';
    import { dismissDropdown, showDropdown } from 'utilities/main';

    function showCommunityInfoDropdown(): void {
        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            showDropdown(DropdownTypes.CommunityOptions);
        }
    }
</script>

{#if $communityData}
    <div class="info-container" on:click={showCommunityInfoDropdown}>
        <img
            id="icon"
            src={$communityData.icon && !$dataSaver
                ? $communityData.icon
                : '/svgs/profile/avatar.svg'}
            alt={`${$communityData?.name}'s' icon`}
            draggable={false}
        />
        <h1 id="name">{$communityData?.name}</h1>

        <Expand />
    </div>
{/if}

<style>
    .info-container {
        position: sticky;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        padding: 10px;
        z-index: 1;
        background: var(--side_bg_color);
        transition: 150ms;
        cursor: pointer;
        width: max-content;
    }

    .info-container:hover {
        background: var(--side_svg_bg_color);
    }

    .info-container #icon {
        width: 55px;
        height: 55px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 5px;
    }

    .info-container #name {
        margin: 0;
        font-size: 2.2rem;
        color: var(--profile_info_color);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-right: 10px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    @media screen and (max-width: 850px) {
        .info-container {
            cursor: default;
        }

        .info-container #icon {
            width: 36px;
            height: 36px;
        }

        .info-container #name {
            font-size: 1.5rem;
        }
    }
</style>
