import styles from '../../css/lessons.css';

export default class LessonUIHelper {

    static _highlightedElements = [];

    /* Helper Functions */
    static _newHTML(type, c, p) {
        var e = document.createElement(type);
        if (c) {
            e.setAttribute("class", c);
        }
        if (p) {
            p.appendChild(e);
        }
        return e;
    }

    static _getBlockByDataID(dataID) {

        const elements = document.querySelectorAll(`[data-id="${dataID}"]`);
        for (let element of elements) {
            if (element.closest('.blocklyFlyout')) {
                return element;
            }
        }
        return null;
    }

    static _getBlockInstance(dataID) {
        const allBlocks = window.workspace.getFlyout().workspace_.getAllBlocks();
        const block = allBlocks.find(block => block.id === dataID);
        return block;
    }

    /* Highlight blocks in the flyout */
    static highlightBlocks(blockIDs) {
        const blocksFlyout = document.getElementsByClassName('blocklyFlyout')[0];
        const blockCanvas = blocksFlyout.getElementsByClassName('blocklyBlockCanvas')[0];
        const allBlocksInFlyout = blockCanvas.children;
        let found = false;

        let isTheFirstBlockVisible = false;
        for (let i = 0; i < allBlocksInFlyout.length; i++) {
            allBlocksInFlyout[i].style.opacity = '0.1';
            allBlocksInFlyout[i].style.pointerEvents = 'none'; // Disable interaction
            // allBlocksInFlyout[i].classList.remove('highlightedBlock'); // Remove glow effect

            if (blockIDs.includes(allBlocksInFlyout[i].getAttribute('data-id'))) {
                allBlocksInFlyout[i].style.opacity = '1';
                allBlocksInFlyout[i].style.pointerEvents = 'auto'; // Enable interaction for the highlighted block
                // allBlocksInFlyout[i].classList.add('highlightedBlock'); // Add glow effect
                found = true;

                if (!isTheFirstBlockVisible) {
                    // Ensure the block is in view
                    const flyout = window.workspace.getFlyout();
                    flyout.scrollToBlock(allBlocksInFlyout[i]);
                    isTheFirstBlockVisible = true;
                }
            }
        }
        if (!found) {
            LessonUIHelper.unhighlightBlocks();
        }
    }

    static unhighlightBlocks() {
        const blocksFlyout = document.getElementsByClassName('blocklyFlyout')[0];
        const blockCanvas = blocksFlyout.getElementsByClassName('blocklyBlockCanvas')[0];
        const allBlocksInFlyout = blockCanvas.children;
        for (let i = 0; i < allBlocksInFlyout.length; i++) {
            allBlocksInFlyout[i].style.opacity = '1';
            allBlocksInFlyout[i].style.pointerEvents = 'auto'; // Enable interaction
            // allBlocksInFlyout[i].classList.remove('highlightedBlock'); // Remove glow effect
        }
    }

    /* Highlight Element */
    static highlightElement(elementID, colorRGBA, onClick) {
        const element = document.getElementById(elementID);
        if (!element) {
            console.warn('Element not found:', elementID);
            return;
        }
        console.log("styles.highlightedElement", styles.highlightedElement)
        element.classList.add(styles.highlightedElement);
        LessonUIHelper._setHighlightedElementColor(colorRGBA || 'rgba(255, 0, 0, 0.5)');

        // store element's initial color
        const elementInitialColor = element.style.backgroundColor;

        // set element's background color to the highlighted color
        // element.style.backgroundColor = colorRGBA || 'rgba(255, 0, 0, 0.5)';

        const onHighlightedClick = () => {
            onClick && onClick();
            element.classList.remove(styles.highlightedElement);

            // when the element is clicked, remove the highlight
            element.removeEventListener('click', onHighlightedClick);

            // restore element's initial color
            element.style.backgroundColor = elementInitialColor
        };

        element.addEventListener('click', onHighlightedClick);

        // store the unhighlight function for this element
        LessonUIHelper._highlightedElements.push({ element, unhighlight: onHighlightedClick });
    }

