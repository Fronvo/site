<script lang="ts">
    import Main from '$lib/app/main/Main.svelte';
    import { onMount } from 'svelte';
    import themingVars from 'svelte-css-vars';
    import {
        dismissDropdown,
        dismissModal,
        initSocket,
        setTitle,
        findCachedAccount,
    } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import '../app.css';
    import { currentTheme, defaultTheme, whiteTheme } from '../themes';
    import FronvoLoading from '$lib/app/FronvoLoading.svelte';
    import {
        cachedAccountData,
        darkTheme,
        fronvoTitle,
        isMobile,
        loginSucceeded,
        mousePos,
        showLayout,
        socket,
    } from 'stores/main';
    import { goto } from '$app/navigation';
    import { dropdownAnimationFinished } from 'stores/dropdowns';
    import {
        currentServer,
        serversList,
        currentChannel,
        currentRoomLoaded,
        currentRoomId,
        currentRoomData,
        currentRoomMessages,
        isInServer,
        dmsList,
        cachedRooms,
        pendingProfileDMId,
        pendingServerId,
        pendingChannelId,
    } from 'stores/rooms';
    import { ourPosts } from 'stores/dashboard';
    import { ourData } from 'stores/profile';
    import { loadOurPosts } from 'utilities/dashboard';
    import { pushCachedMessage } from 'utilities/rooms';
    import TopNav from '$lib/index/TopNav.svelte';
    import Footer from '$lib/index/Footer.svelte';
    import BlurredBackground from '$lib/index/BlurredBackground.svelte';

    let mountReady = false;

    function setupVars(): void {
        // Try our best to default to dark
        $darkTheme = !getKey('darkTheme') || getKey('darkTheme') == 'true';

        const userAgent = window.navigator.userAgent.toLowerCase();

        $isMobile =
            userAgent.includes('android') || userAgent.includes('iphone');
    }

    function setupTheming(): void {
        darkTheme.subscribe((dark) => {
            if (typeof dark == 'undefined') {
                return;
            }

            currentTheme.set(dark ? defaultTheme : whiteTheme);

            // Hacky but works for background color
            document.documentElement.style.setProperty(
                '--bg',
                dark ? defaultTheme.bg : whiteTheme.bg
            );
        });
    }

    function setupLayout(): void {
        // When layout is visible, perform socket actions
        showLayout.subscribe(async (state) => {
            // While loading, default to this
            setTitle('');

            if (state) {
                initSocket(() => {
                    $currentRoomLoaded = false;
                    $currentRoomId = undefined;
                    $currentRoomData = undefined;
                    $currentRoomMessages = [];

                    $isInServer = false;
                    $currentServer = undefined;
                    $currentChannel = undefined;

                    setupHooks();

                    loginSucceeded.subscribe((state) => {
                        if (!state) return;

                        Notification.requestPermission();

                        if ($pendingProfileDMId) {
                            for (const dmIndex in $dmsList) {
                                const dm = $dmsList[dmIndex];

                                if (
                                    dm.dmUser.profileId == $pendingProfileDMId
                                ) {
                                    $currentRoomData = dm;
                                    $currentRoomLoaded = false;
                                    $currentRoomLoaded = true;
                                    $currentRoomMessages = [];
                                    $currentRoomId = dm.roomId;

                                    setTitle(`@${dm.dmUser.profileId}`);

                                    dm.unreadCount = 0;

                                    return;
                                }
                            }
                        } else if ($pendingServerId) {
                            for (const serverIndex in $serversList) {
                                const server = $serversList[serverIndex];

                                if (server.invite == $pendingServerId) {
                                    if ($pendingChannelId) {
                                        for (const channelIndex in server.channels) {
                                            const channel =
                                                server.channels[channelIndex];

                                            if (
                                                channel.name ==
                                                $pendingChannelId
                                            ) {
                                                $currentRoomId = undefined;
                                                $currentRoomData = undefined;

                                                $isInServer = true;
                                                $currentServer = server;
                                                $currentChannel = channel;
                                                $currentRoomLoaded = false;
                                                $currentRoomLoaded = true;
                                                $currentRoomMessages = [];

                                                setTitle(
                                                    `#${channel.name} | ${server.name}`
                                                );

                                                return;
                                            }
                                        }

                                        // Invalid channel
                                        $currentChannel = undefined;
                                        $currentRoomId = undefined;
                                        $currentRoomData = undefined;

                                        $isInServer = true;
                                        $currentServer = server;

                                        $currentRoomMessages = [];

                                        goto(`/${server.invite}`, {
                                            replaceState: true,
                                        });

                                        setTitle(server.name);

                                        return;
                                    } else {
                                        $currentChannel = undefined;
                                        $currentRoomId = undefined;
                                        $currentRoomData = undefined;

                                        $isInServer = true;
                                        $currentServer = server;

                                        $currentRoomMessages = [];

                                        setTitle(server.name);

                                        return;
                                    }
                                }
                            }

                            // Invalid server
                            goto('/homepage', {
                                replaceState: true,
                            });

                            setTitle('');
                        }
                    });
                });
            }
        });
    }

    function setupListeners(): void {
        document.addEventListener('keydown', (ev) => {
            if (ev.key == 'Escape') {
                dismissModal();
                dismissDropdown();
            }
        });

        document.addEventListener('click', () => {
            if (!$dropdownAnimationFinished) return;

            dismissDropdown();
        });

        document.addEventListener('mousemove', (ev) => {
            $mousePos = [ev.clientX, ev.clientY];
        });
    }

    function setupHooks(): void {
        socket.on('newMessage', ({ newMessageData, roomId }) => {
            // Not same channel / dm
            if (($currentChannel?.channelId || $currentRoomId) != roomId) {
                setTimeout(() => {
                    pushCachedMessage(roomId, newMessageData, $cachedRooms);
                }, 0);
            }
        });

        socket.on('postRemoved', async ({ postId }) => {
            for (const postIndex in $ourPosts) {
                const post = $ourPosts[postIndex].post;

                if (post.postId == postId) {
                    $ourPosts = [];

                    await loadOurPosts($ourData.profileId);

                    break;
                }
            }
        });

        socket.on('dmCreated', ({ dm }) => {
            $dmsList.push(dm);

            $dmsList = $dmsList;
        });

        // Can't be us, another client on the same profile
        socket.on('dmHidden', ({ roomId }) => {
            for (const dmIndex in $dmsList) {
                const dm = $dmsList[dmIndex];

                if (dm.roomId == roomId) {
                    $dmsList.splice(Number(dmIndex), 1);

                    $dmsList = $dmsList;

                    break;
                }
            }
        });

        socket.on('pendingFriendRemoved', ({ profileId }) => {
            $ourData.pendingFriendRequests.splice(
                $ourData.pendingFriendRequests.indexOf(profileId),
                1
            );

            $ourData = $ourData;
        });

        socket.on('newFriendRequest', async ({ profileId }) => {
            $ourData.pendingFriendRequests.push(profileId);

            $ourData = $ourData;

            const icon = `${
                (await findCachedAccount(profileId, $cachedAccountData)).avatar
            }/tr:w-256:h-256:r-max`;

            new Notification(`@${profileId}`, {
                body: 'New friend request',
                icon,
            });
        });

        socket.on('serverCreated', ({ serverId, name, invite }) => {
            $serversList.push({
                serverId,
                name,
                icon: '',
                invite,
                channels: [],
                creationDate: new Date().toString(),
                members: [$ourData.profileId],
                ownerId: $ourData.profileId,
                roles: [],
            });

            // Update realtime
            $serversList = $serversList;
        });

        socket.on('serverJoined', ({ server }) => {
            $serversList.push({
                ...server,
            });

            // Update realtime
            $serversList = $serversList;
        });

        socket.on('serverDeleted', ({ serverId }) => {
            for (const serverIndex in $serversList) {
                const server = $serversList[serverIndex];

                if (server.serverId == serverId) {
                    $serversList.splice(Number(serverIndex), 1);

                    // Update realtime
                    $serversList = $serversList;

                    // Update current server too
                    if ($currentServer?.serverId == server.serverId) {
                        $isInServer = false;
                        $currentServer = undefined;
                        $currentChannel = undefined;
                        $currentRoomLoaded = false;
                    }

                    break;
                }
            }
        });

        socket.on('channelCreated', ({ serverId, channelId, name }) => {
            for (const serverIndex in $serversList) {
                const server = $serversList[serverIndex];

                if (server.serverId != serverId) continue;

                server.channels.push({
                    channelId,
                    name,
                    creationDate: new Date().toString(),
                });

                $serversList[serverIndex] = server;

                // Update realtime
                $serversList = $serversList;

                // Update current server too
                if ($currentServer?.serverId == server.serverId) {
                    $currentServer = server;
                }

                break;
            }
        });

        socket.on('channelRenamed', ({ serverId, channelId, name }) => {
            for (const serverIndex in $serversList) {
                const server = $serversList[serverIndex];

                if (server.serverId != serverId) continue;

                for (const channelIndex in server.channels) {
                    const channel = server.channels[channelIndex];

                    if (channel.channelId != channelId) continue;

                    server.channels[channelIndex].name = name;

                    // Update current channel
                    if ($currentChannel?.channelId == channelId) {
                        $currentChannel = undefined;
                    }

                    break;
                }

                $serversList[serverIndex] = server;

                // Update realtime
                $serversList = $serversList;

                // Update current server too
                if ($currentServer?.serverId == server.serverId) {
                    $currentServer = server;
                }

                break;
            }
        });

        socket.on('channelDeleted', ({ serverId, channelId }) => {
            for (const serverIndex in $serversList) {
                const server = $serversList[serverIndex];

                if (server.serverId != serverId) continue;

                for (const channelIndex in server.channels) {
                    const channel = server.channels[channelIndex];

                    if (channel.channelId != channelId) continue;

                    server.channels.splice(Number(channelIndex), 1);

                    break;
                }

                $serversList[serverIndex] = server;

                // Update realtime
                $serversList = $serversList;

                // Update current server too
                if ($currentServer?.serverId == server.serverId) {
                    $currentServer = server;
                }

                // If current channel, reset view
                if ($currentChannel?.channelId == channelId) {
                    $currentChannel = undefined;
                }

                break;
            }
        });

        socket.on('serverInvitesToggled', ({ serverId, enabled }) => {
            for (const serverIndex in $serversList) {
                const server = $serversList[serverIndex];

                if (server.serverId == serverId) {
                    $serversList[serverIndex].invitesDisabled = !enabled;

                    // Update realtime
                    $serversList = $serversList;

                    // Update current server too
                    if ($currentServer?.serverId == server.serverId) {
                        $currentServer = server;
                    }

                    break;
                }
            }
        });

        socket.on('serverInviteRegenerated', ({ serverId, invite }) => {
            for (const serverIndex in $serversList) {
                const server = $serversList[serverIndex];

                if (server.serverId == serverId) {
                    $serversList[serverIndex].invite = invite;

                    // Update realtime
                    $serversList = $serversList;

                    // Update current server too
                    if ($currentServer?.serverId == server.serverId) {
                        $currentServer = server;

                        if ($currentChannel) {
                            goto(
                                `/${$currentServer.invite}/${$currentChannel.name}`
                            );
                        } else {
                            goto(`/${$currentServer.invite}`);
                        }
                    }

                    break;
                }
            }
        });

        socket.on('memberBanned', ({ serverId, profileId }) => {
            for (const serverIndex in $serversList) {
                const server = $serversList[serverIndex];

                if (server.serverId == serverId) {
                    // Don't update members, this is only for admins, memberLeft has already been fired
                    $serversList[serverIndex].bannedMembers.push(profileId);

                    // Update realtime
                    $serversList = $serversList;

                    // Update current server too
                    if ($currentServer?.serverId == server.serverId) {
                        $currentServer = $serversList[serverIndex];
                    }

                    break;
                }
            }
        });

        socket.on('memberUnbanned', ({ serverId, profileId }) => {
            for (const serverIndex in $serversList) {
                const server = $serversList[serverIndex];

                if (server.serverId == serverId) {
                    // Don't update members, this is only for admins, memberLeft has already been fired
                    $serversList[serverIndex].bannedMembers.splice(
                        $serversList[serverIndex].bannedMembers.indexOf(
                            profileId
                        ),
                        1
                    );

                    // Update realtime
                    $serversList = $serversList;

                    // Update current server too
                    if ($currentServer?.serverId == server.serverId) {
                        $currentServer = $serversList[serverIndex];
                    }

                    break;
                }
            }
        });

        socket.on('connectionsUpdated', ({ profileId, spotify, github }) => {
            if (profileId == $ourData.profileId) {
                $ourData = {
                    ...$ourData,
                    ...spotify,
                    ...github,
                };

                $ourData = $ourData;
            } else {
                for (const cachedAccountIndex in $cachedAccountData) {
                    const account = $cachedAccountData[cachedAccountIndex];

                    if (account.profileId == profileId) {
                        $cachedAccountData[cachedAccountIndex] = {
                            ...$cachedAccountData[cachedAccountIndex],
                            ...spotify,
                            ...github,
                        };

                        $cachedAccountData = $cachedAccountData;

                        break;
                    }
                }
            }
        });
    }

    onMount(() => {
        mountReady = true;

        setupVars();
        setupTheming();
        setupLayout();
        setupListeners();
    });
