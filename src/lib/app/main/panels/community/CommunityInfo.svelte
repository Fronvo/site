<script lang="ts">
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
    <div class="info-container">
        <div class="data-container" on:click={showCommunityInfoDropdown}>
            <img
                id="icon"
                src={$communityData.icon && !$dataSaver
                    ? $communityData.icon
                    : '/svgs/profile/avatar.svg'}
                alt={`${$communityData?.name}'s' icon`}
                draggable={false}
            />
            <h1 id="name">{$communityData?.name}</h1>
        </div>
    </div>
{/if}

<style>
    .info-container {
        position: sticky;
        top: 0;
        display: flex;
        margin: auto;
        padding: 5px;
        z-index: 0;
        background: var(--side_bg_color);
        border-bottom: 1px solid var(--accent_shadow_color);
        transition: 150ms;
        width: 100%;
    }

    .data-container {
        display: flex;
        align-items: center;
        padding: 10px;
        transition: 150ms;
        border-radius: 10px;
        cursor: pointer;
    }

    .data-container:hover {
        background: var(--bg_color);
    }

    #icon {
        width: 48px;
        height: 48px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 5px;
    }

    #name {
        margin: 0;
        font-size: 2rem;
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
        .data-container {
            cursor: default;
        }

        #icon {
            width: 36px;
            height: 36px;
        }

        #name {
            font-size: 1.5rem;
        }
    }
</style>
