<script lang="ts">
    import { ourPosts } from 'stores/dashboard';
    import { isMobile, socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import { quintInOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { loadOurPosts } from 'utilities/dashboard';
    import { isAcceptedImage } from 'utilities/main';
    import { uploadImage } from 'utilities/rooms';

    let attachmentBase64: string | ArrayBuffer;

    let uploading = false;

    function sharePost(): void {
        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = async (_) => {
            let file = Array.from(input.files)[0];

            if (file.size > ($ourData.isTurbo ? 3000000 : 1000000)) {
                return;
            }

            if (isAcceptedImage(file.type)) {
                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    uploading = true;

                    attachmentBase64 = reader.result;

                    socket.emit(
                        'sharePost',
                        {
                            attachment: await uploadImage(
                                attachmentBase64,
                                $ourData.isTurbo
                            ),
                        },
                        () => {
                            input.value = '';
                            input.disabled = false;

                            attachmentBase64 = '';

                            $ourPosts = [];

                            loadOurPosts($ourData.profileId);

                            uploading = false;
                        }
                    );
                });

                reader.readAsDataURL(file);
            }
        };

        input.click();
    }
</script>

<div
    class={`options-container ${$isMobile ? 'mobile' : ''}`}
    in:fly={{
        y: 0,
        duration: 400,
        easing: quintInOut,
        opacity: 0,
    }}
>
    <button disabled={uploading} on:click={sharePost}
        >{!uploading ? 'Share' : 'Sharing'} post{uploading ? '...' : ''}</button
    >
</div>

<style>
    .options-container {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        margin-bottom: 25px;
    }

    .mobile {
        margin-bottom: calc(75px + 20px);
    }

    button {
        width: 100%;
        max-width: 250px;
        font-size: 1rem;
        font-weight: 600;
        transition: 150ms;
        color: var(--text);
        margin-left: 10px;
        margin-right: 10px;
        background: rgb(125, 125, 125, 0.1);
    }

    button:hover {
        color: var(--text);
        background: rgb(125, 125, 125, 0.2);
    }

    @media screen and (max-width: 850px) {
        button {
            width: 200px;
            font-size: 0.85rem;
        }
    }
</style>
