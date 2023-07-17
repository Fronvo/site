<script lang="ts">
    import { DropdownTypes } from 'stores/dropdowns';
    import { socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import { isAcceptedImage, showDropdown } from 'utilities/main';

    export let avatar: string;
    export let editable = false;
    export let mini = false;
    export let preview = false;

    let settings: SVGSVGElement;

    function changeAvatar(): void {
        if (!editable) return;

        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = async (_) => {
            let file = Array.from(input.files)[0];

            // 3MB
            if (file.size > 3000000) return;

            if (isAcceptedImage(file.type)) {
                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    let previousIcon = avatar;

                    const newIcon = await (
                        await fetch('/api/upload', {
                            method: 'POST',
                            body: JSON.stringify({
                                file: reader.result,
                            }),
                        })
                    ).json();

                    socket.emit('updateProfileData', {
                        avatar: newIcon,
                    });

                    avatar = newIcon;
                    $ourData.avatar = newIcon;

                    await fetch('/api/remove', {
                        method: 'POST',
                        body: JSON.stringify({
                            icon: previousIcon,
                        }),
                    });
                });

                reader.readAsDataURL(file);
            }
        };

        input.click();
    }

    function showSettings(): void {
        showDropdown(DropdownTypes.ProfileSettings, settings, 'bottom', -40);
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
            on:click={changeAvatar}
            on:keydown={changeAvatar}
            src={avatar}
            alt={`${avatar}`}
            draggable={false}
        />
    {:else}
        <svg
            on:click={changeAvatar}
            on:keydown={changeAvatar}
            id="avatar"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
            ><path
                fill="var(--text)"
                d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z"
            /></svg
        >{/if}

    {#if editable}
        <span />

        <svg
            bind:this={settings}
            on:click={showSettings}
            on:keydown={showSettings}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="none"
                ><path
                    fill="var(--branding)"
                    d="M9 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
                /><circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="var(--branding)"
                    stroke-width="1.5"
                    opacity=".5"
                /></g
            ></svg
        >
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
        border: 5px solid var(--modal_content_bg);
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
        cursor: default;
    }

    .mini #avatar {
        width: 90px;
        height: 90px;
        background: var(--bg);
        margin-left: 15px;
    }

    .mini img {
        border: 3px solid var(--bg);
    }

    .editable #avatar {
        cursor: pointer;
    }

    .editable #avatar:hover {
        opacity: 0.75;
    }

    .preview #avatar {
        width: 80px;
        height: 80px;
        border: 5px solid var(--bg);
    }

    span {
        flex: 1;
    }

    svg {
        width: 40px;
        height: 40px;
        padding: 5px;
        margin-right: 5px;
        border-radius: 15px;
        transform: translateY(-20px);
        z-index: 1;
    }

    svg:hover {
        background: var(--primary);
    }
</style>
