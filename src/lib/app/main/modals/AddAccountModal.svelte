<script lang="ts">
    import { ModalTypes, type ModalData } from 'stores/modals';
    import {
        addSavedAccount,
        fetchUser,
        initSecondarySocket,
        showModal,
    } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import {
        currentToken,
        secondarySocket,
        setSecondarySocket,
    } from 'stores/main';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { onMount, onDestroy } from 'svelte';
    import { ourData } from 'stores/profile';
    import { getKey, setKey } from 'utilities/global';

    let email: string;
    let password: string;
    let errorMessage: string;
    let loggingIn: boolean;

    function login(): void {
        if (!email || !password || loggingIn) return;

        loggingIn = true;

        secondarySocket.emit(
            'login',
            { email: email || '', password: password || '' },
            async ({ err, token }) => {
                loggingIn = false;

                if (err) {
                    errorMessage = err.msg;
                    return;
                }

                if (
                    JSON.stringify(getKey('savedAccounts', '[]')).includes(
                        token
                    )
                ) {
                    errorMessage = 'Account already added.';

                    secondarySocket.emit('logout');

                    return;
                }

                secondarySocket.emit(
                    'fetchProfileId',
                    async ({ profileId }) => {
                        const targetUser = await fetchUser(profileId);

                        addSavedAccount(
                            $ourData,
                            $currentToken,
                            targetUser.avatar,
                            targetUser.username,
                            token
                        );

                        // Save main credentials, atleast one more account has been added
                        setKey('token', $currentToken);

                        showModal(ModalTypes.SwitchAccounts);
                    }
                );
            }
        );
    }

    onMount(() => {
        initSecondarySocket();
    });

    onDestroy(() => {
        setSecondarySocket(undefined);
    });

    const data: ModalData = {
        title: 'Add account',

        actions: [
            {
                title: 'Login',
                callback: login,
            },
            {
                title: 'Back',
                callback: () => showModal(ModalTypes.SwitchAccounts),
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <ErrorHeader size="1.2rem" {errorMessage} />

    <input
        bind:value={email}
        placeholder="Email address"
        class="modal-input"
        type="email"
    />

    <input
        bind:value={password}
        placeholder="Password"
        class="modal-input"
        type="password"
    />
</ModalTemplate>

<style>
    input {
        width: 80%;
        font-size: 1.2rem;
        margin-top: 10px;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        background: var(--bg);
        color: var(--text);
        border: 2px solid transparent;
        transition: 150ms border;
    }

    input:focus {
        border: 2px solid #0e62ff;
    }
</style>
