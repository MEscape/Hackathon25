/**
 * Password Strength Indicator for Keycloak Registration
 * Provides real-time password strength feedback with smooth animations
 */

(function() {
    'use strict';

    // Password strength levels with enhanced feedback
    const STRENGTH_LEVELS = {
        WEAK: { score: 0, text: 'Weak', class: 'weak' },
        FAIR: { score: 1, text: 'Fair', class: 'fair' },
        GOOD: { score: 2, text: 'Good', class: 'good' },
        STRONG: { score: 3, text: 'Strong', class: 'strong' },
        VERY_STRONG: { score: 4, text: 'Very Strong', class: 'very-strong' }
    };

    // Password requirements with validation rules
    const REQUIREMENTS = {
        length: {
            id: 'req-length',
            test: (password) => password.length >= 8,
            weight: 1,
            text: 'At least 8 characters'
        },
        uppercase: {
            id: 'req-uppercase',
            test: (password) => /[A-Z]/.test(password),
            weight: 1,
            text: 'One uppercase letter'
        },
        lowercase: {
            id: 'req-lowercase',
            test: (password) => /[a-z]/.test(password),
            weight: 1,
            text: 'One lowercase letter'
        },
        number: {
            id: 'req-number',
            test: (password) => /\d/.test(password),
            weight: 1,
            text: 'One number'
        },
        special: {
            id: 'req-special',
            test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            weight: 1,
            text: 'One special character'
        }
    };

    /**
     * Calculate password strength score with enhanced algorithm
     * @param {string} password - The password to evaluate
     * @returns {number} - Strength score (0-4)
     */
    function calculateStrength(password) {
        if (!password) return 0;

        let score = 0;
        let metRequirements = 0;

        // Check each requirement
        Object.values(REQUIREMENTS).forEach(req => {
            if (req.test(password)) {
                metRequirements += req.weight;
            }
        });

        // Base score on met requirements
        if (metRequirements >= 5) {
            score = 4; // Very Strong
        } else if (metRequirements >= 4) {
            score = 3; // Strong
        } else if (metRequirements >= 3) {
            score = 2; // Good
        } else if (metRequirements >= 2) {
            score = 1; // Fair
        } else {
            score = 0; // Weak
        }

        // Additional bonuses for very strong passwords
        if (score >= 3) {
            if (password.length >= 12) score = Math.min(4, score + 0.5);
            
            const hasMultipleSpecial = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length >= 2;
            const hasMultipleNumbers = (password.match(/\d/g) || []).length >= 2;
            
            if (hasMultipleSpecial && hasMultipleNumbers && password.length >= 10) {
                score = 4;
            }
        }

        return Math.floor(score);
    }

    /**
     * Get strength level object from score
     * @param {number} score - Strength score
     * @returns {object} - Strength level object
     */
    function getStrengthLevel(score) {
        switch (score) {
            case 0: return STRENGTH_LEVELS.WEAK;
            case 1: return STRENGTH_LEVELS.FAIR;
            case 2: return STRENGTH_LEVELS.GOOD;
            case 3: return STRENGTH_LEVELS.STRONG;
            case 4: return STRENGTH_LEVELS.VERY_STRONG;
            default: return STRENGTH_LEVELS.WEAK;
        }
    }

    // Cache for previous state to prevent unnecessary updates
    let previousStrengthState = {
        score: -1,
        text: '',
        requirements: {}
    };

    /**
     * Update password strength indicator with smooth animations
     * @param {string} password - Current password value
     */
    function updateStrengthIndicator(password) {
        const strengthFill = document.getElementById('password-strength-fill');
        const strengthText = document.getElementById('password-strength-text');
        
        if (!strengthFill || !strengthText) return;

        const score = calculateStrength(password);
        const level = getStrengthLevel(score);

        // Always update the strength bar to prevent disappearing
        strengthFill.className = `kc-password-strength-fill ${level.class}`;
        
        // Calculate and set width based on score
        const percentage = password.length > 0 ? Math.max(20, (score + 1) * 20) : 0;
        strengthFill.style.width = percentage + '%';
        
        // Update strength text only if it actually changed
        if (previousStrengthState.text !== level.text) {
            strengthText.style.opacity = '0.7';
            setTimeout(() => {
                strengthText.textContent = level.text;
                strengthText.className = `kc-password-strength-text ${level.class}`;
                strengthText.style.opacity = '1';
            }, 50);
            
            previousStrengthState.text = level.text;
        }
        
        previousStrengthState.score = score;

        // Update individual requirements with state caching
        updateRequirements(password);
    }

    /**
     * Update individual password requirements with animations
     * @param {string} password - Current password value
     */
    function updateRequirements(password) {
        Object.entries(REQUIREMENTS).forEach(([key, req]) => {
            const element = document.getElementById(req.id);
            if (element) {
                const isMet = req.test(password);
                const previousState = previousStrengthState.requirements[key];
                
                // Only update if state actually changed
                if (previousState !== isMet) {
                    element.classList.toggle('met', isMet);
                    
                    const icon = element.querySelector('.kc-requirement-icon');
                    if (icon) {
                        // Add smooth transition for icon change
                        icon.style.opacity = '0.5';
                        setTimeout(() => {
                            icon.textContent = isMet ? '✓' : '✗';
                            icon.style.opacity = '1';
                        }, 25);
                    }
                    
                    // Cache the new state
                    previousStrengthState.requirements[key] = isMet;
                }
            }
        });
    }

    /**
     * Check and display password match status
     * @param {string} password - Original password
     * @param {string} confirm - Confirmation password
     */
    function checkPasswordMatch(password, confirm) {
        const matchIndicator = document.getElementById('password-match');
        if (!matchIndicator) return;

        if (confirm.length === 0) {
            matchIndicator.textContent = '';
            matchIndicator.className = 'kc-password-match';
        } else if (password === confirm) {
            matchIndicator.textContent = '✓ Passwords match';
            matchIndicator.className = 'kc-password-match kc-match-success';
        } else {
            matchIndicator.textContent = '✗ Passwords do not match';
            matchIndicator.className = 'kc-password-match kc-match-error';
        }
    }



    /**
     * Initialize password strength indicator
     */
    function initPasswordStrength() {
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('password-confirm');
        
        if (!passwordInput) return;

        // Setup password strength monitoring with improved debounce
        let strengthTimeout;
        let lastValue = '';
        
        passwordInput.addEventListener('input', function() {
            const currentValue = this.value;
            
            // Skip if value hasn't actually changed
            if (currentValue === lastValue) return;
            lastValue = currentValue;
            
            clearTimeout(strengthTimeout);
            strengthTimeout = setTimeout(() => {
                updateStrengthIndicator(currentValue);
                if (confirmInput && confirmInput.value) {
                    checkPasswordMatch(currentValue, confirmInput.value);
                }
            }, 150);
        });

        // Setup password confirmation matching
        if (confirmInput) {
            let matchTimeout;
            const checkMatch = () => {
                clearTimeout(matchTimeout);
                matchTimeout = setTimeout(() => {
                    const password = passwordInput.value;
                    const confirm = confirmInput.value;
                    
                    checkPasswordMatch(password, confirm);
                    
                    // Set custom validity for HTML5 validation
                    if (confirm && password !== confirm) {
                        confirmInput.setCustomValidity('Passwords do not match');
                    } else {
                        confirmInput.setCustomValidity('');
                    }
                }, 100);
            };

            passwordInput.addEventListener('input', checkMatch);
            confirmInput.addEventListener('input', checkMatch);
        }



        // Initial update
        updateStrengthIndicator(passwordInput.value);
    }

    /**
     * Initialize when DOM is ready
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initPasswordStrength);
        } else {
            initPasswordStrength();
        }
    }

    // Start initialization
    init();



})();