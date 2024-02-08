<script lang="ts">
    import { dismissModal, showModal } from 'utilities/main';
    import { ModalTypes, type ModalData } from 'stores/modals';
    import ModalTemplate from '../ModalTemplate.svelte';

    function goTurbo(): void {
        showModal(ModalTypes.GoPay);
    }

    const data: ModalData = {
        title: 'Become a Turbo Member',
        actions: [
            {
                title: 'Join the club',
                callback: goTurbo,
                primary: true,
            },
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <div class="benefit">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><path
                fill="white"
                fill-rule="evenodd"
                d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Zm4.75-4a.75.75 0 0 0-1.5 0v7.619a.75.75 0 1 0 1.5 0V12.75h3.315v2.869a.75.75 0 1 0 1.5 0V8a.75.75 0 0 0-1.5 0v3.25H6.75V8Zm9.297-.75h.128c.385 0 .665 0 .91.038c.973.153 1.879.782 2.124 1.756c.06.24.06.508.06.792v3.947c0 .284 0 .552-.06.792a2.066 2.066 0 0 1-.19.484l.446.353a.75.75 0 0 1-.93 1.176l-.64-.505c-.255.12-.53.204-.81.248c-.245.038-.525.038-.91.038h-.128c-.385 0-.664 0-.91-.038c-.972-.153-1.879-.781-2.124-1.756c-.06-.24-.06-.508-.06-.792V9.836c0-.284 0-.552.06-.792c.245-.974 1.152-1.603 2.124-1.756c.246-.038.525-.038.91-.038Zm1.719 6.817l-.227-.179a.75.75 0 0 0-1.105.98l-.323.001c-.476 0-.627-.002-.74-.02c-.556-.088-.844-.405-.903-.64c-.009-.034-.014-.096-.014-.495v-3.81c0-.398.005-.46.014-.495c.06-.234.347-.551.902-.639c.114-.018.265-.02.741-.02s.627.002.74.02c.556.088.844.405.903.64c.009.034.014.096.014.495v3.81c0 .171 0 .28-.002.352Z"
                clip-rule="evenodd"
            /></svg
        >
        <h1>High-quality images</h1>
    </div>

    <div class="benefit">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><path
                fill="white"
                fill-rule="evenodd"
                d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Zm4.25-4a.75.75 0 0 0-1.5 0v2a2.75 2.75 0 0 0 2.75 2.75h2.25V16a.75.75 0 0 0 1.5 0V8a.75.75 0 0 0-1.5 0v3.25H7.5c-.69 0-1.25-.56-1.25-1.25V8Zm12.77-.54a.75.75 0 0 1 .02 1.06l-2.666 2.773l2.757 4.302a.75.75 0 1 1-1.262.81l-2.564-4l-1.055 1.097V16a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 1.5 0v3.338l3.71-3.858a.75.75 0 0 1 1.06-.02Z"
                clip-rule="evenodd"
            /></svg
        >
        <h1>Larger file uploads</h1>
    </div>

    <div class="benefit">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="white"
                ><path
                    d="M15.5 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Z"
                /><path
                    d="M19.5 7.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm-15 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0Z"
                    opacity=".4"
                /><path
                    d="M18 16.5c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5Z"
                /><path
                    d="M22 16.5c0 1.38-1.79 2.5-4 2.5s-4-1.12-4-2.5s1.79-2.5 4-2.5s4 1.12 4 2.5Zm-20 0C2 17.88 3.79 19 6 19s4-1.12 4-2.5S8.21 14 6 14s-4 1.12-4 2.5Z"
                    opacity=".4"
                /></g
            ></svg
        >
        <h1>Add more friends</h1>
    </div>

    <div class="benefit">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><path
                fill="white"
                fill-rule="evenodd"
                d="M2.52 7.823C2 8.77 2 9.915 2 12.203v1.522c0 3.9 0 5.851 1.172 7.063C4.343 22 6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.212C22 19.576 22 17.626 22 13.725v-1.521c0-2.289 0-3.433-.52-4.381c-.518-.949-1.467-1.537-3.364-2.715l-2-1.241C14.111 2.622 13.108 2 12 2c-1.108 0-2.11.622-4.116 1.867l-2 1.241C3.987 6.286 3.038 6.874 2.519 7.823Zm6.927 7.575a.75.75 0 1 0-.894 1.204A5.766 5.766 0 0 0 12 17.75a5.766 5.766 0 0 0 3.447-1.148a.75.75 0 1 0-.894-1.204A4.267 4.267 0 0 1 12 16.25a4.267 4.267 0 0 1-2.553-.852Z"
                clip-rule="evenodd"
            /></svg
        >
        <h1>Create more servers</h1>
    </div>
</ModalTemplate>

<style>
    .benefit {
        width: 50%;
        display: flex;
        align-items: center;
        margin-top: 17px;
        padding-bottom: 17px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .benefit svg {
        border-radius: 30px;
        cursor: default;
    }

    .benefit h1 {
        margin: 0;
        margin-left: 25px;
        font-size: 1.3rem;
    }
</style>
