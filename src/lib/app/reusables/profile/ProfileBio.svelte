<script lang="ts">
    export let bio: string;
</script>

{#if bio}
    <h1 id="bio">
        {bio}
    </h1>
{/if}

<style>
    #bio {
        font-size: 1.6rem;
        margin: 0;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        color: var(--profile_info_color);
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
    }

    @media screen and (max-width: 850px) {
        #bio {
            font-size: 1.1rem;
            margin-left: 25px;
        }
    }
</style>
