<script lang="ts">
    import { socket } from 'stores/all';
    import { removeKey } from 'utilities/global';
    import { accountRegisterVerifyTab } from 'stores/account';
    import {
        communityLoadingFinished,
        joinedCommunity,
        replyingTo,
        replyingToId,
        sendContent,
        targetCommunity,
        targetCommunityData,
        targetCommunityMessages,
    } from 'stores/communities';
    import { homePosts } from 'stores/home';
    import { loginSucceeded } from 'stores/main';
    import { profileLoadingFinished, targetProfile } from 'stores/profile';
    import { setProgressBar } from 'utilities/main';

    function logout(): void {
        setProgressBar(true);

        socket.emit('logout', ({ err }) => {
            if (err) return;

            removeKey('token');
            $accountRegisterVerifyTab = false;
            $loginSucceeded = false;

            // And home posts
            $homePosts = undefined;

            // And communities
            $communityLoadingFinished = undefined;
            $joinedCommunity = undefined;
            $targetCommunity = undefined;
            $targetCommunityData = undefined;
            $sendContent = '';
            $targetCommunityMessages = undefined;
            $replyingTo = undefined;
            $replyingToId = undefined;

            // And profiles
            $profileLoadingFinished = false;
            $targetProfile = undefined;

            setProgressBar(false);
        });
    }
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={logout}
    ><path
        class="svg"
        d="M19.9 40.85v-5.5L13.1 28v-9.7q0-1 .65-1.75t1.75-.85v3.15L3.75 7.15l1.55-1.6L42.4 42.7l-1.5 1.55L30 33.35l-1.9 2v5.5ZM33.95 29.7 18.3 14.05v-6.9h2.15v8.35h7.1V7.15h2.15v9.45l-1.05-1.1h3.45q1.15 0 1.975.825.825.825.825 1.975v10.25Z"
    /></svg
>
