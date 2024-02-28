<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { modalLoading, type ModalData } from 'stores/modals';
    import { socket } from 'stores/main';

    function requestData(): void {
        $modalLoading = true;

        socket.emit('requestData', ({ err }) => {
            if (err) {
                dismissModal();
            } else {
                dismissModal();
            }
        });
    }

    const data: ModalData = {
        title: 'Request my data',
        actions: [
            {
                title: 'Send data',
                primary: true,
                callback: requestData,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><path
            d="M20 18c0 2.21-3.582 4-8 4s-8-1.79-8-4v-4.026c.502.617 1.215 1.129 2.008 1.525C7.58 16.285 9.7 16.75 12 16.75s4.42-.465 5.992-1.25c.793-.397 1.506-.91 2.008-1.526V18Z"
        /><path
            d="M12 10.75c2.3 0 4.42-.465 5.992-1.25c.793-.397 1.506-.91 2.008-1.526V12c0 .5-1.786 1.591-2.679 2.158c-1.323.661-3.203 1.092-5.321 1.092s-3.998-.43-5.321-1.092C5.5 13.568 4 12.5 4 12V7.974c.502.617 1.215 1.129 2.008 1.525C7.58 10.285 9.7 10.75 12 10.75Z"
        /><path
            d="M17.321 8.158C15.998 8.819 14.118 9.25 12 9.25s-3.998-.43-5.321-1.092c-.515-.202-1.673-.843-2.478-1.879a.81.81 0 0 1-.161-.621c.023-.148.055-.301.096-.396C4.828 3.406 8.086 2 12 2c3.914 0 7.172 1.406 7.864 3.262c.041.095.073.248.096.396a.81.81 0 0 1-.162.621c-.804 1.036-1.962 1.677-2.477 1.879Z"
        /></svg
    >

    <h1 class="modal-header">Email all of your account's data?</h1>
</ModalTemplate>

<style>
    svg {
        width: 128px;
        height: 128px;
        fill: white;
        margin-top: 10px;
        cursor: default;
    }

    h1 {
        font-size: 1.2rem;
        text-align: start;
        margin-bottom: 20px;
    }

    @media screen and (max-width: 850px) {
        svg {
            width: 80px;
            height: 80px;
        }

        h1 {
            font-size: 1rem;
        }
    }
</style>
