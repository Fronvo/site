<script lang="ts">
    import { socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import { toast } from 'svelte-sonner';
    import type { Writable } from 'svelte/store';
    import { isAcceptedImage } from 'utilities/main';
    import { uploadImage } from 'utilities/rooms';

    let uploading = false;

    export let avatar: Writable<string>;

    function changeAvatar(): void {
        if (uploading) return;

        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = async (_) => {
            let file = Array.from(input.files)[0];

            if (file.size > ($ourData.isTurbo ? 3000000 : 1000000)) {
                toast(`Image is above ${$ourData.isTurbo ? 3 : 1}MB.`);
                return;
            }

            if (isAcceptedImage(file.type)) {
                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    const newIcon = await uploadImage(
                        reader.result,
                        $ourData.isTurbo
                    );

                    socket.emit('updateProfileData', {
                        avatar: newIcon,
                    });

                    $avatar = newIcon;
                    $ourData.avatar = newIcon;

                    uploading = false;
                });

                reader.readAsDataURL(file);
            }
        };

        input.click();
    }
</script>

<div class="top-container">
    {#if $ourData.avatar}
        <img
            on:click={changeAvatar}
            on:keydown={changeAvatar}
            id="avatar"
            src={$ourData.avatar}
            alt={`${$ourData.username}\'s avatar'`}
            draggable={false}
        />
    {:else}
        <img
            on:click={changeAvatar}
            on:keydown={changeAvatar}
            src="/images/avatar.png"
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

    #avatar {
        width: 128px;
        height: 128px;
        border-radius: 100px;
        transition: 150ms;
        margin-left: 20px;
        transform: translateY(-80px);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
    }
</style>
