<div class="secondary-container">
    <button
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><g
                ><path
                    d="M19.992 11.643c.283-.253.546-.504.789-.752c.754-.77 1.342-1.54 1.672-2.268c.324-.716.458-1.544.012-2.258c-.42-.67-1.185-.96-1.956-1.064c-.79-.107-1.75-.041-2.797.152l-.888.165a8 8 0 0 0-12.82 6.641l-.527.593c-.84.817-1.497 1.636-1.872 2.403c-.366.75-.54 1.627-.07 2.38c.433.691 1.232.979 2.032 1.074c.825.098 1.828.016 2.923-.201c.215-.043.436-.091.66-.145a8.046 8.046 0 0 1-1.311-1.26c-.853.146-1.56.18-2.095.116c-.632-.075-.865-.264-.937-.38c-.063-.1-.132-.358.145-.925c.241-.494.688-1.092 1.342-1.758a7.979 7.979 0 0 0 1.545 2.947c.117-.02.237-.042.36-.067c2.02-.4 4.613-1.351 7.28-2.772c2.665-1.42 4.848-3.012 6.227-4.42a7.98 7.98 0 0 0-1.545-2.947c.885-.151 1.61-.182 2.149-.11c.594.08.813.262.883.374c.06.095.126.33-.107.844c-.227.502-.683 1.129-1.377 1.836l-.003.003c.161.576.259 1.179.286 1.799Z"
                /><path
                    d="M12 20a8 8 0 0 0 7.992-8.357c-1.481 1.327-3.49 2.71-5.809 3.945c-2.491 1.328-4.958 2.281-7.032 2.775A7.965 7.965 0 0 0 12 20Z"
                /></g
            ></svg
        >
        <h1>Dashboard</h1></button
    >

    <button
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><g
                ><circle cx="12" cy="6" r="4" /><path
                    d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"
                /></g
            ></svg
        >
        <h1>Friends</h1></button
    >
    <button
        ><svg
            id="nitro"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                d="M20 15c0 4.255-2.618 6.122-4.641 6.751c-.432.134-.715-.369-.457-.74c.88-1.265 1.898-3.195 1.898-5.01c0-1.951-1.644-4.254-2.928-5.675c-.293-.324-.805-.11-.821.328c-.053 1.45-.282 3.388-1.268 4.908a.412.412 0 0 1-.677.036c-.308-.39-.616-.871-.924-1.252c-.166-.204-.466-.207-.657-.026c-.747.707-1.792 1.809-1.792 3.18c0 .93.36 1.905.767 2.69c.224.43-.174.95-.604.724C6.113 19.98 4 18.084 4 15c0-3.146 4.31-7.505 5.956-11.623c.26-.65 1.06-.955 1.617-.531C14.943 5.414 20 10.378 20 15Z"
            /></svg
        >
        <h1>Turbo</h1></button
    >
</div>

<style>
    .secondary-container {
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    button {
        display: flex;
        align-items: center;
        width: 215px;
        height: 45px;
        background: transparent;
        box-shadow: none;
        font-size: 1rem;
        text-align: start;
        transition: none;
        margin-bottom: 2px;
    }

    button:hover {
        background: var(--secondary);
    }

    button:active {
        opacity: 0.8;
    }

    h1 {
        font-size: 1rem;
        margin: 0;
    }

    svg {
        width: 28px;
        height: 28px;
        margin-right: 10px;
        fill: rgb(163, 167, 177);
    }

    button:hover svg {
        fill: white;
    }

    button:hover #nitro {
        fill: rgb(72, 202, 113);
    }
</style>
