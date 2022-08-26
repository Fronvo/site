<script lang="ts">
    import { goto } from '$app/navigation';
    import type { ThemeContext } from 'interfaces/global';
    import { modalVisible } from 'stores/app/main';
    import { userData } from 'stores/app/profile';
    import { socket } from 'stores/global';
    import { onMount } from 'svelte';
    import Checkbox from 'svelte-checkbox';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';

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

                $modalVisible = false;
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
</script>

<div class="edit-container">
    <div class="header-container">
        <h1 id="header">Edit Profile</h1>
    </div>

    <hr />

    <div class="data-container">
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
    </div>

    <div class="options-container">
        <button on:click={uploadData}>Save</button>

        <button
            on:click={() => {
                if (!isUploading) $modalVisible = false;
            }}>Discard</button
        >
    </div>
</div>

<style>
    hr {
        width: 100px;
    }

    .edit-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        overflow-y: auto;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 5px;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        width: 40%;
        min-width: 450px;
    }

    .data-container #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    .data-container div {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .data-container div #avatar-preview {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        margin-right: 10px;
    }

    .data-container .centered-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.data-container div .private-checkbox) {
        margin-left: 20px;
    }

    .data-container #input-header {
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

    .data-container input,
    .data-container textarea {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 95%;
        background: var(--modal_input_bg_color);
    }

    .data-container textarea {
        min-height: 100px;
    }

    .data-container #bio-input {
        font-size: 1.7rem;
    }

    .options-container {
        display: flex;
        margin-bottom: 15px;
        margin-top: 10px;
    }

    .options-container button {
        font-size: 2.2rem;
        margin-right: 20px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

        .data-container {
            width: 350px;
            min-width: auto;
        }

        .data-container #error-header {
            font-size: 1.7rem;
        }

        .data-container div #avatar-preview {
            width: 48px;
            height: 48px;
        }

        :global(.data-container div .private-checkbox) {
            margin-left: 10px;
            padding: 0;
        }

        .data-container #input-header {
            font-size: 1.7rem;
        }

        .data-container input {
            font-size: 1.7rem;
        }

        .data-container #bio-input {
            font-size: 1.5rem;
        }

        .options-container button {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        .data-container {
            width: 300px;
        }

        .data-container #error-header {
            font-size: 1.4rem;
        }

        .data-container #input-header {
            font-size: 1.4rem;
        }

        .data-container input {
            font-size: 1.4rem;
        }

        .data-container #bio-input {
            font-size: 1.3rem;
        }

        .options-container button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
