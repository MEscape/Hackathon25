<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=true; section>
    <#if section = "header">
        ${msg("register.title")}
    <#elseif section = "form">
        <form id="kc-register-form" action="${url.registrationAction}" method="post">
            <!-- Personal Information Section -->
            <div class="kc-form-section">
                <h3 class="kc-section-title">${msg("register.personalInfo")}</h3>
                
                <div class="kc-form-grid">
                    <div class="kc-form-group">
                        <input 
                            type="text" 
                            id="firstName" 
                            class="kc-input<#if messagesPerField.existsError('firstName')> kc-input-error</#if>" 
                            name="firstName"
                            value="${(register.formData.firstName!'')}"
                            autocomplete="given-name"
                            aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>"
                            placeholder=" "
                            required
                        />
                        <label for="firstName" class="kc-label">${msg("register.firstName")}</label>
                    </div>

                    <div class="kc-form-group">
                        <input 
                            type="text" 
                            id="lastName" 
                            class="kc-input<#if messagesPerField.existsError('lastName')> kc-input-error</#if>" 
                            name="lastName"
                            value="${(register.formData.lastName!'')}"
                            autocomplete="family-name"
                            aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>"
                            placeholder=" "
                            required
                        />
                        <label for="lastName" class="kc-label">${msg("register.lastName")}</label>
                    </div>
                </div>
            </div>

            <!-- Account Information Section -->
            <div class="kc-form-section">
                <h3 class="kc-section-title">${msg("register.accountInfo")}</h3>
                
                <div class="kc-form-group">
                    <input 
                        type="email" 
                        id="email" 
                        class="kc-input<#if messagesPerField.existsError('email')> kc-input-error</#if>" 
                        name="email"
                        value="${(register.formData.email!'')}"
                        autocomplete="email"
                        aria-invalid="<#if messagesPerField.existsError('email')>true</#if>"
                        placeholder=" "
                        required
                    />
                    <label for="email" class="kc-label">${msg("register.email")}</label>
                </div>

                <#if !realm.registrationEmailAsUsername>
                    <div class="kc-form-group">
                        <input 
                            type="text" 
                            id="username" 
                            class="kc-input<#if messagesPerField.existsError('username')> kc-input-error</#if>" 
                            name="username"
                            value="${(register.formData.username!'')}"
                            autocomplete="username"
                            aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
                            placeholder=" "
                            required
                        />
                        <label for="username" class="kc-label">${msg("register.username")}</label>
                    </div>
                </#if>
            </div>

            <!-- Security Section -->
            <div class="kc-form-section">
                <h3 class="kc-section-title">${msg("register.security")}</h3>
                
                <div class="kc-form-group">
                    <div class="kc-password-wrapper">
                        <input 
                            type="password" 
                            id="password" 
                            class="kc-input<#if messagesPerField.existsError('password')> kc-input-error</#if>" 
                            name="password"
                            autocomplete="new-password"
                            aria-invalid="<#if messagesPerField.existsError('password')>true</#if>"
                            placeholder=" "
                            required
                        />
                        <label for="password" class="kc-label">${msg("register.password")}</label>
                        <button type="button" class="kc-password-toggle" onclick="togglePassword('password')" aria-label="${msg("aria.togglePassword")}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Password Strength Indicator -->
                    <div class="kc-password-strength" id="password-strength">
                        <div class="kc-password-strength-bar">
                            <div class="kc-password-strength-fill" id="password-strength-fill"></div>
                        </div>
                        <div class="kc-password-strength-text" id="password-strength-text">${msg("password.strength")}</div>
                        <div class="kc-password-requirements" id="password-requirements">
                            <div class="kc-requirement" id="req-length">
                                <span class="kc-requirement-icon">✗</span>
                                <span class="kc-requirement-text">${msg("password.requirements.length")}</span>
                            </div>
                            <div class="kc-requirement" id="req-uppercase">
                                <span class="kc-requirement-icon">✗</span>
                                <span class="kc-requirement-text">${msg("password.requirements.uppercase")}</span>
                            </div>
                            <div class="kc-requirement" id="req-lowercase">
                                <span class="kc-requirement-icon">✗</span>
                                <span class="kc-requirement-text">${msg("password.requirements.lowercase")}</span>
                            </div>
                            <div class="kc-requirement" id="req-number">
                                <span class="kc-requirement-icon">✗</span>
                                <span class="kc-requirement-text">${msg("password.requirements.number")}</span>
                            </div>
                            <div class="kc-requirement" id="req-special">
                                <span class="kc-requirement-icon">✗</span>
                                <span class="kc-requirement-text">${msg("password.requirements.special")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="kc-form-group">
                    <div class="kc-password-wrapper">
                        <input 
                            type="password" 
                            id="password-confirm" 
                            class="kc-input<#if messagesPerField.existsError('password-confirm')> kc-input-error</#if>" 
                            name="password-confirm"
                            autocomplete="new-password"
                            aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
                            placeholder=" "
                            required
                        />
                        <label for="password-confirm" class="kc-label">${msg("register.confirmPassword")}</label>
                        <button type="button" class="kc-password-toggle" onclick="togglePassword('password-confirm')" aria-label="${msg("aria.togglePassword")}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                    <div class="kc-password-match" id="password-match"></div>
                </div>
            </div>

            <#if recaptchaRequired??>
                <div class="kc-form-group">
                    <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                </div>
            </#if>

            <!-- Terms and Conditions -->
            <div class="kc-form-group">
                <div class="kc-checkbox-wrapper">
                    <input 
                        type="checkbox" 
                        id="terms" 
                        class="kc-checkbox" 
                        required
                    />
                    <label for="terms" class="kc-checkbox-label">
                        I agree to the <a href="#" class="kc-link">Terms of Service</a> and <a href="#" class="kc-link">Privacy Policy</a>
                    </label>
                </div>
            </div>

            <div class="kc-form-buttons">
                <button 
                    class="kc-button kc-button-primary" 
                    name="register" 
                    id="kc-register" 
                    type="submit"
                >
                        ${msg("register.submit")}
                    </button>
            </div>
        </form>
        
        <div class="kc-account-info">
                <p>
                    ${msg("register.haveAccount")} 
                    <a href="${url.loginUrl}" class="kc-link kc-link-primary">
                        ${msg("register.signIn")}
                    </a>
                </p>
            </div>
    </#if>
</@layout.registrationLayout>