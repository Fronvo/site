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
        <h1 id="error-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <h1 id="input-header">Profile ID</h1>
    <input bind:value={profileId} maxlength={30} />

    <h1 id="input-header">Username</h1>
    <input bind:value={username} maxlength={30} />

    <h1 id="input-header">Bio</h1>
    <textarea id="bio-input" bind:value={bio} maxlength={128} rows={4} />

    <div class="centered-container">
        <img
            id="avatar-preview"
            src={$avatar ? $avatar : '/svgs/profile/avatar.svg'}
            alt="New avatar"
            draggable={false}
        />
        <h1 id="input-header" class="avatar-info">Avatar</h1>
    </div>

    <input maxlength={512} bind:value={$avatar} />

    <div>
        <h1 id="input-header" class="banner-info">Banner</h1>
        <img
            id="banner-preview"
            src={$banner ? $banner : '/svgs/profile/banner.svg'}
            alt="New banner"
            draggable={false}
        />
    </div>

    <input maxlength={512} bind:value={$banner} />

    <div class="centered-container">
        <h1 id="input-header">Private account</h1>
        <Checkbox
            bind:checked={isPrivate}
            class="private-checkbox"
            size="2.7rem"
            primaryColor="var(--modal_checkbox_primary_color)"
            secondaryColor="var(--modal_checkbox_secondary_color)"
        />
    </div>
</ModalTemplate>

<style>
    #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    div {
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }

    #avatar-preview {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        margin-right: 10px;
    }

    #banner-preview {
        width: 550px;
        height: 300px;
        border-radius: 5px;
    }

    .centered-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.private-checkbox) {
        margin-left: 20px;
    }

    #input-header {
        color: var(--profile_info_color);
        margin: 0;
        font-size: 2rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    input,
    textarea {
        font-size: 1.8rem;
        margin: 0 5px 20px 5px;
        width: 100%;
        background: var(--modal_input_bg_color);
    }

    textarea {
        min-height: 100px;
    }

    #bio-input {
        font-size: 1.7rem;
    }

    @media screen and (max-width: 720px) {
        #error-header {
            font-size: 1.7rem;
        }

        #avatar-preview {
            width: 64px;
            height: 64px;
        }

        #banner-preview {
            width: 400px;
            height: 225px;
        }

        :global(.private-checkbox) {
            margin-left: 10px;
            padding: 0;
        }

        #input-header {
            font-size: 1.7rem;
        }

        input {
            font-size: 1.7rem;
        }

        #bio-input {
            font-size: 1.5rem;
        }
    }

    @media screen and (max-width: 520px) {
        #error-header {
            font-size: 1.4rem;
        }

        #banner-preview {
            width: 300px;
            height: 169px;
        }

        #input-header {
            font-size: 1.4rem;
        }

        input {
            font-size: 1.4rem;
        }

        #bio-input {
            font-size: 1.3rem;
        }
    }
</style>
