<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=true displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "header">
        ${msg("login.title")}
    <#elseif section = "form">
        <#if realm.password>
            <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                <#if !usernameHidden??>
                    <div class="kc-form-group">
                        <input 
                            tabindex="1" 
                            id="username" 
                            class="kc-input<#if messagesPerField.existsError('username','password')> kc-input-error</#if>" 
                            name="username"
                            value="${(login.username!'')}"
                            type="text" 
                            autofocus 
                            autocomplete="username"
                            aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                            placeholder=" "
                            required
                        />
                        <label for="username" class="kc-label">${msg("login.username")}</label>
                    </div>
                </#if>

                <div class="kc-form-group">
                    <div class="kc-password-wrapper">
                        <input 
                            tabindex="2" 
                            id="password" 
                            class="kc-input<#if messagesPerField.existsError('username','password')> kc-input-error</#if>" 
                            name="password"
                            type="password" 
                            autocomplete="current-password"
                            aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                            placeholder=" "
                            required
                        />
                        <label for="password" class="kc-label">${msg("login.password")}</label>
                        <button type="button" class="kc-password-toggle" onclick="togglePassword('password')" aria-label="${msg("aria.togglePassword")}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="kc-form-options">
                    <#if realm.rememberMe && !usernameHidden??>
                        <div class="kc-checkbox-wrapper">
                            <input 
                                tabindex="3" 
                                id="rememberMe" 
                                name="rememberMe" 
                                type="checkbox" 
                                class="kc-checkbox"
                                <#if login.rememberMe??>checked</#if>
                            />
                            <label for="rememberMe" class="kc-checkbox-label">
                                ${msg("login.rememberMe")}
                            </label>
                        </div>
                    </#if>
                </div>

                <div class="kc-form-buttons">
                    <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                    <button 
                        tabindex="4" 
                        class="kc-button kc-button-primary" 
                        name="login" 
                        id="kc-login" 
                        type="submit"
                    >
                        ${msg("login.submit")}
                    </button>
                </div>
            </form>
        </#if>
        
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div class="kc-account-info">
                <p>
                    ${msg("login.noAccount")} 
                    <a href="${url.registrationUrl}" class="kc-link kc-link-primary">
                        ${msg("login.createAccount")}
                    </a>
                </p>
            </div>
        </#if>
    </#if>
</@layout.registrationLayout>