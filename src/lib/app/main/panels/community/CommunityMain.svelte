<script lang="ts">
    import { communityData } from 'stores/community';
    import { setProgressBar, setTitle } from 'utilities/main';
    import CommunityChat from './CommunityChat.svelte';
    import CommunityInfo from './CommunityInfo.svelte';
    import CommunitySend from './CommunitySend.svelte';

    setTitle(`${$communityData?.name} - Fronvo`);

    setProgressBar(true);
</script>

<CommunityInfo />

<CommunityChat />

<CommunitySend />
