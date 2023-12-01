<script lang="ts">
    import { ModalTypes, type ModalData, modalLoading } from 'stores/modals';
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

    function login(): void {
        if (!email || !password || $modalLoading) return;

        $modalLoading = true;

        secondarySocket.emit(
            'login',
            { email: email || '', password: password || '' },
            async ({ err, token }) => {
                $modalLoading = false;

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
                            targetUser.profileId,
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
                primary: true,
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

    <h1>Email address</h1>

    <input bind:value={email} class="modal-input" type="email" />

    <h1>Password</h1>

    <input bind:value={password} class="modal-input" type="password" />
</ModalTemplate>

<style>
    h1 {
        margin: 0;
        color: rgb(197, 203, 212);
        font-size: 1.1rem;
        font-weight: 600;
        text-align: start;
        width: 80%;
    }

    input {
        width: 80%;
        font-size: 1.2rem;
        margin-top: 5px;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        background: rgb(0, 0, 0, 0.4);
        color: var(--text);
        border: 2px solid transparent;
        transition: 150ms border;
        border-radius: 5px;
    }

    input:focus {
        border: 2px solid var(--branding);
    }
</style>