    static unhighlightElements() {
        LessonUIHelper._highlightedElements.forEach(({ element, unhighlight }) => {
            element.removeEventListener('click', unhighlight);
            element.classList.remove(styles.highlightedElement);
            element.style.backgroundColor = '';
        });
        LessonUIHelper._highlightedElements = [];
    }

    static _setHighlightedElementColor(colorRGBA) {
        document.documentElement.style.setProperty('--highlightedElementColor', colorRGBA);
    }

    /* Animate Movement */
    static async blockToScriptsAnimation(blockDataID) {
        const blockInstance = LessonUIHelper._getBlockInstance(blockDataID);
        const blockOriginal = blockInstance.getSvgRoot();

        // Ensure the block is in view
        const flyout = window.workspace.getFlyout();
        flyout.scrollToBlock(blockInstance);
        await new Promise(resolve => setTimeout(resolve, 400)); // wait for the scroll to finish

        const wrapperSvg = LessonUIHelper._wrapGInSVG(blockOriginal);
        const pointingHand = LessonUIHelper._addPointingHandToDom();

        const { dx, dy } = LessonUIHelper._calculateAnimationDistance(blockOriginal, window.document.body);
        LessonUIHelper._prepareBlockForAnimation(wrapperSvg, blockOriginal);

        document.body.setAttribute('style', 'position: relative;');

        // Step 5: Append the new SVG to the DOM
        document.body.appendChild(wrapperSvg);

        await new Promise(resolve => setTimeout(resolve, 400)); // just for better UX we wait a bit after having showed the hand but before starting the animation

        // Step 6: Animate the elements 
        LessonUIHelper._animateElement(pointingHand, dx, dy, () => {
            document.body.removeChild(pointingHand);
        });
        LessonUIHelper._animateElement(wrapperSvg, dx, dy, () => {
            document.body.removeChild(wrapperSvg);
            document.body.setAttribute('style', 'position: unset;');
        });
    }

    static _cloneBlock(blockOriginal) {
        const block = blockOriginal.cloneNode(true);
        // const originalCanvases = blockOriginal.getElementsByTagName('canvas');
        // const clonedCanvases = block.getElementsByTagName('canvas');

        // for (let i = 0; i < originalCanvases.length; i++) {
        // const clonedContext = clonedCanvases[i].getContext('2d');
        // clonedContext.drawImage(originalCanvases[i], 0, 0);
        // }

        return block;
    }

    static _wrapGInSVG(gElement) {
        // Step 1: Get the bounding box of the <g>
        const bbox = gElement.getBBox();

        // Step 2: Create a new SVG element
        const wrapperSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        wrapperSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        wrapperSvg.setAttribute('width', bbox.width);
        wrapperSvg.setAttribute('height', bbox.height);
        wrapperSvg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);

        // Step 3: Clone the <g> element
        const clonedG = gElement.cloneNode(true);

        // Step 3.1: Remove the transform attribute from the cloned <g>
        clonedG.removeAttribute('transform');

        // Step 4: Append the cloned <g> to the new SVG
        wrapperSvg.appendChild(clonedG);

