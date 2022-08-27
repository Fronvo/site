<script lang="ts">
    import { quadIn } from 'svelte/easing';
    import { draw } from 'svelte/transition';
</script>

<div class="top-container">
    <svg
        id="logo"
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280 200"
        width="1280"
        height="200"
        ><defs
            ><image
                width="1280"
                height="200"
                id="img1"
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAADIAQMAAACNqd7KAAAAAXNSR0IB2cksfwAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAA2SURBVHic7cEBDQAAAMKg909tDwcUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwJcBfcgAAZSGIOYAAAAASUVORK5CYII="
            /></defs
        ><style></style><path
            in:draw={{ duration: 2500, easing: quadIn }}
            d="m349.8 83l-6.8 39h-66.5l-11.5 66h-45.3l31.8-180h125.5l-7 39h-80.5l-6.3 36zm142.5 10.3q0 8.4-3 16.4-2.7 8.1-5.5 11.8l-2.7 3.5h-37.8q6.3-5.8 6.3-14.3 0-4.4-3-7.2-2.8-3-7.8-3-8.5 0-14.7 8.5l-14 79h-42.5l21.2-120.3h39.5l-3 16.8q14.3-20.3 34.5-20.3 16.3 0 24.3 7.8 8.2 7.7 8.2 21.3zm82-29.1q27 0 40.8 11.8 10.7 9.2 10.7 25.8 0 5.4-1.2 11.9l-5.3 29.3q-4.7 26.5-22.2 37.5-17.3 11-46.3 11-29 0-42.5-11-10-8.3-10-24.8 0-5.7 1.3-12.7l5.2-29.3q8.8-49.5 69.5-49.5zm3.5 73.3l3.3-18.8q0.5-2.4 0.5-6.2 0-4-3.3-8.8-3.2-4.7-11.5-4.7-8 0-13.5 5.5-5.5 5.3-7 14.3l-3.2 18.7q-0.5 2.5-0.5 6.5 0 3.8 3.2 8.3 3.3 4.5 11.3 4.5 8.2 0 13.7-5.5 5.5-5.8 7-13.8zm143.3-26.3q0-10.7-10.5-10.7-10.3 0-17 7.8l-14 79.7h-42.5l21.2-120.3h39.5l-2.7 14.8q14.7-18.3 37.2-18.3 22.5 0 29.3 11 4.2 7 4.2 16 0 9-1.2 16.8l-6.8 38.5q-0.2 1.5-0.2 2.7 0 6.8 7.5 6.8 5.7 0 10.2-2.5l-1.2 28.2q-11.8 9.8-26.8 9.8-34 0-34-28.5 0-5 1-10.8l6-33.2q0.8-4.5 0.8-7.8zm153.2-43.5h42.5q3.5 10.5 3.5 28 0 17.3-4.2 33.3-4.3 16-13 30.5-8.5 14.3-24 23.3-15.3 8.7-35.3 8.7-31.2 0-43.2-12.7-8-8.5-8-26 0-8.3 2-18.8l11.7-66.3h42.5l-11.7 66.5q-0.8 3.8-0.8 6.8 0 14.3 14.8 14.3 26-0.1 26-54.6 0-12.7-2-28.2zm134.7-3.5q27 0 40.8 11.8 10.7 9.2 10.7 25.7 0 5.5-1.2 12l-5.3 29.3q-4.7 26.4-22.2 37.4-17.3 11.1-46.3 11.1-29 0-42.5-11.1-10-8.2-10-24.7 0-5.8 1.3-12.8l5.2-29.2q8.8-49.5 69.5-49.5zm3.5 73.3l3.3-18.8q0.5-2.5 0.5-6.2 0-4-3.3-8.8-3.2-4.7-11.5-4.7-8 0-13.5 5.5-5.5 5.2-7 14.2l-3.2 18.8q-0.5 2.5-0.5 6.5 0 3.7 3.2 8.2 3.3 4.5 11.3 4.5 8.2 0 13.7-5.5 5.5-5.7 7-13.7z"
        /></svg
    >
</div>

<style>
    .top-container {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
    }

    .top-container #logo {
        fill: none;
        animation-name: animated-stroke;
        animation-duration: 20000ms;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    @keyframes animated-stroke {
        0% {
            stroke: rgb(255, 255, 255);
            stroke-width: 6px;
        }

        50% {
            stroke: rgb(238, 227, 255);
            stroke-width: 6px;
        }

        100% {
            stroke: rgb(228, 210, 255);
            stroke-width: 6px;
        }
    }

    @keyframes float {
        0% {
            transform: translateY(-5px);
        }

        100% {
            transform: translateY(10px);
        }
    }
</style>
