<script lang="ts">
    import { socket } from 'stores/main';
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { toast } from 'svelte-sonner';
    import { isAcceptedImage, setProgressBar, showModal } from 'utilities/main';
    import { uploadImage } from 'utilities/rooms';

    export let banner: string;
    export let editable = false;
    export let mini = false;
    export let preview = false;

    let uploading = false;

    function changeBanner(): void {
        if (!editable || uploading) return;

        if (!$ourData.isPRO) {
            showModal(ModalTypes.GoPRO);

            return;
        }

        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = async (_) => {
            let file = Array.from(input.files)[0];

            if (file.size > 3000000) {
                toast(`Image is above 3MB.`);
                return;
            }

            if (isAcceptedImage(file.type)) {
                uploading = true;

                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    setProgressBar(true);

                    const newIcon = await uploadImage(
                        reader.result,
                        $ourData.isPRO,
                        650,
                        225
                    );

                    socket.emit('updateProfileData', {
                        banner: newIcon,
                    });

                    banner = newIcon;
                    $ourData.banner = newIcon;

                    setProgressBar(false);
                    uploading = false;
                });

                reader.readAsDataURL(file);
            }
        };

        input.click();
    }
</script>

<img
    class={`${editable ? 'editable' : ''} ${mini ? 'mini' : ''} ${
        preview ? 'preview' : ''
    }`}
    src={banner ? banner : '/images/banner.png'}
    alt="Banner"
    draggable={false}
    on:click={changeBanner}
    on:keydown={changeBanner}
/>

<style>
    img {
        width: 100%;
        height: 185px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        transition: 150ms;
    }

    .mini {
        width: 350px;
        height: 120px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .editable {
        cursor: pointer;
    }

    .editable:hover {
        opacity: 0.75;
    }

    .preview {
        border-radius: 0;
        height: 105px;
    }
</style>
