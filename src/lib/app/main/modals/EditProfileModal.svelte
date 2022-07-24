<script lang="ts">
    import { userData } from 'src/stores/app/profile';
    import { socket } from 'src/stores/global';
    import { modalVisible } from 'stores/app/main';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';

    let username: string = $userData.username;
    let avatar: Writable<string> = writable($userData.avatar);
    let canUpload = true;
    let errorMessage: string;

    onMount(() => {
        // Provided 404 backup image
        const avatarPreview: HTMLImageElement = document.getElementById(
            'avatar-preview'
        ) as HTMLImageElement;
        avatarPreview.onerror = () => {
            avatarPreview.src = 'svgs/profile/default.svg';
        };
    });

    function uploadData(): void {
        if (!canUpload) return;

        socket.emit(
            'updateProfileData',
            {
                avatar: $avatar,
                username,
            },
            ({ err }) => {
                if (err) {
                    errorMessage = err.msg;

                    return;
                }

                // Update userData
                $userData.username = username;
                $userData.avatar = $avatar;

                $modalVisible = false;
            }
        );
    }

    avatar.subscribe((newAvatar) => {
        if (!newAvatar) return;

        const avatarText = document.getElementsByClassName('avatar-info')[0];

        // Check for avatar https, perform some client side validation on our own
        if (!newAvatar.match(/^(https:\/\/).+$/)) {
            avatarText.textContent = 'Avatar - Invalid URL';

            canUpload = false;
        } else if (!canUpload) {
            // Reset state
            avatarText.textContent = 'Avatar';

            canUpload = true;
        }
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

        <h1 id="input-header">Username</h1>
        <input id="username-input" bind:value={username} maxlength={30} />

        <div>
            <img
                id="avatar-preview"
                src={$avatar}
                alt="New avatar"
                draggable={false}
            />
            <h1 id="input-header" class="avatar-info">Avatar</h1>
        </div>

        <input id="avatar-input" bind:value={$avatar} />
    </div>

    <div class="options-container">
        <button id="save" on:click={uploadData}>Save</button>

        <button
            id="discard"
            on:click={() => {
                $modalVisible = false;
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
        height: 100%;
        align-items: center;
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
        width: 450px;
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

    .data-container #input-header {
        color: var(--theme-profile_info_color);
        margin: 0;
        font-size: 2.2rem;
    }

    .data-container input {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 95%;
    }

    .options-container {
        display: flex;
        margin-bottom: 15px;
        margin-top: 50px;
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
        }

        .data-container #error-header {
            font-size: 1.7rem;
        }

        .data-container div #avatar-preview {
            width: 48px;
            height: 48px;
        }

        .data-container #input-header {
            font-size: 1.7rem;
        }

        .data-container input {
            font-size: 1.7rem;
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

        .options-container button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
