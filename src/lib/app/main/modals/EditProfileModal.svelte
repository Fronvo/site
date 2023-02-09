<script lang="ts">
    import { goto } from '$app/navigation';
    import { dismissModal, setProgressBar, setTitle } from 'utilities/main';
    import { profileLoadingFinished, userData } from 'stores/profile';
    import { socket } from 'stores/all';
    import { onMount } from 'svelte';
    import Checkbox from 'svelte-checkbox';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { ModalData } from 'types/main';

    let profileId = $userData.profileId;
    let username = $userData.username;
    let bio = $userData.bio;
    let avatar: Writable<string> = writable($userData.avatar);
    let banner: Writable<string> = writable($userData.banner);
    let isPrivate = $userData.isPrivate;

    let canUpload = true;
    let isUploading = false;
    let errorMessage: string;

    function uploadData(): void {
        if (!canUpload || isUploading) return;

        isUploading = true;
        setProgressBar(true);

        const updatedData = {};

        if ($userData.profileId != profileId) {
            updatedData['profileId'] = profileId;
        }

        if ($userData.username != username) {
            updatedData['username'] = username;
        }

        if ($userData.bio != bio) {
            updatedData['bio'] = bio;
        }

        if ($userData.avatar != $avatar) {
            updatedData['avatar'] = $avatar;
        }

        if ($userData.banner != $banner) {
            updatedData['banner'] = $banner;
        }

        if ($userData.isPrivate != isPrivate) {
            updatedData['isPrivate'] = isPrivate;
        }

        socket.emit(
            'updateProfileData',
            updatedData,
            ({ err, profileData }) => {
                if (err) {
                    errorMessage = err.msg;
                    isUploading = false;
                    setProgressBar(false);

                    return;
                }

                // Redirect to new profile
                if ($userData.profileId != profileId) {
                    goto(`/profile/${profileId}`, {
                        replaceState: true,
                    });
                }

                // Update route title
                if (
                    $userData.profileId != profileId ||
                    $userData.username != username
                ) {
                    // Wait for $userData to be updated
                    setTimeout(
                        () =>
                            setTitle(
                                `${$userData.username} (${$userData.profileId}) - Fronvo`
                            ),
                        0
                    );
                }

                $userData = { ...$userData, ...profileData };

                // Reload banner
                $profileLoadingFinished = false;
                $profileLoadingFinished = true;
                setProgressBar(false);

                dismissModal();
            }
        );
    }

    function previewListener(
        item: HTMLImageElement,
        name: string,
        store: Writable<string>,
        defaultSrc?: string
    ): void {
        const info = document.getElementsByClassName(
            `${name.toLowerCase()}-info`
        )[0];

        item.onerror = () => {
            info.textContent = `${name} - Invalid URL`;

            canUpload = false;
            item.src = `/svgs/profile/${
                defaultSrc ? defaultSrc : 'avatar'
            }.svg`;
        };

        store.subscribe((newStore) => {
            if (newStore == undefined) return;

            // Allow empty avatar url, reset it
            if (newStore == '') {
                // Reset state
                info.textContent = name;

                canUpload = true;
            }

            // Check for avatar https, perform some client side validation on our own
            else if (!newStore.match(/^(https:\/\/).+$/)) {
                info.textContent = `${name} - Invalid URL`;

                canUpload = false;
            } else if (!canUpload) {
                // Reset state
                info.textContent = name;

                canUpload = true;
            }
        });
    }

    onMount(() => {
        previewListener(
            document.getElementById('avatar-preview') as HTMLImageElement,
            'Avatar',
            avatar
        );

        previewListener(
            document.getElementById('banner-preview') as HTMLImageElement,
            'Banner',
            banner,
            'banner'
        );
    });

    const data: ModalData = {
        title: 'Edit Profile',
        noSeperator: true,

        actions: [
            {
                title: 'Save',
                callback: uploadData,
            },
            {
                title: 'Discard',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if errorMessage}
        <h1 class="modal-error-header modal-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <h1 class="modal-header">Profile ID</h1>
    <input class="modal-input" bind:value={profileId} maxlength={30} />

    <h1 class="modal-header">Username</h1>
    <input class="modal-input" bind:value={username} maxlength={30} />

    <h1 class="modal-header">Bio</h1>
    <textarea class="modal-input" bind:value={bio} maxlength={128} rows={4} />

    <div class="centered-container">
        <img
            id="avatar-preview"
            src={$avatar ? $avatar : '/svgs/profile/avatar.svg'}
            alt="New avatar"
            draggable={false}
        />
        <h1 class="modal-header avatar-info">Avatar</h1>
    </div>

    <input class="modal-input" maxlength={512} bind:value={$avatar} />

    <div>
        <h1 class="modal-header banner-info">Banner</h1>
        <img
            id="banner-preview"
            src={$banner ? $banner : '/svgs/profile/banner.svg'}
            alt="New banner"
            draggable={false}
        />
    </div>

    <input class="modal-input" maxlength={512} bind:value={$banner} />

    <div class="centered-container modal-header">
        <h1 class="modal-header">Private account</h1>
        <Checkbox
            bind:checked={isPrivate}
            class="checkbox"
            size="2.4rem"
            primaryColor="var(--modal_checkbox_primary_color)"
            secondaryColor="var(--modal_checkbox_secondary_color)"
        />
    </div>
</ModalTemplate>

<style>
    div {
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
    }

    #avatar-preview {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        margin-right: 10px;
    }

    #banner-preview {
        width: 510px;
        height: 240px;
        border-radius: 5px;
    }

    .centered-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    textarea {
        min-height: 100px;
    }

    @media screen and (max-width: 720px) {
        #avatar-preview {
            width: 48px;
            height: 48px;
        }

        #banner-preview {
            width: 450px;
            height: 225px;
        }
    }

    @media screen and (max-width: 520px) {
        #banner-preview {
            width: 300px;
            height: 169px;
        }
    }
</style>
