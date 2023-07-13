<script lang="ts">
    import { socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import { isAcceptedImage, setProgressBar } from 'utilities/main';

    export let banner: string;
    export let editable = false;
    export let mini = false;
    export let preview = false;

    let uploading = false;

    function changeBanner(): void {
        if (!editable || uploading) return;

        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = async (_) => {
            let file = Array.from(input.files)[0];

            // 3MB
            if (file.size > 3000000) return;

            if (isAcceptedImage(file.type)) {
                uploading = true;

                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    setProgressBar(true);

                    let previousIcon = banner;

                    const newIcon = await (
                        await fetch('/api/upload', {
                            method: 'POST',
                            body: JSON.stringify({
                                file: reader.result,
                                width: 650,
                                height: 225,
                            }),
                        })
                    ).json();

                    socket.emit('updateProfileData', {
                        banner: newIcon,
                    });

                    banner = newIcon;
                    $ourData.banner = newIcon;

                    await fetch('/api/remove', {
                        method: 'POST',
                        body: JSON.stringify({
                            icon: previousIcon,
                        }),
                    });

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
