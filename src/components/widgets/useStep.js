export default function useStep(targetRef, stepRef) {

    /**
     * Manually scrolls to the position of element if `scrollIntoView` fails
     * @private
     */
    function scrollManually() {
        const elementRect = this.node.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + this.window.pageYOffset;
        const middle = absoluteElementTop - (this.window.innerHeight / 2);

        this.window.scrollTo(0, middle);
    }

    /**
     * Brings the element to middle of the view port if not in view
     * @public
     */
    function bringInView() {
        // If the node is not there or already is in view
        if (!this.node || this.isInView()) {
            return;
        }

        // If browser does not support scrollIntoView
        if (!this.node.scrollIntoView) {
            this.scrollManually();
            return;
        }

        try {
            this.node.scrollIntoView(this.options.scrollIntoViewOptions || {
                behavior: 'instant',
                block: 'center',
            });
        } catch (e) {
            // `block` option is not allowed in older versions of firefox, scroll manually
            this.scrollManually();
        }
    }

    function onTop() {

    }

    return {
        onTop
    }
}