</script>

<svelte:head>
    <title>{$fronvoTitle}</title>
</svelte:head>

<div use:themingVars={{ ...$currentTheme }}>
    {#if mountReady}
        {#if $showLayout}
            {#if $loginSucceeded == undefined}
                <FronvoLoading />
            {:else}
                <Main />
            {/if}
        {:else}
            <TopNav />

            <BlurredBackground />

            <Footer />
        {/if}

        <slot />
    {/if}
</div>

<style>
    :global(body) {
        background: var(--bg);
    }

    /* Elegant theme feature */
    :global(#blur) {
        backdrop-filter: blur(3px);
        background: none;
    }

    /* Checkboxes */
    :global(.checkbox) {
        margin-left: 15px;
    }

    /* Links */
    :global(.link) {
        text-decoration: none;
        /* color: rgb(0, 162, 255); */
        color: var(--text_gray);
    }

    :global(.link:hover) {
        text-decoration: underline;
        /* color: rgb(0, 162, 255); */
    }

    /* Modal-related */
    :global(.modal-header) {
        color: white;
        margin: 0;
        font-size: var(--modal_header_size);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global(.modal-error-header) {
        color: red;
        margin-bottom: 10px;
        width: 90%;
        text-align: center;
    }

    :global(.modal-input) {
        font-size: var(--modal_input_size);
        margin: 0 5px 10px 5px;
        width: 400px;
        background: var(--modal_input_bg);
        color: white;
    }

    :global(.modal-button) {
        font-size: var(--modal_button_size);
        width: max-content;
    }

    :global(.modal-center) {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        margin-right: 5px;
    }

    :global(.modal-center-no-overflow) {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
