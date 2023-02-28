<script>
    import { dataSaver } from 'stores/main';
    import { ourData } from 'stores/profile';
</script>

{#if !$ourData?.avatar || $dataSaver}
    <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48"
        height="48"
        ><path
            class="svg"
            d={'m24 42.8q-3.9 0-7.3-1.5-3.4-1.5-6-4-2.5-2.6-4-6-1.5-3.4-1.5-7.3 0-3.9 1.5-7.3 1.5-3.4 4-6 2.6-2.5 6-4 3.4-1.5 7.3-1.5 3.9 0 7.3 1.5 3.4 1.5 6 4 2.5 2.6 4 6 1.5 3.4 1.5 7.3 0 3.9-1.5 7.3-1.5 3.4-4 6-2.6 2.5-6 4-3.4 1.5-7.3 1.5zm-12.1-7.7q2.8-2 5.8-3.1 2.9-1.1 6.3-1.1 3.4 0 6.3 1.1 3 1.1 5.9 3.1 2.1-2.4 3.1-5.2 1.1-2.7 1.1-5.9 0-6.9-4.8-11.6-4.7-4.8-11.6-4.8-6.9 0-11.6 4.8-4.8 4.7-4.8 11.6 0 3.2 1.1 5.9 1.1 2.8 3.2 5.2zm12.1-9.9q-2.7 0-4.5-1.8-1.9-1.9-1.9-4.6 0-2.7 1.9-4.5 1.8-1.8 4.5-1.8 2.7 0 4.5 1.8 1.9 1.8 1.9 4.5 0 2.7-1.9 4.6-1.8 1.8-4.5 1.8zm0 15.2q2.7 0 5.3-0.9 2.7-0.9 5-2.7-2.3-1.7-4.9-2.6-2.6-0.9-5.4-0.9-2.8 0-5.4 0.9-2.6 0.9-4.8 2.6 2.2 1.8 4.9 2.7 2.6 0.9 5.3 0.9zm0-17.6q1.7 0 2.9-1.1 1.1-1.2 1.1-2.9 0-1.7-1.1-2.8-1.2-1.2-2.9-1.2-1.7 0-2.9 1.2-1.1 1.1-1.1 2.8 0 1.8 1.1 2.9 1.2 1.1 2.9 1.1z'}
        /></svg
    >
{:else}
    <img
        width="36px"
        height="36px"
        src={$ourData?.avatar}
        draggable={false}
        alt={`${$ourData?.username}'s profile'`}
    />
{/if}

<style>
    img {
        border: 2px solid var(--profile_info_color);
        border-radius: 10px;
        margin: 0;
        padding: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
    }

    svg {
        width: 36px;
        height: 36px;
    }

    @media screen and (max-width: 700px) {
        img {
            cursor: default;
        }
    }
</style>
