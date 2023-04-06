<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import ProfileActions from './ProfileActions.svelte';
    import Private from '$lib/svgs/Private.svelte';

    export let ourData: FronvoAccount;
    export let data: FronvoAccount;
</script>

<div class="identifier-container">
    <div class="info-container">
        <div class="lock-container">
            {#if data.isPrivate}
                <Private />
            {/if}

            <h1 id="username">
                {data.username}
            </h1>
        </div>

        <h1 id="identifier">
            @{data.profileId}
        </h1>
    </div>

    {#if !data.isSelf}
        <ProfileActions {data} {ourData} />
    {/if}
</div>

<style>
    .identifier-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 0;
    }

    .info-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        flex: 1;
    }

    .lock-container {
        display: flex;
        align-items: center;
    }

    #username {
        font-size: 2.3rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        color: var(--profile_info_color);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    #identifier {
        font-size: 1.7rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    @media screen and (max-width: 850px) {
        #username {
            font-size: 1.5rem;
        }

        #identifier {
            font-size: 1.3rem;
            margin-left: 25px;
        }
    }
</style>
