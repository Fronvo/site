<script lang="ts">
    import { DropdownTypes } from 'stores/dropdowns';
    import { socket } from 'stores/main';
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import {
        isAcceptedImage,
        setProgressBar,
        showDropdown,
        showModal,
    } from 'utilities/main';

    export let profileId: string;
    export let avatar: string;
    export let isPRO: boolean;
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
                return;
            }

            if (isAcceptedImage(file.type)) {
                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    setProgressBar(true);

                    let previousIcon = avatar;

                    const newIcon = await (
                        await fetch('/api/upload', {
                            method: 'POST',
                            body: JSON.stringify({
                                file: reader.result,
                                isPRO: $ourData.isPRO,
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

                    setProgressBar(false);
                    uploading = false;
                });

                reader.readAsDataURL(file);
            }
        };

        input.click();
    }

    function goPRO(): void {
        if ($ourData.isPRO) return;

        showModal(ModalTypes.GoPRO);
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

    {#if isPRO}
        <svg
            id="pro"
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="512"
            height="512"
            on:click={goPRO}
            on:keydown={goPRO}
            ><style>
                .a {
                    opacity: 1;
                    fill: var(--primary);
                }
                .b {
                    fill: var(--pro);
                }
            </style><path
                class="a"
                d="m73.9 438.1c31.3 31.2 81.5 31.2 182.1 31.2 100.6 0 150.8 0 182.1-31.2 31.2-31.2 31.2-81.5 31.2-182.1 0-100.6 0-150.8-31.2-182.1-31.2-31.2-81.5-31.2-182.1-31.2-100.6 0-150.8 0-182.1 31.2-31.2 31.3-31.2 81.5-31.2 182.1 0 100.6 0 150.8 31.2 182.1z"
            /><path
                class="b"
                d="m362.7 270.2c0 91-75.9 113.8-113.8 113.8-33.2 0-99.6-22.8-99.6-113.8 0-39.6 22.7-64.7 41.8-77.3 8.7-5.8 19.5-2.1 20.1 8.3 1.2 22.8 18.8 41.2 32.4 22.8 12.5-16.8 18.7-39.6 18.7-53.3 0-20.2 20.4-33.1 36.4-20.7 31.1 24.1 64 64.5 64 120.2z"
            /></svg
        >
    {/if}

    <span />

    {#if !$ourData.isPRO && profileId == $ourData.profileId}
        <button id="pro-btn" on:click={() => showModal(ModalTypes.GoPRO)}
            >Go PRO</button
        >
    {/if}

    {#if editable}
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
        margin-bottom: 5px;
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

    #pro {
        padding: 2px;
    }

    #pro:hover {
        background: transparent;
    }

    #pro-btn {
        transform: translateY(-20px) translateX(-20px);
        background: var(--pro);
        color: white;
        box-shadow: 0 0 10px var(--pro);
        transition: 150ms;
    }

    #pro-btn:hover {
        background: var(--pro_darken);
    }
</style>
