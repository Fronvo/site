<script lang="ts">
    import { modalVisible, viewHomePostModalInfo } from 'stores/app/main';
    import Time from 'svelte-time';

    const info = $viewHomePostModalInfo;
</script>

<div class="view-container">
    <div class="by-container">
        <h1 id="author">By {info.profileData.username}</h1>
        <img
            id="avatar"
            src={info.profileData.avatar
                ? info.profileData.avatar
                : 'svgs/profile/default.svg'}
            draggable={false}
            alt={`${info.profileData.username}'s avatar`}
        />
    </div>

    <div class="data-container">
        <h1 id="title">{info.post.title}</h1>

        <h1 id="content">{info.post.content}</h1>

        {#if info.post.attachment}
            <img
                id="attachment"
                src={info.post.attachment}
                alt={`'${info.post.title}' attachment`}
                draggable={false}
            />
        {/if}

        <h1 id="creation-date">
            <!-- Updates every 15 seconds -->
            <Time
                format={'dddd HH:mm · MMMM D YYYY'}
                live={15000}
                timestamp={info.post.creationDate}
            />
        </h1>
    </div>

    <div class="options-container">
        <button
            on:click={() => {
                $modalVisible = false;
            }}>Close</button
        >
    </div>
</div>

<style>
    .view-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        align-items: center;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 75%;
        min-width: 500px;
        flex: 1;
        overflow-y: auto;
        margin-bottom: 10px;
    }

    .by-container {
        display: flex;
        align-items: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 10px;
    }

    .by-container #author {
        color: var(--theme-profile_info_color);
        margin: 0;
        font-size: 2.5rem;
        padding: 5px;
    }

    .by-container #avatar {
        width: 64px;
        height: 64px;
        padding: 5px;
        border-radius: 10px;
    }

    .data-container #title {
        margin: 0;
        text-align: center;
        font-size: 3rem;
    }

    .data-container #content {
        margin: 0;
        font-size: 2rem;
        color: var(--theme-profile_info_color);
        white-space: pre-wrap;
        text-align: center;
        max-width: 65%;
    }

    .data-container #attachment {
        max-width: 70%;
        max-height: 70%;
        margin-top: 10px;
        border-radius: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .data-container #creation-date {
        font-size: 1.6rem;
        margin: 0;
        margin-top: 20px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .options-container {
        display: flex;
        margin-bottom: 15px;
    }

    .options-container button {
        font-size: 2.2rem;
    }

    @media screen and (max-width: 720px) {
        .data-container {
            width: 400px;
            min-width: auto;
        }

        .by-container #author {
            font-size: 2.2rem;
        }

        .data-container #title {
            font-size: 2.4rem;
        }

        .data-container #content {
            font-size: 1.5rem;
            max-width: none;
        }

        .data-container #attachment {
            max-width: 100%;
            max-height: 512px;
        }

        .data-container #creation-date {
            font-size: 1.5rem;
        }

        .options-container button {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .data-container {
            width: 300px;
        }

        .by-container #author {
            font-size: 1.9rem;
        }

        .by-container #avatar {
            width: 48px;
            height: 48px;
        }

        .data-container #title {
            font-size: 1.7rem;
        }

        .data-container #content {
            font-size: 1.3rem;
        }

        .data-container #attachment {
            max-width: 100%;
            max-height: 100%;
        }

        .data-container #creation-date {
            font-size: 1.2rem;
        }

        .options-container button {
            font-size: 1.5rem;
        }
    }
</style>
