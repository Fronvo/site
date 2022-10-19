<script lang="ts">
    import { goto } from '$app/navigation';
    import { dismissModal } from 'utilities/main';
    import { userData } from 'stores/profile';
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
    let isPrivate = $userData.isPrivate;

    let canUpload = true;
    let isUploading = false;
    let errorMessage: string;

    function uploadData(): void {
        if (!canUpload || isUploading) return;

        isUploading = true;

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

                $userData = { ...$userData, ...profileData };

                dismissModal();
            }
        );
    }

    onMount(() => {
        // Provided 404 backup image
        const avatarPreview: HTMLImageElement = document.getElementById(
            'avatar-preview'
        ) as HTMLImageElement;

        avatarPreview.onerror = () => {
            const avatarText =
                document.getElementsByClassName('avatar-info')[0];

            avatarText.textContent = 'Avatar - Invalid URL';

            canUpload = false;
            avatarPreview.src = '/svgs/profile/default.svg';
        };
        avatar.subscribe((newAvatar) => {
            if (newAvatar == undefined) return;

            const avatarText =
                document.getElementsByClassName('avatar-info')[0];

            // Allow empty avatar url, reset it
            if (newAvatar == '') {
                // Reset state
                avatarText.textContent = 'Avatar';

                canUpload = true;
            }

            // Check for avatar https, perform some client side validation on our own
            else if (!newAvatar.match(/^(https:\/\/).+$/)) {
                avatarText.textContent = 'Avatar - Invalid URL';

                canUpload = false;
            } else if (!canUpload) {
                // Reset state
                avatarText.textContent = 'Avatar';

                canUpload = true;
            }
        });
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

        extraStyling: ['width: 40%'],
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

    <div>
        <img
            id="avatar-preview"
            src={$avatar ? $avatar : '/svgs/profile/default.svg'}
            alt="New avatar"
            draggable={false}
        />
        <h1 id="input-header" class="avatar-info">Avatar</h1>
    </div>

    <input maxlength={512} bind:value={$avatar} />

    <div class="centered-container">
        <h1 id="input-header">Private account</h1>
        <Checkbox
            bind:checked={isPrivate}
            class="private-checkbox"
            size="2.7rem"
            primaryColor="rgb(180, 120, 255)"
            secondaryColor="white"
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
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    #avatar-preview {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        margin-right: 10px;
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
        font-size: 2.2rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    input,
    textarea {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 95%;
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
            width: 48px;
            height: 48px;
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
