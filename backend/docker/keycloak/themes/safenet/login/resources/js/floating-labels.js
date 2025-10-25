/**
 * Floating Label Management for Keycloak Forms
 * Handles animated floating labels for input fields
 */

(function() {
    'use strict';

    /**
     * Check and update label state for an input
     * @param {HTMLElement} input - The input element
     */
    function checkLabelState(input) {
        const hasValue = input.value && input.value.trim() !== '';
        const isFocused = document.activeElement === input;
        const label = input.nextElementSibling;
        
        if (label && label.classList.contains('kc-label')) {
            if (hasValue || isFocused) {
                label.classList.add('kc-label-active');
            } else {
                label.classList.remove('kc-label-active');
            }
        }
    }

    /**
     * Initialize floating labels for all input fields
     */
    function initFloatingLabels() {
        const inputs = document.querySelectorAll('.kc-input');
        
        inputs.forEach(input => {
            // Check initial state for pre-filled values
            checkLabelState(input);
            
            // Add event listeners
            input.addEventListener('focus', () => checkLabelState(input));
            input.addEventListener('blur', () => checkLabelState(input));
            input.addEventListener('input', () => checkLabelState(input));
            
            // Handle autofill detection with a slight delay
            setTimeout(() => checkLabelState(input), 100);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFloatingLabels);
    } else {
        initFloatingLabels();
    }

})();