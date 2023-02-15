<script lang="ts">
    import OptionsMenu from '$lib/svgs/OptionsMenu.svelte';
    import { dropdownVisible } from 'stores/main';
    import { joinedCommunity } from 'stores/communities';
    import { fade } from 'svelte/transition';
    import { DropdownTypes } from 'types/main';
    import { dismissDropdown, showDropdown } from 'utilities/main';
    import { dataSaver } from 'stores/all';

    function showCommunityInfoDropdown(): void {
        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            showDropdown(DropdownTypes.CommunityInfo);
        }
    }
</script>

{#if $joinedCommunity}
    <div id="blur" class="info-container" in:fade={{ duration: 200 }}>
        <img
            id="icon"
            src={$joinedCommunity.icon && !$dataSaver
                ? $joinedCommunity.icon
                : '/svgs/profile/avatar.svg'}
            alt={`${$joinedCommunity.name}'s' icon`}
            draggable={false}
        />
        <h1 id="name">{$joinedCommunity.name}</h1>

        <OptionsMenu callback={showCommunityInfoDropdown} />
    </div>
{/if}

<style>
    .info-container {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        padding: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        z-index: 1;
        background: var(--accent_bg_color);
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

    @media screen and (max-width: 720px) {
        .info-container {
            backdrop-filter: none;
            background: var(--accent_bg_color);
        }

        .info-container #icon {
            width: 53px;
            height: 53px;
        }

        .info-container #name {
            font-size: 1.9rem;
        }
    }

    @media screen and (max-width: 520px) {
        .info-container {
            width: 90%;
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
