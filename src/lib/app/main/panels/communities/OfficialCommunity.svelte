<script lang="ts">
    import { officialCommunity } from 'stores/communities';
    import { dataSaver, socket } from 'stores/all';
    import { fade } from 'svelte/transition';
    import { ModalTypes } from 'types/main';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import { setTitle, showModal } from 'utilities/main';
    import { onMount } from 'svelte';

    function joinOfficialCommunity(): void {
        // Join without invite info
        socket.emit('joinCommunity', { communityId: 'fronvo' }, async () => {
            await loadCommunitiesPanel();
        });
    }

    onMount(() => {
        setTitle('Community - Fronvo');
    });
</script>

{#if $officialCommunity}
    <div class="official-container" in:fade={{ duration: 500 }}>
        <h1 id="join-official">Join our official community!</h1>

        <div
            class="community-container"
            in:fade={{ duration: 500, delay: 250 }}
            on:click={joinOfficialCommunity}
        >
            <img
                id="avatar"
                src={$officialCommunity.icon && !$dataSaver
                    ? $officialCommunity.icon
                    : '/svgs/profile/avatar.svg'}
                alt={`${$officialCommunity.name} community avatar`}
                draggable={false}
            />
            <h1 id="name">{$officialCommunity.name}</h1>

            <h1 id="description">{$officialCommunity.description}</h1>
            <h1 id="members">
                <span>{$officialCommunity.members.length}</span>
                member{$officialCommunity.members.length != 1 ? 's' : ''}
            </h1>
        </div>

        <hr in:fade={{ duration: 500, delay: 650 }} />

        <div class="options-container">
            <button
                in:fade={{ duration: 500, delay: 1000 }}
                on:click={() => showModal(ModalTypes.CreateCommunity)}
                >Create your own</button
            >

            <button
                in:fade={{ duration: 500, delay: 1150 }}
                on:click={() => showModal(ModalTypes.JoinCommunity)}
                >Join with invite</button
            >

            <button
                in:fade={{ duration: 500, delay: 1300 }}
                on:click={() => showModal(ModalTypes.FindCommunities)}
                >Find communities</button
            >
        </div>
    </div>
{/if}

<style>
    hr {
        width: 300px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    #join-official {
        text-align: center;
        font-size: 2.5rem;
        margin: 0;
        margin-bottom: 15px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .official-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .community-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px var(--nav_shadow_color);
        width: 450px;
        height: min-content;
        border-radius: 10px;
        padding: 10px;
        transition: 400ms background;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .community-container:hover {
        background-position: right center;
    }

    .community-container #avatar {
        width: 128px;
        height: 128px;
        margin-bottom: 5px;
    }

    .community-container #name {
        color: var(--profile_info_color);
        font-size: 2.5rem;
        margin: 0;
        text-align: center;
    }

    .community-container #description {
        color: var(--profile_info_color);
        font-size: 2rem;
        text-align: center;
        flex: 1;
    }

    .community-container #members {
        margin: 0;
        font-size: 1.9rem;
    }

    .community-container #members span {
        color: var(--profile_info_color);
    }

    .options-container {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .options-container button {
        font-size: 2rem;
        margin-bottom: 20px;
    }

    .options-container button:nth-last-child(1) {
        margin-bottom: 0;
    }

    @media screen and (max-width: 720px) {
        hr {
            width: 250px;
            margin-top: 15px;
        }

        #join-official {
            font-size: 2.2rem;
        }

        .community-container {
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 5px;
            cursor: default;
        }

        .community-container #name {
            font-size: 2.2rem;
        }

        .community-container #description {
            font-size: 1.8rem;
        }

        .community-container #members {
            font-size: 1.6rem;
        }

        .options-container button {
            font-size: 1.7rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        hr {
            width: 200px;
        }

        #join-official {
            font-size: 1.9rem;
        }

        .community-container {
            width: 280px;
        }

        .community-container #avatar {
            width: 86px;
            height: 86px;
        }

        .community-container #name {
            font-size: 2rem;
        }

        .community-container #description {
            font-size: 1.5rem;
        }

        .community-container #members {
            font-size: 1.4rem;
        }

        .options-container button {
            font-size: 1.4rem;
        }
    }
</style>
