<script lang="ts">
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { onMount } from 'svelte';
    import Checkbox from 'svelte-checkbox';
    import { writable, type Writable } from 'svelte/store';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { ourData, searchData } from 'stores/profile';
    import { loadOurProfile, loadTargetProfile } from 'utilities/profile';
    import { cachedAccountData, socket } from 'stores/main';
    import { currentPanelId, PanelTypes } from 'stores/panels';
    import type { ModalData } from 'stores/modals';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';

    let profileId = $ourData.profileId;
    let username = $ourData.username;
    let bio = $ourData.bio;
    let avatar: Writable<string> = writable($ourData.avatar);
    let banner: Writable<string> = writable($ourData.banner);
    let isPrivate = $ourData.isPrivate;

    let canUpload = true;
    let isUploading = false;
    let errorMessage: string;

    function uploadData(): void {
        if (!canUpload || isUploading) return;

        isUploading = true;
        setProgressBar(true);

        const updatedData = {};

        if ($ourData.profileId != profileId) {
            updatedData['profileId'] = profileId;
        }

        if ($ourData.username != username) {
            updatedData['username'] = username;
        }

        if ($ourData.bio != bio) {
            updatedData['bio'] = bio;
        }

        if ($ourData.avatar != $avatar) {
            updatedData['avatar'] = $avatar;
        }

        if ($ourData.banner != $banner) {
            updatedData['banner'] = $banner;
        }

        if ($ourData.isPrivate != isPrivate) {
            updatedData['isPrivate'] = isPrivate;
        }

        socket.emit('updateProfileData', updatedData, async ({ err }) => {
            if (err) {
                errorMessage = err.msg;
                isUploading = false;
                setProgressBar(false);

                return;
            }

            await loadOurProfile($cachedAccountData);

            if (
                $searchData?.profileId == $ourData.profileId &&
                $currentPanelId == PanelTypes.Profile
            ) {
                await loadTargetProfile($ourData.profileId, $cachedAccountData);
            }

            setProgressBar(false);

            dismissModal();
        });
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

        useSecondaryHr: true,
    };
</script>

<ModalTemplate {data}>
    <ErrorHeader {errorMessage} />

    <h1 class="modal-header">Profile ID</h1>
    <input class="modal-input" bind:value={profileId} maxlength={30} />

    <h1 class="modal-header">Username</h1>
    <input class="modal-input" bind:value={username} maxlength={30} />

    <h1 class="modal-header">Bio</h1>
    <textarea class="modal-input" bind:value={bio} maxlength={128} rows={4} />

    <div class="modal-center">
        <img
            id="avatar-preview"
            src={$avatar ? $avatar : '/svgs/profile/avatar.svg'}
            alt="New avatar"
            draggable={false}
        />
    </div>

    <input class="modal-input" maxlength={512} bind:value={$avatar} />

    <div>
        <img
            id="banner-preview"
            src={$banner ? $banner : '/svgs/profile/banner.svg'}
            alt="New banner"
            draggable={false}
        />
    </div>

    <input class="modal-input" maxlength={512} bind:value={$banner} />

    <div class="modal-center">
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
        width: 128px;
        height: 128px;
        border-radius: 10px;
        margin-right: 10px;
    }

    #banner-preview {
        width: 400px;
        height: 230px;
        border-radius: 5px;
    }

    textarea {
        min-height: 150px;
    }

    @media screen and (max-width: 850px) {
        #avatar-preview {
            width: 64px;
            height: 64px;
        }

        #banner-preview {
            width: 250px;
            height: 150px;
        }
    }
</style>
