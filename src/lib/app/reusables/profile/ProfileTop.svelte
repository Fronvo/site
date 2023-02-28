<script lang="ts">
    import {
        dropdownImage,
        DropdownTypes,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { dataSaver } from 'stores/main';
    import { dismissDropdown, showDropdown } from 'utilities/main';

    export let banner: string;
    export let avatar: string;

    function showImageDropdown(targetImage: string): void {
        if ($dropdownVisible) {
            dismissDropdown();
            return;
        }

        $dropdownImage = targetImage;

        showDropdown(DropdownTypes.Image);
    }
</script>

<div class="top-container" on:contextmenu={() => showImageDropdown(banner)}>
    <img
        id="avatar"
        src={avatar && !$dataSaver ? avatar : '/svgs/profile/avatar-filled.svg'}
        alt={`${avatar}`}
        draggable={false}
        on:contextmenu={() => showImageDropdown(avatar)}
    />
</div>

<style>
    .top-container {
        display: flex;
        width: 107%;
        height: 35vh;
        border-radius: 5px;
        align-self: center;
        margin-bottom: 40px;
    }

    #avatar {
        width: 164px;
        height: 164px;
        border-radius: 100px;
        align-self: flex-end;
        margin-left: 30px;
        transition: 250ms;
        transform: translateY(40px);
        border: 2px solid var(--button_background);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 700px) {
        .top-container {
            border-radius: 0px;
            width: 100%;
            height: 23vh;
        }

        #avatar {
            width: 100px;
            height: 100px;
        }
    }
</style>
