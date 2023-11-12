<script lang="ts">
    import { DropdownTypes } from 'stores/dropdowns';
    import { socket } from 'stores/main';
    import { ModalTypes, targetProfileModal } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { toast } from 'svelte-sonner';
    import {
        isAcceptedImage,
        setProgressBar,
        showDropdown,
        showModal,
    } from 'utilities/main';
    import { uploadImage } from 'utilities/rooms';

    export let avatar: string;
    export let editable = false;
    export let mini = false;
    export let preview = false;

    let uploading = false;

    let settings: SVGSVGElement;

    function changeAvatar(): void {
        if (!editable || uploading) return;

        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = async (_) => {
            let file = Array.from(input.files)[0];

            if (file.size > ($ourData.isPRO ? 3000000 : 1000000)) {
                toast(`Image is above ${$ourData.isPRO ? 3 : 1}MB.`);
                return;
            }

            if (isAcceptedImage(file.type)) {
                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    setProgressBar(true);

                    const newIcon = await uploadImage(
                        reader.result,
                        $ourData.isPRO
                    );

                    socket.emit('updateProfileData', {
                        avatar: newIcon,
                    });

                    avatar = newIcon;
                    $ourData.avatar = newIcon;

                    setProgressBar(false);
                    uploading = false;
                });

                reader.readAsDataURL(file);
            }
        };

        input.click();
    }

    function showSettings(): void {
        showDropdown(DropdownTypes.ProfileSettings, settings, 'bottom', -40);
    }

    function viewProfile(): void {
        $targetProfileModal = $ourData;

        showModal(ModalTypes.Profile);
    }
</script>

<div
    class={`top-container ${editable ? 'editable' : ''} ${mini ? 'mini' : ''} ${
        preview ? 'preview' : ''
    }`}
>
    {#if avatar}
        <img
            id="avatar"
            on:click={viewProfile}
            on:keydown={viewProfile}
            src={avatar}
            alt={`${avatar}`}
            draggable={false}
        />
    {:else}
        <img
            src="/images/avatar.svg"
            draggable={false}
            alt="Avatar"
            id="avatar"
        />
    {/if}
</div>

<style>
    .top-container {
        display: flex;
        align-items: center;
        flex: 1;
        width: 100%;
    }

    img {
        border: 20px solid var(--modal_content_bg);
    }

    #avatar {
        width: 100px;
        height: 100px;
        border-radius: 100px;
        transition: 150ms;
        margin-left: 20px;
        transform: translateY(-40px);
        background: var(--modal_content_bg);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
    }

    #avatar:hover {
        filter: brightness(60%);
    }

    .mini #avatar {
        width: 90px;
        height: 90px;
        background: var(--bg);
        margin-left: 15px;
        margin-bottom: 5px;
    }

    .mini img {
        border: 5px solid var(--primary);
    }

    .editable #avatar {
        cursor: pointer;
        z-index: 1;
    }

    .editable #avatar:hover {
        opacity: 0.75;
    }

    .preview #avatar {
        width: 80px;
        height: 80px;
        border: 5px solid var(--bg);
    }
</style>
