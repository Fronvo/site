<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { showModal } from 'utilities/main';
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import SmallBanner from '../profile/small/SmallBanner.svelte';
    import SmallAvatar from '../profile/small/SmallAvatar.svelte';
    import SmallSince from '../profile/small/SmallSince.svelte';
    import SmallBio from '../profile/small/SmallBio.svelte';
    import SmallIdentifier from '../profile/small/SmallIdentifier.svelte';

    export let profileData: FronvoAccount;

    function editProfile(): void {
        showModal(ModalTypes.EditProfile);
    }

    function setStatus(): void {
        showModal(ModalTypes.Status);
    }

    function copyId(): void {
        navigator.clipboard.writeText($ourData.profileId);
    }

    function switchAccounts(): void {
        showModal(ModalTypes.SwitchAccounts);
    }

    function logout(): void {
        showModal(ModalTypes.Logout);
    }
</script>

<div class="profile-container">
    <SmallBanner />
    <SmallAvatar avatar={profileData.avatar} />

    <div class="secondary-container">
        <SmallIdentifier
            profileId={profileData.profileId}
            username={profileData.username}
        />

        <span class="seperator" />

        {#if profileData.bio}
            <SmallBio bio={profileData.bio} />

            <span class="seperator" />
        {/if}

        <SmallSince since={profileData.creationDate} />

        <span class="seperator" />

        <button on:click={editProfile}
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><g
                    ><path
                        d="M22 12.698c-.002 1.47-.013 2.718-.096 3.743c-.097 1.19-.296 2.184-.74 3.009a4.18 4.18 0 0 1-.73.983c-.833.833-1.893 1.21-3.237 1.39C15.884 22 14.2 22 12.053 22h-.106c-2.148 0-3.83 0-5.144-.177c-1.343-.18-2.404-.557-3.236-1.39c-.738-.738-1.12-1.656-1.322-2.795c-.2-1.12-.236-2.512-.243-4.241C2 12.957 2 12.492 2 12v-.054c0-2.148 0-3.83.177-5.144c.18-1.343.557-2.404 1.39-3.236c.832-.833 1.893-1.21 3.236-1.39c1.168-.157 2.67-.175 4.499-.177a.697.697 0 1 1 0 1.396c-1.855.002-3.234.018-4.313.163c-1.189.16-1.906.464-2.436.994S3.72 5.8 3.56 6.99C3.397 8.2 3.395 9.788 3.395 12v.784l.932-.814a2.14 2.14 0 0 1 2.922.097l3.99 3.99a1.86 1.86 0 0 0 2.385.207l.278-.195a2.79 2.79 0 0 1 3.471.209l2.633 2.37c.265-.557.423-1.288.507-2.32c.079-.972.09-2.152.091-3.63a.698.698 0 0 1 1.396 0Z"
                    /><path
                        fill-rule="evenodd"
                        d="M17.5 11c-2.121 0-3.182 0-3.841-.659C13 9.682 13 8.621 13 6.5c0-2.121 0-3.182.659-3.841C14.318 2 15.379 2 17.5 2c2.121 0 3.182 0 3.841.659C22 3.318 22 4.379 22 6.5c0 2.121 0 3.182-.659 3.841c-.659.659-1.72.659-3.841.659Zm2.212-6.712a.983.983 0 0 1 0 1.39l-.058.058a.238.238 0 0 1-.211.067a1.595 1.595 0 0 1-.81-.436a1.594 1.594 0 0 1-.436-.81a.238.238 0 0 1 .067-.211l.058-.058a.983.983 0 0 1 1.39 0ZM17.35 8.04a3.224 3.224 0 0 1-.296.279a1.635 1.635 0 0 1-.303.187c-.09.043-.188.076-.381.14l-1.021.34a.265.265 0 0 1-.335-.335l.34-1.02c.064-.194.097-.291.14-.382c.051-.108.114-.21.187-.303c.062-.08.134-.152.279-.296l1.799-1.799c.043-.043.118-.023.138.035a1.984 1.984 0 0 0 1.217 1.217c.058.02.078.095.035.138l-1.799 1.8Z"
                        clip-rule="evenodd"
                    /></g
                ></svg
            >
            <h1>Edit profile</h1></button
        >

        <span class="seperator" />

        <button on:click={setStatus}
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><g
                    ><path
                        d="M17.981 2.353a.558.558 0 0 1 1.038 0l.654 1.66c.057.143.17.257.315.314l1.659.654c.47.186.47.852 0 1.038l-1.66.654a.558.558 0 0 0-.314.315l-.654 1.659a.558.558 0 0 1-1.038 0l-.654-1.66a.558.558 0 0 0-.315-.314l-1.659-.654a.558.558 0 0 1 0-1.038l1.66-.654a.558.558 0 0 0 .314-.315l.654-1.659Z"
                    /><path
                        fill-rule="evenodd"
                        d="M17 14.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0Zm-5 2.25a.75.75 0 0 0 0-1.5h-2a.75.75 0 0 0 0 1.5h2Zm2-4.25c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5s.448-1.5 1-1.5s1 .672 1 1.5ZM9 14c.552 0 1-.672 1-1.5S9.552 11 9 11s-1 .672-1 1.5s.448 1.5 1 1.5Z"
                        clip-rule="evenodd"
                    /><path
                        d="m16.767 8.294l-.75.75a8.555 8.555 0 0 0-1.06-1.061l.75-.75l.76.3l.3.76Z"
                    /></g
                ></svg
            >
            <h1>Set status</h1></button
        >

        <span class="seperator" />

        <button on:click={copyId}
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><g
                    ><path
                        d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593c.734-.737 1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.601 3.601 0 0 0 15.24 2Z"
                    /><path
                        d="M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847c.843.847.843 2.21.843 4.936v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936v-4.82Z"
                    /></g
                ></svg
            >
            <h1>Copy ID</h1></button
        >

        <span class="seperator" />

        <button on:click={switchAccounts}
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><g
                    ><path
                        d="M9.62 18.98a3.234 3.234 0 0 0 2.644-.927l2.655-2.655A7.748 7.748 0 0 0 22 12.955c-.006 4.084-.101 6.218-1.463 7.58C19.07 22 16.713 22 12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.827 2.102 6.961 2.007 11.045 2a7.748 7.748 0 0 0-2.443 7.08l-2.655 2.656a3.233 3.233 0 0 0-.927 2.643l.193 1.741c.071.637.356 1.23.81 1.684l.173.174a2.823 2.823 0 0 0 1.684.809l1.74.193Z"
                    /><path
                        fill-rule="evenodd"
                        d="M21.963 8.412a5.73 5.73 0 0 1-1.649 3.413a5.753 5.753 0 0 1-5.507 1.505a.9.9 0 0 0-.864.215l-1.53 1.53l-.002-.003l-1.458-1.442a.75.75 0 0 0-1.055 1.067l1.455 1.438l-.503.504a1.233 1.233 0 0 1-1.009.353l-1.74-.193a.822.822 0 0 1-.49-.236l-.174-.173a.822.822 0 0 1-.236-.49l-.193-1.741a1.233 1.233 0 0 1 .353-1.009l3.094-3.093a.9.9 0 0 0 .215-.864a5.753 5.753 0 0 1 1.505-5.507a5.731 5.731 0 0 1 3.413-1.649c.906.034 1.68.097 2.348.216c.87.267 1.69.744 2.378 1.433a5.73 5.73 0 0 1 1.433 2.378c.12.668.182 1.442.216 2.348Zm-6.975-1.757a1.667 1.667 0 1 1 2.357 2.357a1.667 1.667 0 0 1-2.357-2.357Z"
                        clip-rule="evenodd"
                    /></g
                ></svg
            >
            <h1>Switch accounts</h1></button
        >

        <span class="seperator" />

        <button on:click={logout} id="danger"
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    fill-rule="evenodd"
                    d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712c-.101-.675-.122-1.48-.128-2.428a.734.734 0 0 1 .735-.734a.735.735 0 0 1 .744.726c.006 1.064.033 1.818.14 2.39c.103.552.267.87.507 1.108c.273.27.656.445 1.38.54c.744.1 1.73.101 3.145.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.106c-.097-.713-.275-1.092-.547-1.36c-.273-.27-.656-.446-1.38-.542c-.744-.098-1.73-.1-3.145-.1h-.985c-1.415 0-2.401.002-3.146.1c-.723.096-1.106.272-1.379.541c-.24.237-.404.556-.507 1.108c-.107.572-.134 1.326-.14 2.39a.735.735 0 0 1-.744.726a.734.734 0 0 1-.735-.734c.006-.948.027-1.753.128-2.428c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153Zm2.434 2.948a.723.723 0 0 1 0-1.032l1.97-1.946a.746.746 0 0 1 1.046 0a.723.723 0 0 1 0 1.032l-.71.7h7.086c.408 0 .74.327.74.73c0 .403-.332.73-.74.73H8.24l.71.7a.723.723 0 0 1 0 1.032a.746.746 0 0 1-1.046 0l-1.971-1.946Z"
                    clip-rule="evenodd"
                /></svg
            >
            <h1>Logout</h1></button
        >
    </div>
</div>

<style>
    .profile-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .secondary-container {
        width: 90%;
        display: flex;
        flex-direction: column;
        transform: translateY(-30px);
        background: var(--bg);
        border-radius: 10px;
        box-shadow: 0 0 10px var(--bg);
        padding-bottom: 5px;
    }

    .seperator {
        margin: auto;
        width: 100%;
        height: 2px;
        background: var(--primary);
    }

    button {
        height: 36px;
        width: 93%;
        display: flex;
        align-items: center;
        background: transparent;
        box-shadow: none;
        margin: 10px;
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 0;
        padding-left: 5px;
        border-radius: 3px;
    }

    button svg {
        width: 22px;
        height: 22px;
        margin-right: 10px;
        fill: rgb(200, 205, 218);
    }

    button:hover svg {
        fill: white;
    }

    button h1 {
        font-size: 0.85rem;
        color: rgb(200, 205, 218);
    }

    button:hover h1 {
        color: white;
    }

    button:hover {
        background: var(--primary);
    }

    #danger:hover svg {
        fill: red;
    }

    #danger:hover h1 {
        color: red;
    }
</style>