        return wrapperSvg;
    }

    static _wrapSvgInDiv(svgElement) {
        const div = document.createElement('div');
        div.appendChild(svgElement);
        return div;
    }

    static _calculateAnimationDistance(blockOriginal, scriptsDiv) {
        const blockRect = blockOriginal.getBoundingClientRect();
        const POIRect = scriptsDiv.getBoundingClientRect();

        const adjustedBlockRect = {
            left: blockRect.left,
            top: blockRect.top,
            width: blockRect.width,
            height: blockRect.height
        };

        const dx = POIRect.left + POIRect.width / 2 - (adjustedBlockRect.left + adjustedBlockRect.width / 2);
        const dy = POIRect.top + POIRect.height / 2 - (adjustedBlockRect.top + adjustedBlockRect.height / 2);

        return { dx, dy };
    }

    static _prepareBlockForAnimation(element, blockOriginal) {
        const blockRect = blockOriginal.getBoundingClientRect();
     
        const adjustedBlockRect = {
            left: blockRect.left,
            top: blockRect.top,
            width: blockRect.width,
            height: blockRect.height
        };

        element.style.background = blockOriginal.style.background;
        element.style.border = blockOriginal.style.border;
        element.style.zIndex = 100000;
        element.style.position = 'fixed';
        element.style.left = `${adjustedBlockRect.left}px`;
        element.style.top = `${adjustedBlockRect.top}px`;
        element.style.width = `${adjustedBlockRect.width}px`;
        element.style.height = `${adjustedBlockRect.height}px`;
    }

    static _animateElement(element, dx, dy, onFinish) {
        const animation = element.animate([
            { transform: `translate(0px, 0px)` },
            { transform: `translate(${dx}px, ${dy}px)` }
        ], {
            duration: 2000,
            iterations: 1,
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        animation.onfinish = () => setTimeout(onFinish, 400);
    }

    static _addPointingHandToDom() {
        const pointingHand = LessonUIHelper._newHTML('div', styles.pointingHand, document.body);
        pointingHand.innerHTML = `<svg stroke="black" stroke-width="2" class="svg-icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M653.944471 468.239059c0 4.517647 2.258824-12.468706 9.306353-23.672471a32.075294 32.075294 0 0 1 60.777411 20.48v72.643765c-1.204706 18.703059-3.794824 37.345882-7.68 55.687529a193.927529 193.927529 0 0 1-21.082353 44.152471 231.303529 231.303529 0 0 0-38.098823 58.247529 118.362353 118.362353 0 0 0-3.222588 31.984942c0 9.938824 1.325176 19.847529 3.855058 29.455058a179.892706 179.892706 0 0 1-39.363764 0c-12.468706-1.927529-28.16-26.895059-31.984941-34.575058a12.137412 12.137412 0 0 0-22.106353 0c-7.017412 12.167529-22.377412 34.243765-33.581177 35.538823-21.112471 2.56-65.596235 0-100.171294 0 0 0 5.752471-32.015059-7.348706-43.52-13.131294-11.535059-26.563765-24.997647-36.803765-33.942588l-26.563764-29.424941a143.420235 143.420235 0 0 1-39.664941-64c-6.716235-30.087529-6.083765-44.815059 0-56.621177 6.716235-9.848471 16.865882-16.835765 28.461176-19.546353 9.306353-1.626353 18.853647-0.963765 27.858824 1.92753 6.264471 2.620235 11.685647 6.927059 15.661176 12.468706 7.378824 9.938824 9.607529 14.727529 7.047529 3.855058a853.805176 853.805176 0 0 0-13.131294-49.603764c-5.421176-17.618824-10.842353-27.527529-15.028706-39.363765-4.156235-11.836235-9.607529-23.04-15.99247-37.767529a370.447059 370.447059 0 0 1-14.396235-46.08 45.748706 45.748706 0 0 1 7.981176-37.436236 44.784941 44.784941 0 0 1 43.52-11.203764c12.077176 5.240471 22.256941 14.064941 29.123765 25.298823 9.577412 15.480471 17.317647 32.015059 23.04 49.272471 10.541176 27.467294 18.070588 56.018824 22.407529 85.11247-0.783059-17.167059 0.602353-34.364235 4.156235-51.2a35.870118 35.870118 0 0 1 22.076236-22.076235c9.517176-3.041882 19.606588-3.704471 29.455059-1.927529 9.788235 2.168471 18.432 7.860706 24.304941 15.99247 7.348706 18.703059 11.565176 38.490353 12.498823 58.578824 0.903529-17.167059 3.915294-34.123294 8.944941-50.56753 5.360941-7.529412 13.161412-12.950588 22.076236-15.36a89.961412 89.961412 0 0 1 32.015059 0c8.643765 2.951529 16.233412 8.402824 21.744941 15.661177 6.776471 16.986353 10.872471 34.936471 12.167529 53.127529" fill="#FFFFFF" /></svg>`;
        return pointingHand;
    }
}

window.LessonUIHelper = LessonUIHelper;