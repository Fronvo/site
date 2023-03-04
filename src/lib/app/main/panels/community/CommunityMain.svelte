<script lang="ts">
    import { communityData } from 'stores/community';
    import { setProgressBar, setTitle } from 'utilities/main';
    import CommunityChat from './CommunityChat.svelte';
    import CommunityInfo from './CommunityInfo.svelte';
    import CommunitySend from './CommunitySend.svelte';

    setTitle(`${$communityData?.name} - Fronvo`);

    setProgressBar(true);
</script>

<div class="main-container">
    <CommunityInfo />

    <CommunityChat />

    <CommunitySend />
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 55%;
        min-width: 600px;
    }

    @media screen and (max-width: 700px) {
        .main-container {
            min-width: 100%;
        }
    }
</style>
