<script lang="ts">
    import { fetchUser, setProgressBar, showModal } from 'utilities/main';
    import { userData } from 'stores/profile';
    import { socket } from 'stores/all';
    import { homePosts } from 'stores/home';
    import { ourProfileData } from 'stores/profile';
    import { getKey } from 'utilities/global';
    import { ModalTypes } from 'types/main';

    let isFollowed = $ourProfileData?.following.includes($userData.profileId);
    let isRequesting = false;

    async function handleFollowProfile(): Promise<void> {
        if (isRequesting) return;

        if (!getKey('token')) {
            showModal(ModalTypes.JoinFronvo);
            return;
        }

        // Block adjacent requests
        isRequesting = true;
        setProgressBar(true);

        if (!isFollowed) {
            socket.emit(
                'followProfile',
                { profileId: $userData.profileId },
                ({ err }) => {
                    if (!err) {
                        reloadProfile();
                    }
                }
            );
        } else {
            socket.emit(
                'unfollowProfile',
                { profileId: $userData.profileId },
                ({ err }) => {
                    if (!err) {
                        reloadProfile();
                    }
                }
            );
        }

        async function reloadProfile(): Promise<void> {
            // Update follow counts
            $userData = await fetchUser($userData.profileId);

            isRequesting = false;
            setProgressBar(false);

            // Reset home posts
            homePosts.set(undefined);
        }

        // Illusion of no delay
        isFollowed = !isFollowed;
    }
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={handleFollowProfile}
    ><path
        class="svg"
        d={!isFollowed
            ? 'M36.6 27.45V21.1h-6.35v-2.15h6.35V12.6h2.2v6.35h6.3v2.15h-6.3v6.35ZM18 23.35q-2.85 0-4.7-1.825T11.45 16.8q0-2.9 1.85-4.725 1.85-1.825 4.7-1.825 2.9 0 4.725 1.825Q24.55 13.9 24.55 16.8q0 2.9-1.825 4.725Q20.9 23.35 18 23.35ZM3.15 38.4v-3.7q0-1.5.8-2.7.8-1.2 2.25-1.85 3.45-1.5 6.225-2.175Q15.2 27.3 18 27.3q2.85 0 5.6.675 2.75.675 6.2 2.175 1.45.65 2.275 1.85.825 1.2.825 2.7v3.7Z'
            : 'M32.35 20.65V18.5H43v2.15ZM18 23.35q-2.85 0-4.7-1.825T11.45 16.8q0-2.9 1.85-4.725 1.85-1.825 4.7-1.825 2.9 0 4.725 1.825Q24.55 13.9 24.55 16.8q0 2.9-1.825 4.725Q20.9 23.35 18 23.35ZM3.15 38.4v-3.7q0-1.5.8-2.7.8-1.2 2.25-1.85 3.45-1.5 6.225-2.175Q15.2 27.3 18 27.3q2.85 0 5.6.675 2.75.675 6.2 2.175 1.45.65 2.275 1.85.825 1.2.825 2.7v3.7Z'}
    /></svg
>
