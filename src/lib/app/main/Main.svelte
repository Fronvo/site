<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import { tokenInvalid } from 'stores/app/global';
    import { socket } from 'stores/global';
    import { onMount } from 'svelte';
    import { getKey, removeKey } from 'utilities/global';

    let username: string;

    onMount(() => {
        socket.emit('isLoggedIn', ({ loggedIn }) => {
            if (!loggedIn) {
                socket.emit(
                    'loginToken',
                    { token: getKey('token') },
                    ({ err }) => {
                        if (err) {
                            removeKey('token');
                            $tokenInvalid = true;
                        } else {
                            postLogin();
                        }
                    }
                );
            } else {
                postLogin();
            }
        });
    });

    function postLogin(): void {
        socket.emit('fetchProfileId', ({ profileId }) => {
            socket.emit(
                'fetchProfileData',
                { profileId },
                ({ profileData }) => {
                    username = profileData.username;
                }
            );
        });
    }
</script>

<svelte:head>
    <title>Fronvo</title>
</svelte:head>

<Center>
    <div class="main-container">
        {#if username}
            <h1 id="username-header">Username: {username}</h1>
        {/if}
    </div>
</Center>

<style>
    .main-container #username-header {
        font-size: 2rem;
    }

    @media screen and (max-width: 700px) {
        .main-container #username-header {
            font-size: 1.8rem;
        }
    }

    @media screen and (max-width: 520px) {
        .main-container #username-header {
            font-size: 1.5rem;
        }
    }
</style>
