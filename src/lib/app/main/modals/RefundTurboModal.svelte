<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { cachedAccountData, currentToken } from 'stores/main';
    import { modalLoading, type ModalData } from 'stores/modals';
    import { loadProfile } from 'utilities/profile';

    async function refundTurbo(): Promise<void> {
        $modalLoading = true;

        await fetch('/api/refund-turbo', {
            method: 'POST',
            body: JSON.stringify({
                token: $currentToken,
            }),
        });

        await loadProfile($cachedAccountData);

        dismissModal();
    }

    const data: ModalData = {
        title: 'Refund your subscription',
        actions: [
            { title: 'Refund Turbo', callback: refundTurbo, danger: true },
            {
                title: 'Cancel',
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
            d="M20 15c0 4.255-2.618 6.122-4.641 6.751c-.432.134-.715-.369-.457-.74c.88-1.265 1.898-3.195 1.898-5.01c0-1.951-1.644-4.254-2.928-5.675c-.293-.324-.805-.11-.821.328c-.053 1.45-.282 3.388-1.268 4.908a.412.412 0 0 1-.677.036c-.308-.39-.616-.871-.924-1.252c-.166-.204-.466-.207-.657-.026c-.747.707-1.792 1.809-1.792 3.18c0 .93.36 1.905.767 2.69c.224.43-.174.95-.604.724C6.113 19.98 4 18.084 4 15c0-3.146 4.31-7.505 5.956-11.623c.26-.65 1.06-.955 1.617-.531C14.943 5.414 20 10.378 20 15Z"
        /></svg
    >

    <h1 class="modal-header">
        You will lose access to all of the Turbo features.
    </h1>
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
            font-size: 0.9rem;
        }
    }
</style>
