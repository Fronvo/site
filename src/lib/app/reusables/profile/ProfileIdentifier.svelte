<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import ProfileActions from './ProfileActions.svelte';

    export let ourData: FronvoAccount;
    export let data: FronvoAccount;
</script>

<div>
    <h1 id="identifier">
        {data.username} <span>@{data.profileId}</span>
    </h1>

    {#if !data.isSelf}
        <ProfileActions {data} {ourData} />
    {/if}
</div>

<style>
    div {
        display: flex;
        align-items: center;
    }

    #identifier {
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

    #identifier span {
        color: var(--text_color);
        font-size: 1.7rem;
    }

    @media screen and (max-width: 700px) {
        #identifier {
            font-size: 1.5rem;
            margin-left: 25px;
        }

        #identifier span {
            font-size: 1.3rem;
        }
    }
</style>
