<script>
    import { dataSaver } from 'stores/main';
    import { currentPanelId, PanelTypes } from 'stores/panels';
    import { ourData, searchData } from 'stores/profile';
</script>

{#if !$searchData?.avatar || $searchData?.avatar == $ourData?.avatar || $dataSaver}
    <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48"
        height="48"
        ><path
            class="svg"
            d={`${
                $currentPanelId == PanelTypes.Profile
                    ? 'm22 23q-2.7 0-4.7-1.9-1.9-2-1.9-4.7 0-2.7 1.9-4.7 2-1.9 4.7-1.9 2.8 0 4.7 1.9 1.9 2 1.9 4.7 0 2.7-1.9 4.7-1.9 1.9-4.7 1.9zm21.7 22.3l-6.2-6.1q-1.1 0.7-2.2 1.1-1.2 0.3-2.3 0.3-3.2 0-5.4-2.2-2.2-2.2-2.2-5.4 0-3.2 2.2-5.4 2.2-2.2 5.4-2.2 3.2 0 5.4 2.2 2.2 2.2 2.2 5.4 0 1.1-0.3 2.3-0.3 1.1-1.1 2.2l6.2 6.2zm-10.7-7.2q2.2 0 3.7-1.5 1.5-1.5 1.5-3.7 0-2.2-1.5-3.7-1.5-1.5-3.7-1.5-2.2 0-3.7 1.5-1.5 1.5-1.5 3.7 0 2.2 1.5 3.7 1.5 1.5 3.7 1.5zm-9.4-10.9q-1.5 2.6-1.6 5.6 0 3 1.5 5.6h-16.3v-3.9q0-1.6 0.8-2.7 0.8-1.1 2.2-1.9 2.2-1.1 5.8-2.1 3.6-0.9 7.6-0.6z'
                    : 'm22 23q-2.7 0-4.7-1.9-1.9-2-1.9-4.7 0-2.7 1.9-4.7 2-1.9 4.7-1.9 2.8 0 4.7 1.9 1.9 2 1.9 4.7 0 2.7-1.9 4.7-1.9 1.9-4.7 1.9zm0-2.4q1.8 0 3-1.2 1.2-1.2 1.2-3 0-1.8-1.2-3-1.2-1.2-3-1.2-1.7 0-3 1.2-1.2 1.2-1.2 3 0 1.7 1.2 3 1.2 1.2 3 1.2zm21.7 24.7l-6.2-6.1q-1.1 0.7-2.2 1.1-1.2 0.3-2.3 0.3-3.2 0-5.4-2.2-2.2-2.2-2.2-5.4 0-3.2 2.2-5.4 2.2-2.2 5.4-2.2 3.2 0 5.4 2.2 2.2 2.2 2.2 5.4 0 1.1-0.3 2.3-0.3 1.1-1.1 2.2l6.2 6.2zm-10.7-7.2q2.2 0 3.7-1.5 1.5-1.5 1.5-3.7 0-2.2-1.5-3.7-1.5-1.5-3.7-1.5-2.2 0-3.7 1.5-1.5 1.5-1.5 3.7 0 2.2 1.5 3.7 1.5 1.5 3.7 1.5zm-25.8 0.3v-3.9q0-1.6 0.8-2.7 0.8-1.1 2.2-1.9 2.2-1.1 5.8-2.1 3.6-0.9 7.6-0.6-0.3 0.5-0.6 1.1-0.3 0.6-0.5 1.2-3.8-0.1-6.7 0.8-3 1-4.6 1.8-0.7 0.3-1.2 1-0.4 0.6-0.4 1.4v1.5h12.7q0.3 0.6 0.6 1.2 0.3 0.6 0.6 1.2z'
            }`}
        /></svg
    >
{:else}
    <img
        width="36px"
        height="36px"
        src={$searchData?.avatar}
        draggable={false}
        alt={`${$searchData?.username}'s profile'`}
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
