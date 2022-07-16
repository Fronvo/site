<script lang="ts">
    import { goto } from '$app/navigation';
    import { userData } from 'stores/app/profile';
    import { fade } from 'svelte/transition';
    import { loadProfilePanel } from 'utilities/app/profile';

    goto('profile', {
        replaceState: true,
    });

    $: loadProfilePanel();
</script>

<div class="profile-container" in:fade={{ duration: 300, delay: 100 }}>
    <!-- Hot updates in dev -->
    {#if $userData}
        <!-- TODO: Pfp url check once implemented server-side -->
        <img
            id="avatar"
            src="svgs/profile/default.svg"
            alt={`${$userData.username}\'s avatar`}
            draggable={false}
        />

        <h1 in:fade={{ duration: 300, delay: 200 }} id="username">
            {$userData.username}
        </h1>

        <div class="follow-container">
            <h1 in:fade={{ duration: 400, delay: 300 }}>
                <span>0</span> following
            </h1>
            <h1 in:fade={{ duration: 400, delay: 400 }}>
                <span>0</span> followers
            </h1>
        </div>

        <hr in:fade={{ duration: 250, delay: 700 }} />
    {/if}
</div>

<style>
    .profile-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 100px;
        margin-right: 100px;
        margin-top: 10px;
    }

    .profile-container #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .profile-container #username {
        font-size: 3rem;
        margin: 0;
        margin-left: 10px;
    }

    .follow-container {
        display: flex;
        flex-wrap: nowrap;
        margin-top: 10px;
    }

    .follow-container h1 {
        cursor: pointer;
        font-size: 2.1rem;
        margin: 0;
    }

    .follow-container h1:first-child {
        margin-right: 20px;
    }

    .follow-container h1 span {
        color: var(--theme-follow_text_color);
    }

    hr {
        width: 300px;
        margin-top: 20px;
    }

    @media screen and (max-width: 720px) {
        .profile-container {
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 90px;
        }

        .profile-container #avatar {
            width: 120px;
            height: 120px;
        }

        .profile-container #username {
            font-size: 2.5rem;
        }

        .follow-container {
            margin-top: 5px;
        }

        .follow-container h1 {
            font-size: 1.8rem;
        }

        .follow-container h1:first-child {
            margin-right: 15px;
        }

        hr {
            width: 250px;
            margin-top: 15px;
        }
    }

    @media screen and (max-width: 520px) {
        .profile-container {
            margin-bottom: 70px;
        }

        .profile-container #avatar {
            width: 100px;
            height: 100px;
        }

        .profile-container #username {
            font-size: 2rem;
        }

        .follow-container h1 {
            font-size: 1.5rem;
        }

        .follow-container h1:first-child {
            margin-right: 10px;
        }

        hr {
            width: 200px;
        }
    }
</style>
