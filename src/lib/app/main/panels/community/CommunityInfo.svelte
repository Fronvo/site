<script lang="ts">
    import Bans from '$lib/svgs/Bans.svelte';
    import Edit from '$lib/svgs/Edit.svelte';
    import Leave from '$lib/svgs/Leave.svelte';
    import Members from '$lib/svgs/Members.svelte';
    import { communityData, memberListVisible } from 'stores/community';
    import { dataSaver } from 'stores/main';
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { showModal } from 'utilities/main';

    function toggleMembers() {
        if (document.body.clientWidth < 850) {
            showModal(ModalTypes.CommunityMembers);
        } else {
            $memberListVisible = !$memberListVisible;
        }
    }
</script>

{#if $communityData}
    <div class="info-container">
        <div class="data-container">
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

        {#if $communityData.ownerId == $ourData.profileId}
            <Edit callback={() => showModal(ModalTypes.EditCommunity)} />
            <Bans callback={() => showModal(ModalTypes.ShowBans)} />
        {/if}

        <Members callback={toggleMembers} />
        <Leave callback={() => showModal(ModalTypes.LeaveCommunity)} />
    </div>
{/if}

<style>
    .info-container {
        position: sticky;
        top: 0;
        display: flex;
        margin: auto;
        padding: 5px;
        z-index: 1;
        background: var(--side_bg_color);
        border-bottom: 1px solid var(--accent_shadow_color);
        box-shadow: 0 0 5px var(--accent_shadow_color);
        transition: 150ms;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .data-container {
        display: flex;
        align-items: center;
        padding: 10px;
        transition: 150ms;
        border-radius: 10px;
        flex: 1;
    }

    #icon {
        width: 44px;
        height: 44px;
        margin-right: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 20px;
    }

    #name {
        margin: 0;
        font-size: 1.6rem;
        letter-spacing: 0.5px;
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
            font-size: 1.3rem;
        }
    }
</style>
